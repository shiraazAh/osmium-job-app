import { Card, Select, Button, message } from "antd";
import { Input } from "antd";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import FilterOutlined from "@ant-design/icons/FilterOutlined";
import GradientButton from "../components/Buttons/GradientButton";
import CustomNavbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import JobCard from "../components/Cards/JobCard";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import jobData from "../utils/jobData.json"; // Import the job search options - json mostly generated by AI
import { getParameters } from "../utils/helpers";

/* Contributers: Shiraaz, Oliver, Oisin */
/* AllJobsPage allows user to search for jobs based on category, location and level and it also shows user 10 reccomeneded jobs  */

const { Search } = Input;

export default function AllJobsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [jobCategory, setJobCategory] = useState(null);
  const [jobLocation, setJobLocation] = useState(null);
  const [jobLevel, setJobLevel] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    //Fetch 10 jobs from themuse API
    //Public API documentation: https://www.themuse.com/developers/api/v2?ref=public_apis
    const fetchPage = async (pageNumber) => {
      setIsLoading(true);

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
        message.error("Could not fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage(page);
  }, [page]);

  // search for jobs based on category, location and/or level
  const handleSearch = async () => {
    setButtonLoading(true);
    navigate(`/jobs?${getParameters(jobCategory, jobLocation, jobLevel)}`);
  };

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
        {/* Top Header */}
        <CustomNavbar />
      </div>
      <h2 className="text-white mt-3 fw-bold">
        Search & Land on your dream job
      </h2>
      <div className="d-flex justify-content-center mt-4">
        <Card className="shadow-sm" style={{ width: "100%", height: 240 }}>
          {/*** Search Inputs and search button ***/}
          <AutoCompleteSelect
            options={jobData.job_categories}
            icon={<SearchOutlined className="me-1" />}
            placeholder="Search Job"
            onChange={(value) => setJobCategory(value)}
            value={jobCategory}
          />
          <AutoCompleteSelect
            options={jobData.job_levels}
            icon={<FilterOutlined className="me-1" />}
            placeholder="Job Level"
            onChange={(value) => setJobLevel(value)}
            value={jobLevel}
          />
          <AutoCompleteSelect
            options={jobData.locations}
            icon={<EnvironmentOutlined className="me-1" />}
            placeholder="Location"
            onChange={(value) => setJobLocation(value)}
            border={false}
            value={jobLocation}
          />
          <GradientButton
            className="w-100 shadow"
            height={50}
            onClick={() => handleSearch()}
            loading={buttonLoading}
            disabled={!jobCategory && !jobLocation && !jobLevel}
          >
            Search Job
          </GradientButton>
        </Card>
      </div>
      {/* List of 10 reccomended jobs, same as JobCard used in the JobPagination component */}
      <div className="mt-4 mb-5">
        <div className="d-flex flex-row justify-content-between align-items-center mb-2">
          <p className="font-weight-bold mb-0">Recomendations</p>
          {/* See all button that takes you to the JobPagination page */}
          <Button onClick={handleSeeAllClick} type="link" className=" p-0">
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

// Reusable AutoComplete select component with sorting implemented
// Taken from Ant design autocomplete select example
const AutoCompleteSelect = ({
  options,
  icon,
  placeholder,
  border = true,
  onChange,
  value = null,
}) => (
  <Select
    allowClear
    showSearch
    className="filter-inputs w-100 mb-2"
    style={{ borderBottom: border ? "1px solid #d9d9d9" : "none" }}
    placeholder={placeholder}
    value={value}
    prefix={icon}
    optionFilterProp="label"
    optionFontSize={16}
    onChange={onChange}
    size="large"
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? "")
        .toLowerCase()
        .localeCompare((optionB?.label ?? "").toLowerCase())
    }
    options={options.map((category) => ({
      value: category,
      label: category,
    }))}
  />
);
