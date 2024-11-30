namespace RentaCar.Entity
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string LicenceNumber { get; set; }        
        public string Phone { get; set; }
        public DateTime? BirthDay { get; set; } = DateTime.Now; // Nullable for optional fields
        public byte[] FrontPage { get; set; } = [011];  // Assuming byte array for image/document storage
        public byte[] BackPage { get; set; } = [011];
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
