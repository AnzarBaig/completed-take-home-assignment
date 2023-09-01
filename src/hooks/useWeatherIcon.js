import { useEffect, useState } from 'react';

const useWeatherIcon = (id) => {
  const [icon, setIcon] = useState('unknown');

  useEffect(() => {
    const getIcon = () => {
      if (id === 800) {
        return 'clear';
      } else if (id >= 200 && id <= 232) {
        return 'storm';
      } else if (id >= 600 && id <= 622) {
        return 'snow';
      } else if (id >= 701 && id <= 781) {
        return 'haze';
      } else if (id >= 801 && id <= 804) {
        return 'cloud';
      } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        return 'rain';
      } else {
        return 'unknown';
      }
    };


    setIcon(getIcon());
  }, [id]);
  return icon;
};

export default useWeatherIcon;
