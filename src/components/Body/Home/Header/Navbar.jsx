import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { connect, useSelector } from "react-redux";
const mapStateToProps = (state) => {
  return {
    token: state.token,
    user_details: state.user_details,
    user_id: state.user_id,
  };
};

const Navbar = (props) => {
  const { token } = props;
  const [navactivebar, setnavactivebar] = useState(false);
  const [unmounted, setunmounted] = useState(false);
  const user_details = useSelector((state) => state.user_details);
  React.useEffect(() => {

    const handlescrollbar = () => {
      window.scrollY >= 100 ? setnavactivebar(true) : setnavactivebar(false);
    };
    if(!unmounted){
      window.addEventListener("scroll", handlescrollbar);
    }
    return ()=> setunmounted(true);
  }, [navactivebar,unmounted])
  return (
    <nav
      className={`navbar pb-3 navbar-expand-lg fixed-top zindex-fixed ${
        navactivebar ? "activenav" : null
      }`}
    >
      <div className="container-fluid px-5 py-1">
        <Link to="/home" className="navbar-brand" href="#">
          Meal<span className="navbarbrandtext">&nbsp;O.</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
          <i className="fas fa-bars" style={{"color":"#fff", "fontSize":"28px"}}></i>
          </span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center text-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>

            {token !== null && user_details.role === "Employee" ? (
              <>
                <li className="nav-item">
                  <Link to="/stafforders" className="nav-link">
                    Deliveries
                  </Link>
                </li>
              </>
            ) : null}
            <li className="nav-item">
              <Link to="/menu" className="nav-link">
                Menu
              </Link>
            </li>
            {token !== null && user_details.role === "Customer" ? (
              <>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/myorders" className="nav-link">
                    My Orders
                  </Link>
                </li>
              </>
            ) : null}
            {token !== null ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
              </>
            ) : null}
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            {user_details !== null && user_details.isAdmin ? (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin Panel
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav ms-auto mt-2">
            {token !== null ? (
              <Link to="/logout" className="btn btn-danger">
                Logout
              </Link>
            ) : (
              <Link to="/signup" className="btn btn-danger">
                SignUp
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default connect(mapStateToProps)(Navbar);
