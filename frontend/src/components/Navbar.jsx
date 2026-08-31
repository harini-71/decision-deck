function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-mark">D</span>
        <span className="brand-name">Decision Deck</span>
      </div>

      <nav className="navbar-links">
        <a href="#">Dashboard</a>
        <a href="#">My Decisions</a>
        <a href="#">Templates</a>
      </nav>

      <div className="navbar-user">
        <span className="user-name">Guest</span>
      </div>
    </header>
  );
}

export default Navbar;