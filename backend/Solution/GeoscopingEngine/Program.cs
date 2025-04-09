using GeoscopingEngine.Src;
using GeoscopingEngine.Src.Events;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register application services. Singleton (Shared), Scoped (Per request), Transient (New instance each time).
builder.Services.AddHttpClient();
//builder.Services.AddSingleton<EventRepository>();
//builder.Services.AddScoped<EventFactory>();
//builder.Services.AddTransient<APIController>();

// Add CORS policy for Next.js frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJsApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Next.js development URL // TODO: Change to production URL
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowNextJsApp");

app.UseAuthorization();

app.MapControllers();

app.Run();