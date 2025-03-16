using api.DTOs;
using api.DTOs.User;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class UsersController(
        IUsersRepository usersRepository,
        UserManager<AppUser> userManager,
        ITokenService tokenService
    ) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> CreateUser(RegisterDto registerDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            try
            {
                var createdUser = await usersRepository.CreateUserAsync(registerDto);

                if (createdUser == null) return StatusCode(500, "Failed to create user");

                return Ok(createdUser);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.Username);
            if (user == null) return Unauthorized();

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);
            if (result)
            {
                var token = await tokenService.CreateToken(user);
                return Ok(new
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = token
                });
            }

            return Unauthorized();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers([FromQuery] UserQuery query)
        {
            var users = await usersRepository.GetUsersAsync(query);
            return Ok(users);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppUser?>> UpdateUser([FromBody] UpdateUserDto updateUserDto, [FromRoute] string id)
        {
            var user = await usersRepository.UpdateUserAsync(updateUserDto, id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser([FromRoute] string id)
        {
            var user = await usersRepository.DeleteUserAsync(id);
            if (user == null) return NotFound();

            return NoContent();
        }
    }
}
