import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'es',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching weather data');
  }
};
