import { useState } from "react";
import styled from "styled-components";
import useWeather from "../../hooks/useWeather";
import Geocomplete from "../Geocomplete";

const DashboardContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
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
  padding: 40px;
  background: rgba(255, 255, 255);
`;

function Dashboard() {
  const [location, setLocation] = useState({});
  const {
    isLoading: isWeatherLoading,
    error: weatherError,
    data: weatherData,
    isIdle,
  } = useWeather(location);
  return (
    <DashboardContainer>
      {(!!location || !!location.longitude || !!location.lattitude) && (
        <ModalBackground>
          <ModalWindow>
            <h3>Enter Location:</h3>
            <Geocomplete
              onLocationChanged={(location) => setLocation(location)}
            />
          </ModalWindow>
        </ModalBackground>
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
