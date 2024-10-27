using RentaCar.ApplicationModels;
using RentaCar.DataModels;
using RentaCar.Entity;
using RentaCar.Exceptionss;
using RentaCar.Repository;

namespace RentaCar.Usecase.Services
{
    public class ReservationService : IReservationService
    {
        public CarRepository _carRepository;
        public ReservationRepository _reservationRepository;
        public ReservationService(CarRepository carRepository, ReservationRepository reservationRepository)
        {
            this._carRepository = carRepository;
            this._reservationRepository = reservationRepository;
        }

        /// <summary>
        /// Gets all available cars for the mentioned days
        /// </summary>
        public List<Car> GetCarsForDays(AvailableCarsRequest request)
        {
            if (request.StartDate < DateTime.Now)
            {
                throw new BaseException(Enums.ErrorCodeEnum.InvalidDate);
            }

            var cars = _carRepository.Cars();

            var reservedCarIds = _reservationRepository.GetReservationsForDateRange(request.StartDate, request.EndDate)
                                                       .Select(r => r.CarId)
                                                       .ToHashSet();

            return cars.Where(car => !reservedCarIds.Contains(car.Id)).ToList();
        }

        public List<Entity.Services> GetAllServices()
        {
            throw new NotImplementedException();
        }

        public ReservationResult ReserveACar(ReservationRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
