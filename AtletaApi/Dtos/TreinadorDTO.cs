using AtletaApi.Models;

namespace AtletaApi.Dtos
{
    public class TreinadorDTO
    {
        public TreinadorDTO() { }

        public TreinadorDTO(Treinador obj)
        {
            Id = obj.Id.ToString();
            Nome = obj.Nome;
            Especialidade = obj.Especialidade;
        }

        public string Id { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Especialidade { get; set; } = string.Empty;

        public Treinador GetModel()
        {
            var obj = new Treinador();
            PreencherModel(obj);
            return obj;
        }

        public void PreencherModel(Treinador obj)
        {
            long.TryParse(this.Id, out long id);
            obj.Id = id;
            obj.Nome = this.Nome;
            obj.Especialidade = this.Especialidade;
        }
    }
}
