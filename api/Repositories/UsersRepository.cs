using System;
using api.Data;
using api.DTOs.User;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace api.Repositories;

public class UsersRepository(ApplicationDbContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IMapper mapper) : IUsersRepository
{
    public async Task<UserDto?> CreateUserAsync(RegisterDto registerDto)
    {
        foreach (var role in registerDto.Roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                throw new Exception($"Role {role} does not exist");
            }
        }

        var user = mapper.Map<AppUser>(registerDto);

        var result = await userManager.CreateAsync(user, registerDto.Password!);

        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, "User"); // Default role
            if (registerDto.Roles != null)
            {
                foreach (var role in registerDto.Roles)
                {
                    await userManager.AddToRoleAsync(user, role);
                }
            }

            return mapper.Map<UserDto>(user);
        }
        else
        {
            foreach (var error in result.Errors)
            {
                Console.WriteLine(error);
            }
        }

        return null;
    }

    public async Task<UserDto?> UpdateUserAsync(UpdateUserDto updateUserDto, string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user == null) return null;

        user.Email = updateUserDto.Email;
        user.PhoneNumber = updateUserDto.PhoneNumber;
        user.OfficePhone = updateUserDto.OfficePhoneNumber;
        user.Address = updateUserDto.Address;
        user.Landline = updateUserDto.Landline;
        user.FirstName = updateUserDto.FirstName;
        user.LastName = updateUserDto.LastName;
        user.MaritalStatus = updateUserDto.MaritalStatus;

        foreach (var role in updateUserDto.Roles)
        {
            await userManager.AddToRoleAsync(user, role);
        }

        await userManager.UpdateAsync(user);

        return mapper.Map<UserDto>(user);
    }

    public async Task<UserDto?> DeleteUserAsync(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user == null) return null;

        await userManager.DeleteAsync(user);

        return mapper.Map<UserDto>(user);
    }

    public async Task<UserDto?> GetByUsernameAsync(string username)
    {
        var user = await userManager.FindByNameAsync(username);

        return mapper.Map<UserDto>(user);
    }

    public async Task<IEnumerable<UserDto>> GetUsersAsync(UserQuery query)
    {
        var users = context.Users.ProjectTo<UserDto>(mapper.ConfigurationProvider).AsQueryable();

        if (!String.IsNullOrEmpty(query.Username))
        {
            users = users
            .Where(
                x => x.Username != null && x.Username.ToLower().Contains(query.Username.ToLower())
            );
        }

        var page = query.Page - 1 < 0 ? 0 : query.Page - 1;

        var result = await users.Skip(page * query.Limit).Take(query.Limit).ToListAsync();

        return result;
    }

    public async Task<IEnumerable<UserDto>> GetUsersInRoleAsync(string role, string? query)
    {
        var users = await userManager.GetUsersInRoleAsync(role);
        return users.Select(x => mapper.Map<UserDto>(x));
    }
}
