import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import CustomNavbar from "../components/Navbar";
import AllJobsPage from "../pages/AllJobsPage";
import ComponentsPage from "../pages/ComponentsPage";

export default function AuthenticatedRoutes() {
  return (
    <>
      <div
        className="position-relative"
        style={{ maxWidth: "375px", margin: "0 auto" }}
      >
        <CustomNavbar />
      </div>
      <Layout
        style={{
          minHeight: "100vh",
          maxWidth: "375px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Routes>
          <Route path="/jobs" element={<AllJobsPage />} />
          <Route path="/components" element={<ComponentsPage />} />
        </Routes>
      </Layout>
      {/*** Temporary ****/}
      <div
        className="position-fixed bottom-0 text-center w-100 shadow-lg d-flex align-items-center justify-content-center"
        style={{ height: "70px" }}
      >
        This is the bottom bar
      </div>
    </>
  );
}