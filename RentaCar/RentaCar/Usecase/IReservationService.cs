using RentaCar.ApplicationModels;
using RentaCar.DataModels;
using RentaCar.Entity;

//https://rentcar1.am/
namespace RentaCar.Usecase
{
    public interface IReservationService
    {
        // Don't forget to check the caar availability here by carId and dates
        public ReservationResult ReserveACar(ReservationRequest request);

        public List<CarResult> AvailableCarsForMentionedDays(CheckoutRequest request);

        public List<Service> GetAllServices();

    }
}
