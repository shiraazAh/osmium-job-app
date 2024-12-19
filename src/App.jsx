import { Authenticator } from "@aws-amplify/ui-react"; // Amazon Cognito authentication library
import { Amplify } from "aws-amplify"; // AWS Amplify setup
import cognitoAuthConfig from "./aws-exports"; // AWS Cognito / Authentication configuration
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import "@aws-amplify/ui-react/styles.css"; // Amplify UI styles
import { Route, Routes, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth"; // AWS Amplify authentication functions - 
import { useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context"; // Authentication context

// Configure Amplify with AWS Cognito settings
//This is the initialization for authentication
//Learnt from: https://docs.amplify.aws/gen1/react/start/getting-started/installation/
Amplify.configure(cognitoAuthConfig);

/* Contributers: Shiraaz */

export default function App() {
  const [signedIn, setSignedIn] = useState(false); // State to track sign-in status
  const [userData, setUserData] = useState(null); // State to store user data - like email, userId, name etc
  const [authState, setAuthState] = useState(null); // State to manage auth state -> SignIn or SignUp
  // Fetch user details from AWS Cognito
  // Learned From: https://docs.amplify.aws/gen1/react/build-a-backend/auth/manage-user-profile/#retrieve-user-attributes
  const getUserDetails = async () => {
    try {
      const res = await fetchUserAttributes();
      setUserData(res);
      setSignedIn(true);
    } catch (err) {
      console.log("cs -- error log -- ", err);
    }
  };

  // Check if the user is already logged in
  // Learned From: https://docs.amplify.aws/gen1/react/build-a-backend/auth/manage-user-session/#retrieve-your-current-authenticated-user
  const checkSession = async () => {
    let user = { attributes: {} };
    try {
      user = await getCurrentUser();
      getUserDetails();
      setAuthState("signIn");
    } catch (err) {
      console.log("cs -- error log -- ", err);
    }
  };

  // Run checkSession on component mount or when signedIn changes
  useEffect(() => {
    checkSession();
  }, [signedIn]);

  return (
    // Provide authentication context - has access to user data, logout function and getUserDetails for edit profile
    <AuthContext.Provider
      value={{
        ...userData,
        logout: () => {
          setSignedIn(false);
          setAuthState(null);
        },
        getUserDetails,
      }}
    >
      {!signedIn && !authState ? (
        // If not signedIn and authState is not set show WelcomePage
        <Routes>
          <Route
            path="/"
            element={<WelcomePage setAuthState={setAuthState} />}
          />
          {/* Redirect to Welcome page if user tries 
          to go to any other page without logging in */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        // If either signedIn or authState is set show Authenticator
        // Learned how to use Authenticator from here: https://ui.docs.amplify.aws/react/connected-components/authenticator
        // And from video tutorial: https://www.youtube.com/watch?v=GLjPwNCBoY0&ab_channel=GAURAVKUMARJAIN
        <Authenticator
          className="mt-5"
          signUpAttributes={["email", "name"]}
          initialState={authState}
        >
          {/* This only gets rendered once the user is signed in, Authenticator component handles the rest */}
          {() => {
            if (!signedIn) {
              // If its user first time signing in turn the signedIn state to true
              setSignedIn(true);
            }
            return (
              <main>
                <Routes>
                  <Route path="/*" element={<AuthenticatedRoutes />} />
                </Routes>
              </main>
            );
          }}
        </Authenticator>
      )}
    </AuthContext.Provider>
  );
}
