import { useState } from "react";
import { useStoreContext } from "context/StoreContext";

export const useLocation = () => {
  const { dispatch } = useStoreContext();
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const onSuccess = (position: GeolocationPosition) => {
    if (error) {
      setError("");
    }

    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    dispatch({ type: "SET_LOC", payload: `${lat},${long}` });

    setLoading(false);
  };

  const onError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
    }

    setLoading(false);
  };

  const onAccessLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  return {
    acessLocation: onAccessLocation,
    locationError: error,
    isLocating: loading,
  };
};
