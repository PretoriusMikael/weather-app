import React from "react";
import { useGeolocated } from "react-geolocated";

const GetLocation = ({ setCity /* used to share state with WeatherInput */ }) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  // set the state of city to the latitude and longitude of the user location
  const handleLocation = () => {
    if (coords) {
      setCity(`${coords.latitude}, ${coords.longitude}`);
    }
  };

  // output
  // check if browser supports gelocation and if geolcation is enabled
  // if the coordinates are found then display and use the user's location
  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <div>
      <table>
        <tbody>
          <tr>
            <td>My latitude</td>
            <td>{coords.latitude}</td> {/*display the user's latitude*/}
          </tr>
          <tr>
            <td>My longitude</td>
            <td>{coords.longitude}</td> {/*display the user's longitude*/}
          </tr>
        </tbody>
      </table>
      <button onClick={handleLocation}>Use My Coordinates</button>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default GetLocation;
