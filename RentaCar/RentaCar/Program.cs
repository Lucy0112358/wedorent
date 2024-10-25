using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using RentaCar.Entity;


// https://onedrive.live.com/personal/b64ff452362245e8/_layouts/15/Doc.aspx?sourcedoc=%7B2b31c85b-827d-4834-a490-fff8fac76c75%7D&action=default&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3cvYy9iNjRmZjQ1MjM2MjI0NWU4L0VWdklNU3Q5Z2pSSXBKRF8tUHJIYkhVQjEyTEdqemg1ajJLaEo3d0ZCalY2SGc_ZT15U3dzeXY&slrid=87b65ca1-1067-a000-2020-f94385914318&originalPath=aHR0cHM6Ly8xZHJ2Lm1zL3cvYy9iNjRmZjQ1MjM2MjI0NWU4L0VWdklNU3Q5Z2pSSXBKRF8tUHJIYkhVQjEyTEdqemg1ajJLaEo3d0ZCalY2SGc_cnRpbWU9MWFTeG9GbnozRWc&CID=4286938a-dbdd-4aaf-95db-b0742be5ac7e&_SRM=0:G:54
namespace RentaCar
{
    public class Program
    {
        [Obsolete]
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddFluentValidationAutoValidation();
            builder.Services.AddFluentValidationClientsideAdapters();
            //  builder.Services.AddValidatorsFromAssemblyContaining<MyValidator>();

            // Optionally, customize how validation failures are handled
            builder.Services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    return new BadRequestObjectResult(context.ModelState);
                };
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapReservationEndpoints();

            app.Run();
        }
    }
}
