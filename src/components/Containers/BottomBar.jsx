import React from "react";

// Import assets
import {
  BriefcaseIconOutlined,
  BriefcaseIconFilled,
  UserIconOutlined,
  UserIconFilled,
  HomeIconFilled,
  HomeIconOutlined,
  ApplicationsIconFilled,
  ApplicationsIconOutlined,
} from "../../assets/bottombar";

import { NavLink, useLocation } from "react-router-dom";

/* Contributers: Shiraaz, Somesh (Initial component)*/
// This is the main bottom navigation bar, this takes you to different pages
export default function BottomBar() {
  const { pathname } = useLocation();

  return (
    <div
      className="bg-white position-fixed bottom-0 text-center w-100 shadow-lg d-flex align-items-center justify-content-around"
      style={{ height: "70px" }}
    >
      {/* Home button */}
      <NavLink to="/" className="border-0 bg-transparent">
        <img
          src={pathname === "/" ? HomeIconFilled : HomeIconOutlined}
          alt="home icon"
        />
      </NavLink>
      {/* My Applications button */}
      <NavLink to="/my-applications" className="border-0 bg-transparent">
        <img
          src={
            pathname === "/my-applications"
              ? ApplicationsIconFilled
              : ApplicationsIconOutlined
          }
          alt="briefcase icon"
        />
      </NavLink>
      {/* Jobs button */}
      <NavLink to="/jobs" className="border-0 bg-transparent">
        <img
          src={
            pathname === "/jobs" ? BriefcaseIconFilled : BriefcaseIconOutlined
          }
          alt="briefcase icon"
        />
      </NavLink>
      {/* Profile button */}
      <NavLink to="/profile" className="border-0 bg-transparent">
        <img
          src={pathname === "/profile" ? UserIconFilled : UserIconOutlined}
          alt="user icon"
        />
      </NavLink>
    </div>
  );
}
