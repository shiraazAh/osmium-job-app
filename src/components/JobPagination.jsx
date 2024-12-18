import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Ensure this import is added
import JobCard from "./Cards/JobCard";
import { Empty, Flex, Pagination, Spin, message } from "antd";
import "../styles.css";
import { getParameters } from "../utils/helpers";

export default function JobPagination() {
  const navigate = useNavigate(); // Use useNavigate here
  const [searchParams] = useSearchParams();
  const jobCategory = searchParams.get("category");
  const jobLocation = searchParams.get("location");
  const jobLevel = searchParams.get("level");
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchPage = async (pageNumber) => {
      if (pageNumber > 99) {
        message.error("Maximum of 99 pages of results reached");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.themuse.com/api/public/jobs?page=${pageNumber}&per_page=20&${getParameters(
            jobCategory,
            jobLocation,
            jobLevel
          )}`
        );

        if (!response.ok) {
          // Check for specific error scenarios
          if (response.status === 404) {
            throw new Error("Page not found. May have reached end of results.");
          } else if (response.status === 429) {
            throw new Error("Too many requests. Please try again later.");
          } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
          }
        }

        const fetchedData = await response.json();
        if (!fetchedData.results || fetchedData.results.length === 0) {
          message.warning("No more results available.");
          setTotalPages(pageNumber);
          setIsLoading(false);
          return;
        }
        setData(fetchedData.results || []);

        // Limit total pages to 99 pages
        const limitedPageCount = Math.min(fetchedData.page_count || 0, 99);
        setTotalPages(limitedPageCount);

        // Calculate total items, capped at 100 pages * 20 items per page
        const maxItems = 99 * 20;
        setTotalItems(Math.min(fetchedData.total || 0, maxItems));
      } catch (error) {
        setError(error.message);
        setData([]);

        // If error on last page, reduce total pages
        if (pageNumber > 1) {
          setTotalPages(pageNumber - 1);
        } else {
          setTotalPages(0);
        }

        setTotalItems(0);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage(page);
  }, [page]);

  const handlePageChange = (pageNumber) => {
    const safePageNumber = Math.min(pageNumber, totalPages);
    setPage(safePageNumber);
  };

  const handleJobSelect = (jobId) => {
    // Navigate to the job details page using the job ID
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="py-3">
      <h1 className="mb-3 fw-bold">Jobs</h1>
      {isLoading && (
        <Flex justify="center" align="center" style={{ height: "70vh" }}>
          <Spin size="large" />
        </Flex>
      )}
      {error && <p>{error}</p>}

      {data &&
        (data.length > 0 ? (
          <>
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
                  job.levels?.map((level) => level.name).join(", ") ||
                  "No levels"
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
                pageTotal={totalPages}
              />
            </div>
            <div className="text-center mt-3">
              Page {page} of {totalPages}
              {totalPages === 99}
            </div>
          </>
        ) : (
          <Empty className="mt-5" description="No jobs found"></Empty>
        ))}
    </div>
  );
}
