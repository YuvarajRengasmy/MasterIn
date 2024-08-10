import React, { useEffect, useState } from 'react';

import logo from '../Components/Assets/Images/masterin-logo.svg';

import { HiMenuAlt2 } from 'react-icons/hi';
import { AiOutlineDashboard, AiOutlineHome } from 'react-icons/ai';
import { MdEventAvailable, MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { clearStorage, getMasterId } from '../utils/Storage';
import { toast } from 'react-toastify';
import { CgProfile } from 'react-icons/cg';
import { getUnviewedNotification, updateNotificationView } from '../api/notification';
import { getSingleMaster } from '../api/master';

const SideBar = () => {

    const [inputs, setInputs] = useState();
    const [notificationCount, setNotificationCount] = useState()


    useEffect(() => {
        getUserDetails();
        getUnviewedNotificationCount()
    },[])

    const getUserDetails = () => {
        const data = getMasterId()
        getSingleMaster(data)
        .then((res) => {
            const result = res?.data?.result
            setInputs({ ...inputs, ...result });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const logout = () => {
        clearStorage();
        toast.success('You have logged out successfully.')
    }

    const getUnviewedNotificationCount = () => {
        getUnviewedNotification().then(res => {
            setNotificationCount(res?.data?.result)
        }).catch(err => { console.log(err); })
    }

    const updateViewNotification = () => {
        updateNotificationView().then(res => {
            getUnviewedNotification()
        }).catch(err => { console.log(err) })
    }

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
                                    <img className='rounded-circle border' style={{ width: "2.5rem", height:'2.5rem', objectFit:'cover' }} src={inputs?.image ?inputs?.image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="avatar" />
                                </div>
                                <div className='mt-3'>
                                    <p className='fw-bolder'>
                                        <Link className='text-decoration-none text-dark' >{inputs?.name ?? "Username"}</Link><br />
                                        <small className='text-secondary fw-lighter'>{inputs?.position ?? ""}</small>
                                    </p>

                                </div>
                            </div>
                            <ul className='fw-bolder mt-2'>
                                <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/Dashboard"><AiOutlineDashboard /> Dashboard</Link></li>
                                <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/Home"><AiOutlineHome /> Home</Link></li>
                                <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/Event"><MdEventAvailable /> Event</Link></li>
                                <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/ProfilePage"><CgProfile /> Profile</Link></li>
                                <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/Community"><FaPeopleGroup /> Community</Link></li>
                                {/* <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/Chat"><BsFillChatQuoteFill /> Chat</Link></li> */}
                                <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' onClick={updateViewNotification} to="/Notification"><IoMdNotificationsOutline /> Notification <span className="badge text-bg-danger">{notificationCount}</span></Link></li>
                                {/* <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' to="/Settings"><FiSettings /> Settings</Link></li> */}
                                <li className='list-unstyled p-2'><Link className='text-decoration-none text-dark ' onClick={logout} to='/'><FiLogOut /> Log out</Link></li>
                            </ul>
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default SideBar;