import "./styles.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Trackerpage from "./components/Trackerpage";
import Jobpage from "./components/Jobpage";
import ComponentsPage from "./pages/ComponentsPage";
import Preferencespage from "./components/Preferencespage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tracker" element={<Trackerpage />} />
        <Route path="/jobs" element={<Jobpage />} />
        <Route path="/preferences" element={<Preferencespage />} />
        <Route path="/components" element={<ComponentsPage />} />
      </Routes>
    </div>
  );
}
