
import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <>
      <Link to="/">Productly</Link>
      <Link to="/products/categories/all">Products</Link>
      <Link to="/cart">Cart</Link>
      {!user && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      {user && (
        <>
          <span>Welcome {user.email}!</span>
          {user.is_admin && (
            <>
              <Link to="/admin/products">Admin-Products</Link>
              <Link to="/admin/users">Admin-Users</Link>
            </>
          )}
          <Link onClick={handleLogout} to="/">
            Logout
          </Link>
        </>
      )}
    </>
  );
};

export default Navbar;

