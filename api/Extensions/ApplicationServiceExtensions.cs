using System;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using api.Repositories;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        services.AddOpenApi();

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUsersRepository, UsersRepository>();
        services.AddScoped<ICollateralsRepository, CollateralsRepository>();
        services.AddScoped<ITransactionsRepository, TransactionsRepository>();
        services.AddScoped<ILoansRepository, LoansRepository>();
        services.AddScoped<IAdjustmentNotesRepository, AdjustmentNotesRepository>();
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddScoped<IArmotizationService, ArmotizationService>();

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));

        services.AddCors();

        return services;
    }
}
