import React, { useState } from "react";
import { auth, provider, signInWithPopup, signOut, GoogleAuthProvider } from "./firebase";
import LandingPage from "./LandingPage";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
    setAccessToken(credential.accessToken);

      setUser(result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#bdcebe",
      }}
    >
      {user ? (
        <LandingPage user={user} handleLogout={handleLogout} accessToken={accessToken} />
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "10%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#19647E",
            height: "60%",
            width: "30%",
            borderRadius: "10px",
            zIndex: 1,
          }}
        >
          <h1>Login</h1>
          <button
            onClick={handleLogin}
            style={{
              boderRadius: "10px",
              fontSize: "20px",
              zIndex: 1,
              marginTop: "25%",
              padding: "10px",
              border: "2px solid black",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;
