import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signup from './components/SignUp';
import Login from './components/Login';
import Account from './components/Account';
import LogOut from './components/LogOut';
import Home from './components/Home';
import Layout from './components/Layout';
import Search from './components/Search';
import ItemDetail from './components/ItemDetail';
import MyItems from './components/MyItems';
import Landing from './components/Landing';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import LoggedInRoute from './components/LoggedInRoute';
import getCookie from './components/cookie';

function App() {
  const alreadyLanded = getCookie("already_landed");

  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={alreadyLanded ? <Home /> : <Landing />} />

          <Route path="/search" element={<Search />} />
          <Route path="/item" element={<ItemDetail />} />

          <Route element={<LoggedInRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>


          <Route element={<ProtectedRoute />}>
            <Route path="/logout" element={<LogOut />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/myitems" element={<MyItems />} />
          </Route>

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