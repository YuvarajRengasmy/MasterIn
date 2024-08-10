import React, { useEffect, useRef, useState } from 'react';
import '../../../Styles/ProfilePage.css';
import { Link } from 'react-router-dom'
import { Popover } from 'bootstrap';
import ReactDOM from 'react-dom';
import { AiFillCopy, AiOutlineGlobal, AiTwotoneStar } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { RxText } from 'react-icons/rx';
import { FcAddImage } from 'react-icons/fc';
import { CgReorder } from "react-icons/cg";
import { FaBusinessTime } from "react-icons/fa";
import { MdOutlineWorkHistory, MdVerified } from 'react-icons/md';
import UserMeetingSession from './MasterMeetingSession';
import MasterPostPeople from './MasterPostPeople';
import MasterPeopleExpericence from './MasterPeopleExpericence';
import MasterPeopleEducation from './MasterPeopleEducation';
import UserNavbar from '../../../Pages/UserNavbar';
import { useLocation } from 'react-router-dom';
import { getSingleMaster } from '../../../api/master';
import { IoLocation } from 'react-icons/io5';
import { BsLink45Deg } from 'react-icons/bs';
const MasterPeopleProfile = () => {

    // Pages Accordingly
    const location = useLocation()
    const id = new URLSearchParams(location.search).get('id')
    const [showAlert, setShowAlert] = useState(false);
    const buttonRef = useRef(null);
    const popoverRef = useRef(null);
    const [master, setMaster] = useState({})
    const [show, setShow] = useState('profile')

    useEffect(() => {
        getMasterDetails()
    }, [])

    //   Alert for copied button
    const handleButtonClick = () => {
        const currentUrl =window.location.href
        navigator.clipboard.writeText(currentUrl)
        // Show the alert
        setShowAlert(true);

        // Hide the alert after a certain time (e.g., 3000 milliseconds or 5 seconds)
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    // Popover Content menu



    const getMasterDetails = () => {
        getSingleMaster(id).then(res => {
            setMaster(res?.data?.result);
        }).catch(err => { console.log(err); })
    }

    const handlePages = (page) => {
        setShow(page)
    }

    // const PopoverContent = () => (
    //     <div className='d-flex flex-column gap-2'>
    //         <button className='d-flex align-items-center btn btn-light w-100 gap-2 btn justify-content-start'>
    //             <RxText /> Add text section
    //         </button>
    //         <button className='d-flex align-items-center btn btn-light w-100 gap-2 btn justify-content-start'>
    //             <FaBusinessTime /> Add experience section
    //         </button>
    //         <button className='d-flex align-items-center btn btn-light w-100 gap-2 btn justify-content-start'>
    //             <FcAddImage /> Add portfolio section
    //         </button>
    //         <button className='d-flex align-items-center btn btn-light w-100 gap-2 btn justify-content-start'>
    //             <CgReorder /> Reorder section
    //         </button>
    //     </div>
    // );

    // useEffect(() => {
    //     const popover = new Popover(buttonRef.current, {
    //         content: () => {
    //             // Render the PopoverContent React component
    //             const popoverContainer = document.createElement('div');
    //             ReactDOM.render(<PopoverContent />, popoverContainer);
    //             return popoverContainer;
    //         },
    //         html: true,
    //         trigger: 'click',
    //     });

    //     popoverRef.current = popover;

    //     const handleWindowClick = (event) => {
    //         // Check if the clicked element is inside the popover or the button
    //         if (
    //             popoverRef.current &&
    //             popoverRef.current.tip && // Check if the tip property is not null
    //             !popoverRef.current.tip.contains(event.target) &&
    //             !buttonRef.current.contains(event.target)
    //         ) {
    //             popoverRef.current.hide();
    //         }
    //     };

    //     // Attach the click event listener to the window
    //     window.addEventListener('click', handleWindowClick);

    //     return () => {
    //         // Clean up the event listener
    //         window.removeEventListener('click', handleWindowClick);
    //         popover.dispose();
    //     };
    // }, []);


    return (
        <>
            <div className='col-lg-8 scroll-bar mx-auto ' style={{ overflow: 'auto', maxHeight: 'calc(100vh - 50px)', marginTop: '40px' }}>
                <div className='d-flex align-items-center'>
                    <div className='container' >
                        <UserNavbar />
                        <div className='container d-flex flex-column border-start border-end gap-2 align-items-center bg-light mt-5 pb-5' >
                            <div className="container bg-white mt-3 rounded-2 shadow mt-5  p-2">
                                <div className="btn-group gap-2 d-flex align-items-center justify-content-between" role="group">
                                    <div className='navbar-brand d-flex justify-content-center align-items-center gap-3  border p-1 rounded-5 nav-tab' style={{ backgroundColor: '#ececec' }}>
                                        <button
                                            className={`btn rounded-5 fw-bold ${show === 'profile' ? 'active bg-white border-0 text-primary' : ''}`}
                                            type="button" aria-selected="true"
                                            role='tab' onClick={() => handlePages('profile')}
                                            style={{ fontSize: '0.8rem' }} >
                                            Profile
                                        </button>
                                        <button
                                            className={`btn rounded-5 fw-bold ${show === 'post' ? 'active bg-white border-0 text-primary' : ''}`}
                                            type="button"
                                            aria-selected="false"
                                            role='tab' onClick={() => handlePages('post')}
                                            style={{ fontSize: '0.8rem' }}>
                                            Post
                                        </button>
                                        <button
                                            className={`btn rounded-5 fw-bold ${show === 'session' ? 'active bg-white border-0 text-primary' : ''}`}
                                            type="button"
                                            aria-selected="false"
                                            role='tab' onClick={() => handlePages('session')}
                                            style={{ fontSize: '0.8rem' }}>
                                            Schedule Session
                                        </button>
                                    </div>
                                    {/* <div className='d-flex'>
                                        <button className='btn rounded-5 bg-light' onClick={handleButtonClick}>
                                            <AiFillCopy />
                                        </button>
                                        {showAlert && (
                                            <div className="fixed-top container  border-none alert alert-light d-flex align-items-center justify-content-around mx-auto rounded-5 mt-5 alert-box" role="alert" style={{ width: '15rem', height: '3rem' }}>
                                                <strong className='text-success'><MdVerified className='fs-4' style={{ color: 'green' }} /> Profile link copied</strong>
                                            </div>
                                        )}
                                        <button
                                            className='btn rounded-5 bg-light'
                                            data-bs-placement="bottom"
                                            data-bs-toggle="popover"
                                            data-bd-trigger="hover"
                                            data-bs-content="Bottom popover"
                                            ref={buttonRef}
                                        >
                                            <HiOutlineDotsVertical />
                                        </button>
                                    </div> */}
                                </div>
                            </div>


                            {show === 'profile' && (
                                <>
                                    <div className='container-fluid d-flex flex-column justify-content-center mt-5 p-0 shadow'>
                                        <div className="card w-100  border-0 " style={{ objectFit: 'cover' }} >
                                            {/* ProfilePage Banner */}

                                            <img className='img-fluid' src={master?.backgroundImage?master?.backgroundImage:'https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/empty-banner.svg'} alt="BackgroundImage" style={{ height: '250px', objectFit: 'cover' }} />
                                            <div className="card-img-overlay card-image">
                                                <div className="d-flex justify-content-end gap-2 profile">
                                                    {/* <p className=" text-1 rounded-5  p-2"><AiTwotoneStar className='text-warning' /> 1 Award</p>
                                                    <button className=" btn-3 rounded-5  p-2" type="button">0 followers</button> */}
                                                </div>
                                                <div className='profile-image'>
                                                    {/* Profile Image Outside */}
                                                    <img id="profileImageOutsideModal" src={master?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} className='img-fluid rounded-circle' style={{ width: "10rem", height: "10rem", border: '2px solid #ffffff', position: 'absolute', top: '75%', left: '12%', transform: 'translate(-50%, -50%)', objectFit: 'cover' }} alt="avatar" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container p-4 d-flex  flex-wrap justify-content-between  align-items-center'>
                                            <div className='' >
                                                <p className='fs-5 fw-bold'>{master?.name}</p>
                                                <p className='h6'>{master?.userName}</p>
                                                <small className='text-secondary d-block'><AiOutlineGlobal /> {master?.isPublic ? 'Public' : 'Private'}</small> 
                                                {master?.position&&<small className='text-secondary d-block'><MdOutlineWorkHistory /> {master?.position}</small>}
                                                {master?.location&&<small className='text-secondary d-block'><IoLocation /> {master?.location}</small>} 
                                                {master?.link && <small className='text-secondary d-block'> <BsLink45Deg /> <Link className='text-decoration-none text-dark small' to={master?.link}>{master?.link}</Link></small>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='container p-0' >
                                        <div className='card  shadow border-0 rounded mt-5 p-4'>
                                            <div className=' '>
                                                <div className=''>
                                                    <p className='fw-bold'>About me</p>
                                                </div>
                                                <div>
                                                    <p> <span className='fs-italic'>{master?.descryption ? master?.descryption : 'Write a summary to highlight your personality. ✨'} </span> </p>
                                                </div>
                                                <div className=''>
                                                    <p className='fw-bold'>Category</p>
                                                </div>
                                                <div>
                                                    <p> <span className='fs-italic'>{master?.category?.map(x => x.category).join(', ')}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <MasterPeopleExpericence experience={master?.experience} />
                                    <MasterPeopleEducation education={master?.education} />
                                </>
                            )}
                            {show === 'post' && (
                                <MasterPostPeople  id={id}/>
                            )}
                            {show === 'session' && (
                                <UserMeetingSession id={id} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MasterPeopleProfile;