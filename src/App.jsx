import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import cognitoAuthConfig from "./aws-exports";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import "@aws-amplify/ui-react/styles.css";
import { Route, Routes, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context";

Amplify.configure(cognitoAuthConfig);

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authState, setAuthState] = useState(null);

  const getUserDetails = async () => { //get user's name and email
    try {
      const res = await fetchUserAttributes();
      setUserData(res);
      setSignedIn(true);
    } catch (err) {
      console.log("cs -- error log -- ", err);
    }
  };

  const checkSession = async () => { //check if user already logged in before
		let user = { attributes: {} }
		try {
			user = await getCurrentUser();
      getUserDetails();
      setAuthState("signIn")
		} catch (err) {
			console.log("cs -- error log -- ", err);
		}
  }

  useEffect(() => {
    checkSession();
  }, [signedIn]);

  return (
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
        <Routes>
          <Route
            path="/"
            element={<WelcomePage setAuthState={setAuthState} />}
          />
          {/* Redirect to Welcome page if user tries 
          to go to any other page without loging in */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Authenticator
        className="mt-5"
          signUpAttributes={["email", "name"]}
          initialState={authState}
        >
          {() => {
            if (!signedIn) {
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
