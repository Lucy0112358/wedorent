namespace RentaCar.DataModels
{
    public class CheckoutRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CarId { get; set; }
    }
}
