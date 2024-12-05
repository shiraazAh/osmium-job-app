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



// import React from "react";
// import { Card, Tag, Typography } from "antd";
// import { EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons"; //icon for location and calendar
// const { Title, Text } = Typography; //taking title and text components from antd

// //helper functions

// /***  THis removes the HTML Tags from the API job Descriptions ***/
// // const RemoveHTML = (html) => {
// //   const doc = new DOMParser().parseFromString(html, "text/html");
// //   return doc.body.textContent || "";
// // };
// // /*** max string size is determined in return function (set to 150)
// // //This makes it so the entire job decription doesnt get printed on job card***/
// // const shortenText = (html, maxlength) => {
// //   const cleanText = RemoveHTML(html);
// //   return cleanText.length > maxlength
// //     ? cleanText.slice(0, maxlength) + "..."
// //     : cleanText;
// // };
// // /*** this will remove the time from the date to just give YY/MM/DD ***/
// // const formatDate = (dateString) => {
// //   const date = new Date(dateString);
// //   return date.toLocaleDateString("en-GB");
// // };

// const JobCard = ({
//   onClick,
//   title,
//   company,
//   location,
//   salary,
//   /***  jobType, in the API jobtype just shows "job" so i did not inlude in job card ***/
//   // description,
//   // publicationDate,
//   // levels,
// }) => {
//   return (
//     <div className="job-card-container">
//       <Card className="job-card" hoverable onClick={onClick}>
//         <div className="job-card-header">
//       <img src="https://via.placeholder.com/40?text=Logo" alt={"{company} Logo"} className="company-logo" />
//         <div>
//           <div className="job-card-content">
//           <Text className="company-name">{company}</Text>
//           <Title level={4}>{title}</Title>
//             </div>
//           </div>
//         </div>

//         <div className="location">
//           <EnvironmentOutlined style={{ marginRight: 8 }} />
//           <Text>{location}</Text>
//         </div>

//         {/* <div className="mt-2 date">
//           <CalendarOutlined style={{ marginRight: 8 }} />
//           <Text>{formatDate(publicationDate)}</Text>
//         </div> */}

//         {/* <div className="tag-container">
//           <Tag color="blue">{levels}</Tag>
//         </div> */}
//         {/* <p className="mt-2">{shortenText(description, 150)}</p> */}
//       </Card>
//     </div>
//   );
// };

// export default JobCard;
