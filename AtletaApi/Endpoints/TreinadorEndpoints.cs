using AtletaApi.Dtos;
using AtletaApi.Models;
using AtletaApi.Infra;
using Microsoft.EntityFrameworkCore;

namespace AtletaApi.Endpoints
{
    public static class TreinadorEndpoints
    {
        public static void AdicionarTreinadorEndpoints(this WebApplication app)
        {
            var grupo = app.MapGroup("/treinadores"); //.RequireAuthorization();

            grupo.MapGet("/", GetAsync);
            grupo.MapGet("/{id}", GetByIdAsync);
            grupo.MapPost("", PostAsync);
            grupo.MapPut("/{id}", PutAsync);
            grupo.MapDelete("/{id}", DeleteAsync);
        }

        private static async Task<IResult> GetAsync(AtletaContext db)
        {
            var objetos = await db.Treinadores.Include(t => t.Atletas).OrderBy(t => t.Nome).ToListAsync();
            return TypedResults.Ok(objetos.Select(t => new TreinadorDTO(t)));
        }

        private static async Task<IResult> GetByIdAsync(string id, AtletaContext db)
        {
            var obj = await db.Treinadores.Include(t => t.Atletas).FirstOrDefaultAsync(t => t.Id == Convert.ToInt64(id));

            if (obj == null)
                return TypedResults.NotFound();

            return TypedResults.Ok(new TreinadorDTO(obj));
        }

        private static async Task<IResult> PostAsync(TreinadorDTO dto, AtletaContext db)
        {
            Treinador obj = dto.GetModel();
            await db.Treinadores.AddAsync(obj);
            await db.SaveChangesAsync();

            return TypedResults.Created($"treinadores/{obj.Id}", new TreinadorDTO(obj));
        }

        private static async Task<IResult> PutAsync(string id, TreinadorDTO dto, AtletaContext db)
        {
            if (id != dto.Id)
                return TypedResults.BadRequest();

            var obj = await db.Treinadores.FindAsync(Convert.ToInt64(id));

            if (obj == null)
                return TypedResults.NotFound();

            dto.PreencherModel(obj);
            db.Treinadores.Update(obj);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }

        private static async Task<IResult> DeleteAsync(string id, AtletaContext db)
        {
            var obj = await db.Treinadores.FindAsync(Convert.ToInt64(id));

            if (obj == null)
                return TypedResults.NotFound();

            db.Treinadores.Remove(obj);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }
    }
}

