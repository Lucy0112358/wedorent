using Npgsql;
using RentaCar.ApplicationModels.MappingProfiles;
using RentaCar.Configuration;
using RentaCar.Email;
using RentaCar.Entity;
using RentaCar.Repository;
using RentaCar.Usecase;
using RentaCar.Usecase.Services;
using System.Data;

namespace MqttService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure settings
            builder.Configuration.AddJsonFile("appsettings.json");

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Register repositories and services
            builder.Services.AddScoped<BaseRepository>();
            builder.Services.AddScoped<ReservationRepository>();
            builder.Services.AddScoped<CarRepository>();
            builder.Services.AddScoped<ISanitizer, Sanitizer>();
            builder.Services.AddScoped<ICarService, CarService>();
            builder.Services.AddScoped<IReservationService, ReservationService>();
            builder.Services.AddTransient<IEmailSender, EmailSender>();

            builder.Services.AddAutoMapper(typeof(CarProfile).Assembly);
<<<<<<< HEAD
            builder.Services.AddAutoMapper(typeof(ReservationProfile).Assembly);

=======
>>>>>>> 6977c71eb6aabed611355f7275508f0c383a6d42
            // Register PostgreSQL connection
            builder.Services.AddTransient<IDbConnection>(sp =>
            {
                var configuration = sp.GetRequiredService<IConfiguration>();
                var connectionString = configuration.GetConnectionString("PostgreSqlConnection");
                return new NpgsqlConnection(connectionString);
            });

            builder.Services.AddScoped<NpgsqlConnection>(provider =>
            {
                var configuration = provider.GetRequiredService<IConfiguration>();
                var connectionString = configuration.GetConnectionString("PostgreSqlConnection");
                return new NpgsqlConnection(connectionString);
            });



            var app = builder.Build();
            app.UseCors(options =>
                options.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
