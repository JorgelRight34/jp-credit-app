using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedLoanModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Loans_Collaterals_CollateralId",
                table: "Loans");

            migrationBuilder.DropIndex(
                name: "IX_Loans_CollateralId",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "CollateralId",
                table: "Loans");

            migrationBuilder.AddColumn<int>(
                name: "LoanId",
                table: "Collaterals",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Collaterals_LoanId",
                table: "Collaterals",
                column: "LoanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Collaterals_Loans_LoanId",
                table: "Collaterals",
                column: "LoanId",
                principalTable: "Loans",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collaterals_Loans_LoanId",
                table: "Collaterals");

            migrationBuilder.DropIndex(
                name: "IX_Collaterals_LoanId",
                table: "Collaterals");

            migrationBuilder.DropColumn(
                name: "LoanId",
                table: "Collaterals");

            migrationBuilder.AddColumn<int>(
                name: "CollateralId",
                table: "Loans",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Loans_CollateralId",
                table: "Loans",
                column: "CollateralId");

            migrationBuilder.AddForeignKey(
                name: "FK_Loans_Collaterals_CollateralId",
                table: "Loans",
                column: "CollateralId",
                principalTable: "Collaterals",
                principalColumn: "Id");
        }
    }
}
