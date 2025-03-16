using System;
using api.DTOs;
using api.Models;
using Company.ClassLibrary1;

namespace api.Interfaces;

public interface IUsersRepository
{
    Task<IEnumerable<UserDto>> GetUsersAsync(UserQuery query);
    Task<UserDto?> CreateUserAsync(RegisterDto registerDto);
    Task<UserDto?> UpdateUserAsync(UpdateUserDto updateUserDto, string id);
    Task<UserDto?> DeleteUserAsync(string id);
    Task<UserDto?> GetByUsernameAsync(string username);
}
