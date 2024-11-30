namespace RentaCar.DataModels
{
    public class EmailRequest
    {
        public string Email { get; set; }
        public string? Name { get; set; } = null;
        public string? Phone { get; set; } = null;
    }
}
