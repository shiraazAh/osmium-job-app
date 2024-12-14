import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Segmented, Button, message, Flex, Spin } from "antd";
import {
  LeftOutlined,
  EllipsisOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import detailImage from "../assets/job-detail-image.png";
import "../styles.css";
import GradientButton from "../components/Buttons/GradientButton";
import { AuthContext } from "react-oidc-context";

export default function JobDetailsPage() {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Extract job ID from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [selected, setSelected] = useState("Description");
  const [isApplying, setIsApplying] = useState(false);
  const { sub: userId } = useContext(AuthContext);

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
    return (
      <Flex justify="center" align="center" style={{ height: "70vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  const handleGoBack = () => {
    navigate("/jobs"); // Go back to the jobs page
  };

  const handleSubmitApplication = async () => {

    setIsApplying(true);

    try {
      const response = await fetch("/application", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          jobId: jobId,
          jobName: jobDetails.name,
          company: jobDetails.company?.name,
          status: 0,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || "Failed to submit application");
      }

      // Navigate to success page
      navigate(`/job/${jobId}/success`);
    } catch (error) {
      console.error("Application submission error:", error);
      message.error(
        error.message || "Failed to submit application. Please try again."
      );
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="container mx-auto py-3">
      <div className="bg-white shadow-md rounded-lg">
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

        <div className="text-center d-flex justify-content-center align-items-center mb-1">
          <div className="job-location d-flex align-items-center">
            <EnvironmentOutlined className="location-icon" />
            <p className="location-text">
              {jobDetails.locations
                ?.map((location) => location.name)
                .join(", ") || "No location specified"}
            </p>
          </div>
        </div>

        <h3 className="job-salary text-center mb-3">$6000/mo</h3>
        <GradientButton
          className="w-100 shadow detail-apply-button"
          height={50}
          onClick={handleSubmitApplication}
          disabled={isApplying}
        >
          {isApplying ? "Applying..." : "Apply"}
        </GradientButton>

        <Segmented
          options={["Description", "Company"]}
          onChange={(option) => setSelected(option)}
          className="custom-segmented mb-6"
        />

        <div className="information p-3">
          {selected === "Description" && (
            <div
              className="prose max-w-none detail-bullets-list-styling"
              dangerouslySetInnerHTML={{
                __html: jobDetails.contents || "No description available",
              }}
            />
          )}
          {selected === "Company" && (
            <div>
              <h4 className="text-xl font-semibold mb-4">About Company</h4>
              <p>
                {jobDetails.company?.description ||
                  "No company description available"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
;
