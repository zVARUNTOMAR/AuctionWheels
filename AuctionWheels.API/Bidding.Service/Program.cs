using Bidding.Service.Consumers;
using Bidding.Service.Helpers;
using Bidding.Service.Services;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using MongoDB.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(BiddingProfile));
builder.Services.AddSwaggerGen();

builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false)); ;

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
        {
            host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
            host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
        });
        cfg.ConfigureEndpoints(context);
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
        options.TokenValidationParameters.ValidIssuers = new string[] { "http://identity-svc", "http://localhost:5000" };
        options.TokenValidationParameters.ValidateIssuerSigningKey = false;
        options.TokenValidationParameters.SignatureValidator = delegate (string token, TokenValidationParameters parameters)
        {
            var jwt = new Microsoft.IdentityModel.JsonWebTokens.JsonWebToken(token);

            return jwt;
        };
    });

builder.Services.AddHostedService<CheckAuctionFinished>();
builder.Services.AddScoped<GrpcAuctionClient>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

await DB.InitAsync("BidDb", MongoClientSettings.FromConnectionString(builder.Configuration.GetConnectionString("BidDbConnectionString")));

app.UseHttpsRedirection();

app.Run();