using AtletaApi.Models;

namespace AtletaApi.Dtos
{
    public class AtletaDTO
    {
        public AtletaDTO() { }

        public AtletaDTO(Atleta obj)
        {
            Id = obj.Id.ToString();
            Nome = obj.Nome;
            Altura = obj.Altura;
            Peso = obj.Peso;
            TreinadorId = obj.TreinadorId.ToString();
        }

        public string Id { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public double Altura { get; set; }
        public double Peso { get; set; }
        public string TreinadorId { get; set; } = string.Empty;  // Apenas o ID do Treinador

        public Atleta GetModel()
        {
            var obj = new Atleta();
            PreencherModel(obj);
            return obj;
        }

        public void PreencherModel(Atleta obj)
        {
            long.TryParse(this.Id, out long id);
            obj.Id = id;
            obj.Nome = this.Nome;
            obj.Altura = this.Altura;
            obj.Peso = this.Peso;
            long.TryParse(this.TreinadorId, out long treinadorId);
            obj.TreinadorId = treinadorId;  // Atribui apenas o ID do Treinador
        }
    }
}
