import React from "react";
import { Layout } from "antd"; 
import GradientButton from "../components/Buttons/GradientButton";
import Ellipse from "../assets/background/Ellipse.png";
import { Card } from "antd";
import { Button } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";


export default function EditProfilePage()
{
    return(
        <>
        <Layout>
        <div className = "EditProfilePage" >
            <div className="EditPageHeading">
            <h1 className = "Edit-Heading"> Edit Profile </h1>
            </div>
            <div className="Ellipse-Image">
            <img  className = "Ellipse" src = {Ellipse} alt = "Wait a moment please" />
            </div>

            
            <Card className="edit-card" hoverable bodyStyle= {{padding: "20px"}}>
            <div className="edit-card-inside">
                <div className = "EditName">
                    <p>Full Name</p>
                    <input type="text" placeholder = "Enter your name"/> 
                </div>

                <div className="divider"></div>

                <div className = "EditLocation">
                    <p>Location</p>
                    <div className="location-container">
            <EnvironmentOutlined style={{ fontSize: "20px", color: "#888" }} />
            <input
              type="text"
              placeholder="Enter your location"
            />
          </div>
                </div>
                </div>
            </Card>


      <div className = "Edit-Button-group" >     
  <GradientButton size = "small" type="primary" className = "SaveButton" height={50}>
   Save
    </GradientButton>
  <Button size = "small" ghost type="primary"  className = "CancelButton" height={50}>
    <b>Cancel</b>
    </Button>
    </div>
        </div>
        </Layout>
        </>
    );
}