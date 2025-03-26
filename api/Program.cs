using api.Data;
using api.Extensions;
using api.Middlewares;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    // Create admin user
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var logger = services.GetRequiredService<ILogger<Program>>();
        var roles = new List<string> { "Client", "LoanOfficer", "Admin" };

        foreach (var role in roles)
        {
            if (roleManager.RoleExistsAsync(role) != null)
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        await Seed.SeedAdmins(userManager, roleManager, logger);
    }
}

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
