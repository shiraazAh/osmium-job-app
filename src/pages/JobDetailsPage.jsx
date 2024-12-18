import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Segmented, Button, message, Flex, Spin } from "antd";
import { LeftOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "../styles.css";
import GradientButton from "../components/Buttons/GradientButton";
import { AuthContext } from "react-oidc-context";
import { imageUrls } from "../components/Cards/JobCard";

/* Contributers: Oliver,  */
/*  JobDetailsPage more important and deatiled information about a specfic job takedn ftom the Muse API,
  here user and switch between the job description and the company information. The user can also click apply to a job*/

export default function JobDetailsPage() {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Extract job ID from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [selected, setSelected] = useState("Description");
  const [isApplying, setIsApplying] = useState(false);
  const { sub: userId } = useContext(AuthContext);
  const [randomImageUrl, setRandomImageUrl] = useState(""); // set random image

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themuse.com/api/public/jobs/${jobId}` // API called to jobId
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
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setRandomImageUrl(imageUrls[randomIndex]);
  }, [jobId]); // Fetch job details when jobId changes

  if (!jobDetails) {
    return (
      <Flex justify="center" align="center" style={{ height: "70vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  // go back to previous page
  const handleGoBack = () => {
    window.history.back();
  };

  // PUTS userId, jobId and job details to the database, which stores users data about job applications
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
          status: Math.floor(Math.random() * 3),
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
            icon={<LeftOutlined />}
            onClick={handleGoBack}
            className="mb-4 pl-0 icon-button"
          ></Button>
        </div>
        <div className="text-center">
          <img
            src={randomImageUrl}
            alt="Company Logo"
            className="detail-image"
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
        {/* User can switch between the jon description and company information, the API didn't have
        specific or seperate api endpoint company informmation and so its int the description*/}
        <Segmented
          options={["Description", "Company"]}
          onChange={(option) => setSelected(option)}
          className="custom-segmented mb-6"
        />

        <div className="information p-3">
          {/* Job description segment, filled with data from the Muse API*/}
          {selected === "Description" && (
            <div
              className="prose max-w-none detail-bullets-list-styling"
              dangerouslySetInnerHTML={{
                __html: jobDetails.contents || "No description available",
              }}
            />
          )}
          {/* Comapany segment */}
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
