import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Segmented, Button } from "antd";
import {
  LeftOutlined,
  EllipsisOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import detailImage from "../assets/job-detail-image.png";
import "../styles.css";
import GradientButton from "../components/Buttons/GradientButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";

export default function ApplicationSuccessPage() {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Extract job ID from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [selected, setSelected] = useState("Description");

  useEffect(() => {
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

  const handleGoBack = () => {
    navigate(`/job/${jobId}`); // Navigate to the success page
  };

  const handleViewMyApplications = () => {
    navigate("/my-applications"); // Navigate to the jobs pages
  };

  const handleFindMoreJobs = () => {
    navigate("/jobs"); // Navigate to the jobs pages
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div class="d-flex justify-content-between">
          <Button
            type="text"
            icon={<LeftOutlined />} // Changed icon
            onClick={handleGoBack}
            className="mb-4 pl-0 icon-button" // Removed left padding
          ></Button>
          <Button
            type="text"
            icon={<EllipsisOutlined />} // Changed icon
            className="mb-4 pl-0 icon-button-ellipsis" // Removed left padding
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
      </div>
      <div>
        <SecondaryButton
          className="w-100 shadow"
          height={50}
          onClick={handleViewMyApplications}
        >
          View My Applications
        </SecondaryButton>
        <GradientButton
          className="w-100 shadow"
          height={50}
          onClick={handleFindMoreJobs}
        >
          Find More Jobs
        </GradientButton>
      </div>
    </div>
  );
}
