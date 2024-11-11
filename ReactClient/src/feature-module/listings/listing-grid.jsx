import React, { useEffect, useState } from "react";
import Breadcrumbs from "../common/breadcrumbs";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { TimePicker } from "antd";
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

const ListingGrid = () => {
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
    heart8: false,
    heart9: false,
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

  const settings1 = {
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
  const settings2 = {
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
  const settings3 = {
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
  const settings4 = {
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
  const settings5 = {
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


  return (
    <div className="listing-page">

      <Breadcrumbs title="Car Listings" subtitle="Listings" />
      {/* Search */}
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
                    <p>Showing {allCars?.data.length} of 154 Cars</p>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-9 col-sm-12 col-12">
                  <div className="product-filter-group">
                    <div className="grid-listview">
                      <ul>
                        <li>
                          <Link to={routes.listingGrid} className="active">
                            <i className="feather icon-grid" />
                          </Link>
                        </li>
                        <li>
                          <Link to={routes.listingList}>
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
            <div className="col-lg-12">
              <div className="row">

                {
                  allCars.data?.map((car) => (
                    <div className="col-xxl-4 col-lg-6 col-md-6 col-12">
                      <div className="listing-item">
                        <div className="listing-img">
                          <div className="img-slider listing-page-slider">
                            <Slider {...settings1}>
                              <div className="slide-images">
                                <Link to={routes.listingDetails}>
                                  <ImageWithBasePath
                                    src="assets/img/cars/car-01.jpg"
                                    className="img-fluid"
                                    alt="Toyota"
                                  />
                                </Link>
                              </div>
                              <div className="slide-images">
                                <Link to={routes.listingDetails}>
                                  <ImageWithBasePath
                                    src="assets/img/cars/car-01-slide1.jpg"
                                    className="img-fluid"
                                    alt="Toyota"
                                  />
                                </Link>
                              </div>
                              <div className="slide-images">
                                <Link to={routes.listingDetails}>
                                  <ImageWithBasePath
                                    src="assets/img/cars/car-01-slide2.jpg"
                                    className="img-fluid"
                                    alt="Toyota"
                                  />
                                </Link>
                              </div>
                              <div className="slide-images">
                                <Link to={routes.listingDetails}>
                                  <ImageWithBasePath
                                    src="assets/img/cars/car-01-slide3.jpg"
                                    className="img-fluid"
                                    alt="Toyota"
                                  />
                                </Link>
                              </div>
                            </Slider>
                          </div>
                          <span className="featured-text">Toyota</span>
                        </div>
                        <div className="listing-content">
                          <div className="listing-features d-flex align-items-end justify-content-between">
                            <div className="list-rating">
                              <Link to="#" className="author-img">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-04.jpg"
                                  alt="author"
                                />
                              </Link>
                              <h3 className="listing-title">
                              <Link to={routes.listingDetails.replace(':id', car.id)}>
                                  {car.model}
                                </Link>
                              </h3>
                              <div className="list-rating">
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star" />
                                <span>(4.0) 138 Reviews</span>
                              </div>
                            </div>
                            <div className="list-km">
                              <span className="km-count">
                                <ImageWithBasePath
                                  src="assets/img/icons/map-pin.svg"
                                  alt="author"
                                />
                                3.2m
                              </span>
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
                                <p>Auto</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-02.svg"
                                    alt="10 KM"
                                  />
                                </span>
                                <p>10 KM</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
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
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-04.svg"
                                    alt="Power"
                                  />
                                </span>
                                <p>Power</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-05.svg"
                                    alt='2018'
                                  />
                                </span>
                                <p>2018</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-06.svg"
                                    alt="Persons"
                                  />
                                </span>
                                <p>5 Persons</p>
                              </li>
                            </ul>
                          </div>
                          <div className="listing-location-details">
                            <div className="listing-price">
                              <span>
                                <i className="feather icon-map-pin" />
                              </span>
                              Washington
                            </div>
                            <div className="listing-price">
                              <h6>
                                {car?.prices[0].price} ֏ <span>/ Day</span>
                              </h6>
                            </div>
                          </div>
                          {/* <div className="listing-button">
                            <Link
                             // to={routes.listingDetails}
                              className="btn btn-order"
                            >
                              <span>
                                <i className="feather icon-calendar me-2" />
                              </span>
                              Rent Now
                            </Link>
                          </div> */}
                          <EmailModal />
                        </div>
                        <div className="feature-text">
                          <span className="bg-danger">Featured</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Car Grid View */}
    </div>
  );
};

export default ListingGrid;
