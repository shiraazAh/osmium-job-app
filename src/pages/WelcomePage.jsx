import { Layout } from "antd";
import React from "react";

export default function WelcomePage() {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        maxWidth: "375px",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div>This is Welcome Page</div>
    </Layout>
  );
}
