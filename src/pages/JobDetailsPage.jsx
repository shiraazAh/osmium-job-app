import React from "react";
import { Segmented } from "antd";
import "../styles.css";

export default function JobDetailsPage() {
  return (
    <div>
      <Segmented
        options={["Description", "Company"]}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}
