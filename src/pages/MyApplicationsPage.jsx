import { Empty, Flex, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import MyApplicationCard from "../components/Cards/MyApplicationCard";

/* Contributers:  */

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sub: userId } = useContext(AuthContext);
  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/application/${userId}`);

      const data = await res.json();
      setApplications(data.Items);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="pt-4">
      <h2 className="fw-bold mb-3">My Applications</h2>
      {loading ? (
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
