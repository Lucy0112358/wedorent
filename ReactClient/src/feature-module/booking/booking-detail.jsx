import React, { useEffect, useState } from "react";
import { Formik, Field } from 'formik';
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import Breadcrumbs from "../common/breadcrumbs";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import Aos from "aos";
import { useDispatch, useSelector } from "react-redux";
import { getBookingData, setBookingData, getBookingCar, getServiceTotal } from "../../core/data/redux/slice/bookingSlice";
import { useTranslation } from "react-i18next";
import { sendBooking } from "../../core/data/redux/api/bookingApi";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { Form } from 'formik';
import { ErrorMessage } from 'formik';
import { getCar } from "../../core/data/redux/api/bookingApi";


const BookingDetail = () => {
  //Billing part
  useEffect(() => {
    if (bookingData.carId == null) {
      //    bookingData.carId = getfrom LS
      handleDetails('carId', 1);
      dispatch(getCar(1));
      navigate(routes.bookingCheckout);

    }
    Aos.init();
  }, []);
  const developedCountries = [
    "Armenia",
    "Russia",
    "Georgia",
    "Australia",
    "Austria",
    "Belgium",
    "Canada",
    "Croatia",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Chile",
    "Cyprus",
    "Qatar",
    "Saudi Arabia",
    "South Africa",
    "Kuwait",
    "Uruguay",
    "Argentina",
    "Bahrain",
    "Malaysia"
  ];

  //End Billing part
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
    lastName: Yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string().required("Phone number is required").matches(/^[0-9]+$/, "Phone number must be numeric").min(8, "Phone number must be at least 10 digits"),
    selectedCountry: Yup.string().required("Country selection is required"),
    frontPhoto: Yup.mixed().required("Front photo is required"),
    backPhoto: Yup.mixed().required("Back photo is required"),
    streetAddress: Yup.mixed().required("Street address is required"),
    city: Yup.mixed().required("City is required"),
    confirm: Yup.bool().oneOf([true], "You must confirm the data to proceed."),
    drivingLicence: Yup.string()
      .matches(/^[A-Z]{2}\d{5}$/, 'Invalid driving license number. It must start with two uppercase letters followed by five digits.')
      .required('Driving license number is required.')
  });
  const routes = all_routes;

  const [selectedPersons, setSelectedPersons] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const persons = [
    { name: "2 Adults, 1 Child" },
    { name: "5 Adults, 2 Child" },
  ];

  //Start Booking part
  const { t } = useTranslation();
  const [frontPhoto, setFrontPhoto] = useState(null);
  const [backPhoto, setBackPhoto] = useState(null);
  const dispatch = useDispatch();
  const bookingData = useSelector(getBookingData);
  const bookingCar = useSelector(getBookingCar);
  const total = useSelector(getServiceTotal);

  console.log(bookingData, "bookingDatabookingDatabookingData");

  const handleDetails = (key, value) => {
    console.log(key, value);

    let existBillingInfo = {
      ...bookingData,
      [key]: value
    };
    dispatch(setBookingData(existBillingInfo));
  };

  const setSelectedCountryHandle = (value) => {
    setSelectedCountry(value);
    handleDetails("selectedCountry", value.name);
  };

  const [fileNameFront, setFileNameFront] = useState("");
  const [fileNameBack, setFileNameBack] = useState("");

  const handleFileUploadFront = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileNameFront(file.name);
      setFrontPhoto(file);
    }
  };

  const handleFileUploadBack = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileNameBack(file.name);
      setBackPhoto(file);
    }
  };

  const handleSendAllBillingInfo = (e) => {
    // e.preventDefault();
    let afterSendBookingInfo = bookingData;

    const formData = new FormData();
    formData.append("frontPhoto", frontPhoto);
    formData.append("backPhoto", backPhoto);
    formData.append("allInfo", JSON.stringify(afterSendBookingInfo));

    dispatch(sendBooking(formData));
  };

  //End Booking part

  const country = [{ name: "Armenia" }, { name: "Georgia" }];
  const navigate = useNavigate();

  const navigatePath = () => {
    navigate(routes.bookingPayment);
  };

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
                    <li className="active activated">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-01.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Location &amp; Time</h6>
                    </li>
                    <li className="active activated">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/booking-head-icon-02.svg"
                          alt="Booking Icon"
                        />
                      </span>
                      <h6>Add-Ons</h6>
                    </li>
                    <li className="active">
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
                          <Link to={routes.listingDetails}>
                            View Car Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="booking-sidebar-card">
                    <div className="booking-sidebar-head d-flex justify-content-between align-items-center">
                      <h5>Location &amp; Time</h5>
                      <Link
                        to={routes.bookingCheckout}
                        className="d-flex align-items-center"
                      >
                        <i className="bx bx-edit-alt me-2" />
                        Edit
                      </Link>
                    </div>
                    <div className="booking-sidebar-body">
                      <ul className="location-address-info">
                        <li>
                          <h6>Booking Type</h6>
                          <p>{bookingData.booking_type}</p>
                        </li>
                        <li>
                          <h6>Rental Type</h6>
                          <p>Days</p>
                        </li>
                        <li>
                          <h6>Delivery Location &amp; time</h6>
                          <p>{bookingData.StartAddress}</p>
                          <p>{bookingData?.StartDate?.toDateString()}</p>
                        </li>
                        <li>
                          <h6>Booking Type</h6>
                          <p>{bookingData.EndAddress}</p>
                          <p>{bookingData?.EndDate?.toDateString()}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="booking-sidebar-card">
                    <div className="booking-sidebar-head d-flex justify-content-between align-items-center">
                      <h5>Add-ons</h5>
                      <Link
                        to={routes.bookingAddon}
                        className="d-flex align-items-center"
                      >
                        <i className="bx bx-edit-alt me-2" />
                        Edit
                      </Link>
                    </div>
                    <div className="booking-sidebar-body">
                      <div className="booking-vehicle-rates">
                        <ul className="mt-0">
                          {Object.values(bookingData?.serviceList ?? {}).map((item, index) => (
                            <li key={index}>
                              <h6>{item?.title}</h6>
                              <h5>{item?.price}֏</h5>
                            </li>
                          ))}
                        </ul>

                      </div>

                    </div>
                  </div>

                  <div className="total-rate-card">
                    <div className="vehicle-total-price">
                      <h5>Estimated Total</h5>
                      <span>{bookingCar?.data?.prices[2].price + total}֏</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="booking-information-main">

                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      streetAddress: "",
                      selectedCountry: "",
                      city: "",
                      email: "",
                      phone: "",
                      drivingLicence: "",
                      frontPhoto: null,
                      backPhoto: null,
                      confirm: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSendAllBillingInfo}

                  >
                    {({ values, handleChange, isSubmitting, setFieldValue, errors }) => {

                      console.log("Form values:", values);
                      console.log("Form errors:", errors);
                      return (
                        <Form>
                          <div className="booking-information-card">
                            <div className="booking-info-head justify-content-between">
                              <div className="d-flex align-items-center">
                                <span>
                                  <i className="bx bx-add-to-queue" />
                                </span>
                                <h5>Billing Info</h5>
                              </div>
                            </div>
                            <div className="booking-info-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="input-block">
                                    <label className="form-label">
                                      First Name <span className="text-danger"> *</span>
                                    </label>
                                    <Field
                                      onChange={(e) => {
                                        handleDetails('firstName', e.target.value);
                                        setFieldValue('firstName', e.target.value);
                                      }}
                                      type="text"
                                      name="firstName"
                                      // value={values?.firstName ?? ''}
                                      className="form-control"
                                      placeholder="Enter First Name"
                                    />
                                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-block">
                                    <label className="form-label">
                                      Last Name <span className="text-danger"> *</span>
                                    </label>
                                    <Field
                                      onChange={(e) => {
                                        handleDetails('lastName', e.target.value);
                                        setFieldValue('lastName', e.target.value);
                                      }}
                                      type="text"
                                      name="lastName"
                                      className="form-control"
                                      placeholder="Enter Last Name"
                                    />
                                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-block">
                                    <label className="form-label">
                                      Street Address <span className="text-danger"> *</span>
                                    </label>
                                    <Field
                                      onChange={(e) => {
                                        handleDetails('streetAddress', e.target.value);
                                        setFieldValue('streetAddress', e.target.value);
                                      }}
                                      type="text"
                                      name="streetAddress"
                                      className="form-control"
                                      placeholder="Enter Address"
                                    />
                                    <ErrorMessage name="streetAddress" component="div" className="text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-block">
                                    <label className="form-label">
                                      Country <span className="text-danger"> *</span>
                                    </label>
                                    {/* <Dropdown
                                    onChange={(e) => setSelectedCountryHandle(e.value)}
                                    value={selectedCountry}
                                    // onChange={(e) => setSelectedCountry(e.value)}
                                    options={["Armenia"]} // Country options
                                    optionLabel="name"
                                    placeholder="Select Country"
                                    className="w-100"
                                  /> */}
                                    <Dropdown
                                      onChange={(e) => {
                                        setSelectedCountryHandle(e.value); // Custom handler function
                                        setFieldValue("selectedCountry", e.value); // Update Formik value
                                      }}
                                      className="w-100"
                                      value={values.selectedCountry} // Current selected value from Formik
                                      options={[
                                        "Armenia",
                                        "Russia",
                                        "Georgia",
                                        "Argentina",
                                        "Australia",
                                        "Austria",
                                        "Bahrain",
                                        "Belgium",
                                        "Canada",
                                        "Chile",
                                        "Croatia",
                                        "Cyprus",
                                        "Czech Republic",
                                        "Denmark",
                                        "Estonia",
                                        "Finland",
                                        "France",
                                        "Germany",
                                        "Greece",
                                        "Hong Kong",
                                        "Hungary",
                                        "Iceland",
                                        "Ireland",
                                        "Israel",
                                        "Italy",
                                        "Japan",
                                        "Kuwait",
                                        "Latvia",
                                        "Lithuania",
                                        "Luxembourg",
                                        "Malaysia",
                                        "Malta",
                                        "Netherlands",
                                        "New Zealand",
                                        "Norway",
                                        "Poland",
                                        "Portugal",
                                        "Qatar",
                                        "Saudi Arabia",
                                        "Singapore",
                                        "Slovakia",
                                        "Slovenia",
                                        "South Africa",
                                        "South Korea",
                                        "Spain",
                                        "Sweden",
                                        "Switzerland",
                                        "Taiwan",
                                        "United Arab Emirates",
                                        "United Kingdom",
                                        "United States",
                                        "Uruguay"
                                      ]}
                                      placeholder="Select Country"
                                    />

                                    <ErrorMessage name="country" component="div" className="text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-block">
                                    <label className="form-label">
                                      City <span className="text-danger"> *</span>
                                    </label>
                                    <Field
                                      onChange={(e) => {
                                        handleDetails('city', e.target.value);
                                        setFieldValue('city', e.target.value);
                                      }}
                                      type="text"
                                      name="city"
                                      className="form-control"
                                      placeholder="Enter City"
                                    />
                                    <ErrorMessage name="city" component="div" className="text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-block">
                                    <label className="form-label">
                                      Email Address <span className="text-danger"> *</span>
                                    </label>
                                    <Field
                                      onChange={(e) => {
                                        handleDetails('email', e.target.value);
                                        setFieldValue('email', e.target.value);
                                      }}
                                      type="text"
                                      name="email"
                                      className="form-control"
                                      placeholder="Enter Email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-block">
                                    <label className="form-label">
                                      Phone Number <span className="text-danger"> *</span>
                                    </label>
                                    <Field
                                      onChange={(e) => {
                                        handleDetails('phone', e.target.value);
                                        setFieldValue('phone', e.target.value);
                                      }}
                                      type="text"
                                      name="phone"
                                      className="form-control"
                                      placeholder="Enter Phone Number"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="input-block">
                                    <label className="form-label">
                                      Driving Licence Number <span className="text-danger"> *</span>
                                    </label>
                                    <Field
                                      onChange={(e) => {
                                        handleDetails('drivingLicence', e.target.value);
                                        setFieldValue('drivingLicence', e.target.value);
                                      }}
                                      type="text"
                                      name="drivingLicence"
                                      className="form-control"
                                      placeholder="Enter Driving Licence Number"
                                    />
                                    <ErrorMessage name="drivingLicence" component="div" className="text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="input-block">
                                    <label className="form-label">
                                      Upload Document <span className="text-danger"> *</span>
                                    </label>
                                    <div className="profile-uploader">
                                      <span className="drag-upload-btn">
                                        <span className="upload-btn">
                                          <i className="bx bx-upload me-2" />
                                          Upload Photo Front
                                        </span>
                                        or Drag Photo Front
                                      </span>
                                      <input
                                        type="file"
                                        accept=".jpeg, .jpg, .png"
                                        onChange={(e) => {
                                          handleFileUploadFront(e);
                                          setFieldValue("frontPhoto", e.target.files[0]);
                                        }}
                                      />
                                      {(frontPhoto && <p>Uploaded file: {fileNameFront}</p>) || <p style={{ color: 'red' }}>Required</p>
                                      }
                                    </div>
                                    <div className="profile-uploader">
                                      <span className="drag-upload-btn">
                                        <span className="upload-btn">
                                          <i className="bx bx-upload me-2" />
                                          Upload Photo Back
                                        </span>
                                        or Drag Photo Back
                                      </span>
                                      <input
                                        type="file"
                                        accept=".jpeg, .jpg, .png"
                                        onChange={(e) => {
                                          handleFileUploadBack(e);
                                          setFieldValue("backPhoto", e.target.files[0]);
                                        }}
                                      />
                                      {(backPhoto && <p>Uploaded file: {fileNameBack}</p>) || <p style={{ color: 'red' }}>Required</p>}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="input-block m-0">
                                    <label className="custom_check d-inline-flex location-check m-0">
                                      <span>
                                        I confirm that the personal data is correct, and I give permission for the processing of personal data.
                                      </span>{" "}
                                      <span className="text-danger"> *</span>
                                      <Field
                                        type="checkbox"
                                        name="confirm"
                                        checked={values.confirm} // Bind checkbox value to Formik's state
                                        onChange={handleChange} // Handle the change event
                                      />
                                      <span className="checkmark" />
                                    </label>
                                    <ErrorMessage name="confirm" component="div" className="text-danger" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="booking-info-btns d-flex justify-content-end">

                            <Link to={routes.bookingAddon} className="btn btn-secondary">
                              Back to Add-ons
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-primary continue-book-btn"
                              disabled={isSubmitting}
                            >
                              Confirm & Pay Now
                            </button>
                          </div>
                        </Form>
                      )

                    }}
                  </Formik>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal new-modal multi-step fade"
        id="sign_in_modal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="login-wrapper">
                <div className="loginbox">
                  <div className="login-auth">
                    <div className="login-auth-wrap">
                      <h1>Sign In</h1>
                      <p className="account-subtitle">
                        We&apos;ll send a confirmation code to your email.
                      </p>
                      <form>
                        <div className="input-block">
                          <label className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                          />
                        </div>
                        <div className="input-block">
                          <label className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <div className="pass-group">
                            <input
                              type="password"
                              className="form-control pass-input"
                              placeholder="............."
                            />
                            <span className="fas fa-eye-slash toggle-password" />
                          </div>
                        </div>
                        <div className="input-block text-end">
                          <Link
                            className="forgot-link"
                            to={routes.forgotPassword}
                          >
                            Forgot Password ?
                          </Link>
                        </div>
                        <div className="input-block m-0">
                          <label className="custom_check d-inline-flex">
                            <span>Remember me</span>
                            <input type="checkbox" name="remeber" />
                            <span className="checkmark" />
                          </label>
                        </div>
                        <Link
                          to={routes.homeOne}
                          className="btn btn-outline-light w-100 btn-size mt-1"
                        >
                          Sign In
                        </Link>
                        <div className="login-or">
                          <span className="or-line" />
                          <span className="span-or-log">
                            Or, log in with your email
                          </span>
                        </div>
                        {/* Social Login */}
                        <div className="social-login">
                          <Link
                            to="#"
                            className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/google.svg"
                                className="img-fluid"
                                alt="Google"
                              />
                            </span>
                            Log in with Google
                          </Link>
                        </div>
                        <div className="social-login">
                          <Link
                            to="#"
                            className="d-flex align-items-center justify-content-center input-block btn google-login w-100"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/facebook.svg"
                                className="img-fluid"
                                alt="Facebook"
                              />
                            </span>
                            Log in with Facebook
                          </Link>
                        </div>
                        {/* /Social Login */}
                        <div className="text-center dont-have">
                          Don&apos;t have an account ?{" "}
                          <Link to={routes.register}>Sign Up</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
