import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Empty, Modal } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { BackgroundNav, WavingHand } from "../assets";
import { useContext, useState } from "react";
import { AuthContext } from "react-oidc-context";

/* Contributers: Oisin, Shiraaz */

export default function CustomNavbar() {
  const [isModalOpen, setIsModalOpen] = useState(false); // for notification modal - modal always empty
  const { name } = useContext(AuthContext); // get name from context
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
          {/* Just extract the first name and say hi */}
          Hello {name.split(" ")[0]}, Good Day{" "}
          <img className="mb-1" src={WavingHand} width={20} alt="waving hand" />
        </p>
        
        {/* Notification Icon */}
        <Button
          type="default"
          className="bg-transparent border-0"
          shape="circle"
          icon={<BellOutlined style={{ color: "white" }} />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Notification Modal */}
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
