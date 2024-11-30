import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import Breadcrumbs from "../common/breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { getBookingData, getBookingCar, getServiceTotal, setBookingData, setServiceTotal, setServiceTotalAdd, setServiceTotalRemove } from "../../core/data/redux/slice/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const BookingAddon = () => {
  const routes = all_routes;
  const navigate = useNavigate();

  const navigatePath = () => {
    navigate(routes.bookingDetail);
  }

  //Booking part by me
  const bookingData = useSelector(getBookingData)
  const bookingCar = useSelector(getBookingCar)
  const total = useSelector(getServiceTotal)
  const dispatch = useDispatch()


  const [totalAmount, setTotalAmount] = useState(0);

  const handleDetails = (key, value) => {
    let existAddonInfo = {
      ...bookingData,
      [key]: value
    };

    dispatch(setBookingData(existAddonInfo))
  }
  console.log(bookingData, "bookingData")
  const handleAddService = (e, service) => {
    e.preventDefault();
    console.log(service, "service")

    if (!bookingData?.serviceList) {
      handleDetails('serviceList', { [service.id]: { "price": service.price, "title": service.title } });
    } else {
      if(!(bookingData?.serviceList.hasOwnProperty(service.id))){
        let updatedServiceList = { ...bookingData.serviceList, [service.id]: { "price": service.price, "title": service.title }};
      handleDetails('serviceList', updatedServiceList)

      }
    }

    dispatch(setServiceTotalAdd(service.price))

  }
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
  };

  const getPrice = (days, prices = []) => {
    for (let pricing of prices) {
      if (days >= pricing.minDays && days <= pricing.maxDays) {
        return pricing.price;
      }
    }
    return null; // Return null if no price matches
  };

  // Calculate the number of days
  const days = calculateDays(bookingData.StartDate, bookingData.EndDate);

  // Find the corresponding price
  const price = getPrice(days, bookingCar?.data.prices)*days;
  const insurancePrice = price*0.15;
  console.log(days)
  console.log(insurancePrice)
  const handleRemoveService = (e, service) => {
    e.preventDefault();
    if (!bookingData.serviceList) {
      alert("No services selected")
      return false;
    } else {
      let updatedServiceList = { ...bookingData.serviceList };
      delete updatedServiceList[service.id]; 
      handleDetails('serviceList', updatedServiceList)
    }
    dispatch(setServiceTotalRemove(service.price))
  };
  const services = [
    {
      "id": 1,
      "title": "Personal driver",
      "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      "iconName": "car-wash-icon.png",
      "price": 20000,
      "createdAt": "2023-10-01T10:30:00",
      "modifiedAt": "2023-10-01T10:30:00"
    },
    {
      "id": 2,
      "title": "Car seat",
      "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      "iconName": "oil-change-icon.png",
      "price": 5000,
      "createdAt": "2023-10-02T09:00:00",
      "modifiedAt": "2023-10-02T09:00:00"
    },
    {
      "id": 3,
      "title": "Airport pick up",
      "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      "iconName": "tire-rotation-icon.png",
      "price": 20000,
      "createdAt": "2023-10-03T08:45:00",
      "modifiedAt": "2023-10-03T08:45:00"
    },
    {
      "id": 4,
      "title": "CASCO insurance",
      "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      "iconName": "battery-check-icon.png",
      "price": price*0.15,
      "createdAt": "2023-10-04T11:15:00",
      "modifiedAt": "2023-10-04T11:15:00"
    }
  ]
  return (
    <>
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
                    <li className="active">
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
                            <p>{bookingData?.rent_type}</p>
                          </li>
                          <li>
                            <h6>Rental Duration</h6>
                            <p>{days} Days</p>
                          </li>
                          <li>
                            <h6>Delivery Location &amp; time</h6>
                            <p>{bookingData?.StartAddress}</p>
                            <p>{bookingData?.StartDate?.toDateString()}</p>
                          </li>
                          <li>
                            <h6>Return Location &amp; time</h6>
                            <p>{bookingData?.EndAddress}</p>
                            <p>{bookingData?.EndDate?.toDateString()}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="total-rate-card">
                      <div className="vehicle-total-price">
                        <h5>Estimated Total</h5>
                        <span>{price + total}֏</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="booking-information-main">
                  <form>
                    <div className="booking-information-card">
                      <div className="booking-info-head justify-content-between">
                        <div className="d-flex align-items-center">
                          <span>
                            <i className="bx bx-add-to-queue" />
                          </span>
                          <h5>Add-Ons</h5>
                        </div>
                        <h5>Total service: {total} ֏</h5>
                      </div>
                      <div className="booking-info-body">
                        <ul className="adons-lists">
                          {
                            services.map((service) => (
                              <li>
                                <div className="adons-types">
                                  <div className="d-flex align-items-center adon-name-info">
                                    <div className="adon-name">
                                      <h6>{service.title}</h6>
                                    </div>
                                  </div>
                                  <span className="adon-price">{ service.price} ֏</span>
                                  {
                                    bookingData?.serviceList && bookingData?.serviceList.hasOwnProperty(service.id) ? (
                                      <button
                                        onClick={(e) => handleRemoveService(e, service)}
                                        className="btn btn-secondary remove-adon-btn">
                                        <i className="bx bx-minus-circle me-2" />
                                        Remove
                                      </button>
                                    ) : (
                                      <button
                                        onClick={(e) => handleAddService(e, service)}
                                        className="btn add-addon-btn">
                                        <i className="bx bx-plus-circle me-2" />
                                        Add
                                      </button>
                                    )
                                  }
                                </div>
                                <div>
                                  <p>
                                    {service.description}
                                  </p>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                    <div className="booking-info-btns d-flex justify-content-end">
                      <Link
                        to={routes.bookingCheckout}
                        className="btn btn-secondary"
                      >
                        Back to Location &amp; Time
                      </Link>
                      <button onClick={() =>  navigate(routes.bookingDetail)}
                        className="btn btn-primary continue-book-btn"
                        type="button"
                      >
                        Continue Booking
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingAddon;
