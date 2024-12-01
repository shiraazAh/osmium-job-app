import React, { useState, useEffect } from "react";
import { Pagination, List } from "antd";
import "../styles.css";

export default function JobPagination() {
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

  return (
    <div className="mx-auto px-4 py-3">
      <h1>Jobs</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(job) => <List.Item key={job.id}>{job.name}</List.Item>}
      />

      <div className="d-flex justify-content-center mt-4 align-items-center">
        <Pagination
          current={page}
          total={totalItems}
          pageSize={20}
          onChange={handlePageChange}
          showSizeChanger={false}
          // showQuickJumper
        />
      </div>
      <div className="text-center mt-3">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}
