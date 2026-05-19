import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const res = await axios.post(
        "https://notes-pro-0tyl.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // TOAST SUCCESS
      toast.success("Login successful");

      // REDIRECT
      setTimeout(() => {

        window.location = "/";

      }, 1500);

    } catch (err) {

      toast.error("Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
"linear-gradient(135deg,#0f172a,#1e1b4b,#312e81)",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
backdropFilter: "blur(10px)",
border: "1px solid rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
        }}
      >

        <h1
          style={{
            color: "white",
            marginBottom: "20px"
          }}
        >
          Login
        </h1>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none"
          }}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none"
          }}
        />

        {/* BUTTON */}

        <button
          onClick={loginUser}
          style={{
            width: "100%",
            padding: "12px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Login
        </button>

      </div>
    </div>
  );
}