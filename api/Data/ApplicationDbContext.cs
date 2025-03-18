using System;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class ApplicationDbContext : IdentityDbContext<AppUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Loan> Loans { get; set; }
    public DbSet<Collateral> Collaterals { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<AdjustmentNote> AdjustmentNotes { get; set; }
    public DbSet<Photo> Photos { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUser>()
            .HasIndex(x => x.DNI)
            .IsUnique();

        var roles = new List<IdentityRole>
        {
            new IdentityRole { Id = "Admin", Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Id = "User", Name = "User", NormalizedName = "USER" },
            new IdentityRole { Id = "LoanOfficer", Name = "LoanOfficer", NormalizedName = "LOANOFFICER" },
            new IdentityRole { Id = "Guarantor", Name = "Guarantor", NormalizedName = "Guarantor" }
        };

        builder.Entity<IdentityRole>().HasData(roles);
    }
}
