import { createGlobalStyle } from 'styled-components';
import plexSans from './assets/fonts/IBMPlexSans-VariableFont_wdth,wght.ttf';
import merriweather from './assets/fonts/Merriweather-VariableFont_opsz,wdth,wght.ttf';

// Base is JWC reset

const GlobalStyles = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}

*:not(dialog) {
  margin: 0;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

#root {
  isolation: isolate;
}

@font-face {
  font-family: "Plex Sans";
  src: url(${plexSans});
}

@font-face {
  font-family: "Merriweather";
  src: url(${merriweather});
}

:root {
  --black: rgb(11, 22, 19);
  --brand-gold: rgb(241, 194, 73);
  --blue: #24A0ED;
  --green: #05a95c;
}

button:hover {
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

`;

export default GlobalStyles;
