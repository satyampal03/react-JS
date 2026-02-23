import SearchBar from "./SearchBar";

 function Header() {
  return (
    <header className="header">
      <div className="header-logo">LOGO</div>

      <SearchBar />

      <div className="actions">
        <button>Cart(0)</button>
        <button>Login</button>
      </div>
    </header>
  );
}

export default Header