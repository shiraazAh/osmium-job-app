import "./styles.css";
import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";

import { Routes, Route } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRouted";

export default function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/*" element={<AuthenticatedRoutes />} />
        </Routes>
      <div className="position-fixed bottom-0" style={{height: "50px"}}></div>
    </div>
  );
}
