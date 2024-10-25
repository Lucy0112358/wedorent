namespace RentaCar.Entity
{
    public class Reservation
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public decimal TotalAmount { get; set; }
        public int OrderStatusId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string StartAddress { get; set; }
        public string EndAddress { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
