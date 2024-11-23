import React, { useState, useEffect } from "react";
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
  const setCurrentPage = (pageNumber) => setPage(pageNumber);

  return (
    <div>
      <h1>Jobs</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {data.map((job) => (
          <li key={job.id}>{job.name}</li>
        ))}
      </ul>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First onClick={getFirstPage} />
          <Pagination.Prev onClick={getPrevPage} />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Next onClick={getNextPage} />
          <Pagination.Last onClick={getLastPage} />
        </Pagination>
      </div>
    </div>
  );
}
