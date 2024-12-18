import { Card, Flex, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { imageUrls } from "./JobCard";

/* Contributers:  */

const shortenText = (text, maxlength) => {
  if (text.length <= maxlength) {
    return text;
  }
  return text.slice(text, maxlength) + "...";
};

const MyApplicationCard = ({
  onClick,
  title,
  company,
  applicationDate = "NA",
  Status,
}) => {
  const [randomImageUrl, setRandomImageUrl] = useState("");

  useEffect(() => {
    // Selects a random to use with component
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setRandomImageUrl(imageUrls[randomIndex]);
  }, []);
  // Format the date
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(applicationDate);
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // Adjust format to match 02-10-2024 6:30 pm
  const [month, day, year] = formattedDate.split(",")[0].split("/");
  const time = formattedDate.split(", ")[1];
  const finalFormat = `${day}-${month}-${year} ${time}`;

  return (
    <Card
      className="job-card"
      hoverable
      bodyStyle={{ padding: "15px" }}
      onClick={onClick}
    >
      {/* Top Section */}
      {/*random image used for img src*/}
      <div className="job-card-top">
        <div className="job-card-left">
          <img
            src={randomImageUrl}
            alt="Company Logo"
            className="company-logo"
          />
          <div>
            <p className="company-name">{company}</p>
            <h5 className="job-title">{shortenText(title, 70)}</h5>
          </div>
        </div>
        <Tag className="Status" color="gold">
          {Status == 0 ? "Viewing" : Status == 1 ? "Accepted" : "Rejected"}
        </Tag>
      </div>

      {/* Bottom Section */}
      <div className="job-card-bottom">
        <div className="job-location">
          <Tag color="blue">{finalFormat}</Tag>
        </div>
      </div>
    </Card>
  );
};

export default MyApplicationCard;
