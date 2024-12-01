import React from "react";
import {Card, Tag, Typography} from "antd";
import {EnvironmentOutlined, CalendarOutlined} from "@ant-design/icons" //icon for location and calendar

const {Title, Text} = Typography; //taking title and text components from antd

//helper functions 
const RemoveHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";// THis removes the HTML Tags from the API job Descriptions
};

const shortenText = (html, maxlength) => { //max string size is determined in return function (set to 150)
  const cleanText = RemoveHTML(html);
  return cleanText.length > maxlength
  ? cleanText.slice(0,maxlength) + "..." : cleanText; //This makes it so the entire job decription doesnt get printed on job card
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); //this will remove the time from the date to just give YY/MM/DD
}

const JobCard = ({
  title,
  company,
  location,
  // jobType, // in the API jobtype just shows "job" so i did not inlude in job card
  description,
  publicationDate,
  levels,
}) => {
  return (
    <div className = "job-card-container">
    <Card className="job-card" hoverable>
      <div>
        <Title level={4}>{title}</Title> 
        <Text strong>{company}</Text> 
      </div>
      <div className="mt-1">
        <EnvironmentOutlined style={{ marginRight: 8 }} />
        <Text>{location}</Text> 
      </div>

      <div className="mt-2">
        <CalendarOutlined style={{ marginRight: 8 }} />
        <Text>{formatDate(publicationDate)}</Text> 
      </div>
      <div className = "tag-container">
        <Tag color="blue">{levels}</Tag>
        </div>
      <p className="mt-2">{shortenText(description, 150)}</p> 
      
    
    </Card>
    </div>
  );
};

export default JobCard;