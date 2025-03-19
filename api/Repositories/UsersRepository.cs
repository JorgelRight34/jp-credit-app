using System;
using api.Data;
using api.DTOs;
using api.DTOs.User;
using api.Extensions;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;

namespace api.Repositories;

public class UsersRepository(
    ApplicationDbContext context,
    UserManager<AppUser> userManager,
    RoleManager<IdentityRole> roleManager,
    IMapper mapper,
    IPhotoService photoService
) : IUsersRepository
{
    public async Task<UserDto?> CreateAsync(RegisterDto registerDto)
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
                throw new Exception(error.Description);
            }
        }

        return null;
    }

    public async Task<UserDto?> UpdateAsync(UpdateUserDto updateUserDto, string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user == null) return null;

        mapper.Map(updateUserDto, user);

        foreach (var role in updateUserDto.Roles)
        {
            await userManager.AddToRoleAsync(user, role);
        }

        await userManager.UpdateAsync(user);

        return mapper.Map<UserDto>(user);
    }

    public async Task<UserDto?> DeleteAsync(string id)
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

    public async Task<IEnumerable<UserDto>> GetAllAsync(UserQuery query)
    {
        var users = context.Users.ProjectTo<UserDto>(mapper.ConfigurationProvider).AsQueryable();

        if (!String.IsNullOrEmpty(query.Username))
        {
            users = users
            .Where(
                x => x.Username != null && x.Username.ToLower().Contains(query.Username.ToLower())
            );
        }

        return await users.PaginateAsync(query);
    }

    public async Task<IEnumerable<UserDto>> GetUsersInRoleAsync(string role, string? query)
    {
        var users = await userManager.GetUsersInRoleAsync(role);
        return users.Select(x => mapper.Map<UserDto>(x));
    }

    public async Task<UserDto> AddUserPhotoAsync(IFormFile file, AppUser user)
    {
        var result = await photoService.AddPhotoAsync(file);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        // Delete previous user photo
        if (user.Photo != null) await photoService.DeletePhotoAsync(user.Photo.PublicId!);

        user.Photo = photo;

        await context.Photos.AddAsync(photo);
        await context.SaveChangesAsync();

        return mapper.Map<UserDto>(user);
    }

    public async Task DeleteUserPhotoAsync(string publicId)
    {
        var result = await photoService.DeletePhotoAsync($"jp-credit-app/{publicId}");
        if (result.Result != "ok") throw new Exception(result.Result);
    }

    public async Task<UserDto?> GetByIdAsync(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user == null) return null;

        return mapper.Map<UserDto>(user);
    }
}
