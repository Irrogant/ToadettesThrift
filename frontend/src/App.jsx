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
import Landing from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import getCookie from "./components/cookie";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const alreadyLanded = getCookie("already_landed");

  return (

  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={alreadyLanded ? <Home /> : <Landing />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<LogOut/> } />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/item" element={<ItemDetail/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/account" element={<Account />} />
        <Route path="/myitems" element={<MyItems />} />

        {/* <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/myitems" element={<MyItems />} />
        </Route> */}

      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;