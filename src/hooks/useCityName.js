import { useEffect, useState } from "react";

const useCityName = ( lat, lon ) => {
    const [city, setCity] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCity(data.name)
      })
      .catch(() => {
       throw new Error("wrong cordinate")
      });
  }, [lat, lon]);

  return city;
};

export default useCityName;
