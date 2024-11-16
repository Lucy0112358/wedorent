using RentaCar.ApplicationModels;
using RentaCar.Entity;

namespace RentaCar.Usecase
{
    public interface ICarService
    {
        public Car GetCar(int carId);

        public List<CarResult> GetCars(int? categoryId = null);
        public List<Category> GetAllCategories();

        public List<Car> FilterBy(string? model = null, int? wedding = 0, int? driver = 0);
    }
}
