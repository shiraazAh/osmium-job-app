import { Layout } from "antd";
import React from "react";
import GradientButton from "../components/Buttons/GradientButton";

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
            src="../assets/project-image.png"
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

          <GradientButton className="button1" height={50}></GradientButton>
            {" "}
            <b>Get Started </b>
          </GradientButton>
          <GradientButton className="button2" height={50}></GradientButton>
            <b>Have an account? Login</b>{" "}
            </GradientButton>
        </div>
        
      </div>
      </Layout>
    </>
  );
}



