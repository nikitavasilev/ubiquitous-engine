import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: 'red',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <LocationOnSharpIcon fontSize="large" />
    {text}
  </div>
);

export default function Form({ location }) {
  const locCheck = location ? location : '';
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  // console.log(lat, "lat***", lng, "lng***");

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${locCheck.countryCode}+${locCheck.value}&key=AIzaSyCjiR23tgo8Vecvcuj1WIg3OmUSquGvtD4`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log(result.results?.[0], 'result***************');
      setLat(result.results?.[0].geometry.location.lat);
      setLng(result.results?.[0].geometry.location.lng);
    })
    .catch((error) => console.log('error???????????????????', error));
  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 5,
  };

  return (
    // Important! Always set the container height explicitly
    <div className="map" style={{ border: '2px solid #2F53FF' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCjiR23tgo8Vecvcuj1WIg3OmUSquGvtD4' }}
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={lat} lng={lng} text={''} />
      </GoogleMapReact>
    </div>
  );
}
