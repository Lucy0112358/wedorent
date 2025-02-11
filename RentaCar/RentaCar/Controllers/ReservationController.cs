﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RentaCar.ApplicationModels;
using RentaCar.ApplicationModels.Domain.Configuration;
using RentaCar.DataModels;
using RentaCar.Entity;
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
        public class ReservationRequestWithPhotos
        {
            public IFormFile? FrontPhoto { get; set; }
            public IFormFile? BackPhoto { get; set; }
            public string? AllInfo { get; set; }
        }

        /// <summary>
        /// Retrieves reservation table information.
        /// </summary>
        /// <returns>A list of reservation results.</returns>
        [HttpGet("GetBookingTableInfo")]
        public ActionResult<ApiResult<List<ReservationResult>>> GetBookingTableInfo()
        {
            var results = _reservationService.GetBookingTableInfo();

            if (results == null || !results.Any())
            {
                return NotFound(ApiResult<List<ReservationResult>>.ErrorResult("No reservations found."));
            }

            return Ok(ApiResult<List<ReservationResult>>.Success(results));
        }


        [HttpPost("addReservation")]
        public ActionResult<ApiResult<bool>> ReserveACar([FromForm] ReservationRequestWithPhotos request)
        {
           
                // Deserialize AllInfo JSON string to ReservationRequest
                var reservationRequest = JsonConvert.DeserializeObject<ReservationRequest>(request?.AllInfo);
                // Check for null or proceed with further logic
                if (reservationRequest == null)
                {
                    return BadRequest(ApiResult<bool>.ErrorResult("Car could not be reserved"));
                }
                _reservationService.ReserveACar(reservationRequest);

                // For testing: simply return a success response
                return Ok(ApiResult<bool>.Success(true));
         
        }

    }
}
