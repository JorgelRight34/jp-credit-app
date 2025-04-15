using System;
using api.Enums;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class Seed
{
    public static async Task SeedAdmins(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, ILogger logger)
    {
        var role = "Admin";
        var email = "jorgelright34rd30012003@gmail.com";

        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }

        if (await userManager.Users.FirstOrDefaultAsync(x => x.Email == email) == null)
        {
            var user = new AppUser
            {
                UserName = "Jorge",
                FirstName = "John",
                Email = email,
                LastName = "Doe",
                Gender = 'M',
                DateOfBirth = new DateOnly(1985, 7, 15),
                MaritalStatus = MaritalStatus.Single,
                DNI = "1234567890",
                Address = "123 Admin Street, City, Country",
                Landline = "555-1234",
                OfficePhone = "555-5678"
            };

            var result = await userManager.CreateAsync(user, "#Juan3:16Porquedetalmaneraamodiosalmundoque");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, role);
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    logger.LogError(error.Description);
                }
            }
        }
    }
}
