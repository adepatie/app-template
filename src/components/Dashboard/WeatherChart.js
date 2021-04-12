import styled from "styled-components";
import useWeather from "../../hooks/useWeather";
import { DateTime } from "luxon";

const Text = styled.span`
  ${({ size }) => {
    switch (size) {
      case "large":
        return "font-size: 3em";
      case "medium":
        return "font-size: 2em";
      case "small":
        return "font-size: 1.4em";
      case "xsmall":
        return "font-size: 1em";
      default:
        return "font-size: 2em";
    }
  }}
`;

const Box = styled.div`
  display: flex;
  ${({ direction, alignItems, justifyContent, grow, flex }) => `
    flex-direction: ${direction || "column"};
    align-items: ${alignItems || "flex-start"};
    justify-content: ${justifyContent || "flex-start"};
    flex-grow: ${grow === undefined ? "1" : grow};
    ${flex ? `flex: ${flex}` : ""}
  `}
`;

const Chart = styled(Box)`
  justify-content: center;
  align-items: stretch;
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
    <Chart>
      <Box>
        <Text size="xsmall">
          {dt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        </Text>
      </Box>
      <Box direction="row" justifyContent="flex-start">
        <Box>
          <Text size="small">{dt.toLocaleString(DateTime.TIME_SIMPLE)}</Text>
          <Box direction="row" alignItems="center">
            <Text size="large">{Math.floor(data.current.temp)}</Text>
            <DegreesSymbol size="large" />
            <Text size="small"> F</Text>
            <img
              src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
              alt={data.current.weather[0].description}
            />
          </Box>
        </Box>

        <Box grow="1">
          <Text size="small">
            {dt.plus({ hours: 4 }).toLocaleString(DateTime.TIME_SIMPLE)}
          </Text>
          <Box direction="row" alignItems="center">
            <Text size="large">{Math.floor(data.hourly[5].temp)}</Text>
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
