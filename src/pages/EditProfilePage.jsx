import React, { useContext, useState } from "react";
import { Layout, message } from "antd";
import GradientButton from "../components/Buttons/GradientButton";
import Ellipse from "../assets/background/Ellipse.png"; // Background ellipse image
import { Card } from "antd";
import { Button } from "antd";
import { EnvironmentOutlined, MailOutlined } from "@ant-design/icons"; // Ant Design icons for location and mail
import SecondaryButton from "../components/Buttons/SecondaryButton";
import { AuthContext } from "react-oidc-context"; // Context to access authentication-related data.
import { updateUserAttribute } from "aws-amplify/auth"; // AWS Amplify function to update user attributes
import { useNavigate } from "react-router-dom";

/* Contributers: Somesh */

export default function EditProfilePage() {
  const { name, email, getUserDetails } = useContext(AuthContext); // Extract user details and related methods from context
  const [fullname, setFullName] = useState(name); // Local state to track name input
  const [loading, setLoading] = useState(false); // State for managing loading spinner
  const navigate = useNavigate(); // Navigation function to redirect users.

  // Handles updating a user attribute via AWS Amplify.
  // This is taken from: https://docs.amplify.aws/gen1/react/build-a-backend/auth/manage-user-profile/#update-user-attribute
  async function handleUpdateUserAttribute(attributeKey, value) {
    setLoading(true);
    try {
      const output = await updateUserAttribute({
        userAttribute: {
          attributeKey,
          value,
        },
      });
      handleUpdateUserAttributeNextSteps(output);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Handles the next steps after updating the user attribute.
  function handleUpdateUserAttributeNextSteps(output) {
    const { nextStep } = output;

    switch (nextStep.updateAttributeStep) {
      case "DONE":
        message.success("Your name was successfully updated.");
        getUserDetails();
        navigate("/profile"); // Navigate to the profile page.
        break;
      default:
        message.error("Some error occurred, please try again later.");
    }
  }
  return (
    <>
      <Layout>
        <div className="EditProfilePage">
          <div className="EditPageHeading">
            <h2 className="fw-bold mt-3 mb-3 text-center"> Edit Profile </h2>
          </div>
          <div className="Ellipse-Image">
            <img className="Ellipse" src={Ellipse} alt="Wait a moment please" />
          </div>

          <Card className="edit-card p-2">
            {" "}
            {/* Card for profile editing form */}
            <div className="edit-card-inside">
              <div className="EditName">
                <p>Full Name</p>
                <input
                  className="pt-0 pb-0"
                  type="text"
                  placeholder="Enter your name"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)} // Update state on input change
                />
              </div>
              <div className="divider"></div>{" "}
              {/* Divider for visual separation */}
              <div className="EditLocation">
                <p className="p-0 mt-1">Email</p>
                <div className="location-container">
                  <MailOutlined style={{ fontSize: "20px", color: "#888" }} />
                  <input
                    className="pt-0 pb-0"
                    type="text"
                    placeholder="Enter your location"
                    value={email}
                    disabled
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="Edit-Button-group">
            <GradientButton // Save Button
              size="small"
              type="primary"
              className="SaveButton"
              height={50}
              disabled={name === fullname}
              loading={loading}
              onClick={() => handleUpdateUserAttribute("name", fullname)} // Trigger name update
            >
              Save
            </GradientButton>
            <SecondaryButton // Cancel Button
              size="small"
              ghost
              type="primary"
              className="CancelButton"
              height={50}
              onClick={() => window.history.back()} // Go back to the previous page
            >
              <b>Cancel</b>
            </SecondaryButton>
          </div>
        </div>
      </Layout>
    </>
  );
}
