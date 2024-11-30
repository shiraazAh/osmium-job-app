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
        {selected === "Description" && (
          <div>
            <div>
              <h4>Responsibilities:</h4>
              <ul>
                <li>
                  <p>
                    You will design, develop, and test functions delivered by
                    applications
                  </p>
                </li>
                <li>
                  <p>
                    You will work with our operations teams to ensure your
                    services are available and reliable
                  </p>
                </li>
                <li>
                  <p>
                    You will develop hands-on experience in software development
                    to perform at scale
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h4>Qualifications:</h4>
              <ul>
                <li>
                  <p>Hands-on software development experience in Python</p>
                </li>
                <li>
                  <p>Experience implementing unit and integration tests</p>
                </li>
                <li>
                  <p>Experience with networking and security concepts</p>
                </li>
              </ul>
            </div>
          </div>
        )}
        {selected === "Company" && (
          <div>
            <h4>About Company</h4>
            <p>
              We take great pride in our culture here at Autodesk – our Culture
              Code is at the core of everything we do. Our values and ways of
              working help our people thrive and realize their potential, which
              leads to even better outcomes for our customers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
