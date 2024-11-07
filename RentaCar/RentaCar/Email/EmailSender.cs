
using System.Net;
using System.Net.Mail;

namespace RentaCar.Email
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            var mail = "lusinehsahakian@gmail.com";
            var pw = "xxva opfv oofx moue";

            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(mail, pw)
            };

            return client.SendMailAsync(new MailMessage(from: mail,
                to: email, subject, message));
        }
    }
}
