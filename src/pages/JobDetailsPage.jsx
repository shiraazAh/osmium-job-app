import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Segmented } from "antd";
import "../styles.css";

export default function JobDetailsPage() {
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

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
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
