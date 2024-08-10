import React from 'react';

import '../Styles/Footer.css';
import {FaFacebookF} from 'react-icons/fa6';
import {FaXTwitter} from 'react-icons/fa6';
import {FaInstagram} from 'react-icons/fa';
import {FaThreads} from 'react-icons/fa6';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className="footer mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-4 col-xs-12">
              <div className="single_footer">
                <h4>Services</h4>
                <ul>
                  <li><Link to="/SignUp" className='text-decoration-none'></Link></li>
                  <li><Link to="/SignUp" className='text-decoration-none'>Home</Link></li>
                  <li><Link to="/SignUp" className='text-decoration-none'>Community</Link></li>
                  <li><Link to="/SignUp" className='text-decoration-none'>Profile</Link></li>
                  <li><Link to="/SignUp" className='text-decoration-none'>Settings</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="single_footer single_footer_address">
                <h4>Page </h4>
                <ul>
                <li><Link to="/SignUp" className='text-decoration-none'></Link></li>
                  <li><Link to="/SignUp" className='text-decoration-none'>Home</Link></li>
                  <li><Link to="/SignUp" className='text-decoration-none'>Community</Link></li>
                  <li><Link to="/SignUp" className='text-decoration-none'>Profile</Link></li>
                  <li><Link to="/SignUp" className='text-decoration-none'>Settings</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="single_footer single_footer_address">
                <h4>Subscribe today</h4>
                <div className="signup_form">
                  <form action="#" className="subscribe">
                    <input type="text" className="subscribe__input" placeholder="Enter Email Address" />
                      <button type="button" className="subscribe__btn"><i className="fas fa-paper-plane"></i></button>
                  </form>
                </div>
              </div>
              <div className="social_profile">
                <ul>
                  <li><a href="#!"><FaFacebookF /></a></li>
                  <li><a href="#!"><FaXTwitter /></a></li>
                  <li><a href="#!"><FaInstagram /></a></li>
                  <li><a href="#!"><FaThreads /></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-xs-12">
              <p className="copyright">Copyright © 2023 <a className='text-decoration-none text-white fw-lighter' href="#!">MasterIn</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;