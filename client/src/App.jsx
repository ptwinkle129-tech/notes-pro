import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* DASHBOARD */}

        <Route
          path="/"
          element={

            token
              ? (
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                )
              : (
                  <Navigate to="/login" />
                )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}