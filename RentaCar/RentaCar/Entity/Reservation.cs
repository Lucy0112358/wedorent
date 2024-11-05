namespace RentaCar.Entity
{
    public class Reservation
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int CarId { get; set; }
        public decimal TotalAmount { get; set; }
        public int ReservationStatusId { get; set; } = 1;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string StartAddress { get; set; }
        public string EndAddress { get; set; }
        public DateTime CreatedAt { get; set; }= DateTime.UtcNow;
    }

}
