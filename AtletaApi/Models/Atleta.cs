using System;

namespace AtletaApi.Models;

public class Atleta
{
    public long Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public double Altura { get; set; }
    public double Peso { get; set; }
    public long? TreinadorId { get; set; } 
}
