import { useState } from "react";
import styled from "styled-components";
import useWeather from "../../hooks/useWeather";
import WeatherProvider from "../../hooks/useWeather/WeatherProvider";
import Geocomplete from "../Geocomplete";

const DashboardContainer = styled.div`
  font-family: "Lexend", sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  background: #2980b9; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffffff, #6dd5fa, #2980b9);
  background: linear-gradient(to right, #ffffff, #6dd5fa, #2980b9);
`;

const ModalBackground = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: start;
  width: 100vw;
  height: 100vh;
`;

const ModalWindow = styled.div`
  margin-top: 200px;
  max-width: 600px;
  min-height: 70px;
  padding: 60px 60px;
  background: rgba(255, 255, 255);
  border-radius: 15px;
`;

function Dashboard() {
  const [location, setLocation] = useState({});
  const [showLocationModal, setShowLocationModal] = useState(true);
  const {
    isLoading: isWeatherLoading,
    error: weatherError,
    data: weatherData,
    isIdle,
  } = useWeather(location);

  function handleLocationChanged(newLocation) {
    setLocation(newLocation);
    setShowLocationModal(false);
  }

  return (
    <WeatherProvider value={{ location }}>
      <DashboardContainer>
        {showLocationModal && (
          <ModalBackground>
            <ModalWindow>
              <Geocomplete onLocationChanged={handleLocationChanged} />
            </ModalWindow>
          </ModalBackground>
        )}
        <h1></h1>
      </DashboardContainer>
    </WeatherProvider>
  );
}

export default Dashboard;
