import React, { useEffect, useState } from "react";
import { all_routes } from "../router/all_routes";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";


const Footer = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const routes = all_routes;
  AOS.init();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const handleScroll = () => {
    AOS.refresh();
  };
  const position = { lat: 40.186, lng: 44.518 };
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Footer */}
      <footer className="footer">
        {/* Footer Top */}
        <div className="footer-top aos" data-aos="fade-down">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    {/* Footer Widget */}
                    <div className="footer-widget footer-menu">
                      <h5 className="footer-title">Contacts</h5>
                      <div className="footer-social-widget">
                        <ul className="nav-social">
                          {/* <li>
                        <Link to="#"><i className="fa-brands fa-facebook-f fa-facebook fi-icon" /></Link>
                      </li> */}
                          <li>
                            <Link to="#"><i className="fab fa-instagram fi-icon" /></Link>
                          </li>
                          {/* <li>
                        <Link to="#"><i className="fab fa-behance fi-icon" /></Link>
                      </li>
                      <li>
                        <Link to="#"><i className="fab fa-twitter fi-icon" /> </Link>
                      </li>
                      <li>
                        <Link to="#"><i className="fab fa-linkedin fi-icon" /></Link>
                      </li> */}
                        </ul>
                      </div>
                    </div>
                    {/* /Footer Widget */}
                  </div>
                  <div className="col-lg-4 col-md-6">
                    {/* Footer Widget */}
                    <div className="footer-widget footer-contact">
                      <h5 className="footer-title">Phone</h5>
                      <div className="footer-contact-info">
                        <div className="footer-address">
                          <span><i className="feather icon-phone-call" /></span>
                          <div className="addr-info">
                            <Link to="tel:+(374)95773003">+ (374) 95 773 003</Link>
                          </div>
                        </div>
                        <div className="footer-address">
                          <span><i className="feather icon-phone-call" /></span>
                          <div className="addr-info">
                            <Link to="tel:+(374)95773003">+ (374) 44 773 300</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Footer Widget */}
                  </div>
                  <div className="col-lg-4 col-md-6">
                    {/* Footer Widget */}
                    <div className="footer-widget footer-contact">
                      <h5 className="footer-title">Email address</h5>
                      <div className="footer-contact-info">
                        <div className="footer-address">
                          <span><i className="feather icon-mail" /></span>
                          <div className="addr-info">
                            <Link to="mailto:support@example.com">wedorentacar@gmail.com</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Footer Widget */}
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="footer-contact footer-widget">
                  <h5 className="footer-title">Address</h5>
                  <div className="footer-contact-info">
                    <div className="update-form">
                      <form action="#">
                        <span><i className="feather icon-mail" /></span>
                        <input type="email" className="form-control" placeholder="Enter You Email Here" />
                        <button type="submit" className="btn btn-subscribe"><span><i className="feather icon-send" /></span></button>
                      </form>
                    </div>
                    <div className="update-form">
                      {
                        isLoaded &&  <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                        <div style={{ marginTop: "10px", height: "200px", width: "100%" }}>
                          <Map
                            zoom={17}
                            center={position}
                            mapId={process.env.REACT_PUBLIC_MAP_ID}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                          >
                          </Map>
                        </div>
                      </APIProvider>
                      }
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Footer Top */}
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            {/* Copyright */}
            <div className="copyright">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="copyright-text">
                    <p>© {new Date().getFullYear()} WeDo Rent a car. All Rights Reserved.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Copyright Menu */}
                  <div className="copyright-menu">
                    <div className="vistors-details">
                      <ul className="d-flex">
                        {/* <li><Link to="#"><ImageWithBasePath className="img-fluid" src="assets/img/icons/paypal.svg" alt="Paypal" /></Link></li>											 */}
                        <li><Link to="#"><ImageWithBasePath className="img-fluid" src="assets/img/icons/visa.svg" alt="Visa" /></Link></li>
                        <li><Link to="#"><ImageWithBasePath className="img-fluid" src="assets/img/icons/master.svg" alt="Master" /></Link></li>
                        {/* <li><Link to="#"><ImageWithBasePath className="img-fluid" src="assets/img/icons/applegpay.svg" alt="applegpay" /></Link></li> */}
                      </ul>
                    </div>
                  </div>
                  {/* /Copyright Menu */}
                </div>
              </div>
            </div>
            {/* /Copyright */}
          </div>
        </div>
        {/* /Footer Bottom */}
      </footer>
      {/* /Footer */}
    </>
  );
};

export default Footer;
