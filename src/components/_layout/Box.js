import styled from "styled-components";

const Box = styled.div`
  display: flex;
  ${({
    alignSelf,
    direction,
    alignItems,
    justifyContent,
    grow,
    flex,
    wrap,
  }) => `
    justify-content: ${justifyContent || "flex-start"};
    flex-grow: ${grow === undefined ? "1" : grow};
    ${flex ? `flex: ${flex};` : ""}
    ${direction ? `flex-direction: ${direction};` : ""}
    ${alignItems ? `align-items: ${alignItems};` : ""}
    ${alignSelf ? `align-self: ${alignSelf};` : ""}
    ${wrap ? `flex-wrap: ${wrap};` : ""}
  `}
`;

export default Box;
