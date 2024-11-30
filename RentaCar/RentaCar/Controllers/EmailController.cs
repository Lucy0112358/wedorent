using Microsoft.AspNetCore.Mvc;
using RentaCar.DataModels;
using RentaCar.Email;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RentaCar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        public readonly IEmailSender _emailService;

        public EmailController(IEmailSender emailService)
        {
            this._emailService = emailService;
        }

        // POST api/<EmailController>
        [HttpPost]
        public async void Post([FromBody] EmailRequest emailRequest)
        {
            var receiver = "lusinehsahakian@gmail.com";

            if (emailRequest == null) BadRequest("Invalid email request.");

            string message = emailRequest.Name == null && emailRequest.Phone == null
                ? $"Email: {emailRequest.Email}"
                : $"Email: {emailRequest.Email}\nName: {emailRequest.Name ?? "Name not provided"}\nPhone: {emailRequest.Phone ?? "Phone not provided"}";

            await _emailService.SendEmailAsync(receiver, "Client from WeDoRentaCar", message);

        }

       
    }


}
