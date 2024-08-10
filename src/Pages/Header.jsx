import React, { useState } from 'react';
import '../Styles/Header.css';
import masterInLogo from '../Components/Assets/Images/masterin-logo.png';
import { Link } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <>
      <div className='container d-flex justify-content-center align-items-center fixed-top'>
        <nav className="navbar navbar-expand-lg bg-white rounded-5 shadow mt-5 w-75 p-3">
          <div className=' container-fluid d-flex justify-content-between align-items-center w-100'>
            <div>
              <Link className="nav-link active" aria-current="page" to="/">
                <img className='img-fluid' src={masterInLogo} alt="CompanyLogo" style={{ width: '10rem' }} />
              </Link>
            </div>
            <div>
              <button
                className="navbar-toggler border-0 w-100"
                type="button"
                onClick={handleNavCollapse} 
              >
                <BiMenuAltRight />
              </button>
            </div>
          </div>
          <div className={`collapse navbar-collapse p-2 ${isNavCollapsed ? '' : 'show'}`} id="navbarNavAltMarkup">
            <div className="navbar-nav w-100 d-flex justify-content-end align-items-center gap-3 button">
              <Link className='btn btn1 btn-outline-dark rounded-5 fw-bolder' to="/Login">
                Login
              </Link>
              <button className="btn btn2 btn-primary text-white rounded-5 fw-bolder">
                <a href="/SignUp">Join MasterIn</a>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
