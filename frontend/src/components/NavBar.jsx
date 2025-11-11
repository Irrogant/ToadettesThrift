import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
        <h1>GobShop</h1>
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
    </nav>
  );
}

export default NavBar;