import React, { useState } from "react";
import axios from "axios";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email,
          password
        }
      );

      alert("Registration successful");

      window.location = "/login";

    } catch (err) {

      alert("Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a"
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "20px",
          width: "350px"
        }}
      >

        <h1
          style={{
            color: "white",
            marginBottom: "20px"
          }}
        >
          Register
        </h1>

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
            border: "none"
          }}
        />

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
            border: "none"
          }}
        />

        <button
          onClick={registerUser}
          style={{
            width: "100%",
            padding: "12px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Register
        </button>

      </div>
    </div>
  );
}