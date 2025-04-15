using System;
using api.DTOs;
using api.DTOs.User;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Interfaces;

public interface IUsersRepository
{
    Task<AppUser> AddUserPhotoAsync(IFormFile file, AppUser user);
    Task<AppUser?> CreateAsync(RegisterDto registerDto);
    Task DeleteUserPhotoAsync(string publicId);
    Task<AppUser?> DeleteAsync(string id);
    Task<AppUser?> GetByIdAsync(string id);
    Task<AppUser?> GetByUsernameAsync(string username);
    Task<IEnumerable<AppUser>> GetAllAsync(UserQuery query);
    Task<IEnumerable<AppUser>> GetUsersInRoleAsync(string role, UserQuery? query);
    Task<AppUser?> UpdateAsync(UpdateUserDto updateUserDto, string id);
    Task<UserStatsDto?> GetUserStatsAsync(string username);

}
