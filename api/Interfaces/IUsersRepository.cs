using System;
using api.DTOs;
using api.Models;

namespace api.Interfaces;

public interface IUsersRepository
{
    Task<AppUser?> CreateUser(RegisterDto registerDto);
}
