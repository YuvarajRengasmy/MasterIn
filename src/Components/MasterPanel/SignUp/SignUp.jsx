import React, { useEffect, useState } from 'react';
import '../../../Styles/SignUp.css';

import logo from '../../Assets/Images/masterin-logo.svg';
import { FcGoogle } from 'react-icons/fc';
import { isValidEmail, isValidPassword, isValidPhone } from '../../../utils/validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../../utils/Storage';
import { isAuthenticated } from '../../../utils/Auth';
import { saveMaster } from '../../../api/master';
import { getAllCategory } from '../../../api/category';
import { saveUser } from '../../../api/user';
import { saveCompany } from '../../../api/company';

const SignUp = () => {

    const initialState = {
        name: "",
        mobile: "",
        category: "",
        email: "",
        password: ""
    }
    const initialStateErrors = {
        name: { required: false },
        email: { required: false, valid: false },
        mobile: { required: false, valid: false },
        password: { required: false, valid: false },
        category: { required: false },

    }
    const [inputs, setInputs] = useState(initialState)
    const [errors, setErrors] = useState(initialStateErrors)
    const [submitted, setSubmitted] = useState(false);
    const [type, setType] = useState('master');
    const [category, setCategory] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        getAllCategoryList()
    }, [])

    const getAllCategoryList = () => {
        getAllCategory().then(res => {
            setCategory(res?.data?.result)
        }).catch(err => { console.log(err) })
    }

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.name === "") {
            error.name.required = true;
        }
        if (data.category === "") {
            error.category.required = true;
        }
        if (data.email === "") {
            error.email.required = true;
        }
        if (data.password === "") {
            error.password.required = true;
        }
        if (data.mobile === "") {
            error.mobile.required = true;
        }
        if (!isValidPassword(data.password)) {
            error.password.valid = true;
        }
        if (!isValidEmail(data.email)) {
            error.email.valid = true;
        }
        if (!isValidPhone(data.mobile)) {
            error.mobile.valid = true;
        }
        return error
    }

    const handleInputs = (event) => {
        setInputs({ ...inputs, [event?.target?.name]: event?.target?.value })
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
            setErrors(newError)
        }
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        if (handleErrors(newError)) {
            if (type === 'master') {
                saveMaster(inputs).then(res => {
                    let token = res?.data?.result?.token;
                    let masterId = res?.data?.result?.masterDetails?._id;
                    let loginType = res?.data?.result?.loginType
                    let data = {
                        token: token, masterId: masterId, loginType: loginType
                    }
                    saveToken(data);
                    if (isAuthenticated()) {
                        navigate("/Dashboard");
                    }
                    toast.success(res?.data?.message);
                })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }
            if (type === 'user') {
                saveUser(inputs).then(res => {
                    let token = res?.data?.result?.token;
                    let userId = res?.data?.result?.userDetails?._id;
                    let loginType = res?.data?.result?.loginType
                    let data = {
                        token: token, userId: userId, loginType: loginType
                    }
                    saveToken(data);
                    if (isAuthenticated()) {
                        navigate("/UserHome");
                    }
                    toast.success(res?.data?.message);
                })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }
            if (type === 'company') {
                saveCompany(inputs).then(res => {
                    let token = res?.data?.result?.token;
                    let companyId = res?.data?.result?.companyDetails?._id;
                    let loginType = res?.data?.result?.loginType
                    let data = {
                        token: token, companyId: companyId, loginType: loginType
                    }
                    saveToken(data);
                    if (isAuthenticated()) {
                        navigate("/Home");
                    }
                    toast.success(res?.data?.message);
                })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }
        }
    }

    const handleSinUpType = (data) => {
        setType(data)
    }


    return (
        <>
            <div className='container-fluid signup-container d-flex align-items-center justify-content-center'>
                <div className='card  container border-0 shadow rounded-5 mt-5 mb-5' style={{ maxWidth: '550px' }}>
                    <img src={logo} alt="CompanyLogo" className='w-25 mt-5 mx-auto ' />
                    {/* Buttons For Navigation */}
                    <div className='navbar-brand d-flex justify-content-center align-items-center gap-3 border p-1 rounded-5 nav-tab mt-2 w-50 mx-auto' style={{ backgroundColor: '#edf0f5' }}>
                        <button
                            className={`btn rounded-5 border-0  fw-bold ${type === 'master' ? 'active bg-white  text-success signup-button ' : ''}`}
                            type="button" aria-selected="true"
                            role='tab' onClick={() => handleSinUpType('master')}
                            style={{ fontSize: '1rem' }} >
                            Master
                        </button>
                        <button
                            className={`btn rounded-5 border-0  fw-bold ${type === 'user' ? 'active bg-white  text-success signup-button' : ''}`}
                            type="button"
                            aria-selected="false"
                            role='tab' onClick={() => handleSinUpType('user')}
                            style={{ fontSize: '1rem' }}>
                            User
                        </button>
                        <button
                            className={`btn rounded-5 border-0 fw-bold ${type === 'company' ? 'active bg-white  text-success signup-button' : ''}`}
                            type="button"
                            aria-selected="false"
                            role='tab' onClick={() => handleSinUpType('company')}
                            style={{ fontSize: '1rem' }}>
                            Company
                        </button>
                    </div>
                    <p className='fs-3 fw-bold mt-3 text-center'>Sign up for Master</p>
                    <form className="needs-validation p-2" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">Name<span className="text-danger">*</span></label>
                            <input type="text" className="form-control rounded-3 p-3 " name='name' onChange={handleInputs} id="name" placeholder='Enter your name' />
                            {errors.name.required ? (
                                <div className="text-danger form-text">
                                    This field is required.
                                </div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Category<span className="text-danger">*</span></label>
                            <select onChange={handleInputs} value={inputs?.category ?? ""} className="form-select rounded-3 p-3 " name='category'>
                                <option value={""} disabled hidden >Select Category</option>
                                {category.map((data, index) =>
                                    <option key={index} value={data?._id}>{data?.category}</option>)}
                            </select>
                            {errors.category.required ?
                                <span className="text-danger form-text">
                                    This field is required.
                                </span> : null
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label fw-bold">Mobile<span className="text-danger">*</span></label>
                            <input type="text" className="form-control rounded-3 p-3 " name='mobile' onChange={handleInputs} id="mobile" placeholder='Enter your mobile number' />
                            {errors.mobile.required ?

                                <span className="text-danger form-text profile_error">

                                    This field is required.

                                </span> : errors.mobile.valid ?
                                    <span className="text-danger form-text profile_error">
                                        Enter valid mobile number.
                                    </span> : null

                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email<span className="text-danger">*</span></label>
                            <input type="text" className="form-control rounded-3 p-3 " name='email' onChange={handleInputs} id="exampleInputEmail1" placeholder='Enter Email' />
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
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password<span className="text-danger">*</span></label>
                            <input type="password" className="form-control rounded-3 p-3 " id="exampleInputPassword1" name='password' onChange={handleInputs} placeholder='Enter Password' />
                            {errors.password.required ? (
                                <div className="text-danger form-text">
                                    This field is required.
                                </div>
                            ) : errors.password.valid ? (
                                <div className="text-danger form-text">
                                    A minimum 8 characters password contains a <br />
                                    combination of {''}
                                    <strong>uppercase, lowercase, {''}</strong>
                                    <strong>special <br /> character{''}</strong> and <strong>number</strong>.
                                </div>
                            ) : null}
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="primaryskills" className="form-label fw-bold">Master-In <small className='text-muted'> (Primary Skills)</small></label>
                            <input type="text" className="form-control rounded-3 p-3 " name='primaryskills' onChange={handleInputs} id="primaryskills" placeholder='Enter your primary skills' />
                                </div> */}
                        <div className="mb-3">
                            <p style={{ fontSize: '0.9rem' }}>
                                By clicking Sign Up below, you agree to the Ribbon <a href="/">terms of service</a>  and acknowledge the <a href="/">privacy policy</a>
                            </p>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="button" className="w-100 p-3 btn rounded-5 text-dark fw-bold btn-outline-dark mb-3" style={{ backgroundColor: '#ffffff' }}><FcGoogle /> Sign Up with Google</button>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="w-100 p-3 btn rounded-5 text-white fw-bold" style={{ backgroundColor: '#10429b' }}>Sign Up</button>
                        </div>
                        <div className='text-center mt-3'>
                            <p>Have an account already? <a className='text-decoration-none text-primary' href="/Login">Sign in</a></p>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default SignUp