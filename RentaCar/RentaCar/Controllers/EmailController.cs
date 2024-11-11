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

            await _emailService.SendEmailAsync(receiver, emailRequest.Name, emailRequest.Phone);

        }

       
    }


}
