using System;
using api.Data;
using api.DTOs;
using api.DTOs.Loan;
using api.DTOs.Transaction;
using api.DTOs.User;
using api.Extensions;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
        IdentityResult result;

        if (registerDto.Roles.Any(x => x.ToLower() == "admin"))
        {
            result = await userManager.CreateAsync(user, registerDto.Password!);
        }
        else
        {
            result = await userManager.CreateAsync(user);
        }

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
        var user = await context.Users.Include(x => x.Photo)
            .FirstOrDefaultAsync(x => x.UserName != null && x.UserName.ToLower() == username.ToLower());
        if (user == null) return null;

        var roles = await userManager.GetRolesAsync(user);
        var userDto = mapper.Map<UserDto>(user);

        userDto.Roles = roles.ToList();

        return userDto;
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync(UserQuery query)
    {
        var users = context.Users.ProjectTo<UserDto>(mapper.ConfigurationProvider).AsQueryable();

        users = FilterByQuery(users, query);

        return await users.PaginateAsync(query);
    }

    public async Task<IEnumerable<UserDto>> GetUsersInRoleAsync(string role, UserQuery? query)
    {
        var users = await userManager.GetUsersInRoleAsync(role);
        var userDtos = users.AsQueryable().Select(x => mapper.Map<UserDto>(x));
        if (query != null) userDtos = FilterByQuery(userDtos, query);

        return userDtos;
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

    public IQueryable<UserDto> FilterByQuery(IQueryable<UserDto> users, UserQuery query)
    {
        if (!String.IsNullOrEmpty(query.Username))
        {
            users = users
            .Where(
                x => x.Username != null && x.Username.ToLower().Contains(query.Username.ToLower())
            );
        }

        if (!string.IsNullOrEmpty(query.FirstName))
        {
            var nameQuery = query.FirstName.ToLower();
            users = users.Where(x =>
                ((x.FirstName ?? "") + " " + (x.LastName ?? "")).ToLower().Contains(nameQuery));
        }

        if (!string.IsNullOrEmpty(query.LastName))
        {
            var nameQuery = query.LastName.ToLower();
            users = users.Where(x =>
                ((x.FirstName ?? "") + " " + (x.LastName ?? "")).ToLower().Contains(nameQuery));
        }

        if (!String.IsNullOrEmpty(query.DNI))
        {
            users = users.Where(x => x.DNI != null && x.DNI.ToLower().Contains(query.DNI.ToLower()));
        }

        return users;
    }

    public async Task<UserStatsDto?> GetUserStatsAsync(string username)
    {
        var user = await userManager.FindByNameAsync(username);
        if (user == null) return null;

        var loan = await context.Loans
            .Where(x => x.ClientId == user.Id)
            .OrderByDescending(x => x.StartDate)
            .Select(x => new LoanDto
            {
                Id = x.Id,
                DisbursedAmount = x.DisbursedAmount,
                PrincipalBalance = x.PrincipalBalance,
                AccruedInterest = x.AccruedInterest,
                StartDate = x.StartDate
            })
            .FirstOrDefaultAsync();

        var transaction = await context.Transactions
            .Where(x => x.PayerId == user.Id)
            .OrderByDescending(x => x.Date)
            .Select(x => new TransactionDto
            {
                Id = x.Id,
                CapitalValue = x.CapitalValue,
                InterestValue = x.InterestValue,
                LoanId = x.LoanId,
                Delinquency = x.Delinquency
            })
            .FirstOrDefaultAsync();

        var stats = new UserStatsDto
        {
            LastLoan = mapper.Map<LoanDto>(loan),
            LastTransaction = mapper.Map<TransactionDto>(transaction)
        };

        return stats;
    }
}
