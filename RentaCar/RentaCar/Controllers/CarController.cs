using Microsoft.AspNetCore.Mvc;
using RentaCar.ApplicationModels.Domain.Configuration;
using RentaCar.Entity;
using RentaCar.Usecase;

namespace RentaCar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private ICarService _carService;
        public CarController(ICarService carService)
        {
            this._carService = carService;
        }

        [HttpGet("Cars")]
        public ActionResult<ApiResult<IEnumerable<Car>>> GetAllCars()
        {
            var cars = _carService.GetCars();

            if (cars == null || !cars.Any())
            {
                return NotFound(ApiResult<IEnumerable<Car>>.ErrorResult("No cars found."));
            }

            return Ok(ApiResult<IEnumerable<Car>>.Success(cars));
        }
    }
}
