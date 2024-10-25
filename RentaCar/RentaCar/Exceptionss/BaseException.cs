using RentaCar.Configuration;
using RentaCar.Enums;

namespace RentaCar.Exceptionss
{
    public class BaseException : ApplicationException
    {
        public ReservationErrorCodeEnum ErrorCodeEnum { get; private set; }
        public ErrorCodeEnum errorCodeEnum { get; private set; }
        public BaseException()
        {
        }
        public BaseException(ReservationErrorCodeEnum errorCodeType) : base(errorCodeType.GetDescription())
        {
            ErrorCodeEnum = errorCodeType;
        }
        public BaseException(ErrorCodeEnum errorCodeType, string message, int? id = null) : base(message)
        {
            ErrorCodeEnum = (ReservationErrorCodeEnum)errorCodeType;
        }
        public BaseException(ErrorCodeEnum errorCodeType) : base(errorCodeType.GetDescription())
        {
            errorCodeEnum = errorCodeType;
        }
    }
}
