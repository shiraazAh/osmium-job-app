import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
  LeftOutlined,
  EllipsisOutlined,
  EnvironmentOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import detailImage from "../assets/job-detail-image.png";
import "../styles.css";
import GradientButton from "../components/Buttons/GradientButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";

/* Contributers: Oliver,  */
/* ApplicationSuccessPage is where the user is brought after clicking the apply button on a job, it tells them they
  have successfully applied and allows them to view more jobs or view all their applications*/

export default function ApplicationSuccessPage() {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Extract job ID from the URL
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    // job id is fetched from API so user applies to the correct job
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themuse.com/api/public/jobs/${jobId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchJobDetails();
  }, [jobId]); // Fetch job details when jobId changes

  if (!jobDetails) {
    return <div>Loading job details...</div>;
  }

  // Navigate to the job detail page
  const handleGoBack = () => {
    navigate(`/job/${jobId}`);
  };

  // Navigate to the MyApplicationsPages
  const handleViewMyApplications = () => {
    navigate("/my-applications");
  };

  // Navigate to the jobs pages
  const handleFindMoreJobs = () => {
    navigate("/jobs");
  };

  return (
    <div className="container mx-auto py-3">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="d-flex justify-content-between">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={handleGoBack}
            className="mb-4 pl-0 icon-button"
          ></Button>
        </div>
        <div className="text-center">
          <img
            src={detailImage}
            className="w-full h-full object-cover absolute top-0 left-0 text-center"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {jobDetails.name}
        </h2>
        <h3 className="text-xl text-gray-600 mb-6 text-center">
          {jobDetails.company?.name}
        </h3>

        <div className="text-center d-flex justify-content-center align-items-center">
          <div className="job-location d-flex align-items-center">
            <EnvironmentOutlined className="location-icon" />
            <p className="location-text">
              {jobDetails.locations
                ?.map((location) => location.name)
                .join(", ") || "No location specified"}
            </p>
          </div>
        </div>
        <div className="success-check-icon-container">
          <div className="success-check-icon-center">
            <div className="success-check-icon">
              <CheckOutlined />
            </div>
          </div>
          <h6 className="text-center success-text-area-width">
            Your application request to {jobDetails.company?.name} was
            successfull!
          </h6>
        </div>

        <div className="success-button-container">
          <SecondaryButton
            className="w-100 shadow success-button"
            height={50}
            onClick={handleViewMyApplications}
          >
            View My Applications
          </SecondaryButton>
          <GradientButton
            className="w-100 shadow success-button"
            height={50}
            onClick={handleFindMoreJobs}
          >
            Find More Jobs
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
