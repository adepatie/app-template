import styled from "styled-components";
import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";

const StyledModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
`;

const ModalBackground = (props) => {
  const styleProps = useSpring({
    background: props.showModal ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
  });
  const AnimatedModalBackground = animated(StyledModalBackground);
  return <AnimatedModalBackground style={styleProps} {...props} />;
};

const StyledModalWindow = styled.div`
  posiiton: relative;
  flex-grow: 0;
  min-height: 70px;
  max-width: 400px;
  padding: 40px;
  border-radius: 15px;
`;

const ModalWindow = (props) => {
  const styleProps = useSpring({
    background: props.showModal
      ? "rgba(255, 255, 255, 1)"
      : "rgba(255, 255, 255, 0)",
    y: props.showModal ? 200 : 0,
  });
  const AnimatedModalWindow = animated(StyledModalWindow);
  return <AnimatedModalWindow style={styleProps} {...props} />;
};

const Modal = (props) => (
  <ModalBackground showModal={props.showModal} role="ModalBackground">
    <ModalWindow role="ModalWindow" {...props} />
  </ModalBackground>
);

export default Modal;
