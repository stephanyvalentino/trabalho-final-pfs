using System;
using AtletaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AtletaApi.Infra;

public class AtletaContext : DbContext
{
    public DbSet<Atleta> Atletas { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Treinador> Treinadores { get; set; }

    public AtletaContext()
    {
        caminho = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "atleta.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={caminho}");
    }

    private readonly string caminho;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Atleta>()
                .HasOne<Treinador>() 
                .WithMany(t => t.Atletas)  
                .HasForeignKey(a => a.TreinadorId) 
                .OnDelete(DeleteBehavior.SetNull); 
        }
}
