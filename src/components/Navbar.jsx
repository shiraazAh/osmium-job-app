import "../styles.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Empty, Modal } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { BackgroundNav, WavingHand } from "../assets";
import { useContext, useState } from "react";
import { AuthContext } from "react-oidc-context";

export default function CustomNavbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name } = useContext(AuthContext);
  return (
    <>
      <div className="d-flex justify-content-between w-100 align-items-end navbar-container">
        <img
          src={BackgroundNav}
          alt="logo"
          style={{ zIndex: "-1", objectFit: "cover", maxHeight: "300px" }}
          className="position-absolute w-100 start-0 top-0 navbar-bg-extend vw-100"
        />
        <p className="m-0 text-white">
          {/* Just get the first name and say hi */}
          Hello {name.split(" ")[0]}, Good Day{" "}
          <img className="mb-1" src={WavingHand} width={20} alt="waving hand" />
        </p>
        <Button
          type="default"
          className="bg-transparent border-0"
          shape="circle"
          icon={<BellOutlined style={{ color: "white" }} />}
          onClick={() => setIsModalOpen(true)}
          // size={"large"}
        />
      </div>
      <Modal
        title="Notifications"
        open={isModalOpen}
        footer={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Empty description="No notifications" />
      </Modal>
    </>
  );
}
