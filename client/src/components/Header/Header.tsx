import Logo from "../../assets/logo.png";

const Header = () => {
  return (
    <nav className="bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={Logo} alt="logo" />
            <div>Project Mgmt</div>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
