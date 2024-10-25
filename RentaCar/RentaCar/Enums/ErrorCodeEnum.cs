using System.ComponentModel;

namespace RentaCar.Enums
{
    public enum ErrorCodeEnum : long
    {
        [Description("The input must not contain HTML.")]
        InputPotentiallyDangerous = 3701,



    }
}
