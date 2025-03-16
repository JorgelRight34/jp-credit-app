using System.Text.Json;
using api.DTOs;
using api.Interfaces;
using api.Models;
using Company.ClassLibrary1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace api.Controllers
{
    public class UsersController(IUsersRepository usersRepository, UserManager<AppUser> userManager, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<ActionResult<AppUser>> CreateUser(RegisterDto registerDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            try
            {
                var createdUser = await usersRepository.CreateUser(registerDto);

                if (createdUser == null) return StatusCode(500, "Failed to create user");

                return Ok(new UserDto
                {
                    Username = createdUser.UserName,
                    Email = createdUser.Email,
                });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.Username);
            if (user == null) return Unauthorized();

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);
            if (result)
            {
                var token = await tokenService.CreateToken(user);
                return Ok(new UserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = token
                });
            }

            return Unauthorized();
        }

        [HttpGet("authorize")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public ActionResult GetUsers()
        {
            return Ok("Protected");
        }
    }
}
