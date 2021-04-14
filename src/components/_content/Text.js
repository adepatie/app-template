import styled from "styled-components";

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

export default Text;
