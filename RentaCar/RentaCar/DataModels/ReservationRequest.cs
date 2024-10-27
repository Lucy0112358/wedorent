namespace RentaCar.DataModels
{
    public class ReservationRequest
    {
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
    }
}
