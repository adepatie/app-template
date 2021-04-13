import { useEffect } from "react";
import styled from "styled-components";

const TextField = styled.div`
  position: relative;
`;
const TextInput = styled.input`
  font-family: "Lexend", sans-serif;
  color: hsl(0, 0%, 21%);
  background: 0;
  border: 0;
  outline: none;
  width: 80vw;
  max-width: 400px;
  font-size: 1.5em;
  transition: padding 0.3s 0.2s ease;
  &:focus {
    padding-bottom: 5px;
  }
  &:focus + .line {
    &:after {
      transform: scaleX(1);
    }
  }
`;

const Line = styled.div`
  width: 100%;
  height: 3px;
  position: absolute;
  bottom: -8px;
  background: hsl(0, 0%, 40%);
  &:after {
    content: " ";
    position: absolute;
    float: right;
    width: 100%;
    height: 3px;
    transform: scalex(0);
    transition: transform 0.3s ease;
    background: #1abc9c;
  }
`;

function Geocomplete({ onFocus, onLocationChanged }) {
  useEffect(() => {
    const addressField = document.querySelector("#address-field");
    const autocomplete = new window.google.maps.places.Autocomplete(
      addressField,
      {
        componentRestrictions: { country: ["us", "ca"] },
        fields: ["address_components", "geometry"],
        types: ["(regions)"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onLocationChanged({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  }, []);

  function handleInputFocus({ target }) {
    target.select();
    onFocus();
  }
  return (
    <TextField>
      <TextInput
        id="address-field"
        onFocus={handleInputFocus}
        role="Geocomplete"
      />
      <Line />
    </TextField>
  );
}

export default Geocomplete;
