import "./index.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const logout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("user_id");
    navigate("/");
  };
  function searchClick() {
    localStorage.setItem("searchVal", search)
    navigate("/searchresults")
  }

  return (
    <nav>
      <div className="navbar-container">
        <div className="nav-left">
          <img
            src="https://res.cloudinary.com/dkyhsl0m0/image/upload/v1751688954/logo_a0pdsa.png"
            alt="logo"
          />
          <h1>Insta Share</h1>
        </div>

        <div className="nav-center">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Comment"
          />
          <button onClick={searchClick}>🔍</button>
        </div>

        <div className="nav-right">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/saved" className="nav-link">
            <p>SavedPosts</p>
          </Link>
          <button onClick={logout}>Logout</button>
        </div>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>
      </div>

      {menuOpen && (
        <div className="dropdown-menu">
          <Link
            to="/home"
            className="dropdown-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="dropdown-link"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
