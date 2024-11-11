namespace RentaCar.Entity
{
    public class CarPricing
    {
        public int Id { get; set; }
        public int MinDays { get; set; }
        public int MaxDays { get; set; }
        public int Price { get; set; }
        public int CarId { get; set; }
        public string CreatedAt { get; set; }

    }
}
