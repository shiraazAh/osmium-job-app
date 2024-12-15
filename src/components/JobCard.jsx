import React from "react";
import { Card, Button } from "antd";
import { EnvironmentOutlined, HeartOutlined } from "@ant-design/icons";
import "../styles.css"; 


/* helper function to shorten title and location*/
const shortenText = (text, maxlength) => {
if(text.length <= maxlength){
  return text;
}
return text.slice(0, maxlength) + "...";
};

const JobCard = ({
  onClick,
  title,
  company,
  location,
  salary, /** Still working on the salary **/
}) => {
  return (
    <Card className="job-card" hoverable bodyStyle= {{padding: "15px"}} onClick={onClick}>
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
            <h5  className="job-title">{shortenText(title, 70)}</h5>
          </div>
        </div >
        <Button type="text" icon={<HeartOutlined />}  className="save-button" />
      </div>

      {/* Bottom Section */}
      <div className="job-card-bottom">
        <div className="job-location">
          <EnvironmentOutlined className="location-icon" />
          <p className="location-text">{shortenText(location, 35)}</p>
        </div>
        <h3 className="job-salary">$K/mo</h3>
      </div>
    </Card>
  );
};

export default JobCard;
