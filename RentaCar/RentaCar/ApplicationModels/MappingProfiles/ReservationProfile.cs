using AutoMapper;
using RentaCar.Entity;
using RentaCar.Enums;
using System.Globalization;

namespace RentaCar.ApplicationModels.MappingProfiles
{

    public class ReservationProfile : Profile
    {
        public ReservationProfile()
        {
            CreateMap<Reservation, ReservationResult>()
                .ForMember(dest => dest.Services, opt => opt.Ignore())
                 .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src =>
                src.TotalAmount.ToString("C", new CultureInfo("hy-AM"))))
                                 .ForMember(dest => dest.Status,
                           opt => opt.MapFrom(src => ((ReservationStatusEnum)src.ReservationStatusId).ToString()))
                                 .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src =>
    src.StartDate.ToString("yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture)))
                                                                  .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src =>
    src.EndDate.ToString("yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture)))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src =>
    src.CreatedAt.ToString("yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture)));


            CreateMap<Customer, ReservationResult>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Avoid overriding Reservation.Id
                .ForMember(dest => dest.StartDate, opt => opt.Ignore())
                .ForMember(dest => dest.EndDate, opt => opt.Ignore())
                .ForMember(dest => dest.StartAddress, opt => opt.Ignore())
                .ForMember(dest => dest.EndAddress, opt => opt.Ignore())
                .ForMember(dest => dest.CarId, opt => opt.Ignore())
                .ForMember(dest => dest.ReservationStatusId, opt => opt.Ignore())
                 .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src =>
    src.CreatedAt.ToString("yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture)))
                .ForMember(dest => dest.TotalAmount, opt => opt.Ignore());
        }

    }

}
