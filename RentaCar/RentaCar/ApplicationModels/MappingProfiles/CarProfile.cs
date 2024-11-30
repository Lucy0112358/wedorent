using AutoMapper;
using RentaCar.Entity;
using RentaCar.Enums;

namespace RentaCar.ApplicationModels.MappingProfiles
{
    public class CarProfile : Profile
    {
        public CarProfile()
        {
            CreateMap<Car, CarResult>()
                .ForMember(dest => dest.Category,
                           opt => opt.MapFrom(src => ((CategoryEnum)src.CategoryId).ToString()));
        }
    }
}
