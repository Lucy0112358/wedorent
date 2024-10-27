using Microsoft.AspNetCore.Mvc;
using RentaCar.ApplicationModels.Domain.Configuration;
using RentaCar.DataModels;
using RentaCar.Entity;
using RentaCar.Enums;
using RentaCar.Exceptionss;
using RentaCar.Repository;
using RentaCar.Usecase;

namespace RentaCar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationRepository _reservationRepository;
        private readonly IReservationService _reservationService;
        public ReservationController(ReservationRepository serviceRepository, IReservationService reservationService)
        {
            _reservationRepository = serviceRepository;
            _reservationService = reservationService;
        }

        /// <summary>
        /// Gets all services.
        /// </summary>
        /// <returns>A list of all services.</returns>
        [HttpGet("GetAllServices")]
        public ActionResult<ApiResult<IEnumerable<Entity.Services>>> GetAllServices()
        {
            var services = _reservationRepository.GetAllServices();

            if (services == null || !services.Any())
            {
                return NotFound(ApiResult<IEnumerable<Entity.Services>>.ErrorResult("No services found."));
            }

            return Ok(ApiResult<IEnumerable<Entity.Services>>.Success(services));
        }

        [HttpGet("GetCarsForDays")]
        public ActionResult<ApiResult<List<Car>>> GetCarsForDays(AvailableCarsRequest request)
        {
            var cars = _reservationService.GetCarsForDays(request);
            return Ok(ApiResult<List<Car>>.Success(cars));
        }

        [HttpPost("addReservation")]
        public ActionResult<ApiResult<bool>> ReserveACar([FromBody] ReservationRequest request)
        {
            try
            {
                var result = _reservationService.ReserveACar(request);

                if (result)
                {
                    return Ok(ApiResult<bool>.Success(true));
                }

                return BadRequest(ApiResult<bool>.ErrorResult(ErrorCodeEnum.GenericErrorRetry, "Failed to reserve the car."));
            }
            catch (BaseException ex)
            {
                return BadRequest(ApiResult<bool>.ErrorResult(ex.errorCodeEnum));
            }
            catch (Exception)
            {
                return StatusCode(500, ApiResult<bool>.ErrorResult(ErrorCodeEnum.GenericErrorRetry, "An unexpected error occurred."));
            }
        }
    }
}
