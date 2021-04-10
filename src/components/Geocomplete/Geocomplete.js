import { useEffect } from "react";
import styled from "styled-components";

const TextInput = styled.input``;

function Geocomplete({ onLocationChanged }) {
  useEffect(() => {
    const addressField = document.querySelector("#ship-address");

    const autocomplete = new window.google.maps.places.Autocomplete(
      addressField,
      {
        componentRestrictions: { country: ["us", "ca"] },
        fields: ["geometry"],
        types: ["regions"],
      }
    );
    addressField.focus();

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onLocationChanged(place.location);
    });
  }, [onLocationChanged]);

  return <TextInput id="address-field" />;
}

export default Geocomplete;
