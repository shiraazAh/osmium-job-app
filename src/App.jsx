import "./styles.css";
import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";
import AllJobsPage from "./pages/AllJobsPage";
import ComponentsPage from "./pages/ComponentsPage";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App container">
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/jobs" element={<AllJobsPage />} />
        <Route path="/components" element={<ComponentsPage />} />
      </Routes>
    </div>
  );
}
