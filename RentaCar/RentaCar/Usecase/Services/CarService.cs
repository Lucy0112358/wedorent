﻿using AutoMapper;
using RentaCar.ApplicationModels;
using RentaCar.DataModels;
using RentaCar.Entity;
using RentaCar.Enums;
using RentaCar.Exceptionss;
using RentaCar.Repository;

namespace RentaCar.Usecase.Services
{
    public class CarService : ICarService
    {
        private readonly CarRepository _carRepository;
        private readonly IMapper _mapper;
        public CarService(CarRepository carRepository, IMapper mapper) {
            _carRepository = carRepository;
            _mapper = mapper;
        }
        public List<Car> FilterBy(string? model = null, int? wedding = 0, int? driver = 0)
        {
            throw new NotImplementedException();
        }

        public Car GetCar(int carId)
        {
            var car = _carRepository.GetCarById(carId);
            car.Prices = _carRepository.GetCarPricing(carId);

            return car;
        }

        public List<CarResult> GetCars(int? categoryId = null)
        {
            var cars = _carRepository.Cars(categoryId);
            var allPrices = _carRepository.GetCarPricing();           

            foreach (var car in cars)
            {
                car.Prices = allPrices.Where(p => p.CarId == car.Id).ToList();
            }

            return _mapper.Map<List<CarResult>>(cars);
        }

        public bool CheckCarAvailability(CheckoutRequest request)
        {

            if (request.StartDate < DateTime.Now)
            {
                throw new BaseException(ErrorCodeEnum.InvalidDate);
            }

            return _carRepository.IsCarAvailable(request.CarId, request.StartDate, request.EndDate);
        }

        public List<Category> GetAllCategories()
        {
            return _carRepository.GetAllCategories();
        }

    }
}
