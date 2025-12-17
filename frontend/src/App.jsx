import React from "react";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Account from "./components/Account";
import LogOut from "./components/LogOut"
import Home from "./components/Home";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (

  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<LogOut/> } />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/account" element={<Account/>} />
      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;