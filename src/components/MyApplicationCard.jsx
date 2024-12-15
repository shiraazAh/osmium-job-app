import {Card, Diveder, Flex, Tag} from "antd";
import React from "react";
import "../styles.css";


const shortenText = (text, maxlength) => {
    if(text.length <= maxlength){
        return text;
    }
    return text.slice(text, maxlenght) + "...";
};

const jobCard = ({
    onClick,
    title,
    company,
    applicationDate,
    Status,
}) => { return (
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
            <Tag className="Status"color="gold">viewing</Tag>
          </div>
    
          {/* Bottom Section */}
          <div className="job-card-bottom">
            <div className="job-location">
              <Tag color="blue">Date of application</Tag>
            </div>
          </div>
        </Card>
      );
    };
    
    export default MyApplicationCard;