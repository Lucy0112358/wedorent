using Microsoft.AspNetCore.Mvc;
using RentaCar.ApplicationModels.Domain.Configuration;
using RentaCar.Entity;
using RentaCar.Enums;
using RentaCar.Exceptionss;
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
        public ActionResult<ApiResult<IEnumerable<Car>>> GetAllCars([FromQuery] int? categoryId)
        {
            var cars = _carService.GetCars(categoryId);

            if (cars == null || !cars.Any())
            {
                return NotFound(ApiResult<IEnumerable<Car>>.ErrorResult("No cars found."));
            }

            return Ok(ApiResult<IEnumerable<Car>>.Success(cars));
        }

        [HttpGet("Categories")]
        public ActionResult<ApiResult<IEnumerable<Category>>> GetAllCategories()
        {
            var categories = _carService.GetAllCategories();  // Call service method

            if (categories == null || !categories.Any())
            {
                return NotFound(ApiResult<IEnumerable<Category>>.ErrorResult("No categories found."));
            }

            return Ok(ApiResult<IEnumerable<Category>>.Success(categories));
        }

        /// <summary>
        /// Gets a car by its ID.
        /// </summary>
        /// <param name="carId">The ID of the car to retrieve.</param>
        /// <returns>An ApiResult containing the car information.</returns>
        [HttpGet("{carId}")]
        public ActionResult<ApiResult<Car>> GetCar(int carId)
        {
            try
            {
                var car = _carService.GetCar(carId);
                if (car == null)
                {
                    return NotFound(ApiResult<Car>.ErrorResult("Car not found."));
                }

                return Ok(ApiResult<Car>.Success(car));
            }
            catch (BaseException ex)
            {
                return BadRequest(ApiResult<Car>.ErrorResult(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResult<Car>.ErrorResult(ErrorCodeEnum.GenericErrorRetry, ex.Message));
            }
        }
    }
}
