namespace RentaCar.Entity
{
    public class Car
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }
        public int Year { get; set; }
        public string Engine { get; set; }
        public int? Doors { get; set; }    // Nullable if the number of doors can be unknown
        public int? Seats { get; set; }
        public string Color { get; set; }
        public decimal? WeddingPrice { get; set; }  // Nullable for optional fields
        public bool Transfer { get; set; }
        public bool WithDriver { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
