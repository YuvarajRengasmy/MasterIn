import React, { useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../utils/FileUpload';
import { isValidPhone, isValidEmail } from '../../../utils/validation';
import { updateUser } from '../../../api/user';
import { AiFillCamera } from 'react-icons/ai';


const UserProfileEdit = ({ user, getUserDetails }) => {

    let initialStateErrors = {
        name: {
            required: false
        },
        position: {
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
        email: {
            required: false, valid: false
        }
    };
    const [errors, setErrors] = useState(initialStateErrors);
    const [inputs, setInputs] = useState();
    const [submitted, setSubmitted] = useState(false);
    const offcanvas = useRef(null)

    useEffect(() => {
        setInputs(user)
    }, [user])

    const handleInputs = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    };
    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.name === "") {
            error.name.required = true;
        }
        if (data.position === "") {
            error.position.required = true;
        } if (data.image === "") {
            error.image.required = true;
        }
        if (data.mobile === "") {
            error.mobile.required = true;
        }
        if (data.email === "") {
            error.email.required = true;
        }
        if (data.location === "") {
            error.location.required = true;
        }

        if (!isValidPhone(data.mobile)) {
            error.mobile.valid = true;
        }
        if (!isValidEmail(data.email)) {
            error.email.valid = true;
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

    const handleBackgroundFileInputs = (event) => {
        const file = event?.target?.files[0];
        const folder = 'masterin/backgroundImage/'
        if (file) {
            uploadFile(file, folder).then(res => {
                event.target.value = null;
                const backgroundImage = res?.Location
                setInputs({ ...inputs, backgroundImage })
            }).catch(err => { console.log(err); })
        };

    };
    const handleSubmited = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        if (handleErrors(newError)) {
            updateUser(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    getUserDetails()
                    offcanvas.current.click()
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    }

    return (
        <>
            <div className='d-flex align-items-center justify-content-end mb-1 '>
                <a className="btn btn-sm btn-light border-0" type="button" data-bs-toggle="offcanvas" href="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                    <MdEdit />
                </a>
            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptions" data-bs-backdrop="static" >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Edit Profile</h5>
                    <button type="button" ref={offcanvas} className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmited}>
                        <div>
                            <div className='text-center'>
                                <label htmlFor='BanerImageInput' className='profile-image-label' style={{ width: '100%' }}>
                                    {/* Banner Image */}
                                    <img
                                        src={inputs?.backgroundImage ? inputs?.backgroundImage : 'https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/empty-banner.svg'}
                                        className="card-img-top img-fluid rounded-top-2"
                                        alt="bannerImage"
                                        style={{ maxHeight: '6rem',objectFit:'cover'}} />
                                    <AiFillCamera className='text-secondary' size={20} style={{ cursor: 'pointer', marginTop: '55px', marginLeft: '-25px'  }} />

                                </label>
                                <input
                                    type="file"
                                    id="BanerImageInput"
                                    name="backgroundImage"
                                    onChange={handleBackgroundFileInputs}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />

                                <label htmlFor="profileImageInput" className='profile-image-label'>


                                    {/* Profile Image */}
                                    <div className="position-relative top-55 start-50 translate-middle">
                                        <img
                                            id="fileInput"
                                            src={inputs?.image ? inputs?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'}
                                            width={80} height={70}
                                            className="rounded-circle img-fluid"
                                            alt="media"
                                            style={{ objectFit: 'cover', cursor: 'pointer', width: '5rem', height: '5rem' }}
                                        /> <AiFillCamera size={20} style={{ cursor: 'pointer', marginTop: '55px', marginLeft: '-20px' }} />

                                    </div>

                                </label>
                                <input
                                    type="file"
                                    id="profileImageInput"
                                    onChange={handleFileInputs}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />
                                {errors.image.required ?

                                    <span className="text-danger form-text profile_error">

                                        This field is required.

                                    </span> : null

                                }
                            </div>
                            <div>
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Full Name<span className="text-danger">*</span></label>
                                <input type="text" onChange={handleInputs} value={inputs?.name} className="form-control border-top-0 border-end-0 border-start-0" id="exampleInputName" name="name" placeholder='Enter your name' />
                                {errors.name.required ?

                                    <span className="text-danger form-text profile_error">

                                        This field is required.

                                    </span> : null

                                }
                            </div>

                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Position<span className="text-danger">*</span></label>
                                <input type="text" onChange={handleInputs} value={inputs?.position} name='position' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="React Js Developer"></input>
                                {errors.position.required ?

                                    <span className="text-danger form-text profile_error">

                                        This field is required.

                                    </span> : null

                                }
                            </div>
                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Mobile<span className="text-danger">*</span></label>
                                <input type="text" onChange={handleInputs} value={inputs?.mobile} name="mobile" className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="enter the number"></input>
                                {errors.mobile.required ?

                                    <span className="text-danger form-text profile_error">

                                        This field is required.

                                    </span> : errors.mobile.valid ?
                                        <span className="text-danger form-text profile_error">
                                            Enter valid mobile number.
                                        </span> : null

                                }
                            </div>
                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Email<span className="text-danger">*</span></label>
                                <input type="text" onChange={handleInputs} value={inputs?.email} name='email' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="optimuzprime@example.com"></input>
                                {errors.email.required ? (
                                    <div className="text-danger form-text">
                                        This field is required.
                                    </div>
                                ) : errors.email.valid ? (
                                    <div className="text-danger form-text">
                                        Enter valid Email Id.
                                    </div>
                                ) : null}

                            </div>

                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Location<span className="text-danger">*</span></label>
                                <input type="text" onChange={handleInputs} value={inputs?.location} name='location' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="Enter your location"></input>
                                {errors.location.required ?

                                    <span className="text-danger form-text profile_error">

                                        This field is required.

                                    </span> : null

                                }
                            </div>
                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Linkedin</label>
                                <input type="text" onChange={handleInputs} value={inputs?.link} name='link' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="https://www.optimuz.com"></input>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Description</label>
                                <input type="text" onChange={handleInputs} value={inputs?.description} name='description' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="Enter the Description"></input>

                            </div>
                            <div className="mt-5 mb-3 d-flex flex-wrap justify-content-end gap-2 align-items-center">
                                <button className='btn btn-primary' type='submit'>Update</button>
                                <button className='btn btn-outline-danger' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserProfileEdit