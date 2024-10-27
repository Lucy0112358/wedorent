using RentaCar.ApplicationModels;
using RentaCar.Entity;

namespace RentaCar.Usecase
{
    public interface ICarService
    {
        public Car GetCar(int carId);

        public List<Car> GetCars();

        public List<CarResult> FilterBy(string? model = null, int? wedding = 0, int? driver = 0);
    }
}
