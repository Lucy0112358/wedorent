using RentaCar.ApplicationModels;

namespace RentaCar.Usecase
{
    public interface ICarService
    {
        public CarResult GetCar(int carId);

        public List<CarResult> GetCars();

        public List<CarResult> FilterBy(string? model = null, int? wedding = 0, int? driver = 0);
    }
}
