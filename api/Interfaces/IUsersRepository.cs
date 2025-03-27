using System;
using api.DTOs;
using api.DTOs.User;
using api.Models;

namespace api.Interfaces;

public interface IUsersRepository
{
    Task<UserDto> AddUserPhotoAsync(IFormFile file, AppUser user);
    Task<UserDto?> CreateAsync(RegisterDto registerDto);
    Task DeleteUserPhotoAsync(string publicId);
    Task<UserDto?> DeleteAsync(string id);
    Task<UserDto?> GetByIdAsync(string id);
    Task<UserDto?> GetByUsernameAsync(string username);
    Task<IEnumerable<UserDto>> GetAllAsync(UserQuery query);
    Task<IEnumerable<UserDto>> GetUsersInRoleAsync(string role, UserQuery? query);
    Task<UserDto?> UpdateAsync(UpdateUserDto updateUserDto, string id);
    Task<UserStatsDto?> GetUserStatsAsync(string username);

}
