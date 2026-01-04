import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import { theme } from "./lib/theme/antTheme";
import LandingPage from "./pages/LandingPage";
import CustomizerPage from "./pages/CustomizerPage";
import LoadingPage from "./pages/LoadingPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/customize/*" element={<CustomizerPage />} />
          <Route path="/simulate" element={<LoadingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
