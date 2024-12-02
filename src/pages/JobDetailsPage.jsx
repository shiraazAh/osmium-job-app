import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import { Segmented } from "antd";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const location = useLocation();
  const { selectedJob: contextJob } = useJobContext();
  const [selected, setSelected] = useState("Description");

  const selectedJob = contextJob || location.state?.jobDetails;

  if (!selectedJob) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500">
          No job selected. Please return to the job list.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{selectedJob.name}</h2>
        <h3 className="text-xl text-gray-600 mb-6">
          {selectedJob.company?.name}
        </h3>

        <Segmented
          options={["Description", "Company"]}
          onChange={(option) => setSelected(option)}
          className="mb-6"
        />

        <div>
          {selected === "Description" && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: selectedJob.contents || "No description available",
              }}
            />
          )}

          {selected === "Company" && (
            <div>
              <h4 className="text-xl font-semibold mb-4">About Company</h4>
              <p>
                {selectedJob.company?.description ||
                  "No company description available"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
