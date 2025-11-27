import React from "react";
import Signup from "./components/signup";
import Login from "./components/login";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (

<BrowserRouter>
    <NavBar />

    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>

</BrowserRouter>
  );
}

export default App;