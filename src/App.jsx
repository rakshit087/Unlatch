import { ThemeProvider } from "@mui/material/styles";
import theme from "./utilities/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">Hello World</div>
    </ThemeProvider>
  );
}

export default App;
