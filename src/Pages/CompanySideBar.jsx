import React, { useEffect, useState } from 'react';

import logo from '../Components/Assets/Images/masterin-logo.svg';

import { HiMenuAlt2 } from 'react-icons/hi';
import { AiOutlineHome } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

const CompanySideBar = () => {

    return (
        <>
        <div className='' style={{ zIndex: '1' }}>
            <div className='container-fluid d-flex'>
                <div className='d-flex justify-content-between'>
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft"><HiMenuAlt2 /></button>
                </div>
                <div className="offcanvas offcanvas-start" style={{ width: '15rem' }} data-bs-backdrop="false" data-bs-scroll="true" tabIndex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
                    <div className="offcanvas-header">
                        <img className='img-fluid w-75 mx-auto' src={logo} alt="CompanyLogo" />
                        <button type="button" className="bg-white border-0" data-bs-dismiss="offcanvas" aria-label="Close"><MdKeyboardDoubleArrowLeft /></button>
                    </div>
                    <div className="offcanvas-body-card mt-3">
                        <div className='d-flex justify-content-center  align-items-center gap-3'>
                            <div>
                                <img className='rounded-circle border' style={{ width: "2.5rem", height:'2.5rem', objectFit:'cover' }} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="avatar" />
                            </div>
                            <div className='mt-3'>
                                <p className='fw-bolder'>
                                    <a className='text-decoration-none text-dark' href="/ProfilePage">Kailash Rajkumar</a><br />
                                    <small className='text-secondary fw-lighter'>React Developer</small>
                                </p>

                            </div>
                        </div>
                        <ul className='fw-bolder mt-2'>
                            <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/UserHome"><AiOutlineHome /> Home</Link></li>
                            <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/UserProfile"><CgProfile /> Profile</Link></li>
                            <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark '><FaPeopleGroup /> Community</Link></li>
                            <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/UserNotification"><IoMdNotificationsOutline /> Notification <span className="badge text-bg-danger">2</span></Link></li>
                            <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/UserSettings"><FiSettings /> Settings</Link></li>
                            <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark '  to='/'><FiLogOut /> Log out</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default CompanySideBar;