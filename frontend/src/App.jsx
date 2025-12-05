import React from "react";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Account from "./components/Account";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (

<BrowserRouter>
    <NavBar />

    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/account" element={<Account/>} />
    </Routes>

</BrowserRouter>
  );
}

export default App;