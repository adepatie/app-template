import styled from "styled-components";
import useWeather from "../../hooks/useWeather";
import { DateTime } from "luxon";

function fontSize({ size }) {
  switch (size) {
    case "large":
      return "font-size: 3em;";
    case "medium":
      return "font-size: 2em;";
    case "small":
      return "font-size: 1.4em;";
    case "xsmall":
      return "font-size: 1em;";
    default:
      return "font-size: 2em;";
  }
}

const Text = styled.span`
  ${fontSize}
`;

// The styles here would be nicely abstracted by a design system setup much like the 'fontSize' method above
const Box = styled.div`
  display: flex;
  ${({ alignSelf, direction, alignItems, justifyContent, grow, flex }) => `
    justify-content: ${justifyContent || "flex-start"};
    flex-grow: ${grow === undefined ? "1" : grow};
    ${flex ? `flex: ${flex};` : ""}
    ${direction ? `flex-direction: ${direction};` : ""}
    ${alignItems ? `align-items: ${alignItems};` : ""}
    ${alignSelf ? `align-self: ${alignSelf};` : ""}
  `}
`;

const Chart = styled(Box)`
  flex-direction: column;
  justify-content: center;
  align-items: start;
  max-width: 900px;
  margin: 0 auto;
  margin-top: 120px;
  padding: 0 20px;
`;

const DegreesSymbol = (props) => <Text {...props}>&#176;</Text>;

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
        <DegreesSymbol size="small" />
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
  const { isLoading, error, data, isIdle } = useWeather(location);
  const dt = DateTime.now();

  if (isIdle || isLoading) {
    return <div />;
  }

  return (
    <Chart role="WeatherChart">
      <Box alignItems="flex-start" alignSelf="start">
        <Text size="xsmall">
          {dt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        </Text>
      </Box>
      <Box direction="row" justifyContent="stretch" alignSelf="stretch">
        <Box grow="1" direction="column">
          <Text size="small">{dt.toLocaleString(DateTime.TIME_SIMPLE)}</Text>
          <Box direction="row" alignItems="center" justifyContent="flex-start">
            <Text size="large" role="CurrentTemp">
              {Math.floor(data.current.temp)}
            </Text>
            <DegreesSymbol size="large" />
            <Text size="small"> F</Text>
            <img
              src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
              alt={data.current.weather[0].description}
            />
          </Box>
        </Box>

        <Box grow="1" direction="column">
          <Text size="small">
            {dt.plus({ hours: 4 }).toLocaleString(DateTime.TIME_SIMPLE)}
          </Text>
          <Box direction="row" alignItems="center">
            <Text size="large">{Math.floor(data.hourly[4].temp)}</Text>
            <DegreesSymbol size="large" />
            <Text size="small"> F</Text>
            <img
              src={`http://openweathermap.org/img/wn/${data.hourly[5].weather[0].icon}@2x.png`}
              alt={data.hourly[5].weather[0].description}
            />
          </Box>
        </Box>
      </Box>

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
