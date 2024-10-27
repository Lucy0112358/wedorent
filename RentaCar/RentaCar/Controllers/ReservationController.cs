using Microsoft.AspNetCore.Mvc;
using RentaCar.ApplicationModels.Domain.Configuration;
using RentaCar.DataModels;
using RentaCar.Entity;
using RentaCar.Repository;

namespace RentaCar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationRepository _reservationRepository;
        private readonly ReservationService _reservationService;
        public ReservationController(ReservationRepository serviceRepository, ReservationService reservationService)
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

        public ActionResult<ApiResult<IEnumerable<Car>>> GetCarsForDays(AvailableCarsRequest request)
        {
            var cars = _reservationService.GetCarsForDays(request);
            return Ok(ApiResult<IEnumerable<Car>>.Success(cars));
        }
    }
}
