import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  #root {
    margin: 0;
    padding: 0;
    font-family: 'IBM Plex Mono', monospace;
    color: #233342;
  }

`;
export const theme = {
  colors: {
    green: "rgba(13, 94, 13, 0.705)",
    red: "rgba(189, 12, 12, 0.753)",
    secondary: "#ce8054",
    primary: "#233342",
  },
  fontFamily: {
    mono: "'IBM Plex Mono', monospace",
  },
};
