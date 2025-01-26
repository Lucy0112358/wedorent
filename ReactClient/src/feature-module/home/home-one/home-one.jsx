import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Dropdown } from "primereact/dropdown";
import AOS from "aos";
import "aos/dist/aos.css";
import dayjs from "dayjs";
import { TimePicker } from "antd";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { all_routes } from "../../router/all_routes";
import { testimonialsData } from "../../../core/data/json/testimonials_data";
import Footer from "../../common/footer";
import Header from "../../common/header";
import { getAllCategories, getAllCars } from "../../../core/data/redux/slice/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCarsList, getCategories } from "../../../core/data/redux/api/bookingApi";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

const HomeOne = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const inputRef = useRef(null);
  const handleOnPlacesChanged = () => {
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
          console.log("Filtered Place:", filteredPlaces[0]);
        } else {
          console.warn("No places found within Yerevan");
        }
      }
    }
  };
  const YEREVAN_BOUNDS = {
    north: 40.23,
    south: 40.11,
    east: 44.6,
    west: 44.45,
  };
  // const setSelectedCountryHandle = (value) => {
  //   setSelectedCountry(value);
  //   handleDetails("selectedCountry", value.name);
  // };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const allCars = useSelector(getAllCars);
  const allCategories = useSelector(getAllCategories);
  console.log(allCars);
  console.log(allCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([
      dispatch(getCarsList()),
      dispatch(getCategories())
    ]).then(([carsRes, categoriesRes]) => {
      if (carsRes.meta.requestStatus === 'rejected') {
        toast(carsRes.error.message);
      }
      if (categoriesRes.meta.requestStatus === 'rejected') {
        toast(categoriesRes.error.message);
      }
    });
  }, [dispatch]);
  let navigate = useNavigate();
  const handleFilter = (id) => {
    dispatch(getCarsList({ "categoryId": id }))
  }
  const routes = all_routes;
  const testimonials = testimonialsData;
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };
  const handleItemClick = (index) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  const settings = {
    dots: false,
    nav: true,

    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },

    ],

  };

  const imgslideroption = {
    dots: true,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const rentalslideroption = {
    dots: false,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nav: false,
  };

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
      <Header />
      {/* Banner */}
      <section
        className="banner-section banner-slider"
        style={{
          backgroundImage: "url('https://images.wallpaperscraft.com/image/single/mclaren_mp412c_orange_94581_1280x960.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="home-banner">
            <div className="row align-items-center">
              <div className="col-lg-6" data-aos="fade-down" >
                <h1>
                  <span> {t('Find Your Best')}</span> <br />
                  {t('Dream Car for Rental')}
                </h1>
                <p >
                  {t('bannerDescription')}
                </p>
                <div className="view-all">
                  <Link
                    to={routes.listingGrid}
                    className="btn btn-view d-inline-flex align-items-center "
                  >
                    {t('allCarsButton')}
                    <span>
                      <i className="feather icon-arrow-right ms-2" />
                    </span>
                  </Link>
                </div>
              </div>
              {/* <div className="col-lg-6" data-aos="fade-down">
          <div className="banner-imgs">
            <ImageWithBasePath
              src="assets/img/car-right.png"
              className="img-fluid aos"
              alt="bannerimage"
            />
          </div>
        </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* /Banner */}
      {/* Search */}
      <div className="section-search">
        <div className="container">
          <div className="search-box-banner">
            <form>
              <ul className="align-items-center">
                <li className="column-group-main">
                  <div className="input-block">
                    <label>   {t('pickupLocation')}
                    </label>
                    <div className="group-img">
                      {isLoaded &&
                        <StandaloneSearchBox
                          onLoad={(ref) => (inputRef.current = ref)}
                          onPlacesChanged={handleOnPlacesChanged}
                          options={{
                            bounds: YEREVAN_BOUNDS,
                            strictBounds: true,
                            componentRestrictions: { country: "am" },
                          }}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('addressPlaceholder')}
                            style={{
                              boxSizing: "border-box",
                              border: "1px solid transparent",
                              width: "100%",
                              height: "40px",
                              padding: "12px",
                              borderRadius: "4px",
                            }}
                          />
                        </StandaloneSearchBox>
                      }


                    </div>
                  </div>
                </li>
                <li className="column-group-main">
                  <div className="input-block">
                    <label>   {t('pickupDate')}
                    </label>
                  </div>
                  <div className="input-block-wrapp">
                    <div className="input-block date-widget">
                      <div className="group-img">
                        <Calendar
                          value={date1}
                          onChange={(e) => setDate1(e.value)}
                          placeholder={dayjs().format("MM/DD/YYYY")}
                        />
                        {/* <input type="text" className="form-control datetimepicker" placeholder="04/11/2023" /> */}
                        <span>
                          <i className="feather icon-calendar"></i>
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
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
                        {/* <TimePicker
                          placeholder="11:00 AM"
                          className="form-control timepicker"
                          onChange={onChange}
                          defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                        /> */}
                        {/* <span>
                          <i className="feather icon-clock"></i>
                        </span> */}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="column-group-main">
                  <div className="input-block">
                    <label>   {t('returnDate')}
                    </label>
                  </div>
                  <div className="input-block-wrapp">
                    <div className="input-block date-widge">
                      <div className="group-img">
                        <Calendar
                          value={date2}
                          onChange={(e) => setDate2(e.value)}
                          placeholder={dayjs().format("MM/DD/YYYY")}
                        />
                        <span>
                          <i className="feather icon-calendar" />
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
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
                </li>
                <li className="column-group-last">
                  <div className="input-block">
                    <div className="search-btn">
                      <button className="btn search-button" type="submit" onClick={() => navigate(routes.listingGrid)}>
                        {" "}
                        <i className="fa fa-search" aria-hidden="true" />
                        {t('search')}
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      {/* /Search */}
      {/* services */}
      <section className="section services">
        <div className="service-right">
          <ImageWithBasePath
            src="assets/img/bg/service-right.svg"
            className="img-fluid"
            alt="services right"
          />
        </div>
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>  {t('howItWorks')} </h2>
            <p>
              {t('howItWorksDescription')}
            </p>
          </div>
          {/* /Heading title */}
          <div className="services-work">
            <div className="row">
              <div
                className="col-lg-4 col-md-4 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="services-group service-date flex-fill">
                  <div className="services-icon border-secondary">
                    <ImageWithBasePath
                      className="icon-img bg-secondary"
                      src="assets/img/icons/services-icon-01.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>1.  {t('dateAndTime')}</h3>
                    <p>
                      {t('dateAndTimeDescription')}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-4 col-12  d-flex"
                data-aos="fade-down"
              >
                <div className="services-group service-loc flex-fill">
                  <div className="services-icon border-warning">
                    <ImageWithBasePath
                      className="icon-img bg-warning"
                      src="assets/img/icons/services-icon-02.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>2.  {t('checkAvailability')}</h3>
                    <p>
                      {t('checkAvailabilityDescription')}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-4 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="services-group service-book flex-fill">
                  <div className="services-icon border-dark">
                    <ImageWithBasePath
                      className="icon-img bg-dark"
                      src="assets/img/icons/services-icon-03.svg"
                      alt="Choose Locations"
                    />
                  </div>
                  <div className="services-content">
                    <h3>3.  {t('payCrypto')}</h3>

                    <p>
                      {t('payCryptoDescription')}

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /services */}
      {/* Popular Services */}
      <section className="section popular-services popular-explore">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>   {t('exploreOurCars')}
            </h2>

          </div>
          {/* /Heading title */}
          <div className="row justify-content-center">
            <div className="col-lg-12" data-aos="fade-down">
              {/* <div className="listing-tabs-group">
                <ul className="nav listing-buttons gap-3" data-bs-tabs="tabs">
                  {allCategories?.data?.map(category => (
                    <li
                      key={category.id}
                      onClick={() => handleFilter(category.id)}
                      style={{ marginRight: '10px' }}
                    >
                      <Link
                        className="active"
                        aria-current="true"
                        data-bs-toggle="tab"
                        to="#Carmazda"
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/car-icon-01.svg"
                            alt="Mazda"
                          />
                        </span>
                        {category.name}
                      </Link>
                    </li>
                  ))}

                </ul>
              </div> */}
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane active" id="Carmazda">
              <div className="row">
                {allCars?.data?.slice(0, 9).map(car => (
                  <div className="col-lg-4 col-md-6 col-12" key={car.id} data-aos="fade-down">
                    <div className="listing-item">
                      <div className="listing-img">
                        <Link to={routes.listingDetails.replace(':id', car.id)}>
                          <ImageWithBasePath
                            src={car?.image}
                            className="img-fluid"
                            alt="Car"
                          />
                        </Link>
                        <div
                          className="fav-item"
                          key={48}
                          onClick={() => handleItemClick(48)}
                        >
                          <span className="featured-text">{car.brand}</span>
                          <Link
                            to="#"
                            className={`fav-icon ${selectedItems[48] ? "selected" : ""}`}
                          >
                            <i className="feather icon-heart" />
                          </Link>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="listing-features">
                          {/* <Link to="#" className="author-img">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-02.jpg"
                              alt="author"
                            />
                          </Link> */}
                          <h3 className="listing-title">
                            <Link to={routes.listingDetails.replace(':id', car.id)}>{car.model}</Link>
                          </h3>
                          <div className="list-rating">
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <i className="fas fa-star filled" />
                            <span>(5.0)</span>
                          </div>
                        </div>
                        <div className="listing-details-group">
                          <ul>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/icons/car-parts-01.svg"
                                  alt="Auto"
                                />
                              </span>
                              <p>{car.engine}</p>
                            </li>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/icons/car-parts-02.svg"
                                  alt="22 KM"
                                />
                              </span>
                              <p>{car.color}</p>
                            </li>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/icons/car-parts-03.svg"
                                  alt="Petrol"
                                />
                              </span>
                              <p>{car.fuelType}</p>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/icons/car-parts-04.svg"
                                  alt="Diesel"
                                />
                              </span>
                              <p>{car.label}</p>
                            </li>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/icons/car-parts-05.svg"
                                  alt=""
                                />
                              </span>
                              <p>{car.year}</p>
                            </li>
                            <li>
                              <span>
                                <ImageWithBasePath
                                  src="assets/img/icons/car-parts-06.svg"
                                  alt="Persons"
                                />
                              </span>
                              <p>{car.seats}  {t('Persons')}</p>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-location-details">
                          <div className="listing-price">
                            <span>
                              <i className="feather icon-map-pin" />
                            </span>
                            Yerevan
                          </div>
                          <div className="listing-price">
                            <h6>
                              {car.prices[0].price}֏ <span>/ {t('Day')} </span>
                            </h6>
                          </div>
                        </div>
                        <div className="listing-button">
                          <Link
                            to={routes.listingDetails.replace(':id', car.id)}
                            className="btn btn-order"
                          >
                            <span>
                              <i className="feather icon-calendar me-2" />
                            </span>
                            Rent Now
                          </Link>
                        </div>
                        {/* <div className="listing-button">
                          <EmailModal />
                        </div> */}

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Popular Services */}


      {/* Rental deals */}
      <section className="section popular-services">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>{t('tours')} </h2>
            <p>
              {t('toursDescription')}
            </p>
          </div>
          {/* /Heading title */}
          <div className="row">
            <div className="popular-slider-group">
              <div className=" rental-deal-slider ">
                <Slider {...rentalslideroption} className="rental-slider">
                  {allCars?.data?.map(car => (
                    <div className="rental-car-item">
                      <div className="listing-item mb-0">
                        <div className="listing-img">
                          <Link to={routes.listingDetails}>
                            <img
                              src="assets/img/cars/rental-car-04.jpg"
                              className="img-fluid"
                              alt="Toyota"
                            />
                          </Link>
                          <div className="fav-item justify-content-end" key={58}
                            onClick={() => handleItemClick(58)}>
                            <Link to="#" className={`fav-icon ${selectedItems[58] ? 'selected' : ''
                              }`}>
                              <i className="feather  icon-heart" />
                            </Link>
                          </div>
                        </div>
                        <div className="listing-content">
                          <div className="listing-features">
                            <div className="fav-item-rental">
                              <span className="featured-text">$250/day</span>
                            </div>
                            <div className="list-rating">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <span>(4.5)</span>
                            </div>
                            <h3 className="listing-title">
                              <Link to={routes.listingDetails}>{car.model}</Link>
                            </h3>
                          </div>
                          <div className="listing-details-group">
                            <ul>
                              <li>
                                <span>
                                  <img
                                    src="assets/img/icons/car-parts-01.svg"
                                    alt="Auto"
                                  />
                                </span>
                                <p>Auto</p>
                              </li>
                              <li>
                                <span>
                                  <img
                                    src="assets/img/icons/car-parts-02.svg"
                                    alt="10 KM"
                                  />
                                </span>
                                <p>28 KM</p>
                              </li>
                              <li>
                                <span>
                                  <img
                                    src="assets/img/icons/car-parts-03.svg"
                                    alt="Petrol"
                                  />
                                </span>
                                <p>Petrol</p>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <span>
                                  <img
                                    src="assets/img/icons/car-parts-04.svg"
                                    alt="Power"
                                  />
                                </span>
                                <p>Power</p>
                              </li>
                              <li>
                                <span>
                                  <img
                                    src="assets/img/icons/car-parts-07.svg"
                                    alt={2018}
                                  />
                                </span>
                                <p>AC</p>
                              </li>
                              <li>
                                <span>
                                  <img
                                    src="assets/img/icons/car-parts-06.svg"
                                    alt="Persons"
                                  />
                                </span>
                                <p>5   {t('Persons')} </p>
                              </li>
                            </ul>
                          </div>
                          <div className="listing-button">
                            <Link
                              to={routes.listingDetails}
                              className="btn btn-order"
                            >
                              <span>
                                <i className="feather icon-calendar me-2" />
                              </span>
                              Rent Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}

                </Slider>
              </div>
            </div>
          </div>

          {/* View More */}
          <div className="view-all text-center" data-aos="fade-down">
            <Link
              to={routes.listingGrid}
              className="btn btn-view d-inline-flex align-items-center"
            >
              {t('allCarsButton')}
              <span>
                <i className="feather icon-arrow-right ms-2" />
              </span>
            </Link>
          </div>
          {/* View More */}
        </div>
      </section>
      {/* /Rental deals */}
      {/* Why Choose Us */}
      <section className="section why-choose popular-explore">
        <div className="choose-left">
          <ImageWithBasePath
            src="assets/img/bg/choose-left.png"
            className="img-fluid"
            alt="Why Choose Us"
          />
        </div>
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>
              {t('whyUs')}
            </h2>
            <p>
              {t('whyUsDescription')}
            </p>
          </div>
          {/* /Heading title */}
          <div className="why-choose-group">
            <div className="row">
              <div
                className="col-lg-4 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="choose-img choose-black">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-selection.svg"
                        alt=""
                      />
                    </div>
                    <div className="choose-content">
                      <h4> {t('easyBooking')}</h4>
                      <p>
                        {t('easyBookingDescription')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="choose-img choose-secondary">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-crown.svg"
                        alt=""
                      />
                    </div>
                    <div className="choose-content">
                      <h4> {t('manyPickupLocation')}</h4>
                      <p>
                        {t('manyPickupLocationDescription')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-12 d-flex"
                data-aos="fade-down"
              >
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="choose-img choose-primary">
                      <ImageWithBasePath
                        src="assets/img/icons/bx-user-check.svg"
                        alt=""
                      />
                    </div>
                    <div className="choose-content">
                      <h4> {t('customerSatisfaction')}</h4>
                      <p>
                        {t('customerSatisfactionDescription')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Why Choose Us */}
      {/* About us Testimonials */}
      <section className="section about-testimonial testimonials-section">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2 className="title text-white"> {t('peopleSay')} </h2>
            <p className="description text-white">
              {t('peopleSayDescription')}
            </p>
          </div>
          {/* /Heading title */}
          <div className="owl-carousel about-testimonials testimonial-group mb-0 owl-theme">
            {/* /Carousel Item  */}
            {/* Carousel Item */}
            <Slider {...setting}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-item d-flex">
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="quotes-head" />
                      <div className="review-box">
                        <div className="review-profile">
                          <div className="review-img">
                            <ImageWithBasePath
                              src={testimonial.image}
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                        </div>
                        <div className="review-details">
                          <h6>{testimonial.name}</h6>
                          <div className="list-rating">
                            <div className="list-rating-star">
                              {[...Array(Math.floor(testimonial.rating))].map(
                                (_, i) => (
                                  <i key={i} className="fas fa-star filled" />
                                )
                              )}
                            </div>
                            <p>
                              <span>({testimonial.rating})</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <p>{testimonial.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* /Carousel Item  */}
            {/* Carousel Item */}

            {/* /Carousel Item  */}
          </div>
        </div>
      </section>
      {/* About us Testimonials */}
      {/* FAQ  */}
      <section className="section faq-section bg-light-primary">
        <div className="container">
          {/* Heading title*/}
          <div className="section-heading" data-aos="fade-down">
            <h2>            {t('FAQ')}
            </h2>
            <p> {t('FAQDescription')}</p>
          </div>
          {/* /Heading title */}
          <div className="faq-info">
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapseds"
                  data-bs-toggle="collapse"
                  to="#faqOne"
                  aria-expanded="true"
                >
                  {t('FAQ1')}
                </Link>
              </h4>
              <div id="faqOne" className="card-collapse collapse show">
                <p>
                  {t('answer1')}
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#faqTwo"
                  aria-expanded="false"
                >
                  {t('FAQ2')}
                </Link>
              </h4>
              <div id="faqTwo" className="card-collapse collapse">
                <p>
                  {t('answer2')}
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#faqThree"
                  aria-expanded="false"
                >
                  {t('FAQ3')}
                </Link>
              </h4>
              <div id="faqThree" className="card-collapse collapse">
                <p>
                  {t('answer3')}
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#faqFour"
                  aria-expanded="false"
                >
                  {t('FAQ4')}
                </Link>
              </h4>
              <div id="faqFour" className="card-collapse collapse">
                <p>
                  {t('answer4')}
                </p>
              </div>
            </div>
            {/* <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#faqFive"
                  aria-expanded="false"
                >
                  What is your fuel policy?
                </Link>
              </h4>
              <div id="faqFive" className="card-collapse collapse">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#faqSix"
                  aria-expanded="false"
                >
                  Can I add additional drivers to my rental agreement?
                </Link>
              </h4>
              <div id="faqSix" className="card-collapse collapse">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="faq-card bg-white" data-aos="fade-down">
              <h4 className="faq-title">
                <Link
                  className="collapsed"
                  data-bs-toggle="collapse"
                  to="#faqSeven"
                  aria-expanded="false"
                >
                  What happens if I return the car late?
                </Link>
              </h4>
              <div id="faqSeven" className="card-collapse collapse">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* /FAQ */}
      <Footer />
    </>
  );
};

export default HomeOne;
