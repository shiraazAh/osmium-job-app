import { Routes, Route, useLocation } from "react-router-dom";
import { Layout, message, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context"; // Authentication context - contains user information

// Import pages
import AllJobsPage from "../pages/AllJobsPage";
import ComponentsPage from "../pages/ComponentsPage";
import ProfilePage from "../pages/ProfilePage";
import JobPagination from "../components/JobPagination";
import JobDetailsPage from "../pages/JobDetailsPage";
import ApplicationSuccessPage from "../pages/ApplicationSuccessPage";
import EditProfilePage from "../pages/EditProfilePage";
import MyApplicationsPage from "../pages/MyApplicationsPage";

// Import components
import BottomBar from "../components/Containers/BottomBar";

/* Contributers: Shiraaz, Somesh, Oliver, Oisin */

// This component contains all the pages that are accessible when the user is logged in
export default function AuthenticatedRoutes() {
  const { name: userName, sub: userId } = useContext(AuthContext); // Get user information
  const { pathname } = useLocation(); // Get current path
  const [applications, setApplications] = useState([]); // State to store already applied jobs
  const [apiLoading, setapiLoading] = useState(false); 

  // Fetch already applied jobs for this user / userId
  const fetchAppliedJobs = async () => {
    setapiLoading(true);
    try {
      // Reads data from our database - AWS DynamoDB (Created API with API Gateway + Lambda)
      // Learnt it from: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html
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
    if(!userId) return; // If the user is logged in and the userId is not yet available, don't fetch applications
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
              ...(pathname === "/profile" && { background: "#c8d6e528" }), // Background color for profile page should be different
            }}
          >
            <Routes>
              {/* Home Page - has jobs and job search option */}
              <Route path="/" element={<AllJobsPage />} />
              {/* Profile Page - profile details, edit profile redirection & logout */}
              <Route path="/profile" element={<ProfilePage />} />
              {/* Profile edit Page - edit profile details */}
              <Route path="/edit" element={<EditProfilePage />} />
              {/* My Applications Page - list of already applied jobs */}
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
              {/* Jobs Page - page where searched jobs or random jobs are displayed */}
              <Route path="/jobs" element={<JobPagination />} />
              {/* Dedicated Job Page - page where job details are displayed */}
              <Route
                path="/job/:jobId"
                element={
                  <JobDetailsPage
                    applications={applications}
                    fetchAppliedJobs={fetchAppliedJobs}
                  />
                }
              />
              {/* Application Success Page - page where user is redirected after applying to a job */}
              <Route
                path="/job/:jobId/success"
                element={<ApplicationSuccessPage />}
              />
            </Routes>
          </Layout>
          {/* Bottom bar component - contains navigation buttons */}
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
