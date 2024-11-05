namespace RentaCar.ApplicationModels
{

    public class ReservationResult
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string StartAddress { get; set; }
        public string EndAddress { get; set; }
        public List<int> Services { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string DrivingLicence { get; set; }
        public decimal TotalAmount { get; set; }
        public int CarId { get; set; }
        public int ReservationStatusId { get; set; } // Track reservation status
    }


}
