import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import PrivateRoute from "../components/PrivateRoute";

function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AllRoutes;
