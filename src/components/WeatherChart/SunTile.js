import Box from "../_layout/Box";
import { DateTime } from "luxon";
import styled from "styled-components";

const mountainGrey = "#48454E";
const coronaWhite = "#fffefa";
const nightBlue = "#223F59";
const covidBlue = "##5B799B";
const clearYellow = "#FEEFAF";
const sunsetAmber = "#F2BE7E";

function sunStyles({ dateTime, weather, sunrise, sunset }) {
  if (!!sunrise && !!sunset) {
    if (
      dateTime <= DateTime.fromSeconds(sunrise) ||
      dateTime >= DateTime.fromSeconds(sunset)
    ) {
      return `
        background: ${nightBlue};
        color: ${coronaWhite};
      `;
    }
  }

  if (weather.clouds > 75) {
    return `
      background: ${covidBlue};
      color: ${coronaWhite};
    `;
  }

  if (!!sunrise && !!sunset) {
    if (
      dateTime <= DateTime.fromSeconds(sunrise).plus({ hours: 1 }) ||
      dateTime >= DateTime.fromSeconds(sunset).minus({ hours: 1 })
    ) {
      return `
      background: ${sunsetAmber};
      color: ${mountainGrey};
    `;
    }
  }
  return `
      background: ${clearYellow};
      color: ${mountainGrey};
    `;
}

const StyledSunTile = styled(Box)`
  ${sunStyles}
  align-items: flex-start;
  padding: 15px;
  flex-direction: column;
  border-radius: 10px;
`;

export default StyledSunTile;
