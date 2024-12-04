import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import cognitoAuthConfig from "./aws-exports";
import AuthenticatedRoutes from "./routes/AuthenticatedRouted";
import "@aws-amplify/ui-react/styles.css";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "react-oidc-context";

Amplify.configure(cognitoAuthConfig);

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authState, setAuthState] = useState(null);

  const getUserDetails = async () => {
    try {
      const res = await fetchUserAttributes();
      setUserData(res);
    } catch (err) {
      console.log("cs -- error log -- ", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...userData,
        logout: () => {
          setSignedIn(false);
          setAuthState(null);
        },
      }}
    >
      {!signedIn && !authState ? (
        <Routes>
          <Route path="/" element={<WelcomePage setAuthState={setAuthState} />} />
        </Routes>
      ) : (
        <Authenticator
          signUpAttributes={["email", "name"]}
          initialState={authState}
        >
          {() => {
            if (!signedIn) {
              getUserDetails();
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
