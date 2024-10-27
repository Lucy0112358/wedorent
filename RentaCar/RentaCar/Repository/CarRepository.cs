using Npgsql;
using RentaCar.Configuration;
using RentaCar.Entity;

namespace RentaCar.Repository
{
    public class CarRepository : BaseRepository
    {
        public CarRepository(NpgsqlConnection dbConnection, ISanitizer sanitizer) : base(dbConnection, sanitizer)
        {
        }
        public Car GetCarById(int carId)
        {
            return GetSingle<Car>(carId);
        }

        public bool IsCarAvailable(int carId, DateTime startDate, DateTime endDate)
        {
            var sql = @"
        SELECT COUNT(1) 
        FROM Reservation
        WHERE CarId = @CarId
          AND StartDate < @EndDate
          AND EndDate > @StartDate";

            int reservationCount = QuerySingle<int>(sql, new { CarId = carId, StartDate = startDate, EndDate = endDate });
            return reservationCount == 0;
        }
        public Car AddCar(Car car)
        {
            return Insert(car);
        }

        public List<Car> Cars()
        {
            return GetAll<Car>().ToList();
        }
    }
}
