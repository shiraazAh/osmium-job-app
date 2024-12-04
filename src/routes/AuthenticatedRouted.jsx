import { Routes, Route, useLocation } from "react-router-dom";
import { Layout, Spin } from "antd";
import { fetchUserAttributes } from "aws-amplify/auth";
import CustomNavbar from "../components/Navbar";
import AllJobsPage from "../pages/AllJobsPage";
import ComponentsPage from "../pages/ComponentsPage";
import BottomBar from "../components/BottomBar";
import { useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context";
import ProfilePage from "../pages/ProfilePage";
import JobPagination from "../components/JobPagination";
import JobDetailsPage from "../pages/JobDetailsPage";

export default function AuthenticatedRoutes() {
  const [userData, setUserData] = useState(null);
  const { pathname } = useLocation();

  const getUserDetails = async () => {
    try {
      const res = await fetchUserAttributes();
      setUserData(res);
    } catch (err) {
      console.log("cs -- error log -- ", err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={userData}>
      {userData ? (
        <>
          <Layout
            style={{
              minHeight: "100vh",
              maxWidth: "375px",
              margin: "0 auto",
              padding: "0 20px",
              ...(pathname === "/profile" && { background: "#c8d6e528"}),
            }}
          >
            <Routes>
              <Route path="/" element={<AllJobsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/components" element={<ComponentsPage />} />
              <Route path="/jobs" element={<JobPagination />} />
              <Route path="/job/:jobId" element={<JobDetailsPage />} />
            </Routes>
          </Layout>
          <BottomBar />
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spin size="large" />
        </div>
      )}
    </AuthContext.Provider>
  );
}
