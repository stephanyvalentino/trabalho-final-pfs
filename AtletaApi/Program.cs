using System.Security.Claims;
using System.Text;
using AtletaApi;
using AtletaApi.Endpoints;
using AtletaApi.Infra;
using AtletaApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using UsuarioApi.Endpoints;

var root = AppDomain.CurrentDomain.BaseDirectory;
var dotenv = Path.Combine(root, ".env");
DotEnv.Carregar(dotenv);

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AtletaContext>();

builder.Services.AddCors();

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    //x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Config.Instancia.ChavePrivada ?? "")),
        ValidateIssuer = false,
        ValidateAudience = false
    };

    x.Events = new JwtBearerEvents
    {
        OnMessageReceived = ctx =>
        {
            ctx.Request.Cookies.TryGetValue("accessToken", out var accessToken);
            if (!string.IsNullOrEmpty(accessToken))
                ctx.Token = accessToken;
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Admin", policy => policy.RequireRole("admin"))
    .AddPolicy("Comum", policy => policy.RequireRole("comum"))
    .AddPolicy("AdminOuComum", policy => policy.RequireClaim(ClaimTypes.Role, "admin", "comum"));

builder.Services.AddSingleton<IPasswordHasher<Usuario>, PasswordHasher<Usuario>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.AdicionarAtletaEnpoints();
app.AdicionarUsuarioEnpoints();
app.AdicionarLoginEnpoints();
app.AdicionarTreinadorEndpoints();
app.AdicionarUnidadeEndpoints();

app.UseCors(builder => builder
    //.AllowAnyOrigin()
    .WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
);

app.UseAuthentication();
app.UseAuthorization();

app.Run();
