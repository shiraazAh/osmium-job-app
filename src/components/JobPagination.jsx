import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Ensure this import is added
import JobCard from "./Cards/JobCard";
import { Empty, Flex, Pagination, Spin, message } from "antd";
import "../styles.css";
import { getParameters } from "../utils/helpers";

/* Contributers: Oliver Glenn Craigie, Oisin (Job Card) */
/* JobPagination is a component used to show pages of jobs based on information called from The Muse API,
  this component is used on the JobDetailsPage */

export default function JobPagination() {
  const navigate = useNavigate(); // Used to navigate different pages on click
  const [searchParams] = useSearchParams();
  const jobCategory = searchParams.get("category");
  const jobLocation = searchParams.get("location");
  const jobLevel = searchParams.get("level");
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // sets first page to the first 20 jobs called from the API
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Limiting pages to 99 made using the help of the LLM ChatGPT
    // to use more then 99 pages need to use paid version of the themuse public API
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
          // API is called to return pages of jobs with 20 jobs per page
          // Public API documentation: https://www.themuse.com/developers/api/v2?ref=public_apis
          `https://www.themuse.com/api/public/jobs?page=${pageNumber}&per_page=20&${getParameters(
            // these are used for the job cards
            jobCategory, // type of skills/industry e.g Accountng
            jobLocation, // job location e.g Dublin, Ireland
            jobLevel // jon level e.g entry level
          )}`
        );

        if (!response.ok) {
          // returns errors depending on the error type
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

        // Calculate total items, linited to 99 pages with 20 items per page
        const maxItems = 99 * 20;
        setTotalItems(Math.min(fetchedData.total || 0, maxItems));
      } catch (error) {
        setError(error.message);
        setData([]);

        // If error on last page, reduce total pages
        // prevent user to going to next page if no jobs available
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

  // handles changing to a different page of jobs
  const handlePageChange = (pageNumber) => {
    const safePageNumber = Math.min(pageNumber, totalPages);
    setPage(safePageNumber);
  };

  // naviagte to job detials page based on the id of the job
  const handleJobSelect = (jobId) => {
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
            {/* Job component with API data passed into it */}
            {/* passes id of the spefic job clicked*/}
            {data.map((job) => (
              <JobCard
                key={job.id}
                onClick={() => handleJobSelect(job.id)}
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
              {/* page user is currently on */}
              {/* total number of jobs*/}
              {/* number of jobs per page 20 */}
              {/* changes page when buttons are clicked */}
              {/* total number of pages of jobs 99*/}
              <Pagination
                current={page}
                total={totalItems}
                pageSize={20}
                onChange={handlePageChange}
                showSizeChanger={false}
                pageTotal={totalPages}
              />
            </div>
            {/* shows user what page they are currently on */}
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
