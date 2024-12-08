import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Segmented, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import detailImage from "../assets/job-detail-image.png";
import "../styles.css";

export default function JobDetailsPage() {
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
    navigate("/jobs"); // Go back to the previous page
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <Button
          type="text"
          icon={<LeftOutlined />} // Changed icon
          onClick={handleGoBack}
          className="mb-4 pl-0 back-button" // Removed left padding
        ></Button>
        <img
          src={detailImage}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <h2 className="text-2xl font-bold mb-4">{jobDetails.name}</h2>
        <h3 className="text-xl text-gray-600 mb-6">
          {jobDetails.company?.name}
        </h3>

        <Segmented
          options={["Description", "Company"]}
          onChange={(option) => setSelected(option)}
          className="custom-segmented mb-6"
        />

        <div>
          {selected === "Description" && (
            <div
              className="prose max-w-none"
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
