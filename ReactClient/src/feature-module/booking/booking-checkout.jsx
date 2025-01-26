import React, { useState, useEffect, useRef } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import Breadcrumbs from "../common/breadcrumbs";
import { Calendar } from "primereact/calendar";
import { TimePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { useDispatch, useSelector } from "react-redux";
import { getBookingCar, getBookingData, setBookingData } from "../../core/data/redux/slice/bookingSlice";
import dayjs from "dayjs";
import { getCar } from "../../core/data/redux/api/bookingApi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "primereact/dropdown";


const BookingCheckout = () => {

  const inputRef = useRef(null);
  const inputRef1 = useRef(null);


  const YEREVAN_BOUNDS = {
    north: 40.23,
    south: 40.11,
    east: 44.6,
    west: 44.38,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const routes = all_routes;
  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };


  useEffect(() => {
    if (bookingData.carId == null) {
      let storedId = localStorage.getItem('carId');
      handleBookingData('carId', storedId);
      handleBookingData('rent_type', "delivery");
      console.log(storedId)
      dispatch(getCar(storedId));
    }
  }, []);

  const [isDelivery, setIsDelivery] = useState(false)
  const bookingData = useSelector(getBookingData)
  const bookingCar = useSelector(getBookingCar);

  const dispatch = useDispatch();

  const handleAddressChange = (key, value) => {
    let existBookingInfo = {
      ...bookingData,
      [key]: value,
      sameLocation: false
    };

    dispatch(setBookingData(existBookingInfo))
  };

  const handleBookingData = (key, value) => {
    let existBookingInfo = {
      ...bookingData,
      [key]: value
    };

    dispatch(setBookingData(existBookingInfo))
  }

  const handleBookingDataDouble = (keyOne, valueOne, keyTwo, valueTwo) => {
    let existBookingInfo = {
      ...bookingData,
      [keyOne]: valueOne,
      [keyTwo]: valueTwo,
    };

    dispatch(setBookingData(existBookingInfo))
  }

  const pickerOne = (time, timeString) => {
    handleBookingData('pickerOne', timeString)
  };

  const pickerTwo = (time, timeString) => {
    handleBookingData('pickerTwo', timeString)
  };

  const validationSchema = Yup.object({
    StartAddress: Yup.string().required("Location is required"),
    EndAddress: Yup.string().required("Return location is required"),
    StartDate: Yup.date().required("Pickup Date is required"),
    EndDate: Yup.date().required("Return Date is required"),
    rent_type: Yup.string().required("Rent Type is required"),
  });

  const navigate = useNavigate();

  const navigatePath = () => {
    navigate(routes.bookingAddon);
  }



  return (
    <div>
      <Breadcrumbs title="Checkout" subtitle="Checkout" />
      <div className="booking-new-module">
        <div className="container">
          <div className="booking-wizard-head">
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-3">
                <div className="booking-head-title">
                  <h4>Reserve Your Car</h4>
                  <p>Complete the following steps</p>
                </div>
              </div>
              <div className="col-xl-8 col-lg-9">
                <div className="booking-wizard-lists">
                  <ul>
                    <li className="active">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-01.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Location &amp; Time</h6>
                    </li>
                    <li>
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-02.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Add-Ons</h6>
                    </li>
                    <li>
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-03.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Detail</h6>
                    </li>
                    <li>
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-04.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Checkout</h6>
                    </li>
                    <li>
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-05.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Booking Confirmed</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-detail-info">
            <div className="row">
              <div className="col-lg-4 theiaStickySidebar">
                <div className="stickybar">
                  <div className="booking-sidebar">
                    <div className="booking-sidebar-card">
                      <div className="booking-sidebar-head">
                        <h5>Car Details</h5>
                      </div>
                      <div className="booking-sidebar-body">
                        <div className="booking-car-detail">
                          <span className="car-img">
                            <ImageWithBasePath
                              src="assets/img/car-list-4.jpg"
                              className="img-fluid"
                              alt="Car"
                            />
                          </span>
                          <div className="care-more-info">
                            <h5>{bookingCar?.data?.model}</h5>
                            <p>{bookingCar?.data?.engine}</p>
                            <Link to={routes.listingDetails}>View Car Details</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="total-rate-card">
                      <div className="vehicle-total-price">
                        <h5>Estimated Total</h5>
                        <span>{bookingCar?.data?.prices[0]?.price}֏</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="booking-information-main">
                  <Formik
                    initialValues={{
                      StartAddress: bookingData?.StartAddress || "",
                      EndAddress: bookingData?.EndAddress || "",
                      StartDate: bookingData?.StartDate || "",
                      EndDate: bookingData?.EndDate || "",
                      rent_type: bookingData?.rent_type || "delivery",
                      sameLocation: bookingData?.sameLocation || false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      navigatePath();
                    }}
                  >
                    {({ values, handleChange, isSubmitting, setFieldValue, errors }) => {
                      console.log("Form errors:", errors);

                      const handleSameLocation = (isChecked) => {
                        if (isChecked) {
                          let existBookingInfo = {
                            ...bookingData,
                            EndAddress: bookingData?.StartAddress,
                            sameLocation: true
                          };
                          setFieldValue('EndAddress', bookingData.StartAddress)
                          dispatch(setBookingData(existBookingInfo))
                        } else {
                          let existBookingInfo = {
                            ...bookingData,
                            EndAddress: "",
                            sameLocation: false
                          };
                          setFieldValue('EndAddress', "")
                          dispatch(setBookingData(existBookingInfo))
                        }
                      };
                      const handleOnPlacesChanged1 = (key) => {
                        const searchBox = inputRef1.current;
                        if (searchBox) {
                          const places = searchBox.getPlaces();
                          if (places && places.length > 0) {
                            const filteredPlaces = places.filter((place) => {
                              const location = place.geometry?.location;
                              if (location) {
                                const lat = location.lat();
                                const lng = location.lng();
                                return (
                                  lat <= YEREVAN_BOUNDS.north &&
                                  lat >= YEREVAN_BOUNDS.south &&
                                  lng <= YEREVAN_BOUNDS.east &&
                                  lng >= YEREVAN_BOUNDS.west
                                );
                              }
                              return false;
                            });


                            if (filteredPlaces.length > 0) {
                              handleAddressChange(key, filteredPlaces[length - 1].formatted_address);
                              setFieldValue(key, filteredPlaces[length - 1].formatted_address);
                              console.log("Filtered Place:", filteredPlaces[0].formatted_address);
                            } else {
                              toast("To select a place outside Yerevan please contact us");

                            }
                          }
                        }
                      };

                      const handleOnPlacesChanged = (key) => {
                        const searchBox = inputRef.current;
                        if (searchBox) {
                          const places = searchBox.getPlaces();
                          if (places && places.length > 0) {
                            const filteredPlaces = places.filter((place) => {
                              const location = place.geometry?.location;
                              if (location) {
                                const lat = location.lat();
                                const lng = location.lng();
                                return (
                                  lat <= YEREVAN_BOUNDS.north &&
                                  lat >= YEREVAN_BOUNDS.south &&
                                  lng <= YEREVAN_BOUNDS.east &&
                                  lng >= YEREVAN_BOUNDS.west
                                );
                              }
                              return false;
                            });
                            if (filteredPlaces.length > 0) {
                              handleAddressChange(key, filteredPlaces[length - 1].formatted_address);
                              setFieldValue(key, filteredPlaces[length - 1].formatted_address);
                              console.log("Filtered Place:", filteredPlaces[0].formatted_address);
                            } else {
                              toast("No places found within Yerevan");
                            }
                          }
                        }
                      };
                      return (
                        <Form>
                          {/* <div className="booking-information-card">
                            <div className="booking-info-head">
                              <span>
                                <i className="bx bxs-car-garage" />
                              </span>
                              <h5>Rental Type</h5>
                            </div>
                            <div className="booking-info-body">
                              <ul className="booking-radio-btns">
                                <li>
                                  <label className="booking_custom_check">
                                    <input
                                      type="radio"
                                      name="rent_type"
                                      checked={bookingData?.rent_type === "delivery"}
                                      id="location_delivery"
                                      onChange={(e) => handleBookingData("rent_type", 'delivery')}
                                      defaultChecked
                                    />
                                    <span className="booking_checkmark">
                                      <span className="checked-title">Delivery</span>
                                    </span>
                                  </label>
                                </li>
                                <li>
                                  <label className="booking_custom_check">
                                    <input
                                      type="radio"
                                      name="rent_type"
                                      disabled
                                      checked={bookingData?.rent_type === "pickup"}
                                      onChange={(e) => handleBookingData("rent_type", 'pickup')}
                                      id="location_pickup"
                                    />
                                    <span className="booking_checkmark">
                                      <span className="checked-title">Self Pickup</span>
                                    </span>
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div> */}
                         
                            <>
                              <div className="booking-information-card delivery-location">
                                <div className="booking-info-head">
                                  <span>
                                    <i className="bx bxs-car-garage" />
                                  </span>
                                  <h5>Location</h5>
                                </div>
                                <div className="booking-info-body">
                                  <div className="form-custom">
                                    <label className="form-label">Delivery Location</label>
                                    <div className="d-flex align-items-center">
                                      {isLoaded &&
                                        <StandaloneSearchBox
                                          onLoad={(ref) => (inputRef.current = ref)}
                                          onPlacesChanged={() => {
                                            handleOnPlacesChanged('StartAddress');
                                          }}
                                          options={{
                                            bounds: YEREVAN_BOUNDS,
                                            strictBounds: true,
                                            componentRestrictions: { country: "am" },
                                          }}
                                        >
                                          <input
                                            type="text"
                                            className="form-control mb-0"
                                            placeholder="Enter delivery location"

                                          />
                                        </StandaloneSearchBox>
                                      }

                                    </div>
                                    {errors.StartAddress && <p style={{ color: 'red' }}>{errors.StartAddress}</p>}

                                  </div>
                                  {/* <div className="input-block m-0">
                                    <label className="custom_check d-inline-flex location-check">
                                      <span>Return to same location</span>
                                      <input
                                        type="checkbox"
                                        name="sameLocation"
                                        checked={bookingData?.sameLocation || false}
                                        onChange={(e) => handleSameLocation(e.target.checked)}
                                      />

                                      <span className="checkmark" />
                                    </label>
                                  </div> */}
                                  <div className="form-custom">
                                    <label className="form-label">Return Location</label>
                                    <div className="d-flex align-items-center">

                                      {isLoaded &&
                                        <StandaloneSearchBox
                                          onLoad={(ref) => (inputRef1.current = ref)}
                                          onPlacesChanged={() => {
                                            handleOnPlacesChanged1('EndAddress');
                                          }}
                                          options={{
                                            bounds: YEREVAN_BOUNDS,
                                            strictBounds: true,
                                            componentRestrictions: { country: "am" },
                                          }}
                                        >
                                          <input
                                            type="text"
                                            className="form-control mb-0"
                                            placeholder="Enter return location"

                                          />
                                        </StandaloneSearchBox>
                                      }
                                    </div>
                                    {errors.EndAddress && <p style={{ color: 'red' }}>{errors.EndAddress}</p>}
                                  </div>
                                </div>
                              </div>
                            </>
                    



                          <div className="booking-information-card booking-type-card">
                            <div className="booking-info-head">
                              <span>
                                <i className="bx bxs-location-plus" />
                              </span>
                              <h5> Time</h5>
                            </div>
                            <div className="booking-info-body">
                              <div className="booking-timings">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="input-block date-widget">
                                      <label className="form-label">Start Date</label>
                                      <div className="group-img">
                                        <Calendar

                                          minDate={new Date()}
                                          className="datetimepicker bg-custom"
                                          value={bookingData?.StartDate}
                                          onChange={(e) => {
                                            handleBookingData('StartDate', e.target.value);
                                            setFieldValue('StartDate', e.target.value);
                                          }}
                                          placeholder="Choose Date"
                                        />


                                        <span className="input-cal-icon">
                                          <i className="bx bx-calendar" />
                                        </span>

                                      </div>
                                      {errors.StartDate && <p style={{ color: 'red' }}>{errors.StartDate}</p>}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-block time-widge">
                                      <label className="form-label">Start Time</label>
                                      <div className="group-img style-custom">
                                        <Dropdown
                                          onChange={(e) => {
                                            // setSelectedCountryHandle(e.value); 

                                          }}
                                          className="w-100"
                                          //  value={values.selectedCountry}
                                          options={[
                                            "00:00",
                                            "01:00",
                                            "02:00",
                                            "03:00",
                                            "04:00",
                                            "05:00",
                                            "06:00",
                                            "07:00",
                                            "08:00",
                                            "09:00",
                                            "10:00",
                                            "11:00",
                                            "12:00",
                                            "13:00",
                                            "14:00",
                                            "15:00",
                                            "16:00",
                                            "17:00",
                                            "18:00",
                                            "19:00",
                                            "20:00",
                                            "21:00",
                                            "22:00",
                                            "23:00"
                                          ]}
                                          placeholder="Select Time"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-block date-widget">
                                      <label className="form-label">
                                        Return Date
                                      </label>
                                      <div className="group-img">
                                        <Calendar
                                          minDate={new Date()}
                                          className="datetimepicker bg-custom"
                                          value={bookingData?.EndDate}
                                          onChange={(e) => {
                                            handleBookingData('EndDate', e.target.value);
                                            setFieldValue('EndDate', e.target.value);
                                          }}
                                          placeholder="Choose Date"
                                        />
                                        <span className="input-cal-icon">
                                          <i className="bx bx-calendar" />
                                        </span>
                                      </div>
                                      {errors.EndDate && <p style={{ color: 'red' }}>{errors.EndDate}</p>}

                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-block time-widge">
                                      <label className="form-label">
                                        Return Time
                                      </label>
                                      <div className="group-img style-custom">
                                      <Dropdown
                                          onChange={(e) => {
                                            // setSelectedCountryHandle(e.value); 

                                          }}
                                          className="w-100"
                                          //  value={values.selectedCountry}
                                          options={[
                                            "00:00",
                                            "01:00",
                                            "02:00",
                                            "03:00",
                                            "04:00",
                                            "05:00",
                                            "06:00",
                                            "07:00",
                                            "08:00",
                                            "09:00",
                                            "10:00",
                                            "11:00",
                                            "12:00",
                                            "13:00",
                                            "14:00",
                                            "15:00",
                                            "16:00",
                                            "17:00",
                                            "18:00",
                                            "19:00",
                                            "20:00",
                                            "21:00",
                                            "22:00",
                                            "23:00"
                                          ]}
                                          placeholder="Select Time"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className="booking-info-btns d-flex justify-content-end">
                            <Link
                              to={routes.listingDetails}
                              className="btn btn-secondary"
                            >
                              Back to Car details
                            </Link>
                            <button
                              className="btn btn-primary continue-book-btn"
                              type="submit"
                            >
                              Continue Booking
                            </button>
                          </div>

                        </Form>
                      );
                    }}

                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default BookingCheckout;