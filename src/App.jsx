import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import theme from "./utilities/theme";
import { MakeCourse } from "./pages/MakeCourse";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/makecourse" element={<MakeCourse />} />
          </Routes>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
