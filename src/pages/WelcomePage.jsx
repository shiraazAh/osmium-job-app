import { Layout } from "antd";
import React from "react";
import GradientButton from "../components/Buttons/GradientButton";
import BGImage from "../assets/background/project-image.png";
import SecondaryButton from "../components/Buttons/SecondaryButton";

/* Contributers:  */
export default function WelcomePage({ setAuthState }) {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          // maxWidth: "900px",
          margin: "0 auto",
          padding: "0 20px",
          background: "#F8F8F8",
        }}
      >
        <div className="container-fluid">
          <img
            className="img-fluid mt-4"
            src={BGImage}
            alt="wait a moment please.."
          />
          <div className="description">
            <h1 className="fw-bolder mt-4">Your Job Search, Made Smarter</h1>
            <p className="text-muted">
              Every job search is a journey of growth and opportunity. And we
              make sure you find it quickly and easily.
            </p>
            <div className="row">
              <div className="col-12 col-lg-12">
                {" "}
                <GradientButton
                  className="w-100"
                  style={{ maxWidth: "340px" }}
                  height={50}
                  onClick={() => setAuthState("signUp")}
                >
                  Get Started
                </GradientButton>
              </div>
              <div className="col-12 col-lg-12 mt-3">
                <SecondaryButton
                  className="w-100"
                  style={{ maxWidth: "340px" }}
                  height={50}
                  onClick={() => setAuthState("signIn")}
                >
                  Have an account? Login
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
