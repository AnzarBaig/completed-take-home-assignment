import React from "react";
import { Image } from '@mantine/core';
import {FaTemperatureEmpty} from "react-icons/fa6"
import {BiSolidDropletHalf} from "react-icons/bi"
const WeatherPart = ({ weatherData, weatherIcon }) => {
  return (
    <section className="mt-6">
      <Image maw={150} mx="auto" radius="md" src={`/icons/${weatherIcon}.svg`} alt="Weather Icon" />
      <div className="text-center">
        <span className="text-7xl font-bold">
          {Math.round(weatherData.main.temp)}
        </span>
        <span className="text-6xl">°C</span>
      </div>
      <div className="text-center text-2xl mt-1">
        {weatherData.weather[0].description}
      </div>
      <div className="text-center mt-4 text-2xl">
        <span>
          {weatherData.name}, {weatherData.sys.country}
        </span>
      </div>
      <div className="mt-6 mb-2 flex justify-evenly border-t border-gray-300">
      <div className="flex items-center">
      <div className="text-4xl text-blue-400">
      <FaTemperatureEmpty/>
      </div>
          <div>
            <div>
            <span className="text-lg font-semibold">
              {Math.round(weatherData.main.feels_like)}
            </span>
            <span className="text-sm">°C</span>
          </div>
          <p>Feels like</p>
          </div>
 
      </div>
      <div className="border-l border-gray-300"></div>
      
      <div className="flex items-center pl-2">
      <div className="text-4xl text-blue-400">
        <BiSolidDropletHalf/>
        </div>
        <div className="">
          <span className="text-lg font-semibold">
            {weatherData.main.humidity}%
          </span>
          <p>Humidity</p>
        </div>
      </div>
    </div>
    </section>
  );
};

export default WeatherPart;
