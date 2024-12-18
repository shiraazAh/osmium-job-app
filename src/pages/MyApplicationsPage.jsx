import { Empty, Flex, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import MyApplicationCard from "../components/Cards/MyApplicationCard";

/* Contributers:  */

export default function MyApplicationsPage({ applications, apiLoading, fetchAppliedJobs }) {
  const navigate = useNavigate();
  

  return (
    <div className="pt-4">
      <h2 className="fw-bold mb-3">My Applications</h2>
      {apiLoading ? (
        <Flex justify="center" align="center" style={{ height: "70vh" }}>
          <Spin size="large" />
        </Flex>
      ) : applications.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Empty description="You have not applied to any jobs" />
        </div>
      ) : (
        applications.map((application) => (
          <div key={application.jobId}>
            <MyApplicationCard
              title={application.jobName}
              company={application.company}
              onClick={() => navigate(`/job/${application.jobId}`)}
              applicationDate={application.timestamp}
              Status={application.status}
            />
          </div>
        ))
      )}
    </div>
  );
}
