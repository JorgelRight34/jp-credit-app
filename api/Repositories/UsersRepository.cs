using System;
using api.DTOs;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace api.Repositories;

public class UsersRepository(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager) : IUsersRepository
{
    public async Task<AppUser?> CreateUser(RegisterDto registerDto)
    {
        foreach (var role in registerDto.Roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                throw new Exception($"Role {role} does not exist");
            }
        }

        using (HttpClient client = new HttpClient())
        {
            var response = await client.GetAsync($"https://api.digital.gob.do/citizens/40233314547/validate");
            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var json = JsonConvert.DeserializeObject<JObject>(jsonResponse);
                Console.WriteLine($"JSON-------- {jsonResponse}");
                Console.WriteLine($"JSON-------- {json}");
                Console.WriteLine($"Bool {json?["valid"]?.ToObject<bool>()} {json?["valid"]?.ToObject<bool>() == false}");
                Console.WriteLine(registerDto.DNI);

                if (json?["valid"]?.ToObject<bool>() == false) throw new Exception("Invalid DNI");
            }
        }

        var user = new AppUser
        {
            UserName = registerDto.Username,
            Email = registerDto.Email,
            PhoneNumber = registerDto.PhoneNumber,
            DNI = registerDto.DNI
        };

        var result = await userManager.CreateAsync(user, registerDto.Password!);

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

            return user;
        }

        return null;
    }
}
