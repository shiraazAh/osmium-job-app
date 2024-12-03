import { Layout } from "antd";
import React from "react";

export default function WelcomePage() {
  return (
    <>
    <Layout
      style={{
        minHeight: "100vh",
        maxWidth: "375px",
        margin: "0 auto",
        padding: "0 20px",
      }} >

      <div className="container-fluid">
        <div className="App">
          <img
            className="img-fluid"
            src="/project-image.png"
            alt="wait a moment please.."
          />
        </div>
        <div className="description">
          <h1>
            <b>Your Job Search, Made Smarter</b>
          </h1>
          <p>
            Every job search is a journey of growth and opportunity. Stay
            positive and keep moving forward
          </p>

          <button className="button1">
            {" "}
            <b>Get Started </b>
          </button>
          <button className="button2">
            <b>Have an account? Login</b>{" "}
          </button>
        </div>
        
      </div>
      </Layout>
    </>
  );
}



