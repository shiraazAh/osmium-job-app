import React, { useContext } from "react";

// Import assets
import {
  ApplicationsIconOutlinedBlue,
  LogOutIcon,
  UserIconFilled,
  UserIconOutlinedBlue,
} from "../assets/bottombar";

import { Button, List } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { AuthContext } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

/* Contributers: Somesh, Shiraaz */

export default function ProfilePage() {
  const { name, email, logout } = useContext(AuthContext); // get name, email from context to display & logout to log user out
  const navigate = useNavigate();

  // Array of button items with navName, icon, and onClick function
  const buttonItems = [
    {
      navName: "Edit Profile",
      icon: (
        <img
          className="me-2 profile-page-icon-sizing"
          src={UserIconOutlinedBlue}
          alt="Edit profile icon"
        />
      ),
      onClick: () => {
        navigate("/edit");
      },
    },
    {
      navName: "My Applications",
      icon: (
        <img
          className="me-2 profile-page-icon-sizing"
          src={ApplicationsIconOutlinedBlue}
          alt="My Applications icon"
        />
      ),
      onClick: () => {
        navigate("/my-applications");
      },
    },
    {
      navName: "Log Out",
      icon: (
        <img
          className="me-2 profile-page-icon-sizing"
          src={LogOutIcon}
          alt="Logout Icon"
        />
      ),
      onClick: () => {
        signOut().then(() => {
          navigate("/");
          logout();
        });
      },
    },
  ];
  return (
    <div className="pt-4">
      <h2 className="fw-bold">Profile</h2>
      <div className="d-flex flex-column align-items-center my-4">
        {/* Temporary User Avatar picture with name and email*/}
        <img
          className="bg-white"
          style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          src={UserIconFilled}
          alt="User Picture"
        />
        <h5 className="mt-2 mb-1">{name}</h5> 
        <p className="mb-0 text-secondary">{email}</p>
      </div>
      <div>
        {/* List of buttons - Edit Profile, My Applications, Log Out */}
        <List
          size="large"
          className="bg-white border-0 profile-page-list-container"
          bordered
          dataSource={buttonItems}
          renderItem={(item) => (
            <List.Item
              className="d-flex justify-content-between profile-page-lists"
              onClick={() => item.onClick()}
            >
              <div>
                {item.icon}
                {item.navName}
              </div>
              <RightOutlined />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
