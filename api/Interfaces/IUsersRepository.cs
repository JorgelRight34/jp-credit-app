using System;
using api.DTOs;
using api.DTOs.User;
using api.Models;

namespace api.Interfaces;

public interface IUsersRepository
{
    Task<PhotoDto> AddUserPhotoAsync(IFormFile file, AppUser user);
    Task<UserDto?> CreateUserAsync(RegisterDto registerDto);
    Task<UserDto?> DeleteUserAsync(string id);
    Task<UserDto?> GetByUsernameAsync(string username);
    Task<IEnumerable<UserDto>> GetUsersAsync(UserQuery query);
    Task<IEnumerable<UserDto>> GetUsersInRoleAsync(string role, string? query);
    Task<UserDto?> UpdateUserAsync(UpdateUserDto updateUserDto, string id);

}
