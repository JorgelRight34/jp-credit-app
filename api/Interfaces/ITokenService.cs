using System;
using api.Models;

namespace api.Interfaces;

public interface ITokenService
{
    Task<string> CreateToken(AppUser user);
}
