import React, { useContext, useState } from "react";
import { Layout, message } from "antd"; 
import GradientButton from "../components/Buttons/GradientButton";
import Ellipse from "../assets/background/Ellipse.png";
import { Card } from "antd";
import { Button } from "antd";
import { EnvironmentOutlined, MailOutlined } from "@ant-design/icons";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import { AuthContext } from "react-oidc-context";
import { updateUserAttribute } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";


export default function EditProfilePage()

{
    const { name, email, getUserDetails } = useContext(AuthContext);
    const [fullname, setFullName] = useState(name);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

function handleUpdateUserAttributeNextSteps(output) {
  const { nextStep } = output;

  switch (nextStep.updateAttributeStep) {
    case "DONE":
        message.success("Your name was successfully updated.");
        getUserDetails();
        navigate("/profile");
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
              <img
                className="Ellipse"
                src={Ellipse}
                alt="Wait a moment please"
              />
            </div>

            <Card className="edit-card p-2">
              <div className="edit-card-inside">
                <div className="EditName">
                  <p>Full Name</p>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="pb-1 pt-0"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="divider"></div>

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
              <GradientButton
                size="small"
                type="primary"
                className="SaveButton"
                height={50}
                disabled={name === fullname}
                loading={loading}
                onClick={() => handleUpdateUserAttribute("name", fullname)}
              >
                Save
              </GradientButton>
              <SecondaryButton
                size="small"
                ghost
                type="primary"
                className="CancelButton"
                height={50}
                onClick={() => window.history.back()}
              >
                <b>Cancel</b>
              </SecondaryButton>
            </div>
          </div>
        </Layout>
      </>
    );
}