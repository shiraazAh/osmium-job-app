import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import Pagination from "react-bootstrap/Pagination";

export default function JobPagination() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(30);

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

  const getNextPage = () => setPage((prev) => prev + 1);
  const getPrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));
  const getFirstPage = () => setPage(1);
  const getLastPage = () => setPage(totalPages);

  const getPageNumbers = () => {
    const numbersToShow = [];
    const numOfPagesViewable = 5;
    if (page <= 3) {
      for (let i = 1; i <= numOfPagesViewable; i++) {
        numbersToShow.push(i);
      }
    } else if (page >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        numbersToShow.push(i);
      }
    } else {
      for (let i = page - 2; i <= page + 2; i++) {
        numbersToShow.push(i);
      }
    }
    return numbersToShow;
  };

  return (
    /**** This is to print job name, company etc.. and if some dont have certain info i print "no company listed" etc ****/
    <div>
      <h1>Jobs</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
      {data.map((job) => (
    <JobCard
      key={job.id}
      title={job.name}
      company={job.company?.name || "No company listed"}
      location={
        job.locations?.map((location) => location.name).join(", ") || "No location" //for more than 1 locaton i seperate them with a ", " using map function
      }
      // jobType={job.type || "Unknown job type"} // dont need this any more as they all say "job"
      description={job.contents || "No description available"}
      publicationDate={job.publication_date || "No date available"}
      levels={
        job.levels?.map((level) => level.name).join(", ") || "No levels" // for more than 1 level ", " seperates them.
      }
    />
  ))}
      </ul>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First onClick={getFirstPage} />
          <Pagination.Prev onClick={getPrevPage} />
          {getPageNumbers().map((pageNum) => (
            <Pagination.Item key={pageNum} onClick={() => setPage(pageNum)}>
              {pageNum}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={getNextPage} />
          <Pagination.Last onClick={getLastPage} />
        </Pagination>
      </div>
      <div>
        Page {page} of {totalPages}
      </div>
    </div>
  );
}
