using api.Data;
using api.DTOs;
using api.DTOs.User;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class UsersController(
        IUsersRepository usersRepository,
        UserManager<AppUser> userManager,
        IMapper mapper,
        ITokenService tokenService
    ) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll([FromQuery] UserQuery query)
        {
            var users = await usersRepository.GetAllAsync(query);
            return Ok(users);
        }

        [HttpGet("role/{role}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersInRole(
            [FromRoute] string role, [FromQuery] UserQuery? query
        )
        {
            var users = await usersRepository.GetUsersInRoleAsync(role, query);
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<UserDto>> GetByUsername([FromRoute] string username)
        {
            var user = await usersRepository.GetByUsernameAsync(username);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Create(RegisterDto registerDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var createdUser = await usersRepository.CreateAsync(registerDto);

            if (createdUser == null) return StatusCode(500, "Failed to create user");

            return CreatedAtAction(nameof(GetByUsername), new { username = createdUser.Username }, mapper.Map<UserDto>(createdUser));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppUser?>> UpdateUser([FromBody] UpdateUserDto updateUserDto, [FromRoute] string id)
        {
            var user = await usersRepository.UpdateAsync(updateUserDto, id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser([FromRoute] string id)
        {
            var user = await usersRepository.DeleteAsync(id);
            if (user == null) return NotFound();

            return NoContent();
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
                    User = mapper.Map<UserDto>(user),
                    Token = token
                });
            }

            return Unauthorized();
        }

        // Photos
        [HttpPost("{username}/photo")]
        public async Task<ActionResult<UserDto>> CreatePhoto([FromForm] IFormFile file, [FromRoute] string username)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null) return BadRequest("User can't be found");

            var userWithPhoto = await usersRepository.AddUserPhotoAsync(file, user);

            return CreatedAtAction(nameof(GetByUsername), new { username = userWithPhoto.Username }, userWithPhoto);
        }

        [HttpDelete("{username}/photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto([FromRoute] string username, [FromRoute] string photoId)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null) return BadRequest("User doesn't exist");

            await usersRepository.DeleteUserPhotoAsync(photoId);

            return NoContent();
        }
    }
}
