using Microsoft.AspNetCore.Mvc;
using RentaCar.Repository;

namespace RentaCar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationRepository _serviceRepository;
        public ReservationController(ReservationRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        /// <summary>
        /// Gets all services.
        /// </summary>
        /// <returns>A list of all services.</returns>
        [HttpGet("GetAllServices")]
        public ActionResult<IEnumerable<Entity.Services>> GetAllServices()
        {
            // Retrieve all services
            var services = _serviceRepository.GetAllServices();

            // Check if any services were found
            if (services == null || !services.Any())
            {
                return NotFound("No services found.");
            }

            // Return the list of services
            return Ok(services);
        }
    }
}
