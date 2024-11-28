using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AtletaApi.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarTreinador : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "TreinadorId",
                table: "Atletas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Treinadores",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Especialidade = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treinadores", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Atletas_TreinadorId",
                table: "Atletas",
                column: "TreinadorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Atletas_Treinadores_TreinadorId",
                table: "Atletas",
                column: "TreinadorId",
                principalTable: "Treinadores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Atletas_Treinadores_TreinadorId",
                table: "Atletas");

            migrationBuilder.DropTable(
                name: "Treinadores");

            migrationBuilder.DropIndex(
                name: "IX_Atletas_TreinadorId",
                table: "Atletas");

            migrationBuilder.DropColumn(
                name: "TreinadorId",
                table: "Atletas");
        }
    }
}
