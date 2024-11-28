using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AtletaApi.Migrations
{
    /// <inheritdoc />
    public partial class AddAtletaTreinadorRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Atletas_Treinadores_TreinadorId",
                table: "Atletas");

            migrationBuilder.AddForeignKey(
                name: "FK_Atletas_Treinadores_TreinadorId",
                table: "Atletas",
                column: "TreinadorId",
                principalTable: "Treinadores",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Atletas_Treinadores_TreinadorId",
                table: "Atletas");

            migrationBuilder.AddForeignKey(
                name: "FK_Atletas_Treinadores_TreinadorId",
                table: "Atletas",
                column: "TreinadorId",
                principalTable: "Treinadores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
