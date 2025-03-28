import React, { useState } from "react";
import TextEditor from "./TextEditor";
import DocList from "./DocList";

const LandingPage = (props) => {
  const { user, handleLogout, accessToken } = props;
  const [refresh, setRefresh] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100vw",
        gridTemplateRows: "60px auto 60px",
        gridTemplateAreas: '"header" "content" "footer"',
        height: "100vh",
      }}
    >
      <div
        style={{
          gridArea: "header",
          backgroundColor: "#19647E",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src={user.photoURL}
          alt="User"
          width="50"
          style={{ borderRadius: "50%", marginLeft: "20px" }}
        />
        <h2>Welcome, {user.displayName}</h2>
        </div>

        <h3 style={{ marginRight: "20px" }} onClick={handleLogout}>Logout</h3>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateAreas: `"content"`,
          backgroundColor: "#bdcebe",
          padding: "20px",
        }}
      >
        <div
          style={{
            gridArea: "content",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div >
            <TextEditor accessToken={accessToken} setRefresh={setRefresh} refresh={refresh}/>
          </div>
          <div >
            <DocList accessToken={accessToken} refresh={refresh}/>
          </div>
        </div>
      </div>
      <div style={{ gridArea: "footer", backgroundColor: "#19647E" }}></div>
    </div>
  );
};

export default LandingPage;
