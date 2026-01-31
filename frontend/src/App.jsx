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
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import LandingRoute from './components/LandingRoute';
import LoggedInRoute from './components/LoggedInRoute';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<LandingRoute />}>
            <Route path="/" element={<Home />} />

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

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;