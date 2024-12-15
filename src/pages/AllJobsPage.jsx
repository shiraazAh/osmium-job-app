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
import jobData from "../utils/jobData.json";

const { Search } = Input;

export default function AllJobsPage() {
  const navigate = useNavigate(); // Use useNavigate here
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [jobCategory, setJobCategory] = useState(null);
  const [jobLocation, setJobLocation] = useState(null);
  const [jobLevel, setJobLevel] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

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

  const handleSearch = async() => {
      setButtonLoading(true);

      try {
        const response = await fetch(
          `https://www.themuse.com/api/public/jobs?page=0&per_page=10&${getParameters()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const fetchedData = await response.json();
        setData(fetchedData.results.slice(0, 10));
        setJobCategory(null);
        setJobLocation(null);
        setJobLevel(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setButtonLoading(false);
      }
    };

  const getParameters = () => {
    const params = [];
    if (jobCategory) {
      params.push(`category=${jobCategory}`);
    }
    if (jobLocation) {
      params.push(`location=${jobLocation}`);
    }
    if (jobLevel) {
      params.push(`level=${jobLevel}`);
    }
    return params.join("&");
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
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
        <CustomNavbar />
      </div>
      <h2 className="text-white mt-3 fw-bold">
        Search & Land on your dream job
      </h2>
      <div className="d-flex justify-content-center mt-4">
        <Card className="shadow-sm" style={{ width: "100%", height: 240 }}>
          {/*** Inputs ***/}
          {/* <Input
            placeholder="Search Job"
            allowClear
            size="large"
            className="w-100 filter-inputs px-0 mb-2"
            variant="borderless"
            prefix={<SearchOutlined className="me-1" />}
            style={{ width: 200 }}
          /> */}
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
            disabled={(!jobCategory && !jobLocation && !jobLevel)}
          >
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
            className=" p-0"
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

// JobCategorySelect component with sorting
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
