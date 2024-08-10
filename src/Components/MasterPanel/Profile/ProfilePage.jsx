import React, { useEffect, useRef, useState } from 'react';
import '../../../Styles/ProfilePage.css';
import Navbar from '../../../Pages/Navbar';
import EducationForm from './education';
import Expericence from './Expericence';
import Post from './Post';
import { Autocomplete, Box, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'
import { getAllCategory } from '../../../api/category';
import { useNavigate } from 'react-router-dom';
import { Popover } from 'bootstrap';
import ReactDOM from 'react-dom';
import { AiFillCopy, AiOutlineEdit, AiOutlineGlobal, AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { RxText } from 'react-icons/rx';
import { FcAddImage } from 'react-icons/fc';
import { CgReorder } from "react-icons/cg";
import { TbCameraPlus } from "react-icons/tb";
import { FaBusinessTime } from "react-icons/fa";
import { MdOutlineWorkHistory, MdVerified } from 'react-icons/md';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../utils/FileUpload';
import { isValidPhone } from '../../../utils/validation';
import { getSingleMaster, updateMaster } from '../../../api/master';
import { getMasterId } from '../../../utils/Storage';
import { RiCloseFill, RiCoinsFill } from 'react-icons/ri';
import { BsCoin, BsLink45Deg, BsTelephone } from 'react-icons/bs';
import { IoLocation } from 'react-icons/io5';
import EventList from './Event';
const ProfilePage = () => {

    let initialState = {
        name: '',
        position: '',
        link: '',
        location: '',
        image: '',
        descryption: '',
        backgroundImage: '',
        mobile: '',
        education: "",
        category: "",
        sessionCoins: '',

    }


    let initialStateErrors = {
        name: {
            required: false
        },
        position: {
            required: false
        },

        link: {
            required: false
        },
        sessionCoins: {
            required: false
        },
        location: {
            required: false
        },
        image: {
            required: false
        },


        mobile: {
            required: false, valid: false
        },

        category: {
            required: false
        },

    };


    const [errors, setErrors] = useState(initialStateErrors);
    const [inputs, setInputs] = useState(initialState);
    const [profileDetails, setProfileDetails] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [category, setCategory] = useState([]);
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState('')
    const modal = useRef(null)
    const location = useLocation()

    useEffect(() => {
        const page = location?.state
        setShow(page?page:'profile')
        getUserDetails()
        getAllCategoryList()
    }, [])

    const getAllCategoryList = () => {
        getAllCategory().then(res => {
            setCategory(res?.data?.result)
        }).catch(err => { console.log(err) })
    }

    const getUserDetails = () => {
        const data = getMasterId()
        getSingleMaster(data)
            .then((res) => {
                const result = res?.data?.result
                setProfileDetails(result)
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const handleInputs = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    };

    const handleShowPage = (page) => {
        setShow(page)
    }

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.name === "") {
            error.name.required = true;
        }
        if (data.position === "") {
            error.position.required = true;
        } if (data.link === "") {
            error.link.required = true;
        } if (data.image === "") {
        } if (data.sessionCoins === "") {
            error.sessionCoins.required = true;
        } if (data.image === "") {
            error.image.required = true;
        }
        if (data.mobile === "") {
            error.mobile.required = true;
        }


        if (data.location === "") {
            error.location.required = true;
        }

        if (data.category && data.category.length === 0) {
            error.category.required = true;
        }



        if (!isValidPhone(data.mobile)) {
            error.mobile.valid = true;
        }

        return error
    }



    const handleErrors = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const prop = obj[key];
                if (prop.required === true || prop.valid === true) {
                    return false;
                }
            }
        }
        return true;
    }

    const handleNumberInputChange = (event) => {
        const { value } = event.target;
        if (/^\d*$/.test(value) || value === '') {
            handleInputs(event);
        }
    };

    const handleFileInputs = (event) => {
        const file = event?.target?.files[0];
        const folder = 'masterin/profile/'
        if (file) {
            uploadFile(file, folder).then(res => {
                event.target.value = null;
                const image = res?.Location
                setInputs({ ...inputs, image })
                if (submitted) {
                    const newError = handleValidation({ ...inputs, image })
                    setErrors(newError)
                }
            }).catch(err => { console.log(err); })
        };

    };


    const handleBackgroundFile = (event) => {
        const file = event?.target?.files[0];
        const folder = 'masterIn/backgroundImage/'
        if (file) {
            uploadFile(file, folder).then(res => {
                event.target.value = null;
                const backgroundImage = res?.Location
                setInputs({ ...inputs, backgroundImage })
                if (submitted) {
                    const newError = handleValidation({ ...inputs, backgroundImage })
                    setErrors(newError)
                }
            }).catch(err => { console.log(err); })
        };

    };

    const openPopup = () => {
        const category = profileDetails?.category?.map(x => x._id)
        setInputs({ ...initialState, ...profileDetails, category })
        setOpen(true)
        setSubmitted(false)
        setErrors(initialStateErrors)

    }

    const closePopup = () => {
        setOpen(false)
    }

    const handleSubmited = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs)

        setErrors(newError)

        setSubmitted(true)

        if (handleErrors(newError)) {
            if (inputs?.category?.length >= 3) {
                updateMaster(inputs)
                    .then((res) => {
                        toast.success(res?.data?.message);
                        closePopup()
                        getUserDetails()
                    })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }
            else {
                toast.warning('Please select atleast three categories')
            }
        }
    }
    const handleCategory = (event, values) => {
        const category = values.map(x => x._id)
        setInputs({ ...inputs, category });
        if (submitted) {
            const newError = handleValidation({ ...inputs, category })
            setErrors(newError)
        }
    };

    const [showAlert, setShowAlert] = useState(false);

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



    return (
        <>
            <div className='col-lg-8 scroll-bar mx-auto ' style={{ overflow: 'auto', maxHeight: 'calc(100vh - 50px)', marginTop: '40px' }}>
                <div className='d-flex align-items-center'>
                    <div className='container ' >
                        <Navbar />
                        <div className='container d-flex flex-column border-start border-end gap-2 align-items-center bg-light pb-5 mt-5' >
                            <div className="container bg-white mt-3 rounded-2 shadow mt-5 mt-lg-3  p-2">
                                <div className="btn-group gap-2 d-flex align-items-center justify-content-between" role="group">
                                    <div className='navbar-brand d-flex justify-content-center align-items-center gap-3  border p-1 rounded-5 nav-tab' style={{ backgroundColor: '#ececec' }}>
                                        <button
                                            className={`btn rounded-5 fw-bold ${show === 'profile' ? 'active bg-white border-0 text-primary' : ''}`}
                                            type="button" aria-selected="true"
                                            role='tab' onClick={() => handleShowPage('profile')}
                                            style={{ fontSize: '0.8rem' }} >
                                            Profile
                                        </button>
                                        <button
                                            className={`btn rounded-5 fw-bold ${show === 'post' ? 'active bg-white border-0 text-primary' : ''}`}
                                            type="button"
                                            aria-selected="false"
                                            role='tab' onClick={() => handleShowPage('post')}
                                            style={{ fontSize: '0.8rem' }}>
                                            Post
                                        </button>
                                        <button
                                            className={`btn rounded-5 fw-bold ${show === 'event' ? 'active bg-white border-0 text-primary' : ''}`}
                                            type="button"
                                            aria-selected="false"
                                            role='tab' onClick={() => handleShowPage('event')}
                                            style={{ fontSize: '0.8rem' }}>
                                            Events
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




                            {show === 'profile' && (
                                <>
                                    <div className='container-fluid d-flex flex-column justify-content-center mt-5 p-0 shadow'>
                                        <div className="card w-100  border-0 " style={{ objectFit: 'cover' }} >
                                            {/* ProfilePage Banner */}

                                            <img className='img-fluid' src={profileDetails?.backgroundImage ? profileDetails?.backgroundImage : 'https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/empty-banner.svg'} alt="BackgroundImage" style={{ height: '250px', objectFit: 'cover' }} />
                                            <div className="card-img-overlay card-image">
                                                <div className="d-flex justify-content-end gap-2 profile">
                                                    <Tooltip title='Your Total Coins'><button className=" btn-3 rounded-5 p-2 d-flex align-items-center gap-1" type="button"><RiCoinsFill className='text-warning fs-2' /> <span className='fw-bolder'>{profileDetails?.coins} Coins</span></button></Tooltip>
                                                </div>
                                                <div className='profile-image'>
                                                    {/* Profile Image Outside */}
                                                    <img id="profileImageOutsideModal" src={profileDetails?.image ? profileDetails?.image : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"} className='img-fluid rounded-circle' style={{ width: "10rem", height: "10rem", border: '2px solid #ffffff', position: 'absolute', top: '75%', left: '12%', transform: 'translate(-50%, -50%)', objectFit: 'cover' }} alt="avatar" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container p-4 d-flex  flex-wrap justify-content-between  align-items-center'>
                                            <div className='' >
                                                <p className='fs-5 fw-bold'>{profileDetails?.name}</p>
                                                <p className='h6'>{profileDetails?.userName}</p>
                                                <small className='text-secondary d-block'><AiOutlineGlobal /> {profileDetails?.isPublic ? 'Public' : 'Private'}</small>
                                                {profileDetails?.mobile && <small className='text-secondary d-block'><BsTelephone /> {profileDetails?.mobile}</small>}
                                                {profileDetails?.position && <small className='text-secondary d-block'><MdOutlineWorkHistory /> {profileDetails?.position}</small>}
                                                {profileDetails?.location && <small className='text-secondary d-block'><IoLocation /> {profileDetails?.location}</small>}
                                                {profileDetails?.link && <small className='text-secondary d-block' > <BsLink45Deg /> <Link className='text-decoration-none text-dark small' to={profileDetails?.link} target='_blank'>{profileDetails?.link}</Link></small>}
                                                <Tooltip title='Coins for 1hr session' className='pointer'><small className='text-secondary d-block'><BsCoin /> {profileDetails?.sessionCoins} coins</small></Tooltip>

                                            </div>
                                            <div className='d-flex gap-5 align-items-center justify-content-around'>
                                                <div className="btn-group gap-3 border-0 ">
                                                    <Link className='text-decoration-none text-dark ' onClick={openPopup} ><AiOutlineEdit /></Link>
                                                </div>

                                                {/* Profile-Edit-Modal */}

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
                                                    <p> <span className='fs-italic'>{profileDetails?.descryption ? profileDetails?.descryption : 'Write a summary to highlight your personality. ✨'} </span> </p>
                                                </div>
                                                <div className=''>
                                                    <p className='fw-bold'>Category</p>
                                                </div>
                                                <div>
                                                    <p> <span className='fs-italic'>{profileDetails?.category?.map(x => x.category).join(', ')}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <SessionAvailability /> */}
                                    <Expericence />
                                    <EducationForm />
                                </>
                            )}
                            {show === 'post' && (
                                <Post />
                            )}
                            {show === 'event' && (
                                <EventList />
                            )}
                        </div>
                    </div>
                </div>
            </div>



            <Dialog open={open} fullwidth maxWidth="sm">
                <DialogTitle className='text-secondary'>
                    Profile Details<IconButton className="float-end" onClick={closePopup} >
                        <RiCloseFill /> </IconButton>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmited}>

                        <div className="card w-100  border-0  "  >

                            <div className=" ">
                                {/* Banner Image */}
                                <label htmlFor="bannerImageInput" className='banner-image-label' style={{ width: '100%', position: 'relative' }}>
                                    <img
                                        src={inputs?.backgroundImage ? inputs?.backgroundImage : 'https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/empty-banner.svg'}
                                        className="card-img-top img-fluid"
                                        alt="profile"
                                        style={{ objectFit: 'cover', height: '150px', width: '500px', cursor: 'pointer' }}
                                    />
                                    <input
                                        type="file"
                                        id='bannerImageInput'
                                        style={{ display: 'none' }}
                                        onChange={handleBackgroundFile}
                                        accept="image/*"
                                    />
                                    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                        <TbCameraPlus className='text-white fs-3 pe-2 pointer' />
                                    </div>
                                </label>

                                {/* Profile Image */}
                                <div className="position-absolute top-10 start-50 translate-middle">
                                    <div className='position-relative' style={{ display: 'inline-block', position: 'relative' }}>
                                        <label htmlFor="profileImageInput" className='profile-image-label'>
                                            <img
                                                id="fileInput"
                                                src={inputs?.image ? inputs?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'}
                                                width={80} height={70}
                                                className="rounded-circle img-fluid"
                                                alt="media"
                                                style={{ objectFit: 'cover', cursor: 'pointer', width: '5rem', height: '5rem' }}
                                            />
                                            <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                                <TbCameraPlus className='pointer' />
                                            </div>
                                            <input
                                                type="file"
                                                id="profileImageInput"
                                                onChange={handleFileInputs}
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                            />

                                        </label>

                                    </div>
                                    {errors?.image?.required ?
                                        <span className="text-danger d-block form-text profile_error">
                                            This field is required.
                                        </span> : null
                                    }
                                </div>
                            </div>

                            <div className="modal-body mt-5">
                                <div className='container-fluid gap-2 d-flex flex-column'>
                                    <div className="mb-3 mt-3">
                                        <TextField
                                            id="exampleInputName"
                                            name="name"
                                            label="Name"
                                            variant="outlined"
                                            fullWidth
                                            value={inputs?.name}
                                            onChange={handleInputs}
                                            placeholder="Enter Fullname"
                                            className="rounded-2 w-100"
                                            error={errors?.name?.required}
                                            helperText={errors?.name?.required && "This field is required."}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <Autocomplete
                                            disablePortal
                                            multiple
                                            id="combo-box-demo"
                                            options={category}
                                            getOptionLabel={(option) => option.category}
                                            className='w-100'
                                            limitTags={1}
                                            value={category?.filter((option) => inputs?.category?.includes(option._id))}
                                            onChange={handleCategory}
                                            renderInput={(params) => <TextField {...params} name="category" label="Category" placeholder='Categories'
                                                error={errors?.category?.required}
                                                helperText={errors?.category?.required && "This field is required."} />}
                                        />

                                    </div>

                                    <div className='mb-3'>
                                        <FormControl fullWidth>
                                            <InputLabel id="account-type-label">Account Type</InputLabel>
                                            <Select
                                                name='isPublic'
                                                value={inputs?.isPublic}
                                                labelId="account-type-label"
                                                fullWidth
                                                label="Account Type"
                                                onChange={handleInputs}
                                            >
                                                <MenuItem value={true}>Public</MenuItem>
                                                <MenuItem value={false}>Private</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="mb-3">
                                        <TextField
                                            id="exampleInputMobile"
                                            name="mobile"
                                            label="Mobile"
                                            variant="outlined"
                                            fullWidth
                                            value={inputs?.mobile}
                                            onChange={handleInputs}
                                            className="rounded-2 w-100"
                                            error={errors?.mobile?.required || errors?.mobile?.valid}
                                            helperText={
                                                errors?.mobile?.required
                                                    ? "This field is required."
                                                    : errors?.mobile?.valid
                                                        ? "Enter a valid number."
                                                        : null
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextField
                                            id="exampleInputPosition"
                                            name="position"
                                            label="Position"
                                            variant="outlined"
                                            fullWidth
                                            value={inputs?.position}
                                            onChange={handleInputs}
                                            className="rounded-2 w-100"
                                            placeholder="Enter Position"
                                            error={errors?.position?.required}
                                            helperText={errors?.position?.required && "This field is required."}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextField
                                            id="exampleInputLocation"
                                            name="location"
                                            label="Location"
                                            variant="outlined"
                                            fullWidth
                                            value={inputs?.location}
                                            onChange={handleInputs}
                                            className="rounded-2 w-100"
                                            placeholder="Enter Location"
                                            error={errors?.location?.required}
                                            helperText={errors?.location?.required && "This field is required."}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextField
                                            id="exampleInputLink"
                                            name="link"
                                            label="Links"
                                            variant="outlined"
                                            fullWidth
                                            value={inputs?.link}
                                            onChange={handleInputs}
                                            className="rounded-2 w-100"
                                            placeholder="Enter Link"
                                            error={errors?.link?.required}
                                            helperText={errors?.link?.required && "This field is required."}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextField
                                            label="About Me"
                                            multiline
                                            fullWidth
                                            value={inputs?.descryption}
                                            maxRows={3}
                                            name='descryption'
                                            onChange={handleInputs}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <TextField
                                            label="Set coins for 1hr session"
                                            type="text"
                                            fullWidth
                                            value={inputs?.sessionCoins}
                                            name='sessionCoins'
                                            onChange={handleNumberInputChange}
                                            error={errors?.sessionCoins?.required}
                                            helperText={errors?.sessionCoins?.required && "This field is required."}
                                        />
                                    </div>
                                    <div className="  d-flex flex-wrap  justify-content-end gap-2 align-items-center">
                                        <button className='btn btn-primary mb-3' type='submit' >Update</button>
                                        <button className='btn btn-outline-danger mb-3' type='button' onClick={closePopup}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProfilePage;