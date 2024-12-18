import { Routes, Route, useLocation } from "react-router-dom";
import { Layout, message, Spin } from "antd";
import AllJobsPage from "../pages/AllJobsPage";
import ComponentsPage from "../pages/ComponentsPage";
import BottomBar from "../components/Containers/BottomBar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context";
import ProfilePage from "../pages/ProfilePage";
import JobPagination from "../components/JobPagination";
import JobDetailsPage from "../pages/JobDetailsPage";
import ApplicationSuccessPage from "../pages/ApplicationSuccessPage";
import EditProfilePage from "../pages/EditProfilePage";
import MyApplicationsPage from "../pages/MyApplicationsPage";

export default function AuthenticatedRoutes() {
  const { name: userName, sub: userId } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [applications, setApplications] = useState([]);
  const [apiLoading, setapiLoading] = useState(false);
  const fetchAppliedJobs = async () => {
    setapiLoading(true);
    try {
      const res = await fetch(
        `https://jcxe983h1e.execute-api.eu-west-1.amazonaws.com/application/${userId}`
      );
      const data = await res.json();
      setApplications(data.Items);
    } catch (error) {
      message.error("Failed to fetch applications");
    } finally {
      setapiLoading(false);
    }
  };

  useEffect(() => {
    if(!userId) return; // If the user is not logged in, don't fetch applications
    fetchAppliedJobs();
  }, [userId]);

  return (
    <>
      {userName ? (
        <>
          <Layout
            style={{
              minHeight: "100vh",
              maxWidth: "900px",
              margin: "0 auto",
              padding: "0 20px",
              paddingBottom: "70px",
              ...(pathname === "/profile" && { background: "#c8d6e528" }),
            }}
          >
            <Routes>
              <Route path="/" element={<AllJobsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/components" element={<ComponentsPage />} />
              <Route
                path="/my-applications"
                element={
                  <MyApplicationsPage
                    applications={applications}
                    fetchAppliedJobs={fetchAppliedJobs}
                    apiLoading={apiLoading}
                  />
                }
              />
              <Route path="/jobs" element={<JobPagination />} />
              <Route
                path="/job/:jobId"
                element={
                  <JobDetailsPage
                    applications={applications}
                    fetchAppliedJobs={fetchAppliedJobs}
                  />
                }
              />
              <Route
                path="/job/:jobId/success"
                element={<ApplicationSuccessPage />}
              />
              <Route path="/edit" element={<EditProfilePage />} />
            </Routes>
          </Layout>
          <BottomBar />
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spin size="large" />
        </div>
      )}
    </>
  );
}
