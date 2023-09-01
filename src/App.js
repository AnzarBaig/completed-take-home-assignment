import React, { useEffect, useState } from "react";
import useWeatherIcon from "./hooks/useWeatherIcon";
import WeatherPart from "./component/WeatherPart";
import { IoMdArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from '@mantine/core';

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [notSearching, setNotSearching] = useState(true);

  const apiKey = process.env.REACT_APP_API_KEY;
  const geoapifyKey = process.env.REACT_APP_GEO_KEY;
  const weatherIcon = useWeatherIcon(
    weatherData ? weatherData.weather[0].id : 0
  );

  const customBackgroundColor = "#42adfc";

  const fetchData = () => {
    setIsLoading(true);
    setError(false);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData(data);
          setCity("");
        } else {
          setError(true);
          setCity("");
          toast.error(`uh oh!!😕, City '${city}' not found, please go back!`);
        }
      })
      .catch(() => {
        setError(true);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const lat = coordinates[0];
    const lon = coordinates[1];
    const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${geoapifyKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCity(data.results[0].city);
      })
      .catch(() => {
        throw new Error("wrong cordinate");
      });
  }, [coordinates, geoapifyKey]);

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && city !== "") {
      fetchData();
      setNotSearching(false);
    }
  };
  const back = () => {
    setCity("")
    setCoordinates([0,0])
    setNotSearching((p) => !p);
  };
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: customBackgroundColor }}>
      <div className="bg-white rounded-md shadow-md w-96">
        <header className="flex items-center text-2xl p-4 font-semibold border-b border-gray-300 pb-4 w-full" style={{ color: customBackgroundColor }}>
          <div className="pt-1 mx-2 text-2xl cursor-pointer" onClick={back}>
            {notSearching ?  null : <IoMdArrowBack />}
          </div>
          Weather App
          <hr className="border-slate-400 my-4" />
        </header>
        {notSearching ? (
          <section className="input-part mt-3">
            <div className="content flex flex-col p-4">
              <input
                type="text"
                spellCheck="false"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleEnterKeyPress}
                className="w-full h-12 border rounded-md px-3 text-xl outline-none mb-2"
              />
              <div className="separator mb-2 flex items-center">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="text-gray-400 mx-3">or</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const { latitude, longitude } = position.coords;
                        setCoordinates([latitude, longitude]);
                      },
                      () => setError(true)
                    );
                  } else {
                    setError(true);
                  }
                }}
                className="text-white font-semibold px-4 py-2 rounded-md transition duration-300 hover:bg-blue-400 cursor-pointer"
                style={{ backgroundColor: customBackgroundColor }}
              >
                Get Device Location
              </button>
            </div>
          </section>
        ) : null}
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader variant="dots" />;
          </div>
        ) : weatherData && !error ? (
          notSearching ? null : (
            <WeatherPart weatherData={weatherData} weatherIcon={weatherIcon} />
          )
        ) : null}
      </div>
      <ToastContainer position="top-center" autoClose={7000}/>
    </div>
  );
};

export default App;
