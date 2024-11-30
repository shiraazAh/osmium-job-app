import React, { useState } from "react";
import { Segmented } from "antd";
import "../styles.css";

export default function JobDetailsPage() {
  const [selected, setSelected] = useState("Description");

  return (
    <div>
      <Segmented
        options={["Description", "Company"]}
        onChange={(option) => {
          setSelected(option);
        }}
      />
      <div>
        {selected === "Description" && <h4>Description</h4>}
        {selected === "Company" && <h4>Company</h4>}
      </div>
    </div>
  );
}
