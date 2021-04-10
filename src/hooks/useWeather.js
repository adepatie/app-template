import { useQuery } from "react-query";
const apiKey = process.env.WEATHER_API_KEY || "";

const getWeather = ({ lattitude, longitude }) => () =>
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${apiKey}`
  ).then((res) => res.json());

export function useWeather(location = {}) {
  return useQuery("weather", getWeather(location), {
    enabled: !!location && !!location.lattitude && !!location.longitude,
  });
}
