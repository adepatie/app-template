import { createContext } from "react";

const weatherContext = createContext({
  location: {
    lattitude: 0,
    longitude: 0,
  },
});

export default weatherContext;
