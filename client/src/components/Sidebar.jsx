import React from "react";

export default function Sidebar({
  darkMode,
  sidebarOpen,
  setSidebarOpen
}) {

  return (
    <>

      {/* MOBILE MENU BUTTON */}

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          padding: "10px 15px",
          border: "none",
          borderRadius: "10px",
          background: "#6366f1",
          color: "white",
          cursor: "pointer"
        }}
      >
        ☰
      </button>

      {/* SIDEBAR */}

      <div
        style={{
          width: "250px",
          background: darkMode ? "#111827" : "#ffffff",
          color: darkMode ? "white" : "black",
          padding: "20px",
          borderRight: "1px solid #334155",
          minHeight: "100vh",

          position: "fixed",
          left: sidebarOpen ? "0" : "-260px",
          top: 0,

          transition: "0.3s",
          zIndex: 999
        }}
      >

        <h2
          style={{
            marginBottom: "30px",
            marginTop: "50px"
          }}
        >
          📒 Notes App
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >

          <button
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#6366f1",
              color: "white",
              cursor: "pointer"
            }}
          >
            📄 All Notes
          </button>

          <button
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#22c55e",
              color: "white",
              cursor: "pointer"
            }}
          >
            📌 Pinned Notes
          </button>

        </div>
      </div>
    </>
  );
}