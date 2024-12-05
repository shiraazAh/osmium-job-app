import React from "react";
import { Card, Button } from "antd";
import { EnvironmentOutlined, HeartOutlined } from "@ant-design/icons";
import "../styles.css"; // Import the CSS file

const JobCard = ({
  onClick,
  title,
  company,
  location,
  salary, /** Still working on the salary **/
}) => {
  return (
    <Card className="job-card" hoverable bodyStyle= {{padding: "20px"}} onClick={onClick}>
      {/* Top Section */}
      <div className="job-card-top">
        <div className="job-card-left">
          <img
            src="https://via.placeholder.com/60"
            alt="Company Logo"
            className="company-logo"
          />
          <div>
            <p className="company-name">{company}</p>
            <h5  className="job-title">{title}</h5>
          </div>
        </div >
        <Button type="text" icon={<HeartOutlined />}  className="save-button" />
      </div>

      {/* Bottom Section */}
      <div className="job-card-bottom">
        <div className="job-location">
          <EnvironmentOutlined className="location-icon" />
          <p className="location-text">{location}</p>
        </div>
        <h3 className="job-salary">$K/mo</h3>
      </div>
    </Card>
  );
};

export default JobCard;
