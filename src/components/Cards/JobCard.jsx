import React from "react";
import { Card, Button } from "antd";
import { EnvironmentOutlined, HeartOutlined } from "@ant-design/icons";
import "../../styles.css"; 


/**This is to get a random salary on the job card as the API doesnt specifically have a salary */
function RandomSalary(){
  let salary = Math.floor((Math.random()*10)+1);
  return salary;
};

/* to shorten title and location*/
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

}) => {
  
  return (
    /*Card implementation from antdesings */
    <Card className="job-card" hoverable bodyStyle= {{padding: "15px"}} onClick={onClick}>
      {/* This is the top left section to my card*/}
      <div className="job-card-top">
        <div className="job-card-left">
          <img
            src="https://via.placeholder.com/60"
            alt="Company Logo"
            className="company-logo"
          />
          <div>
            <p className="company-name">{company}</p>
            {/*this is the limiter varible for job title*/}
            <h5  className="job-title">{shortenText(title, 70)}</h5>
          </div>
        </div >
        {/** this is a button as a heart icon from antd icons used to like jobs you find interesting*/}
        <Button type="text" icon={<HeartOutlined />}  className="save-button" /> 
      </div>

      {/* this is the Bottom Section including the location and the salary*/}
      <div className="job-card-bottom">
        <div className="job-location">
          <EnvironmentOutlined className="location-icon" />
           {/*this is the limiter varible for job location*/}
          <p className="location-text">{shortenText(location, 35)}</p>
        </div>
        <h3 className="job-salary">${RandomSalary()}K/mo</h3>
      </div>
    </Card>
  );
};

export default JobCard;
