import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getRestaurant } from "../../actions/restaurant";
import { logout } from "../../actions/auth";

const Navbar = ({
  auth: { isAuthenticated, loading },
  tableNum,
  logout,
  restaurant,
  getRestaurant,
  location,
  history,
}) => {
  useEffect(() => {
    if (!restaurant) return getRestaurant();
  }, [restaurant, getRestaurant]);

  const currPath = location.pathname.split("/")[1];
  const currAuthPath = location.pathname.split("/")[2];

  const guestLinks = (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link
            className={`nav-link ${currPath === "menu" && "active"}`}
            aria-current="page"
            to="/catalog"
          >
            Catalog
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${currPath === "tray" && "active"}`}
            aria-current="page"
            to="/cart"
          >
            Cart
          </Link>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
          <Link
            className={`nav-link ${currPath === "admin" && "active"}`}
            to="/admin"
            tabIndex="-1"
            aria-disabled="true"
          >
            Admin
          </Link>
        </li>
        {/* <li className='nav-item'>
					<Link
						className={`nav-link ${!currPath && 'active'}`}
						to='/'
						tabIndex='-1'
						aria-disabled='true'>
						Table {tableNum ? `Number : ${tableNum}` : ''}
					</Link>
				</li> */}
      </ul>
    </div>
  );

  const authLinks = (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link
            className={`nav-link ${currAuthPath === "orders" && "active"}`}
            aria-current="page"
            to="/admin/orders"
          >
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${currAuthPath === "dishes" && "active"}`}
            aria-current="page"
            to="/admin/products"
          >
            Products
          </Link>
        </li>
        {/* <li className='nav-item'>
					<Link
						className={`nav-link ${currAuthPath === 'restaurant' && 'active'}`}
						aria-current='page'
						to='/admin/store'>
						Store Info
					</Link>
				</li> */}
        <li className="nav-item">
          <Link
            className={`nav-link ${currAuthPath === "categories" && "active"}`}
            aria-current="page"
            to="/admin/categories"
          >
            Categories
          </Link>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item ">
          <Link
            className={`nav-link ${currAuthPath === "account" && "active"}`}
            aria-current="page"
            to="/admin/account"
          >
            Account <i className="fas fa-user"></i>
          </Link>
        </li>
        <li className="nav-item">
          <a
            onClick={(e) => {
              logout();
              history.push("/admin");
            }}
            className="nav-link"
            aria-current="page"
            href="#!"
          >
            Logout <i className="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={!isAuthenticated ? "/catalog" : "/admin/dashboard"}
        >
          {!restaurant || !restaurant.name ? "" : restaurant.name}
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
          <span className="navbar-toggler-icon"></span>
        </button>
        {isAuthenticated && !loading ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  tableNum: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth.admin,
  tableNum: state.auth.tableNum,
  restaurant: state.restaurant.restaurant,
});

export default connect(mapStateToProps, { logout, getRestaurant })(
  withRouter(Navbar)
);
