import styled from "styled-components";

function mapCssProp(propName, alias) {
  const hyphenProp = propName.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  return (props) => {
    if (!!alias ? props[alias] : props[propName]) {
      return `
        ${hyphenProp}: ${!!alias ? props[alias] : props[propName]};
      `;
    }
  };
}

const Box = styled.div`
  display: flex;
  ${mapCssProp("padding")}
  ${mapCssProp("margin")}
  ${mapCssProp("flex")}
  ${mapCssProp("flex-grow", "grow")}
  ${mapCssProp("flex-direction", "direction")}
  ${mapCssProp("justifyContent")}
  ${mapCssProp("alignItems")}
  ${mapCssProp("alignSelf")}
  ${mapCssProp("flexWrap", "wrap")}
`;

export default Box;
