import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useState } from "react";
import styled from "styled-components";
import WeatherChart from "./WeatherChart";
import Geocomplete from "../Geocomplete";

const DashboardContainer = styled.div`
  font-family: "Lexend", sans-serif;
  color: hsl(0, 0%, 21%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2980b9; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffffff, #6dd5fa, #2980b9);
  background: linear-gradient(to right, #ffffff, #6dd5fa, #2980b9);
`;

const StyledModalBackground = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
`;

const ModalBackground = (props) => {
  const styleProps = useSpring({
    background: props.showLocationModal
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(0, 0, 0, 0)",
  });
  const AnimatedModalBackground = animated(StyledModalBackground);
  return <AnimatedModalBackground style={styleProps} {...props} />;
};

const StyledModalWindow = styled.div`
  posiiton: relative;
  flex-grow: 0;
  max-width: 100%;
  min-height: 70px;
  padding: 40px;
  border-radius: 15px;
`;

const ModalWindow = (props) => {
  const styleProps = useSpring({
    background: props.showLocationModal
      ? "rgba(255, 255, 255, 1)"
      : "rgba(255, 255, 255, 0)",
    y: props.showLocationModal ? 200 : 0,
  });
  const AnimatedModalWindow = animated(StyledModalWindow);
  return <AnimatedModalWindow style={styleProps} {...props} />;
};

function Dashboard() {
  const [location, setLocation] = useState({});
  const [showLocationModal, setShowLocationModal] = useState(true);

  function handleGeocompleteFocus(toggle = true) {
    setShowLocationModal(toggle);
  }

  function handleLocationChanged(newLocation) {
    setLocation(newLocation);
    setShowLocationModal(false);
  }

  return (
    <DashboardContainer>
      <ModalBackground showLocationModal={showLocationModal}>
        <ModalWindow showLocationModal={showLocationModal}>
          <Geocomplete
            onLocationChanged={handleLocationChanged}
            onFocus={handleGeocompleteFocus}
          />
        </ModalWindow>
      </ModalBackground>
      <WeatherChart location={location} />
    </DashboardContainer>
  );
}

export default Dashboard;
