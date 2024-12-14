import { Card, Select, Button } from "antd";
import { Input } from "antd";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import FilterOutlined from "@ant-design/icons/FilterOutlined";
import GradientButton from "../components/Buttons/GradientButton";
import CustomNavbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom"; // Ensure this import is added
import "../styles.css";

const { Search } = Input;

export default function AllJobsPage() {
  const navigate = useNavigate(); // Use useNavigate here
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPage = async (pageNumber) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.themuse.com/api/public/jobs?page=${pageNumber}&per_page=10`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const fetchedData = await response.json();
        setData(fetchedData.results.slice(0, 10));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage(page);
  }, [page]);

  const handleJobSelect = (jobId) => {
    // Navigate to the job details page using the job ID
    navigate(`/job/${jobId}`);
  };

  const handleSeeAllClick = () => {
    navigate(`/jobs`); // Navigate to the success page
  };

  return (
    <>
      <div className="position-relative">
        <CustomNavbar />
      </div>
      <h2 className="text-white mt-3 fw-bold">
        Search & Land on your dream job
      </h2>
      <div className="d-flex justify-content-center mt-4">
        <Card className="shadow-sm" style={{ width: "100%", height: 230 }}>
          {/*** Inputs ***/}
          <Input
            placeholder="Search Job"
            allowClear
            size="large"
            className="w-100 filter-inputs px-0 mb-2"
            variant="borderless"
            prefix={<SearchOutlined className="me-1" />}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Job Type"
            className="w-100 filter-inputs px-0 mb-2"
            rootClassName="px-0"
            variant="borderless"
            style={{ flex: 1 }}
            prefix={<FilterOutlined className="me-1" />}
            size="large"
            options={[
              { value: "1", label: "Health" },
              { value: "2", label: "Engineering" },
              { value: "3", label: "Human Relations" },
            ]}
          />
          <Input
            placeholder="Location"
            allowClear
            size="large"
            className="w-100 px-0 mb-2"
            variant="borderless"
            prefix={<EnvironmentOutlined className="me-1" />}
            // onSearch={onSearch}
            style={{ width: 200 }}
          />
          <GradientButton className="w-100 shadow" height={50}>
            Search Job
          </GradientButton>
        </Card>
      </div>
      <div className="mt-4 mb-5">
        <div className="d-flex flex-row justify-content-between align-items-center mb-2">
          <p className="font-weight-bold mb-0">Recomendations</p>
          <Button
            onClick={handleSeeAllClick}
            type="link"
            className="text-decoration"
          >
            See All
          </Button>
        </div>

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
      </div>
    </>
  );
}
