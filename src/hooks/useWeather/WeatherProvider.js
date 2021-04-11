import weatherContext from "./weather.context";

function WeatherProvider(props) {
  return <weatherContext.Provider {...props} />;
}

export default WeatherProvider;
