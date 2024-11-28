using AtletaApi.Models;

public class UnidadeDTO
{
    public UnidadeDTO() { }

    public UnidadeDTO(Unidade obj)
    {
        Id = obj.Id.ToString();
        Nome = obj.Nome;
        Endereco = obj.Endereco;
    }

    public string Id { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Endereco { get; set; } = string.Empty; // Certifique-se de preencher este campo

    public Unidade GetModel()
    {
        var obj = new Unidade();
        PreencherModel(obj);
        return obj;
    }

    public void PreencherModel(Unidade obj)
    {
        long.TryParse(this.Id, out long id);
        obj.Id = id;
        obj.Nome = this.Nome;
        obj.Endereco = this.Endereco; // Preenchendo o Endereço corretamente
    }
}
