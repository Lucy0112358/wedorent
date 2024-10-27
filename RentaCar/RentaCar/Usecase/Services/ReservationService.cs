using RentaCar.ApplicationModels;
using RentaCar.DataModels;
using RentaCar.Entity;
using RentaCar.Exceptionss;
using RentaCar.Repository;
using System.Transactions;

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

        public bool ReserveACar(ReservationRequest request)
        {
            using (var transactionScope = new TransactionScope())
            {
                var customer = new Customer
                {
                    Name = request.Name,
                    Surname = request.Surname,
                    Email = request.Email,
                    Phone = request.Phone,

                };

                customer = _reservationRepository.AddCustomer(customer);

                var reservation = new Reservation
                {
                    CustomerId = customer.Id,
                    //  TotalAmount = CalculateTotalAmount(request.Services),
                    //  ReservationStatusId = GetDefaultReservationStatusId(), // Define this method to get the default status
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    StartAddress = request.StartAddress,
                    EndAddress = request.EndAddress,
                    CarId = request.CarId 
                };

                reservation = _reservationRepository.AddReservation(reservation);

                return true;
            }
        }
    }
}
