import React, { useEffect, useState, useRef } from "react";
import Breadcrumbs from "../common/breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useTranslation } from 'react-i18next';
import { Calendar } from "primereact/calendar";
import { TimePicker } from "antd";
import { Link } from "react-router-dom";
import Sliders from "rc-slider";
import "rc-slider/assets/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { all_routes } from "../router/all_routes";
import { getAllCars, getAllCategories } from "../../core/data/redux/slice/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCarsList, getCategories } from "../../core/data/redux/api/bookingApi";
import { toast } from "react-toastify";
import EmailModal from "./EmailModal";
import dayjs from "dayjs";
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";



const Listinglist = () => {
  const inputRef = useRef(null);
  const handleOnPlacesChanged = () => {
    const searchBox = inputRef.current;
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const filteredPlaces = places.filter((place) => {
          // Check if the place's geometry is within Yerevan bounds
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
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const allCars = useSelector(getAllCars);
  const allCategories = useSelector(getAllCategories);
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
  const handleFilter = (id) => {
    dispatch(getCarsList({ "categoryId": id }))
  }

  //end billing part
  const routes = all_routes;
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();

  const [activeHearts, setActiveHearts] = useState({
    heart1: false,
    heart2: false,
    heart3: false,
    heart4: false,
    heart5: false,
    heart6: false,
    heart7: false,
  });

  const toggleLike = (key) => {
    setActiveHearts((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const number = [
    { name: "5" },
    { name: "10" },
    { name: "15" },
    { name: "20" },
    { name: "25" },
    { name: "30" },
  ];
  const sort = [
    { name: "Newest" },
    { name: "Relevance" },
    { name: "Low to High" },
    { name: "High to Low" },
    { name: "Best Rated" },
    { name: "Distance" },
    { name: "Popularity" },
  ];

  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  const settings = {
    dots: true,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
  const { t } = useTranslation();

  return (
    <div className="listing-page">
      <Breadcrumbs title={t('carListings')}
        subtitle={t('carListings')}
        home={t('home')} />
      {/* Search */}

      <div className="section-search page-search">
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
                          placeholder="04/11/2023"
                        />
                        {/* <input type="text" className="form-control datetimepicker" placeholder="04/11/2023" /> */}
                        <span>
                          <i className="feather icon-calendar"></i>
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <TimePicker
                          placeholder="11:00 AM"
                          className="form-control timepicker"
                          onChange={onChange}
                          defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                        />
                        <span>
                          <i className="feather icon-clock"></i>
                        </span>
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
                          placeholder="04/11/2023"
                        />
                        <span>
                          <i className="feather icon-calendar" />
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <TimePicker
                          placeholder="11:00 AM"
                          className="form-control timepicker"
                          onChange={onChange}
                          defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                        />
                        <span>
                          <i className="feather icon-clock"></i>
                        </span>
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
      <div className="section-search page-search">
        <section className="section popular-services popular-explore">
          <div className="container">
            <div className="search-box-banner">
              <div className="listing-tabs-group">
                <ul className="nav listing-buttons gap-3" data-bs-tabs="tabs" style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {allCategories.data?.map(category => (
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
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* /Search */}

      {/* Sort By */}
      <div className="sort-section">
        <div className="container">
          <div className="sortby-sec">
            <div className="sorting-div">
              <div className="row d-flex align-items-center">
                <div className="col-xl-4 col-lg-3 col-sm-12 col-12">
                  <div className="count-search">
                    <p>  {t('showing')} {allCars?.data?.length}   {t('cars')}</p>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-9 col-sm-12 col-12">
                  <div className="product-filter-group">
                    {/* <div className="sortbyset">
                      <ul>
                        <li>
                          <span className="sortbytitle">Show : </span>
                          <div className="sorting-select select-one">
                            <Dropdown
                              value={selectedNumber}
                              onChange={(e) => setSelectedNumber(e.value)}
                              options={number}
                              optionLabel="name"
                              placeholder="5"
                              className="w-100"
                            />
                          </div>
                        </li>
                        <li>
                          <span className="sortbytitle">Sort By </span>
                          <div className="sorting-select select-two">
                            <Dropdown
                              value={selectedSort}
                              onChange={(e) => setSelectedSort(e.value)}
                              options={sort}
                              optionLabel="name"
                              placeholder="Newest"
                              className="w-100"
                            />
                          </div>
                        </li>
                      </ul>
                    </div> */}
                    <div className="grid-listview">
                      <ul>
                        <li>
                          <Link to={routes.listingGrid}>
                            <i className="feather icon-grid" />
                          </Link>
                        </li>
                        <li>
                          <Link to={routes.listingList} className="active">
                            <i className="feather icon-list" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Sort By */}
      {/* Car Grid View */}
      <section className="section car-listing pt-0">
        <div className="container">
          <div className="row">
            {/* paste sidebar txt code here if needed, make col-xl-9 col-lg-8 for list div to adjust the width of grid */}


            <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
              <div>
                {allCars.data?.map((car, index) => (
                  <div className="row">

                    <div className="listview-car">
                      <div className="card">
                        <div className="blog-widget d-flex">
                          <div className="blog-img">
                            <div className="img-slider listing-page-slider">
                              <Slider {...settings}>
                                <div className="slide-images">
                                  <Link>
                                    <ImageWithBasePath
                                      src="assets/img/car-list-1.jpg"
                                      className="img-fluid"
                                      alt="Toyota"
                                    />
                                  </Link>
                                </div>
                                <div className="slide-images">
                                  <Link to={routes.listingDetails.replace(':id', car.id)}>
                                    <ImageWithBasePath
                                      src="assets/img/car-list-1.jpg"
                                      className="img-fluid"
                                      alt="Toyota"
                                    />
                                  </Link>
                                </div>
                                <div className="slide-images">
                                  <Link to={routes.listingDetails.replace(':id', car.id)}>
                                    <ImageWithBasePath
                                      src="assets/img/car-list-1.jpg"
                                      className="img-fluid"
                                      alt="Toyota"
                                    />
                                  </Link>
                                </div>
                                <div className="slide-images">
                                  <Link to={routes.listingDetails.replace(':id', car.id)}>
                                    <ImageWithBasePath
                                      src="assets/img/car-list-1.jpg"
                                      className="img-fluid"
                                      alt="Toyota"
                                    />
                                  </Link>
                                </div>
                              </Slider>
                            </div>
                          </div>
                          <div className="bloglist-content w-100">
                            <div className="card-body">
                              <div className="blog-list-head d-flex">
                                <div className="blog-list-title">
                                  <h3>
                                    <Link to={routes.listingDetails.replace(':id', car.id)}>
                                      {car.model}
                                    </Link>
                                  </h3>
                                  <h6>
                                      {t('category')} : <span>{car.category}</span>
                                  </h6>
                                </div>
                                <div className="blog-list-rate">
                                  <h6>
                                  {t('from')} {car.prices[2].price}<span>֏/  {t('day')}</span>
                                  </h6>
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
                                        alt="10 KM"
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
                                    <p>{car.engine}</p>
                                  </li>
                                  <li>
                                    <span>
                                      <ImageWithBasePath
                                        src="assets/img/icons/car-parts-04.svg"
                                        alt="Power"
                                      />
                                    </span>
                                    <p>{car.fuelType}</p>
                                  </li>
                                  <li>
                                    <span>
                                      <ImageWithBasePath
                                        src="assets/img/icons/car-parts-06.svg"
                                        alt="Persons"
                                      />
                                    </span>
                                    <p>{car.seats}</p>
                                  </li>
                                  <li>
                                    <span>
                                      <ImageWithBasePath
                                        src="assets/img/icons/car-parts-05.svg"
                                        alt={2018}
                                      />
                                    </span>
                                    <p>{car.year}</p>
                                  </li>
                                </ul>
                              </div>
                              <div className="blog-list-head list-head-bottom d-flex">
                                <div className="blog-list-title">
                                  <div className="title-bottom">
                                    <div className="address-info">
                                      <h6>
                                        <i className="feather icon-map-pin" />
                                        {t('address')}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                                <EmailModal />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section-search page-search">
        <section className="section popular-services popular-explore">

          <div className="container">
            <div className="search-box-banner">
              <div className="col-xl-4 col-lg-3 col-sm-12 col-12">
                <div className="count-search">
                  <p>  {t('filter')}</p>
                </div>
              </div>
              <div className="listing-tabs-group">

                <ul className="nav listing-buttons gap-3" data-bs-tabs="tabs" style={{ display: 'flex', flexWrap: 'wrap' }}>

                  {allCategories.data?.map(category => (
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
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* /Car Grid View */}
    </div>
  );
};

export default Listinglist;
