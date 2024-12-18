import { Layout } from "antd"; // Importing Ant Design Layout component for page structure.
import React from "react"; 
import GradientButton from "../components/Buttons/GradientButton"; // Reusable gradient button component.
import BGImage from "../assets/background/project-image.png"; // Background image for the welcome page.
import SecondaryButton from "../components/Buttons/SecondaryButton"; // Reusable Secondary button component.

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
        <div className="container-fluid"> {/* Bootstrap container for responsive design */}
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
            <div className="row"> {/* Row for button alignment */}
              <div className="col-12 col-lg-12">
                {" "}
                <GradientButton // Get started Button 
                  className="w-100"
                  style={{ maxWidth: "340px" }}
                  height={50}
                  onClick={() => setAuthState("signUp")} // Set state to "signUp" on button click.
                >
                  Get Started
                </GradientButton> 
              </div>
              <div className="col-12 col-lg-12 mt-3">
                <SecondaryButton // Have an account? Login Button
                  className="w-100"
                  style={{ maxWidth: "340px" }}
                  height={50}
                  onClick={() => setAuthState("signIn")} // Set state to "signIn" on button click.
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



