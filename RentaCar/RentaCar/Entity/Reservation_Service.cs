namespace RentaCar.Entity
{
    public class Reservation_Service
    {
        public int Id { get; set; }
        public int ReservationId { get; set; }
        public int ServiceId { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
