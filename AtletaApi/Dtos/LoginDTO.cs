using System;

namespace AtletaApi.Dtos;

public class LoginDTO
{
    public string Email { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
}
