using System;
using api.Models;
using Microsoft.AspNetCore.Identity;

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

        if (await userManager.FindByEmailAsync(email) == null)
        {
            var user = new AppUser
            {
                UserName = email,
                Email = email
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
