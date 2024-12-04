
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import cognitoAuthConfig from "./aws-exports";
import AuthenticatedRoutes from "./routes/AuthenticatedRouted";
import "@aws-amplify/ui-react/styles.css";
import { Route, Routes } from "react-router-dom";

Amplify.configure(cognitoAuthConfig);

export default function App({ Component, pageProps }) {
  return (
    <Authenticator signUpAttributes={["email", "name"]}>
      {() => (
        <main>
          <Routes>
            {/* <Route path="/" element={<WelcomePage />} /> */}
            <Route path="/*" element={<AuthenticatedRoutes />} />
          </Routes>
        </main>
      )}
    </Authenticator>
  );
}
