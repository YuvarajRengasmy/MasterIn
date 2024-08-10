import React, { useEffect, useRef, useState } from 'react';
import '../../../Styles/ProfilePage.css';
import { Link } from 'react-router-dom';
import EducationForm from './PeopleEducation';
import Expericence from './PeopleExpericence';
import Post from './PostPeople';
import { Popover } from 'bootstrap';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import { AiFillCopy, AiOutlineGlobal, AiTwotoneStar } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { RxText } from 'react-icons/rx';
import { FcAddImage } from 'react-icons/fc';
import { CgReorder } from "react-icons/cg";
import { FaBusinessTime } from "react-icons/fa";
import { MdOutlineWorkHistory, MdVerified } from 'react-icons/md';
import Navbar from '../../../Pages/Navbar';
import { getSingleMaster } from '../../../api/master';
import { BsLink45Deg, BsTelephone } from 'react-icons/bs';
import { IoLocation } from 'react-icons/io5';
const ProfilePage = () => {

    const location = useLocation()
    const id = new URLSearchParams(location.search).get('id')
    const [inputs, setInputs] = useState({});
    useEffect(() => {
        getProfileDetails()
    }, [])

    const getProfileDetails = () => {
        getSingleMaster(id).then(res => {
            setInputs(res?.data?.result)
        }).catch(err => { console.log(err); })
    }

    const [showAlert, setShowAlert] = useState(false);



    const [showMyNetworkContainer, setShowMyNetworkContainer] = useState(true);
    const [showExploreContainer, setShowExploreContainer] = useState(false);
    const showMyNetwork = () => {
        setShowMyNetworkContainer(true);
        setShowExploreContainer(false);
    }

    const showExplore = () => {
        setShowMyNetworkContainer(false);
        setShowExploreContainer(true);
    }




    //   Alert for copied button

    const handleButtonClick = () => {
        // Show the alert
        setShowAlert(true);

        // Hide the alert after a certain time (e.g., 3000 milliseconds or 5 seconds)
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    // Popover Content menu

    const buttonRef = useRef(null);
    const popoverRef = useRef(null);

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


    // Profile and banner Image Upload





    // Form Year And Month

    // Get the current year and month
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Generate an array of the past 10 years
    const years = Array.from({ length: 25 }, (_, index) => currentYear - index);

    // Generate an array of months
    const months = Array.from({ length: 12 }, (_, index) => index + 1); // Months are one-indexed

    return (
        <>
            <div className='col-lg-8 scroll-bar mx-auto ' style={{ overflow: 'auto', maxHeight: 'calc(100vh - 50px)', marginTop: '40px' }}>
                <div className='d-flex align-items-center'>
                    <div className='container ' >
                        <Navbar />
                        <div className='container d-flex flex-column border-start border-end gap-2 align-items-center bg-light mt-5 pb-5' >
                            <div className="container bg-white mt-3 rounded-2 shadow mt-3  p-2">
                                <div className="btn-group gap-2 d-flex align-items-center justify-content-between" role="group">
                                    <div className='navbar-brand d-flex justify-content-center align-items-center gap-3  border p-1 rounded-5 nav-tab' style={{ backgroundColor: '#ececec' }}>
                                        <button
                                            className={`btn rounded-5 fw-bold ${showMyNetworkContainer ? 'active bg-white border-0 text-primary' : ''}`}
                                            type="button" aria-selected="true"
                                            role='tab' onClick={showMyNetwork}
                                            style={{ fontSize: '0.8rem' }} >
                                            Profile
                                        </button>
                                        <button
                                            className={`btn rounded-5 fw-bold ${showExploreContainer ? 'active bg-white border-0 text-primary' : ''}`}
                                            type="button"
                                            aria-selected="false"
                                            role='tab' onClick={showExplore}
                                            style={{ fontSize: '0.8rem' }}>
                                            Post
                                        </button>
                                    </div>
                                    {/* <div className='d-flex gap-3'>
                                    <button className='btn rounded-5 bg-light' onClick={handleButtonClick}>
                                        <AiFillCopy />
                                    </button>
                                    {showAlert && (
                                        <div className="fixed-top container  border-none alert alert-light d-flex align-items-center justify-content-around mx-auto rounded-5 mt-5 alert-box" role="alert" style={{ width: '15rem', height: '3rem' }}>
                                            <strong className='text-success'><MdVerified className='fs-4' style={{ color: 'green' }} /> Profile link copied</strong>
                                            <button
                                                type="button"
                                                className="close"
                                                onClick={() => setShowAlert(false)}
                                            >
                                            </button>
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




                            {showMyNetworkContainer && (
                                <>
                                    <div className='container-fluid d-flex flex-column justify-content-center mt-5 p-0 shadow'>
                                        <div className="card w-100  border-0 " style={{ objectFit: 'cover' }} >
                                            {/* ProfilePage Banner */}

                                            <img className='img-fluid' src={inputs?.backgroundImage ? inputs?.backgroundImage : 'https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/Ui.jpeg'} alt="BackgroundImage" style={{ height: '250px', objectFit: 'cover' }} />
                                            <div className="card-img-overlay card-image">
                                                <div className="d-flex justify-content-end gap-2 profile">

                                                </div>
                                                <div className='profile-image'>
                                                    {/* Profile Image Outside */}
                                                    <img id="profileImageOutsideModal" src={inputs?.image ? inputs?.image : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"} className='img-fluid rounded-circle' style={{ width: "10rem", height: "10rem", border: '2px solid #ffffff', position: 'absolute', top: '75%', left: '12%', transform: 'translate(-50%, -50%)', objectFit: 'cover' }} alt="avatar" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container p-4 d-flex  flex-wrap justify-content-between  align-items-center'>
                                            <div className='' >
                                                <p className='fs-5 fw-bold'>{inputs?.name}</p>
                                                <p className='h6'>{inputs?.userName}</p>
                                                <small className='text-secondary d-block'><AiOutlineGlobal /> {inputs?.isPublic ? 'Public' : 'Private'}</small> 
                                                {inputs?.position&&<small className='text-secondary d-block'><MdOutlineWorkHistory /> {inputs?.position}</small>}
                                                {inputs?.location&&<small className='text-secondary d-block'><IoLocation /> {inputs?.location}</small>} 
                                                {inputs?.link && <small className='text-secondary d-block'> <BsLink45Deg /> <Link className='text-decoration-none text-dark small' to={inputs?.link}>{inputs?.link}</Link></small>}

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
                                                    <p> <span className='fs-italic'>{inputs?.descryption ? inputs?.descryption : 'Write a summary to highlight your personality. ✨'} </span> </p>
                                                </div>
                                                <div className=''>
                                                    <p className='fw-bold'>Category</p>
                                                </div>
                                                <div>
                                                    <p> <span className='fs-italic'>{inputs?.category?.map(x => x.category).join(', ')}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Expericence />
                                    < EducationForm />
                                </>
                            )}
                            {showExploreContainer && (
                                <Post />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;