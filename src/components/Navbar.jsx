import "../styles.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { BackgroundNav, WavingHand } from "../assets";

export default function CustomNavbar() {
  return (
    <div className="d-flex justify-content-between w-100 align-items-end navbar-container">
      <img
        src={BackgroundNav}
        alt="logo"
        style={{ zIndex: "-1" }}
        className="position-absolute w-100 start-0 top-0 "
      />
      <p className="m-0 text-white" style={{padding: "0 20px"}}>Hello Person, Good Day <img className="mb-1" src={WavingHand} width={20} alt="waving hand" /></p>
      <Button
        type="default"
        className="bg-transparent border-0"
        shape="circle"
        icon={<BellOutlined style={{ color: "white" }} />}
        // onClick={showModal}
        // size={"large"}
      />
    </div>
  );
}
