import { Card, Empty, Flex, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import MyApplicationCard from "../components/Cards/MyApplicationCard";

/* Contributers: Shiraaz, Oisin  */

export default function MyApplicationsPage({
  applications, // This is the list of applications that the user has applied to
  apiLoading, // This is the loading state for the API call of fetching applied jobs
}) {
  const navigate = useNavigate();

  //Filter out the applications based on their status and sort them alphabetically based on their job name
  //Status -> accepted is 1, rejected is 2, pending is 0
  const acceptedApplications = applications
    .filter((application) => application.status === 1)
    .sort((a, b) => a.jobName.localeCompare(b.jobName));
  const pendingApplications = applications
    .filter((application) => application.status === 0)
    .sort((a, b) => a.jobName.localeCompare(b.jobName));
  const rejectedApplications = applications
    .filter((application) => application.status === 2)
    .sort((a, b) => a.jobName.localeCompare(b.jobName));

  return (
    <div className="pt-4">
      <h2 className="fw-bold mb-3">My Applications</h2>
      {apiLoading ? (
        // If the API call is loading, show a loading spinner
        <Flex justify="center" align="center" style={{ height: "70vh" }}>
          <Spin size="large" />
        </Flex>
      ) : applications.length === 0 ? (
        // If the user has not applied to any jobs, show a message
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Empty description="You have not applied to any jobs" />
        </div>
      ) : (
        <>
          {/* Pending applications */}
          <Card className="mb-3">
            {" "}
            {pendingApplications.length > 0 && (
              <div>
                <h6 className="fw-bold mb-3">Pending Applications</h6>
                {pendingApplications.map((application) => (
                  <div key={application.jobId}>
                    <MyApplicationCard
                      title={application.jobName}
                      company={application.company}
                      onClick={() => navigate(`/job/${application.jobId}`)}
                      applicationDate={application.timestamp}
                      Status={application.status}
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>
          {/* Accepted applications */}
          <Card className="mb-3">
            {acceptedApplications.length > 0 && (
              <div>
                <h6 className="fw-bold mb-3">Accepted Applications</h6>
                {acceptedApplications.map((application) => (
                  <div key={application.jobId}>
                    <MyApplicationCard
                      title={application.jobName}
                      company={application.company}
                      onClick={() => navigate(`/job/${application.jobId}`)}
                      applicationDate={application.timestamp}
                      Status={application.status}
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>
          {/* Rejected applications */}
          <Card className="mb-3">
            {rejectedApplications.length > 0 && (
              <div>
                <h6 className="fw-bold mb-3">Rejected Applications</h6>
                {rejectedApplications.map((application) => (
                  <div key={application.jobId}>
                    <MyApplicationCard
                      title={application.jobName}
                      company={application.company}
                      onClick={() => navigate(`/job/${application.jobId}`)}
                      applicationDate={application.timestamp}
                      Status={application.status}
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
