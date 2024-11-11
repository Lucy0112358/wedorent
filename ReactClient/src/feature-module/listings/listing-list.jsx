import React, { useEffect, useState } from "react";
import Breadcrumbs from "../common/breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { TimePicker } from "antd";
import { Link } from "react-router-dom";
import Sliders from "rc-slider";
import "rc-slider/assets/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { all_routes } from "../router/all_routes";
import { getAllCars } from "../../core/data/redux/slice/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCarsList } from "../../core/data/redux/api/bookingApi";
import { toast } from "react-toastify";
import EmailModal from "./EmailModal";

const Listinglist = () => {
  //billing part
  const allCars = useSelector(getAllCars);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarsList()).then(
      res => {
        if (res.meta.requestStatus === 'rejected') {
          toast(res.error.message);
        }
        console.log(res)
      }
    );
  }, [])

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

  return (
    <div className="listing-page">
      <Breadcrumbs title="Car Listings" subtitle="Listings" />
      {/* Search */}
      <div className="section-search page-search">
        <div className="container">
          <div className="search-box-banner">
            <form >
              <ul className="align-items-center">
                {/* <li className="column-group-main">
                  <div className="input-block">
                    <label>Pickup Location</label>
                    <div className="group-img">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter City, Airport, or Address"
                      />
                      <span>
                        <i className="feather icon-map-pin" />
                      </span>
                    </div>
                  </div>
                </li> */}
                {/* <li className="column-group-main">
                  <div className="input-block">
                    <label>Pickup Date</label>
                  </div>
                  <div className="input-block-wrapp">
                    <div className="input-block date-widget">
                      <div className="group-img">
                        <Calendar
                          className="datetimepicker bg-custom"
                          value={date1}
                          onChange={(e) => setDate1(e.value)}
                          placeholder="Choose Date"
                        />
                        <span>
                          <i className="feather icon-calendar" />
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <TimePicker
                          placeholder="Choose Time"
                          className="form-control timepicker"
                          onChange={onChange}
                        />
                        <span>
                          <i className="feather icon-clock" />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="column-group-main">
                  <div className="input-block">
                    <label>Return Date</label>
                  </div>
                  <div className="input-block-wrapp">
                    <div className="input-block date-widge">
                      <div className="group-img">
                        <Calendar
                          className="datetimepicker bg-custom"
                          value={date2}
                          onChange={(e) => setDate2(e.value)}
                          placeholder="Choose Date"
                        />
                        <span>
                          <i className="feather icon-calendar" />
                        </span>
                      </div>
                    </div>
                    <div className="input-block time-widge">
                      <div className="group-img">
                        <TimePicker
                          placeholder="Choose Time"
                          className="form-control timepicker"
                          onChange={onChange}
                        />
                        <span>
                          <i className="feather icon-clock" />
                        </span>
                      </div>
                    </div>
                  </div>
                </li> */}
                <li className="column-group-last">
                  <div className="input-block">
                    <div className="search-btn">
                      <button className="btn search-button" type="submit">
                        {" "}
                        <i className="fa fa-search" aria-hidden="true" />
                        Filter1
                      </button>
                    </div>
                  </div>
                </li>
                <li className="column-group-last">
                  <div className="input-block">
                    <div className="search-btn">
                      <button className="btn search-button" type="submit">
                        {" "}
                        <i className="fa fa-search" aria-hidden="true" />
                        Search
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
      {/* Sort By */}
      <div className="sort-section">
        <div className="container">
          <div className="sortby-sec">
            <div className="sorting-div">
              <div className="row d-flex align-items-center">
                <div className="col-xl-4 col-lg-3 col-sm-12 col-12">
                  <div className="count-search">
                    <p>Showing 1-9 of 154 Cars</p>
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
                                  <Link to={routes.listingDetails}>
                                    <ImageWithBasePath
                                      src="assets/img/car-list-1.jpg"
                                      className="img-fluid"
                                      alt="Toyota"
                                    />
                                  </Link>
                                </div>
                                <div className="slide-images">
                                  <Link to={routes.listingDetails}>
                                    <ImageWithBasePath
                                      src="assets/img/car-list-1.jpg"
                                      className="img-fluid"
                                      alt="Toyota"
                                    />
                                  </Link>
                                </div>
                                <div className="slide-images">
                                  <Link to={routes.listingDetails}>
                                    <ImageWithBasePath
                                      src="assets/img/car-list-1.jpg"
                                      className="img-fluid"
                                      alt="Toyota"
                                    />
                                  </Link>
                                </div>
                                <div className="slide-images">
                                  <Link to={routes.listingDetails}>
                                    <ImageWithBasePath
                                      src="assets/img/car-list-1.jpg"
                                      className="img-fluid"
                                      alt="Toyota"
                                    />
                                  </Link>
                                </div>
                              </Slider>
                            </div>
                            {/* <div className="fav-item justify-content-end">
                              <span className="img-count">
                                <i className="feather icon-image" />
                                04
                              </span>
                              <Link
                                to="#"
                                className={`fav-icon ${activeHearts.heart1 ? "selected" : ""}`}
                                onClick={() => toggleLike("heart1")}
                              >
                                <i className="feather icon-heart" />
                              </Link>
                            </div> */}
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
                                    Category : <span>{car.model}</span>
                                  </h6>
                                </div>
                                <div className="blog-list-rate">
                                  {/* <div className="list-rating">
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star filled" />
                              <i className="fas fa-star" />
                              <span>180 Reviews</span>
                            </div> */}
                                  <h6>
                                    {car.price * 1000}<span>AMD/ Day</span>
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
                                    <p>{car.engine}</p>
                                  </li>
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
                                    {/* <div className="car-list-icon">
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-14.jpg"
                                  alt="user"
                                />
                              </div> */}
                                    <div className="address-info">
                                      <h6>
                                        <i className="feather icon-map-pin" />
                                        Yerevan, Armenia
                                      </h6>
                                    </div>
                                    {/* <div className="list-km">
                                <span className="km-count">
                                  <ImageWithBasePath
                                    src="assets/img/icons/map-pin.svg"
                                    alt="author"
                                  />
                                  3.2m
                                </span>
                              </div> */}
                                  </div>
                                </div>
                                {/* <div className="listing-button">
                                  <Link
                                    to={routes.listingDetails}
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
                            </div>
                          </div>
                          <div className="feature-text">
                            <span className="bg-danger">Featured</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}




              </div>
              {/*Pagination*/}
              {/* <div className="blog-pagination">
                <nav>
                  <ul className="pagination page-item justify-content-center">
                    <li className="previtem">
                      <Link className="page-link" to="#">
                        <i className="fas fa-regular fa-arrow-left me-2" /> Prev
                      </Link>
                    </li>
                    <li className="justify-content-center pagination-center">
                      <div className="page-group">
                        <ul>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              1
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="active page-link" to="#">
                              2{" "}
                              <span className="visually-hidden">(current)</span>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" to="#">
                              3
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nextlink">
                      <Link className="page-link" to="#">
                        Next{" "}
                        <i className="fas fa-regular fa-arrow-right ms-2" />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div> */}
              {/*/Pagination*/}
            </div>
          </div>
        </div>
      </section>
      {/* /Car Grid View */}
    </div>
  );
};

export default Listinglist;