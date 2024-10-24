import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";

const Marker = ({ place, onClick }) => (
  <div
    style={{ transform: "translate(-50%, -50%)", cursor: "pointer" }}
    onClick={onClick}
  >
    <ImageWithBasePath src="assets/img/marker.png" alt="marker" />
  </div>
);

const MapContainer = ({ center, places }) => {
  const [state, setState] = useState({
    showingInfoWindow: false,
    selectedPlace: {},
  });

  const handleMarkerClick = (place) => {
    setState({
      showingInfoWindow: true,
      selectedPlace: place,
    });
  };

  const handleCloseClick = () => {
    setState({
      showingInfoWindow: false,
      selectedPlace: {},
    });
  };

  const infoWindowContent = (place) => (
    <div className="listing-item">
      <div className="custom-map-feather">
        <i
          className="feather icon-x"
          onClick={handleCloseClick}
          style={{ marginTop: "10px", cursor: "pointer" }}
        ></i>
      </div>

      <div className="listing-img">
        <Link to={place.profile_link}>
          <ImageWithBasePath
            src={place.car_image}
            className="img-fluid"
            alt="Audi"
          />
        </Link>
        <div className="fav-item justify-content-end">
          <Link to="#" className="fav-icon">
            <i className="feather icon-heart"></i>
          </Link>
        </div>
        <span className="featured-text">{place.car_brand}</span>
      </div>
      <div className="listing-content">
        <div className="listing-features d-flex align-items-end justify-content-between">
          <div className="list-rating">
            <Link to="#" className="author-img">
              <ImageWithBasePath
                src={place.image}
                className="img-fluid"
                alt="Audi"
              />
            </Link>
            <h3 className="listing-title">
              <Link to={place.profile_link}>{place.car_name}</Link>
            </h3>
            <div className="list-rating">
              <i className="fas fa-star filled"></i>
              <i className="fas fa-star filled"></i>
              <i className="fas fa-star filled"></i>
              <i className="fas fa-star filled"></i>
              <i className="fas fa-star"></i>
              <span>{place.reviews} Reviews</span>
            </div>
          </div>
          <div className="list-km">
            <span className="km-count">
              <ImageWithBasePath
                src="assets/img/icons/map-pin.svg"
                alt="author"
              />
              {place.km}
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
                  alt="2019"
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
              <i className="feather icon-map-pin"></i>
            </span>
            {place.address}
          </div>
          <div className="listing-price">
            <h6>
              {place.amount}
              <span>/ Day</span>
            </h6>
          </div>
        </div>
        <div className="listing-button">
          <Link to={place.profile_link} className="btn btn-order">
            <span>
              <i className="feather icon-calendar me-2"></i>
            </span>
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCj51aGIAt-Yue3rjWoYz1FZYq8wB6jCIY" }}
        defaultCenter={center}
        defaultZoom={10}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            lat={place.lat}
            lng={place.lng}
            place={place}
            onClick={() => handleMarkerClick(place)}
          />
        ))}
      </GoogleMapReact>
      {state.showingInfoWindow && (
        <div
          className="info-window"
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50px",
            background: "white",
            padding: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          {infoWindowContent(state.selectedPlace)}
        </div>
      )}
    </div>
  );
};

export default MapContainer;