namespace RentaCar.Entity
{
    public class Car
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }
        public int Year { get; set; }
        public string Engine { get; set; }
        public int? Doors { get; set; } 
        public int? Seats { get; set; }
        public string Color { get; set; }
        public decimal? WeddingPrice { get; set; } 
        public bool Transfer { get; set; }
        public bool WithDriver { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
