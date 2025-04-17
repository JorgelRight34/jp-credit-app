using System;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text.Json.Serialization;
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

        var clientsData = await File.ReadAllTextAsync("Data/clients.json");
        var guarantorsData = await File.ReadAllTextAsync("Data/Guarantors.json");
        var loanOfficersData = await File.ReadAllTextAsync("Data/LoanOfficers.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
        };

        var clients = JsonSerializer.Deserialize<List<AppUser>>(clientsData, options);
        var guarantors = JsonSerializer.Deserialize<List<AppUser>>(guarantorsData, options);
        var loanOfficers = JsonSerializer.Deserialize<List<AppUser>>(loanOfficersData, options);

        if (clients == null || guarantors == null || loanOfficers == null) return;

        var allUsers = new List<List<AppUser>>
        {
            clients,
            guarantors,
            loanOfficers,
        };

        if (await userManager.Users.CountAsync() < 10)
        {
            foreach (var collection in allUsers)
            {
                foreach (var user in collection)
                {
                    var existingUser = await userManager.FindByNameAsync(user.UserName!);
                    if (existingUser == null)
                    {
                        var createResult = await userManager.CreateAsync(user);
                        if (!createResult.Succeeded)
                        {
                            foreach (var error in createResult.Errors)
                            {
                                logger.LogError($"Failed to create user '{user.UserName}': {error.Description}");
                            }
                            continue; // Stop here if user creation failed
                        }

                        existingUser = user; // use the newly created user
                    }

                    Console.WriteLine("-------adding to roles------\n\n\n");
                    var resultC = await userManager.AddToRoleAsync(existingUser, "Client");
                    if (!resultC.Succeeded)
                    {
                        foreach (var error in resultC.Errors)
                        {
                            logger.LogError($"Failed to add user '{existingUser.UserName}' to role 'Client': {error.Description}");
                        }
                    }

                    var resultL = await userManager.AddToRoleAsync(existingUser, "LoanOfficer");
                    if (!resultL.Succeeded)
                    {
                        foreach (var error in resultL.Errors)
                        {
                            logger.LogError($"Failed to add user '{existingUser.UserName}' to role 'Client': {error.Description}");
                        }
                    }

                    var resultG = await userManager.AddToRoleAsync(existingUser, "Guarantor");
                    if (!resultG.Succeeded)
                    {
                        foreach (var error in resultG.Errors)
                        {
                            logger.LogError($"Failed to add user '{existingUser.UserName}' to role 'Client': {error.Description}");
                        }
                    }

                }
            }
        }
    }
}
