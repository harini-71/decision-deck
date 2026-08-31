import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-name">
          Decision Deck
        </Link>
      </div>

      <nav className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/decisions">My Decisions</Link>
        <Link to="/templates">Templates</Link>
      </nav>

      <div className="navbar-user">
        <span className="user-name">Guest</span>
      </div>
    </header>
  );
}

export default Navbar;