import styled from "styled-components";
import { DateTime } from "luxon";
import Box from "../_layout/Box";
import Column from "../_layout/Column";
import Columns from "../_layout/Columns";
import Text from "../_content/Text";
import useWeather from "./useWeather";
import SunTile from "./SunTile";

const Chart = styled(Box)`
  flex-direction: column;
  max-width: 900px;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
`;

function imageSize({ size }) {
  switch (size) {
    case "small":
      return `
        height: 50px;
        width: 50px;
      `;
    case "medium":
      return `
        height: 75px;
        width: 75px;
      `;
    case "large":
    default:
      return `
        height: 100px;
        width: 100px;
      `;
  }
}

const WeatherImage = styled.img`
  ${imageSize}
  background: #fffefa;
  border-radius: 50%;
`;

function DayForecast({ dateTime, dayWeather }) {
  return (
    <Box direction="row" alignItems="center">
      <Box direction="row" flex="0 0 150px">
        <Text size="xsmall">
          {dateTime.plus({ days: 1 }).toFormat("ccc, LLL d")}
        </Text>
      </Box>
      <Box direction="row" alignItems="center">
        <Text size="small">{Math.floor(dayWeather.temp.day)}</Text>
        <Text size="xsmall"> F</Text>
        <img
          src={`http://openweathermap.org/img/wn/${dayWeather.weather[0].icon}.png`}
          alt={dayWeather.weather[0].description}
        />
      </Box>
    </Box>
  );
}

function WeatherChart({ location }) {
  const { isLoading, data, isIdle, error } = useWeather(location);
  const dt = DateTime.now();

  // TODO: Add better loading and Error handling
  // i.e. if loading show loading spinner or skeleton
  // if error, display error message and allow retry
  if (isIdle || isLoading || error) {
    return <div />;
  }

  return (
    <Chart role="WeatherChart">
      <Text size="medium">Today's Weather</Text>
      <Text size="xsmall">{dt.toLocaleString(DateTime.DATE_SHORT)}</Text>
      <Columns justifyContent="flex-start" padding="15px 0 " alignItems="start">
        <SunTile
          weather={data.current}
          dateTime={dt}
          grow="0"
          sunrise={data.current.sunrise}
          sunset={data.current.sunset}
        >
          <Text size="small">{dt.toLocaleString(DateTime.TIME_SIMPLE)}</Text>
          <Text size="xlarge" role="CurrentTemp">
            {Math.floor(data.current.temp)}
          </Text>
          <WeatherImage
            src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
            alt={data.current.weather[0].description}
          />
        </SunTile>
        <Column margin="0 40px" padding="15px 0 0 0">
          <Text size="small">+ 4 hrs</Text>
        </Column>
        <SunTile
          weather={data.hourly[4]}
          dateTime={dt.plus({ hours: 4 })}
          grow="0"
          sunrise={data.current.sunrise}
          sunset={data.current.sunset}
        >
          <Text size="small">
            {dt.plus({ hours: 4 }).toLocaleString(DateTime.TIME_SIMPLE)}
          </Text>
          <Text size="large">{Math.floor(data.hourly[4].temp)}</Text>
          <WeatherImage
            src={`http://openweathermap.org/img/wn/${data.hourly[5].weather[0].icon}@2x.png`}
            alt={data.hourly[5].weather[0].description}
            size="medium"
          />
        </SunTile>
      </Columns>

      {/* Would typically have the data structured in a way that allows data.map(() => component) to be used */}
      <DayForecast dateTime={dt.plus({ days: 1 })} dayWeather={data.daily[1]} />
      <DayForecast dateTime={dt.plus({ days: 2 })} dayWeather={data.daily[2]} />
      <DayForecast dateTime={dt.plus({ days: 3 })} dayWeather={data.daily[3]} />
      <DayForecast dateTime={dt.plus({ days: 4 })} dayWeather={data.daily[4]} />
      <DayForecast dateTime={dt.plus({ days: 5 })} dayWeather={data.daily[5]} />
    </Chart>
  );
}

export default WeatherChart;
