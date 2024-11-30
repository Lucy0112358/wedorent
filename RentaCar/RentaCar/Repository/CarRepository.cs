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

        public List<Car> Cars(int? categoryId = null)
        {
            var sql = @"
        SELECT * 
        FROM Car
        WHERE (@CategoryId IS NULL OR CategoryId = @CategoryId)";

            return Query<Car>(sql, new { CategoryId = categoryId }).ToList();
        }

        public List<Category> GetAllCategories()
        {
            return GetAll<Category>().ToList();
        }

        public List<CarPricing> GetCarPricing()
        {
            return GetAll<CarPricing>().ToList();
        }

        public List<CarPricing> GetCarPricing(int carId)
        {
            // Define the WHERE clause and parameter
            string whereClause = "CarId = @CarId";
            var parameters = new { CarId = carId };

            // Call the base method with filtering
            return GetAll<CarPricing>(whereClause, parameters).ToList();
        }

    }
}
