import React from "react";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Account from "./components/Account";
import LogOut from "./components/LogOut"
import Home from "./components/Home";
import Layout from "./components/Layout";
import Search from "./components/Search";
import ItemDetail from "./components/ItemDetail";
import MyItems from "./components/MyItems";
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
        <Route path="/myitems" element={<MyItems/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/item" element={<ItemDetail/>} />
      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;