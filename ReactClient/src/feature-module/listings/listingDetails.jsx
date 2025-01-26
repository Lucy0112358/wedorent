import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../common/breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import EmailModal from "./EmailModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import { all_routes } from "../router/all_routes";
import { useTranslation } from 'react-i18next';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getCarsList, getCategories  } from "../../core/data/redux/api/bookingApi";
import { getBookingCar,getAllCars, getBookingData, setBookingData } from "../../core/data/redux/slice/bookingSlice";
import { useParams } from 'react-router-dom';
import { getCar } from "../../core/data/redux/api/bookingApi";

const listingDetails = () => {
    const { t, i18n } = useTranslation();
  const allCars = useSelector(getAllCars);
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
  const dispatch = useDispatch()
  //Get booking dataaa
  const data = useParams();
  const paramsId = data.id;
  const navigate = useNavigate();
  const bookingCar = useSelector(getBookingCar);

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

  useEffect(() => {
    dispatch(setBookingData())
    if (paramsId) {
      dispatch(getCar(paramsId));
      localStorage.setItem('carId', paramsId);
    }else {
      navigate(routes.listingList);
    }
  }, [paramsId]);

  useEffect(()=>{
    handleDetails("carId", paramsId)
  }, [bookingCar])
  const bookingData = useSelector(getBookingData)


  const handleDetails = (key, value) => {
    let existBookingInfo = {
      ...bookingData,
      [key]: value
    };
    dispatch(setBookingData( existBookingInfo ))
  }




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

  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  // const handleItemClick = (index) => {
  //   setSelectedItems((prevSelectedItems) => {
  //     const updatedSelectedItems = [...prevSelectedItems];
  //     updatedSelectedItems[index] = !updatedSelectedItems[index];
  //     return updatedSelectedItems;
  //   });
  // };
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
 
 
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
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  //  asNavFor: nav2 || undefined, // Link to the second slider
   // ref: (slider) => (sliderRef1.current = slider), // Assign the slider ref
   
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
                    <Link to={routes.homeOne}> {t('home')}</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={routes.listingGrid}> {t('cars')}</Link>
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
                      {t('airoport')}
                    </li>
                    <li className="del-home">
                      <i className="fa-solid fa-check" />
                      {t('house')}
                    </li>
                  </ul>
                </div>
               
                 <div className="slider detail-bigimg">
                  <Slider {...settings1}>
                    <div className="product-img">
                    <ImageWithBasePath src={bookingCar.data?.image}  alt="Slider" />
                    </div>
                    <div style={{display: "none"}} className="product-img">
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
                  {/* <Slider {...settings2}>
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
                    </Slider> */}
                  </div> 
               
              </div>
              <>
                <div className="review-sec pb-0">
                  <div className="review-header">
                    <h4> {t('extraService')}</h4>
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
                          <p>{t('fullInsurance')}</p>
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
                          <p>{t('wifi')}</p>
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
                          <p>{t('childSeat')}</p>
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
                          <p>{t('fuelOpyions')}</p>
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
                          <p>{t('booster')}</p>
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
                          <p>{t('house')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             
                {/* Specifications */}
                <div className="review-sec specification-card ">
                  <div className="review-header">
                    <h4>{t('specifications')}</h4>
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
                            <span>{t('brand')} </span>
                            <h6> {bookingCar?.data?.brand}</h6>
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
                            <span>{t('model')} </span>
                            <h6> {bookingCar?.data?.model}</h6>
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
                            <span>{t('label')} </span>
                            <h6> {bookingCar?.data?.label}</h6>
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
                            <span>{t('fuelOpyions')} </span>
                            <h6> {bookingCar?.data?.fuelType}</h6>
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
                            <span>{t('tag')} </span>
                            <h6>{bookingCar?.data?.tag}</h6>
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
                            <span>{t('year')}</span>
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
                            <span>{t('transmission')} </span>
                            <h6> {bookingCar?.data?.engine}</h6>
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
                            <span>{t('color')} </span>
                            <h6> {bookingCar?.data?.color}</h6>
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
                            <span>{t('door')} </span>
                            <h6> {bookingCar?.data?.doors}</h6>
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
                            <span>{t('seats')} </span>
                            <h6> {bookingCar?.data?.seats}</h6>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                {/* Specifications */}
              
             
              
                {/* Policies */}
                <div className="review-sec">
                  <div className="review-header">
                    <h4>{t('policies')}</h4>
                  </div>
                  <div className="policy-list">
                    <div className="policy-item">
                      <div className="policy-info">
                        <h6>{t('cancel')}</h6>
                        <p>
                        {t('charges')}
                        </p>
                      </div>
                    </div>
                    <div className="policy-item">
                      <div className="policy-info">
                        <h6> {t('policy')}</h6>
                        <p>
                        {t('outsideYerevan')}
                        </p>
                      </div>
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
                    <h4> {t('pricing')}</h4>
                  </div>
                  <div className="price-list">
                    {bookingCar?.data?.prices.map(priceList => {
                     return <div className="price-item">
                      <p>{priceList.minDays}-{priceList.maxDays} {t('Day')}</p>
                      <h6>{priceList.price} ֏/{t('Day')}</h6>
                    </div>
                    })}
                    
                    <div className="message-btn">
                    <Link to="https://wa.me/+37444773300" className="chat-link">
                      <i className="fa-brands fa-whatsapp" />
                      {t('whatsapp')}
                    </Link>
                  </div>                    
                  </div>
                </div>
                <div className="review-sec mt-0">
                 
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
                                      {t('book')}
                                  </Link>
                                  {/* <Link
                                   // to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#enquiry"
                                    className="btn btn-theme"
                                  >
                                    Enquire Us
                                  </Link>
                                  <EmailModal /> */}
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
                  <h3>  {t('interested')}</h3>
                </div>
                <div className="rental-deal-slider details-car owl-carousel">
                  <Slider {...settings}>
                    {allCars?.data?.length > 0 && allCars?.data.map(car => {
                      return   <div className="rental-car-item">
                      <div className="listing-item pb-0">
                        <div className="listing-img">
                          <Link  to={routes.listingDetails.replace(':id', car.id)}>
                            <ImageWithBasePath
                               src={car?.image}
                              className="img-fluid"
                              alt="Audi"
                            />
                          </Link>
                          <div
                            className="fav-item justify-content-end"
                            key={2}
                            onClick={() => handleItemClick(2)}
                          >

                          </div>
                          <span className="featured-text">{car.tag}</span>
                        </div>
                        <div className="listing-content">
                          <div className="listing-features d-flex align-items-end justify-content-between">
                            <div className="list-rating">
                              {/* <Link
                                to="#"
                                className="author-img"
                              >
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-03.jpg"
                                  alt="author"
                                />
                              </Link> */}
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
                                <i className="fas fa-star filled" />
                              </div>
                            </div>
                            <div className="list-km">
                              <span className="km-count">
                                <ImageWithBasePath
                                  src="assets/img/icons/map-pin.svg"
                                  alt="author"
                                />
                              {car.category}
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
                                <p>{car.engine}</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-02.svg"
                                    alt="10 KM"
                                  />
                                </span>
                                <p>{car.doors}</p>
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
                                    alt="Power"
                                  />
                                </span>
                                <p>{car.brand}</p>
                              </li>
                              <li>
                                <span>
                                  <ImageWithBasePath
                                    src="assets/img/icons/car-parts-05.svg"
                                    alt={2019}
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
                                <i className="feather-map-pin" />
                              </span>
                              {t('address')}
                            </div>
                            <div className="listing-price">
                              <h6>
                              {t('from')} {car?.prices[0].price} <span>/  {t('Day')}</span>
                              </h6>
                            </div>
                          </div>
                          <div className="listing-button">
                            <Link
                              to={routes.listingDetails.replace(':id', car.id)}
                              className="btn btn-order"
                            >
                              <span>
                                <i className="feather-calendar me-2" />
                              </span>
                              {t('rent')}
                            </Link>
                            {/* <div className="feature-text">
                          <span className="bg-danger">Featured</span>
                        </div> */}
                                                {/* <div className="feature-text">
                          <span className="bg-warning">Top Rated</span>
                        </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    })}              
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
                      Baby Seat - <span className="ms-2">10000֏</span>
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
