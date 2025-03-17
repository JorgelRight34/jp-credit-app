using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ImprovedLoanAndUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Loans_AspNetUsers_AppUserId",
                table: "Loans");

            migrationBuilder.DropForeignKey(
                name: "FK_Loans_LoanOfficers_LoanOfficerId",
                table: "Loans");

            migrationBuilder.DropTable(
                name: "LoanOfficers");

            migrationBuilder.RenameColumn(
                name: "TermMonths",
                table: "Loans",
                newName: "PaymentValue");

            migrationBuilder.RenameColumn(
                name: "InterestRate",
                table: "Loans",
                newName: "DisbursedAmount");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Loans",
                newName: "DeliveryDate");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Loans",
                newName: "ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_Loans_AppUserId",
                table: "Loans",
                newName: "IX_Loans_ClientId");

            migrationBuilder.AlterColumn<string>(
                name: "LoanOfficerId",
                table: "Loans",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "AnnualInterestRate",
                table: "Loans",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Loans",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfPayments",
                table: "Loans",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentFrecuency",
                table: "Loans",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "Guarantor", null, "Guarantor", "Guarantor" },
                    { "LoanOfficer", null, "LoanOfficer", "LOANOFFICER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Loans_AspNetUsers_ClientId",
                table: "Loans",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Loans_AspNetUsers_LoanOfficerId",
                table: "Loans",
                column: "LoanOfficerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Loans_AspNetUsers_ClientId",
                table: "Loans");

            migrationBuilder.DropForeignKey(
                name: "FK_Loans_AspNetUsers_LoanOfficerId",
                table: "Loans");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "Guarantor");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "LoanOfficer");

            migrationBuilder.DropColumn(
                name: "AnnualInterestRate",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "NumberOfPayments",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "PaymentFrecuency",
                table: "Loans");

            migrationBuilder.RenameColumn(
                name: "PaymentValue",
                table: "Loans",
                newName: "TermMonths");

            migrationBuilder.RenameColumn(
                name: "DisbursedAmount",
                table: "Loans",
                newName: "InterestRate");

            migrationBuilder.RenameColumn(
                name: "DeliveryDate",
                table: "Loans",
                newName: "EndDate");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "Loans",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Loans_ClientId",
                table: "Loans",
                newName: "IX_Loans_AppUserId");

            migrationBuilder.AlterColumn<int>(
                name: "LoanOfficerId",
                table: "Loans",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "LoanOfficers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Neighborhood = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanOfficers", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Loans_AspNetUsers_AppUserId",
                table: "Loans",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Loans_LoanOfficers_LoanOfficerId",
                table: "Loans",
                column: "LoanOfficerId",
                principalTable: "LoanOfficers",
                principalColumn: "Id");
        }
    }
}
