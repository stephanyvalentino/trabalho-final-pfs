using System;

namespace AtletaApi.Models;

public class Treinador
{
    public long Id { get; set; } 
        public string Nome { get; set; } = string.Empty; 
        public string Especialidade { get; set; } = string.Empty; 

        public List<Atleta> Atletas { get; set; } = new List<Atleta>();
}
