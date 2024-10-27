using RentaCar.ApplicationModels;
using RentaCar.DataModels;
using RentaCar.Entity;

//https://rentcar1.am/
namespace RentaCar.Usecase
{
    public interface IReservationService
    {
        // Don't forget to check the car availability here by carId and dates
        public bool ReserveACar(ReservationRequest request);

        public List<Car> GetCarsForDays(AvailableCarsRequest request);

        public List<Entity.Services> GetAllServices();

    }
}
