using System.ComponentModel;

namespace RentaCar.Enums
{
    public enum ErrorCodeEnum : long
    {
        [Description("The input must not contain HTML.")]
        InputPotentiallyDangerous = 3701,

        [Description("Invalid date")]
        InvalidDate = 3701

    }
}
