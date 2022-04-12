import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const palette = {
  type: "light",
  primary: { main: "#45B3F2" },
  secondary: { main: "#392C5D" },
  text: { primary: "#645D5D", secondary: "#B1B1B1", disabled: "#B1B1B1" },
};

const typography = {
  fontFamily: `sans-serif`,
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
};

const themeName = "Unlash Light";
let theme = createTheme({ palette: palette, typography: typography, themeName });
theme = responsiveFontSizes(theme);
export default theme;
