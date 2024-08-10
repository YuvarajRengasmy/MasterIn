import React from 'react';
import SideBar from './SideBar';
import masterinLogo from '../Components/Assets/Images/masterin-logo.svg';
import {  useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';

const Navbar = () => {
   
const navigate = useNavigate()

    return (
        <>
            <div className='container-fluid'>
                <div className="navbar navbar-white bg-white border-bottom shadow fixed-top row">
                    <div className='col-lg-3 col-12 d-flex justify-content-lg-start justify-content-md-center justify-content-between'>
                        <SideBar />
                        <img src={masterinLogo} className='img-fluid' alt="logo" style={{ width: '9rem' }} />
                    </div>
                    <form className='col-lg-6 col-12 d-flex align-items-center justify-content-center me-auto p-0' style={{ height: '3.5rem' }}>
                        <div className="input-group mb-4 border rounded-pill w-75 align-items-center mt-4 d-flex">
                            <input
                                type="search"
                                placeholder="What're you searching for?"
                                aria-describedby="button-addon3"
                                className="form-control bg-transparent border-0"
                                onClick={()=>navigate('/Search')}
                            />
                            <div className="input-group-append border-0">
                                <button id="button-addon3" type="button"  className="btn btn-link fw-bold text-primary fs-4"><CiSearch /></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Navbar;
