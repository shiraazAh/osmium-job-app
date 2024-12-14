import { Flex, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context";
import { NavLink } from "react-router-dom";

export default function MyApplicationsPage() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sub: userId } = useContext(AuthContext);
  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/application/${userId}`
      ); 

      const data = await res.json();
      setApplications(data.Items);
    } catch (error) {
        
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="pt-4">
      <h2 className="fw-bold">My Applications</h2>
      <ul>
        {loading ? (
          <Flex justify="center" align="center" style={{ height: "70vh" }}>
            <Spin size="large" />
          </Flex>
        ) : (
          applications.map((application) => (
            <li key={application.jobId}>
              <NavLink to={`/job/${application.jobId}`}>
                {application.jobName}
              </NavLink>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
