import Home from "./pages/Home/Home";
import CountryPage from "./pages/CountryPage/CountryPage";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { useEffect } from "react";

export default function App() {
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:code" element={<CountryPage />} />
      </Routes>
    </HashRouter>
  );
}
