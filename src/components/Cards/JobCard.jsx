import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { EnvironmentOutlined, HeartOutlined } from "@ant-design/icons";
import "../../styles.css";

export const imageUrls = [
  "https://cdn.pixabay.com/photo/2012/07/26/20/55/barrels-52934_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/21/21/15/beer-1998293_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/07/15/09/05/factory-1518504_1280.jpg",
  "https://cdn.pixabay.com/photo/2013/11/01/10/40/beer-203855_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/03/22/18/37/beer-2166004_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/10/14/09/07/beer-987345_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/06/23/17/49/beer-tap-2435408_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/21/11/48/beer-2665077_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/06/28/06/04/beer-2449887_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/06/25/11/12/brewery-377019_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/11/08/22/12/beer-3803425_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/03/20/11/56/malt-4950433_1280.jpg",
  "https://cdn.pixabay.com/photo/2012/03/04/00/27/alcohol-21938_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/08/25/17/37/hop-vines-7410903_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/04/10/16/09/beer-5026476_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/26/06/01/beer-2345250_1280.jpg",
  "https://cdn.pixabay.com/photo/2019/11/03/16/27/beer-tasting-flight-4599048_1280.jpg",
];

/* helper function to shorten title and location*/
const shortenText = (text, maxlength) => {
  if (text.length <= maxlength) {
    return text;
  }
  return text.slice(0, maxlength) + "...";
};

const JobCard = ({
  onClick,
  title,
  company,
  location,
  salary /** Still working on the salary **/,
}) => {
  const [randomImageUrl, setRandomImageUrl] = useState("");

  useEffect(() => {
    // Select a random image URL when the component mounts
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setRandomImageUrl(imageUrls[randomIndex]);
  }, []);
  return (
    <Card
      className="job-card"
      hoverable
      bodyStyle={{ padding: "15px" }}
      onClick={onClick}
    >
      {/* Top Section */}
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
        <Button type="text" icon={<HeartOutlined />} className="save-button" />
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
