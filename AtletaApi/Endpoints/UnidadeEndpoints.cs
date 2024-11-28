using System;
using AtletaApi.Dtos;
using AtletaApi.Infra;
using AtletaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AtletaApi.Endpoints
{
    public static class UnidadeEndpoints
    {
        public static void AdicionarUnidadeEndpoints(this WebApplication app)
        {
            var grupo = app.MapGroup("/unidades"); 

            grupo.MapGet("/", GetAsync);
            grupo.MapGet("/{id}", GetByIdAsync);
            grupo.MapPost("", PostAsync);
            grupo.MapPut("/{id}", PutAsync);
            grupo.MapDelete("/{id}", DeleteAsync);
        }

        private static async Task<IResult> GetAsync(AtletaContext db)
        {
            var objetos = await db.Unidades.OrderBy(x => x.Nome).ToListAsync();
            return TypedResults.Ok(objetos.Select(x => new UnidadeDTO(x)));
        }

        private static async Task<IResult> GetByIdAsync(string id, AtletaContext db)
        {
            var obj = await db.Unidades.FindAsync(Convert.ToInt64(id));

            if (obj == null)
                return TypedResults.NotFound();

            return TypedResults.Ok(new UnidadeDTO(obj));
        }

        private static async Task<IResult> PostAsync(UnidadeDTO dto, AtletaContext db)
        {
            if (string.IsNullOrWhiteSpace(dto.Endereco))
                return TypedResults.BadRequest("O campo Endereco é obrigatório.");

            Unidade obj = dto.GetModel();
            obj.Id = GeradorId.GetId();

            await db.Unidades.AddAsync(obj);
            await db.SaveChangesAsync();

            return TypedResults.Created($"unidades/{obj.Id}", new UnidadeDTO(obj));
        }

        private static async Task<IResult> PutAsync(string id, UnidadeDTO dto, AtletaContext db)
        {
            if (id != dto.Id)
                return TypedResults.BadRequest("O ID fornecido não corresponde ao ID da unidade.");

            var obj = await db.Unidades.FindAsync(Convert.ToInt64(id));

            if (obj == null)
                return TypedResults.NotFound();

            if (string.IsNullOrWhiteSpace(dto.Endereco))
                return TypedResults.BadRequest("O campo Endereco é obrigatório.");

            dto.PreencherModel(obj);

            db.Unidades.Update(obj);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }

        private static async Task<IResult> DeleteAsync(string id, AtletaContext db)
        {
            var obj = await db.Unidades.FindAsync(Convert.ToInt64(id));

            if (obj == null)
                return TypedResults.NotFound();

            db.Unidades.Remove(obj);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }
    }
}
