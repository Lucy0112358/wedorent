import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../common/breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import { all_routes } from "../router/all_routes";
import { Dropdown } from "primereact/dropdown";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getBookingCar, getBookingData, setBookingData } from "../../core/data/redux/slice/bookingSlice";
import { useParams } from 'react-router-dom';
import { getCar } from "../../core/data/redux/api/bookingApi";

const listingDetails = () => {
  const routes = all_routes;
  const [date1, setDate1] = useState(null);
  const bigImgSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [date2, setDate2] = useState(null);
  const types = [
    { name: " Newyork Office - 78, 10th street Laplace USA" },
    { name: "Newyork Office - 12, 5th street USA" },
  ];
  const Location = [
    { name: " Newyork Office - 78, 10th street Laplace USA" },
    { name: "Newyork Office - 12, 5th street USA" },
  ];

  //Get booking dataaa
  const data = useParams();
  const paramsId = data.id;
  const navigate = useNavigate();
  const bookingCar = useSelector(getBookingCar);
  useEffect(() => {
    if (paramsId) {
      dispatch(getCar(paramsId))
    }else {
      navigate(routes.listingList);
    }
  }, [paramsId]);

  useEffect(()=>{
    handleDetails("carId", paramsId)
  }, [bookingCar])
  const bookingData = useSelector(getBookingData)

  console.log(bookingData, "bookingDatabookingDatabookingData")
  console.log(bookingCar.data, 'bookingCarbookingCar')

  const handleDetails = (key, value) => {
    let existBookingInfo = {
      ...bookingData,
      [key]: value
    };
    dispatch(setBookingData( existBookingInfo ))
  }



  const dispatch = useDispatch()
  const handleBookingData = (key, value) => {
    console.log(key, value)
    dispatch(setBookingData({key, value}))

  }

  const pickerOne = (time, timeString) => {
    handleDetails('pickerOne', timeString)
  };

  const pickerTwo = (time, timeString) => {
    handleDetails('pickerTwo', timeString)
  };

  //ENd Get booking dataaa

  // const onChange = (time, timeString) => {
  //   console.log(time, timeString);
  // };
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const handleItemClick = (index) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      thumb: "assets/img/gallery/gallery-thumb-01.jpg",
      big: "/assets/img/gallery/gallery-big-01.jpg",
    },
    {
      thumb: "assets/img/gallery/gallery-thumb-02.jpg",
      big: "/assets/img/gallery/gallery-big-02.jpg",
    },
    {
      thumb: "assets/img/gallery/gallery-thumb-03.jpg",
      big: "/assets/img/gallery/gallery-big-03.jpg",
    },
    {
      thumb: "assets/img/gallery/gallery-thumb-04.jpg",
      big: "/assets/img/gallery/gallery-big-04.jpg",
    },
  ];
 
  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
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

  useEffect(() => {
    if (bigImgSliderRef.current && thumbnailSliderRef.current) {
      bigImgSliderRef.current.slickGoTo(0);
      thumbnailSliderRef.current.slickGoTo(0);
    }
  }, []);
  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
  }, []);
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
      setNav1(sliderRef1.current);
      setNav2(sliderRef2.current);
  }, []);
 
  const settings1 = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2 || undefined, // Link to the second slider
    ref: (slider) => (sliderRef1.current = slider), // Assign the slider ref
   
};

const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: nav1 || undefined,
    ref: (slider) => (sliderRef2.current = slider), // Assign the slider ref
   
};
  return (
    <div className="main-wrapper">
      {/* <Breadcrumbs title="Chevrolet Camaro" subtitle="Listings" /> */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">{bookingCar.data?.model}</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={routes.homeOne}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={routes.listingGrid}>Cars</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {bookingCar.data?.model}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
     <section className="section product-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="detail-product">
                <div className="pro-info">
                 
                  <ul>
                    <li className="del-airport">
                      <i className="fa-solid fa-check" />
                      Airport delivery
                    </li>
                    <li className="del-home">
                      <i className="fa-solid fa-check" />
                      Home delivery
                    </li>
                  </ul>
                </div>

               
                  <div className="slider detail-bigimg">
                  <Slider {...settings1}>
                    <div className="product-img">
                    <ImageWithBasePath src="assets/img/cars/slider-01.jpg" alt="Slider" />
                    </div>
                    <div className="product-img">
                    <ImageWithBasePath src="assets/img/cars/slider-02.jpg" alt="Slider" />
                    </div>
                    <div className="product-img">
                    <ImageWithBasePath src="assets/img/cars/slider-03.jpg" alt="Slider" />
                    </div>
                    <div className="product-img">
                    <ImageWithBasePath src="assets/img/cars/slider-04.jpg" alt="Slider" />
                    </div>
                    <div className="product-img">
                    <ImageWithBasePath src="assets/img/cars/slider-05.jpg" alt="Slider" />
                    </div>
                    </Slider>
                  </div>
                  <div className="slider slider-nav-thumbnails">
                  <Slider {...settings2}>
                    <div>
                    <ImageWithBasePath
                        src="assets/img/cars/slider-thum-01.jpg"
                        alt="product image"
                      />
                    </div>
                    <div>
                    <ImageWithBasePath
                        src="assets/img/cars/slider-thum-02.jpg"
                        alt="product image"
                      />
                    </div>
                    <div>
                    <ImageWithBasePath
                        src="assets/img/cars/slider-thum-03.jpg"
                        alt="product image"
                      />
                    </div>
                    <div>
                    <ImageWithBasePath
                        src="assets/img/cars/slider-thum-04.jpg"
                        alt="product image"
                      />
                    </div>
                    <div>
                    <ImageWithBasePath
                        src="assets/img/cars/slider-thum-05.jpg"
                        alt="product image"
                      />
                    </div>
                    </Slider>
                  </div>
               
              </div>
              <>
                <div className="review-sec pb-0">
                  <div className="review-header">
                    <h4>Extra Service</h4>
                  </div>
                  <div className="lisiting-service">
                    <div className="row">
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-01.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>GPS Navigation Systems</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-02.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Wi-Fi Hotspot</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-03.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Child Safety Seats</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-04.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Fuel Options</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-05.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Roadside Assistance</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-06.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Satellite Radio</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-07.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Additional Accessories</p>
                        </div>
                      </div>
                      <div className="servicelist d-flex align-items-center col-xxl-3 col-xl-4 col-sm-6">
                        <div className="service-img">
                          <ImageWithBasePath
                            src="assets/img/icons/service-08.svg"
                            alt="Icon"
                          />
                        </div>
                        <div className="service-info">
                          <p>Express Check-in/out</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             
                {/* Specifications */}
                <div className="review-sec specification-card ">
                  <div className="review-header">
                    <h4>Specifications</h4>
                  </div>
                  <div className="card-body">
                    <div className="lisiting-featues">
                      <div className="row">
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-1.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Body </span>
                            <h6> Sedan</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-2.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Make </span>
                            <h6> Nisssan</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-3.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Transmission </span>
                            <h6> Automatic</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-4.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Fuel Type </span>
                            <h6> Diesel</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-5.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Mileage </span>
                            <h6>16 Km</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-6.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Drivetrian </span>
                            <h6>Front Wheel</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-7.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Year</span>
                            <h6> 2018</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-8.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>AC </span>
                            <h6> Air Condition</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-9.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>VIN </span>
                            <h6> 45456444</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-10.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Door </span>
                            <h6> 4 Doors</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-11.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Brake </span>
                            <h6> ABS</h6>
                          </div>
                        </div>
                        <div className="featureslist d-flex align-items-center col-xl-3 col-md-4 col-sm-6">
                          <div className="feature-img">
                            <ImageWithBasePath
                              src="assets/img/specification/specification-icon-12.svg"
                              alt="Icon"
                            />
                          </div>
                          <div className="featues-info">
                            <span>Engine (Hp) </span>
                            <h6> 3,000</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Specifications */}
              
                {/* Gallery */}
                <div className="review-sec mb-0 pb-0">
                  <div className="review-header">
                    <h4>Gallery</h4>
                  </div>
                  <div className="gallery-list">
                    <div className="d-flex">
                      <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={images.map((image) => ({ src: image.big }))}
                        index={currentIndex}
                        onIndexChange={(index) => setCurrentIndex(index)}
                      />
                      {images.map((image, index) => (
                        <div key={index}>
                          {" "}
                          <ul>
                            <li>
                              <div className="gallery-widget">
                                <Link
                                  to="#"
                                  data-fancybox="gallery"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openLightbox(index);
                                  }}
                                >
                                  <ImageWithBasePath
                                    className="img-fluid"
                                    alt="Image"
                                    src={image.thumb}
                                  />
                                </Link>
                              </div>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* /Gallery */}            
              
                {/* Policies */}
                <div className="review-sec">
                  <div className="review-header">
                    <h4>Policies</h4>
                  </div>
                  <div className="policy-list">
                    <div className="policy-item">
                      <div className="policy-info">
                        <h6>Cancellation Charges</h6>
                        <p>
                          Cancellation charges will be applied as per the policy
                        </p>
                      </div>
                      <Link to={routes. privacyPolicy}>Know More</Link>
                    </div>
                    <div className="policy-item">
                      <div className="policy-info">
                        <h6>Policy</h6>
                        <p>
                          I hereby agree to the terms and conditions of the
                          Lease Agreement with Host
                        </p>
                      </div>
                      <Link to={routes.privacyPolicy}>View Details</Link>
                    </div>
                  </div>
                </div>
                {/* /Policies */}
              
           
              </>
            </div>
            <div className="col-lg-4 theiaStickySidebar">
              <div className="stickybar">
                <div className="review-sec mt-0">
                  <div className="review-header">
                    <h4>Pricing Details</h4>
                  </div>
                  <div className="price-list">
                    <div className="price-item">
                      <p>Per day (8 Hours)</p>
                      <h6>$300</h6>
                    </div>
                    <div className="message-btn">
                    <Link to="https://wa.me/+37444773300" className="chat-link">
                      <i className="fa-brands fa-whatsapp" />
                      Chat Via Whatsapp
                    </Link>
                  </div>                    
                  </div>
                </div>
                <div className="review-sec mt-0">
                  {/* <div className="review-header">
                    <h4>Check Availability</h4>
                  </div> */}
                  <div className="location-content">

                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="delivery">
                        <form className="">
                          <ul>
                            <li className="column-group-last">
                              <div className="input-block mb-0">
                                <div className="search-btn">
                                  <Link
                                    to={routes.bookingCheckout}
                                    className="btn btn-primary check-available w-100"
                                  >
                                    Book
                                  </Link>
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#enquiry"
                                    className="btn btn-theme"
                                  >
                                    Enquire Us
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="review-sec share-car mt-0 mb-0">
                  <div className="review-header">
                    <h4>Share</h4>
                  </div>
                  <ul className="nav-social">
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-facebook-f fa-facebook fi-icon" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fab fa-instagram fi-icon" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fab fa-behance fi-icon" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-pinterest-p fi-icon" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fab fa-twitter fi-icon" />{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fab fa-linkedin fi-icon" />
                      </Link>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="details-car-grid">
                <div className="details-slider-heading">
                  <h3>You May be Interested in</h3>
                </div>
                <div className="rental-deal-slider details-car owl-carousel">
                  <Slider {...settings}>
                    <div className="rental-car-item">
                      <div className="listing-item pb-0">
                        <div className="listing-img">
                          <Link to={routes.listingDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-03.jpg"
                              className="img-fluid"
                              alt="Audi"
                            />
                          </Link>
                          <div
                            className="fav-item justify-content-end"
                            key={2}
                            onClick={() => handleItemClick(2)}
                          >
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[2] ? "selected" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <span className="featured-text">Audi</span>
                        </div>
                        <div className="listing-content">
                          <div className="listing-features d-flex align-items-end justify-content-between">
                            <div className="list-rating">
                              <Link
                                to="#"
                                className="author-img"
                              >
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-03.jpg"
                                  alt="author"
                                />
                              </Link>
                              <h3 className="listing-title">
                                <Link to={routes.listingDetails}>
                                  Audi A3 2019 new
                                </Link>
                              </h3>
                              <div className="list-rating">
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star" />
                                <span>(4.0) 150 Reviews</span>
                              </div>
                            </div>
                            <div className="list-km">
                              <span className="km-count">
                                <ImageWithBasePath
                                  src="assets/img/icons/map-pin.svg"
                                  alt="author"
                                />
                                3.5m
                              </span>
                            </div>
                          </div>
                          <div className="listing-details-group">
                            <ul>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-05.svg"
                                    alt="Manual"
                                  />
                                </span>
                                <p>Manual</p>
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
                                    alt={2019}
                                  />
                                </span>
                                <p>2019</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-06.svg"
                                    alt="Persons"
                                  />
                                </span>
                                <p>4 Persons</p>
                              </li>
                            </ul>
                          </div>
                          <div className="listing-location-details">
                            <div className="listing-price">
                              <span>
                                <i className="feather-map-pin" />
                              </span>
                              Newyork, USA
                            </div>
                            <div className="listing-price">
                              <h6>
                                $45 <span>/ Day</span>
                              </h6>
                            </div>
                          </div>
                          <div className="listing-button">
                            <Link
                              to={routes.listingDetails}
                              className="btn btn-order"
                            >
                              <span>
                                <i className="feather-calendar me-2" />
                              </span>
                              Rent Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rental-car-item">
                      <div className="listing-item pb-0">
                        <Link to={routes.listingDetails}>
                          <ImageWithBasePath
                            src="assets/img/cars/car-01.jpg"
                            className="img-fluid"
                            alt="Toyota"
                          />
                        </Link>
                        <div className="listing-content">
                          <div className="listing-features d-flex align-items-end justify-content-between">
                            <div className="list-rating">
                              <Link
                                to="#"
                                className="author-img"
                              >
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-04.jpg"
                                  alt="author"
                                />
                              </Link>
                              <h3 className="listing-title">
                                <Link to={routes.listingDetails}>
                                  Toyota Camry SE 350
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
                                    alt={2018}
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
                                <i className="feather-map-pin" />
                              </span>
                              Washington
                            </div>
                            <div className="listing-price">
                              <h6>
                                $160 <span>/ Day</span>
                              </h6>
                            </div>
                          </div>
                          <div className="listing-button">
                            <Link
                              to={routes.listingDetails}
                              className="btn btn-order"
                            >
                              <span>
                                <i className="feather-calendar me-2" />
                              </span>
                              Rent Now
                            </Link>
                          </div>
                        </div>
                        <div className="feature-text">
                          <span className="bg-danger">Featured</span>
                        </div>
                      </div>
                    </div>

                    <div className="rental-car-item">
                      <div className="listing-item pb-0">
                        <div className="listing-img">
                          <Link to={routes.listingDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-04.jpg"
                              className="img-fluid"
                              alt="Audi"
                            />
                          </Link>
                          <div
                            className="fav-item justify-content-end"
                            key={3}
                            onClick={() => handleItemClick(3)}
                          >
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[3] ? "selected" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <span className="featured-text">Ferrai</span>
                        </div>
                        <div className="listing-content">
                          <div className="listing-features d-flex align-items-end justify-content-between">
                            <div className="list-rating">
                              <Link
                                to="#"
                                className="author-img"
                              >
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-04.jpg"
                                  alt="author"
                                />
                              </Link>
                              <h3 className="listing-title">
                                <Link to={routes.listingDetails}>
                                  Ferrari 458 MM Speciale
                                </Link>
                              </h3>
                              <div className="list-rating">
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star" />
                                <span>(4.0) 160 Reviews</span>
                              </div>
                            </div>
                            <div className="list-km">
                              <span className="km-count">
                                <ImageWithBasePath
                                  src="assets/img/icons/map-pin.svg"
                                  alt="author"
                                />
                                3.5m
                              </span>
                            </div>
                          </div>
                          <div className="listing-details-group">
                            <ul>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-05.svg"
                                    alt="Manual"
                                  />
                                </span>
                                <p>Manual</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-02.svg"
                                    alt="14 KM"
                                  />
                                </span>
                                <p>14 KM</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-03.svg"
                                    alt="Diesel"
                                  />
                                </span>
                                <p>Diesel</p>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-04.svg"
                                    alt="Basic"
                                  />
                                </span>
                                <p>Basic</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-05.svg"
                                    alt={2022}
                                  />
                                </span>
                                <p>2022</p>
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
                                <i className="feather-map-pin" />
                              </span>
                              Newyork, USA
                            </div>
                            <div className="listing-price">
                              <h6>
                                $160 <span>/ Day</span>
                              </h6>
                            </div>
                          </div>
                          <div className="listing-button">
                            <Link
                              to={routes.listingDetails}
                              className="btn btn-order"
                            >
                              <span>
                                <i className="feather-calendar me-2" />
                              </span>
                              Rent Now
                            </Link>
                          </div>
                        </div>
                        <div className="feature-text">
                          <span className="bg-danger">Featured</span>
                        </div>
                      </div>
                    </div>

                    <div className="rental-car-item">
                      <div className="listing-item pb-0">
                        <div className="listing-img">
                          <Link to={routes.listingDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-05.jpg"
                              className="img-fluid"
                              alt="Audi"
                            />
                          </Link>
                          <div
                            className="fav-item justify-content-end"
                            key={4}
                            onClick={() => handleItemClick(4)}
                          >
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[4] ? "selected" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <span className="featured-text">Chevrolet</span>
                        </div>
                        <div className="listing-content">
                          <div className="listing-features d-flex align-items-end justify-content-between">
                            <div className="list-rating">
                              <Link
                                to="#"
                                className="author-img"
                              >
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-05.jpg"
                                  alt="author"
                                />
                              </Link>
                              <h3 className="listing-title">
                                <Link to={routes.listingDetails}>
                                  2018 Chevrolet Camaro
                                </Link>
                              </h3>
                              <div className="list-rating">
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <span>(5.0) 200 Reviews</span>
                              </div>
                            </div>
                            <div className="list-km">
                              <span className="km-count">
                                <ImageWithBasePath
                                  src="assets/img/icons/map-pin.svg"
                                  alt="author"
                                />
                                4.5m
                              </span>
                            </div>
                          </div>
                          <div className="listing-details-group">
                            <ul>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-05.svg"
                                    alt="Manual"
                                  />
                                </span>
                                <p>Manual</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-02.svg"
                                    alt="18 KM"
                                  />
                                </span>
                                <p>18 KM</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-03.svg"
                                    alt="Diesel"
                                  />
                                </span>
                                <p>Diesel</p>
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
                                    alt={2018}
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
                                <p>4 Persons</p>
                              </li>
                            </ul>
                          </div>
                          <div className="listing-location-details">
                            <div className="listing-price">
                              <span>
                                <i className="feather-map-pin" />
                              </span>
                              Germany
                            </div>
                            <div className="listing-price">
                              <h6>
                                $36 <span>/ Day</span>
                              </h6>
                            </div>
                          </div>
                          <div className="listing-button">
                            <Link
                              to={routes.listingDetails}
                              className="btn btn-order"
                            >
                              <span>
                                <i className="feather-calendar me-2" />
                              </span>
                              Rent Now
                            </Link>
                          </div>
                        </div>
                        <div className="feature-text">
                          <span className="bg-warning">Top Rated</span>
                        </div>
                      </div>
                    </div>

                    <div className="rental-car-item">
                      <div className="listing-item">
                        <div className="listing-img">
                          <Link to={routes.listingDetails}>
                            <ImageWithBasePath
                              src="assets/img/cars/car-06.jpg"
                              className="img-fluid"
                              alt="Audi"
                            />
                          </Link>
                          <div
                            className="fav-item justify-content-end"
                            key={5}
                            onClick={() => handleItemClick(5)}
                          >
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[5] ? "selected" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <span className="featured-text">Acura</span>
                        </div>
                        <div className="listing-content">
                          <div className="listing-features d-flex align-items-end justify-content-between">
                            <div className="list-rating">
                              <Link
                                to="#"
                                className="author-img"
                              >
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-06.jpg"
                                  alt="author"
                                />
                              </Link>
                              <h3 className="listing-title">
                                <Link to={routes.listingDetails}>
                                  Acura Sport Version
                                </Link>
                              </h3>
                              <div className="list-rating">
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star filled" />
                                <i className="fas fa-star" />
                                <span>(4.0) 125 Reviews</span>
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
                                    alt="12 KM"
                                  />
                                </span>
                                <p>12 KM</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-03.svg"
                                    alt="Diesel"
                                  />
                                </span>
                                <p>Diesel</p>
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
                                    alt={2013}
                                  />
                                </span>
                                <p>2013</p>
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
                                <i className="feather-map-pin" />
                              </span>
                              Newyork, USA
                            </div>
                            <div className="listing-price">
                              <h6>
                                $30 <span>/ Day</span>
                              </h6>
                            </div>
                          </div>
                          <div className="listing-button">
                            <Link
                              to={routes.listingDetails}
                              className="btn btn-order"
                            >
                              <span>
                                <i className="feather-calendar me-2" />
                              </span>
                              Rent Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal custom-modal fade check-availability-modal"
        id="pages_edit"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <div className="form-header text-start mb-0">
                <h4 className="mb-0 text-dark fw-bold">Availability Details</h4>
              </div>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span className="align-center" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="available-for-ride">
                    <p>
                      <i className="fa-regular fa-circle-check" />
                      Chevrolet Camaro is available for a ride
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="row booking-info">
                    <div className="col-md-4 pickup-address">
                      <h5>Pickup</h5>
                      <p>45, 4th Avanue Mark Street USA</p>
                      <span>Date &amp; time : 11 Jan 2023</span>
                    </div>
                    <div className="col-md-4 drop-address">
                      <h5>Drop Off</h5>
                      <p>78, 10th street Laplace USA</p>
                      <span>Date &amp; time : 11 Jan 2023</span>
                    </div>
                    <div className="col-md-4 booking-amount">
                      <h5>Booking Amount</h5>
                      <h6>
                        <span>$300 </span> /day
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="booking-info seat-select">
                    <h6>Extra Service</h6>
                    <label className="custom_check">
                      <input
                        type="checkbox"
                        name="rememberme"
                        className="rememberme"
                      />
                      <span className="checkmark" />
                      Baby Seat - <span className="ms-2">$10</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="booking-info pay-amount">
                    <h6>Deposit Option</h6>
                    <div className="radio radio-btn">
                      <label>
                        <input type="radio" name="radio" /> Pay Deposit
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input type="radio" name="radio" /> Full Amount
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6" />
                <div className="col-md-6">
                  <div className="booking-info service-tax">
                    <ul>
                      <li>
                        Booking Price <span>$300</span>
                      </li>
                      <li>
                        Extra Service <span>$10</span>
                      </li>
                      <li>
                        Tax <span>$5</span>
                      </li>
                    </ul>
                  </div>
                  <div className="grand-total">
                    <h5>Grand Total</h5>
                    <span>$315</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Link to={routes.booking} className="btn btn-back">
                Go to Details
                <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default listingDetails;
