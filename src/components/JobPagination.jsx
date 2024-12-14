import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ensure this import is added
import JobCard from "./JobCard";
import { Pagination } from "antd";
import "../styles.css";

export default function JobPagination() {
  const navigate = useNavigate(); // Use useNavigate here
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(30);
  const [totalItems] = useState(600); // 30 pages * 20 items per page

  useEffect(() => {
    const fetchPage = async (pageNumber) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.themuse.com/api/public/jobs?page=${pageNumber}&per_page=20`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const fetchedData = await response.json();
        setData(fetchedData.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage(page);
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleJobSelect = (jobId) => {
    // Navigate to the job details page using the job ID
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="mx-auto py-3">
      <h1>Jobs</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {data.map((job) => (
        <JobCard
          key={job.id}
          onClick={() => handleJobSelect(job.id)} // Pass only the job ID to navigate
          title={job.name}
          company={job.company?.name || "No company listed"}
          location={
            job.locations?.map((location) => location.name).join(", ") ||
            "No location"
          }
          description={job.contents || "No description available"}
          publicationDate={job.publication_date || "No date available"}
          levels={
            job.levels?.map((level) => level.name).join(", ") || "No levels"
          }
        />
      ))}

      <div className="d-flex justify-content-center mt-4 align-items-center">
        <Pagination
          current={page}
          total={totalItems}
          pageSize={20}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <div className="text-center mt-3">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}
