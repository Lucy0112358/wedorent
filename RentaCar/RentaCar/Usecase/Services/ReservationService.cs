using AutoMapper;
using RentaCar.ApplicationModels;
using RentaCar.DataModels;
using RentaCar.Email;
using RentaCar.Entity;
using RentaCar.Enums;
using RentaCar.Exceptionss;
using RentaCar.Repository;

namespace RentaCar.Usecase.Services
{
    public class ReservationService : IReservationService
    {
        public CarRepository _carRepository;
        public ReservationRepository _reservationRepository;
        private readonly IMapper _mapper;
        public readonly IEmailSender _emailService;


        public ReservationService(CarRepository carRepository, ReservationRepository reservationRepository, IMapper mapper, IEmailSender emailService)
        {
            this._carRepository = carRepository;
            this._reservationRepository = reservationRepository;
            this._mapper = mapper;
            this._emailService = emailService;
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


        public List<ReservationResult> GetBookingTableInfo()
        {
            var reservations = _reservationRepository.GetAllReservations();
            var customers = _reservationRepository.GetAllCustomers();
            var cars = _carRepository.Cars();

            var customerDictionary = customers.ToDictionary(c => c.Id);
            var carDictionary = cars.ToDictionary(car => car.Id, car => car.Model);

            // Map reservations and enrich with customer data
            var results = reservations.Select(reservation =>
            {
                var result = _mapper.Map<ReservationResult>(reservation);

                if (customerDictionary.TryGetValue(reservation.CustomerId, out var customer))
                {
                    _mapper.Map(customer, result);
                }

                if (carDictionary.TryGetValue(reservation.CarId, out var carModel))
                {
                    result.CarModel = carModel;
                    result.CarBrand = carModel;

                }

                return result;
            }).ToList();

            return results;

        }

        public List<Entity.Services> GetAllServices()
        {
            throw new NotImplementedException();
        }

        public bool ReserveACar(ReservationRequest request)
        {

            var customer = new Customer
            {
                Name = request.FirstName,
                Surname = request.LastName,
                Email = request.Email,
                Phone = request.Phone,
                LicenceNumber = request.DrivingLicence
            };

            customer = _reservationRepository.AddCustomer(customer);

            var reservation = new Reservation
            {
                CustomerId = customer.Id,
                //TotalAmount = CalculateTotalAmount(request.Services),
                ReservationStatusId = (int)ReservationStatusEnum.Upcoming,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                StartAddress = request.StartAddress,
                EndAddress = request.EndAddress,
                CarId = request.CarId
            };

            reservation = _reservationRepository.AddReservation(reservation);


            if (reservation.Id > 0)
            {
                var message = $"Dear {customer.Name}, your booking is successfully completed. We will be gladly waiting for you on {reservation.StartDate} at {reservation.StartAddress}";
                _emailService.SendEmailAsync(customer.Email, "Car booking confirmation", message);
            }

            return true;

        }


    }
}
