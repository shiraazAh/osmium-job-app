import React from 'react'
import {
  BriefcaseIconOutlined,
  BriefcaseIconFilled,
  UserIconOutlined,
  UserIconFilled,
  HomeIconFilled,
  HomeIconOutlined,
  ApplicationsIconFilled,
  ApplicationsIconOutlined
} from "../../assets/bottombar";
import { NavLink, useLocation } from 'react-router-dom';

export default function BottomBar() {

  const { pathname } = useLocation();

  return (
    <div
      className="bg-white position-fixed bottom-0 text-center w-100 shadow-lg d-flex align-items-center justify-content-around"
      style={{ height: "70px" }}
    >
      <NavLink to="/" className="border-0 bg-transparent">
        <img
          src={pathname === "/" ? HomeIconFilled : HomeIconOutlined}
          alt="home icon"
        />
      </NavLink>
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
      <NavLink to="/jobs" className="border-0 bg-transparent">
        <img
          src={
            pathname === "/jobs"
              ? BriefcaseIconFilled
              : BriefcaseIconOutlined
          }
          alt="briefcase icon"
        />
      </NavLink>
      <NavLink to="/profile" className="border-0 bg-transparent">
        <img
          src={pathname === "/profile" ? UserIconFilled : UserIconOutlined}
          alt="user icon"
        />
      </NavLink>
    </div>
  );
}
