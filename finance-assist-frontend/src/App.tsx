import {Login} from "./components/Login";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./components/Dashboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
