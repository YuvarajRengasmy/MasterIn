import React, { useState } from 'react';
import '../../Styles/Login.css';

import { FcGoogle } from 'react-icons/fc';

import logo from '../../Components/Assets/Images/masterin-logo.svg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import { getLoginType, saveToken } from '../../utils/Storage';
import { isAuthenticated } from '../../utils/Auth';
import { toast } from 'react-toastify';
import { loginUser } from '../../api/login';

const Login = () => {

    const initialState = {
        email: "",
        password: ""
    }
    const initialStateErrors = {
        email: { required: false, valid: false },
        password: { required: false, valid: false },
    }
    const [inputs, setInputs] = useState(initialState)
    const [errors, setErrors] = useState(initialStateErrors)
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate()

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.email === "") {
            error.email.required = true;
        }
        if (data.password === "") {
            error.password.required = true;
        }
        if (!isValidPassword(data.password)) {
            error.password.valid = true;
        }
        if (!isValidEmail(data.email)) {
            error.email.valid = true;
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
            loginUser(inputs).then(res => {
                let token = res?.data?.result?.token;
                let loginType = res?.data?.result?.loginType
                if (loginType === 'master') {
                    let masterId = res?.data?.result?.masterDetails?._id;
                    let data = {
                        token: token, masterId: masterId, loginType: loginType
                    }
                    saveToken(data);
                    if (isAuthenticated()) {
                        navigate("/Dashboard");
                    }
                }
                if (loginType === 'company') {
                    let companyId = res?.data?.result?.companyDetails?._id;
                    let data = {
                        token: token, companyId: companyId, loginType: loginType
                    }
                    saveToken(data);
                    if (isAuthenticated()) {
                        navigate("/Home");
                    }
                }
                if (loginType === 'user') {
                    let userId = res?.data?.result?.userDetails?._id;
                    let data = {
                        token: token, userId: userId, loginType: loginType
                    }
                    saveToken(data);
                    if (isAuthenticated()) {
                        navigate("/UserHome");
                    }
                }
                toast.success(res?.data?.message);
            })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    }

    if (isAuthenticated()) {
        const type = getLoginType()
        if (type === 'master') { return <Navigate to="/Dashboard" /> }
        else if (type === 'user') { return <Navigate to="/UserHome" /> }
        else { return <Navigate to="/Home" /> }
    }



    return (
        <>
            <div className='container-fluid login-container d-flex justify-content-center align-items-center'>
                <div className='card container border-0 shadow rounded-5' style={{ maxWidth: '550px' }}>
                    <img src={logo} alt="CompanyLogo" className='w-25 mt-5 mx-auto ' />
                    <p className='fs-3 fw-bold mt-4 text-center'>Login to MasterIn</p>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="w-75 p-2 btn rounded-5 text-dark fw-bold btn-outline-dark mb-3" style={{ backgroundColor: '#ffffff' }}><FcGoogle /> Login with Google</button>                    </div>
                    <div className='text-secondary mb-3 mx-auto' style={{ width: "75%", height: "15px", borderBottom: "1px solid #c1c1c1", textAlign: "center" }}>                        <span style={{ fontSize: "10px", backgroundColor: "#ffffff", padding: "0 10px" }}>
                        OR
                    </span>
                    </div>
                    <form className="needs-validation p-2" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email<span className="text-danger">*</span></label>
                            <input type="text" className="form-control rounded-3 p-3 " id="exampleInputEmail1" placeholder='Enter Email' name='email' onChange={handleInputs} />
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
                            <input type="password" className="form-control rounded-3 p-3 " id="exampleInputPassword1" placeholder='Enter Password' name='password' onChange={handleInputs} />
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
                        <div className="mb-3">
                            <p style={{ fontSize: '0.9rem' }}>
                                <Link to="/ForgotPassword" className='fw-bold text-decoration-none'>Forgot Your Password?</Link>
                            </p>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="w-75 p-2 btn rounded-5 text-white fw-bold" style={{ backgroundColor: '#10429b' }}>Login with email</button>
                        </div>
                        <div className='text-center mt-3'>
                            <p>Don't have an account yet? <a className='text-decoration-none text-primary' href="/SignUp">Sign Up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;