import { Card, Select } from "antd";
import React from "react";
import { Input } from "antd";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import FilterOutlined from "@ant-design/icons/FilterOutlined";
import GradientButton from "../components/Buttons/GradientButton";

const { Search } = Input;

export default function AllJobsPage() {
  return (
    <>
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
    </>
  );
}
