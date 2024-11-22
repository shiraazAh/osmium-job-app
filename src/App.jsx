import "./styles.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Trackerpage from "./components/Trackerpage";
import Jobpage from "./components/Jobpage";
import Preferencespage from "./components/Preferencespage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App container">
      a
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tracker" element={<Trackerpage />} />
        <Route path="/jobs" element={<Jobpage />} />
        <Route path="/preferences" element={<Preferencespage />} />
      </Routes>
    </div>
  );
}
