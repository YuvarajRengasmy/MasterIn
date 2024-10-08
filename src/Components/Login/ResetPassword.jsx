import React, { useState } from 'react';

import logo from '../../Components/Assets/Images/masterin-logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isValidPassword } from '../../utils/validation';
import { resetPassword } from '../../api/login';
import { toast } from 'react-toastify';


const ResetPassword = () => {

    const location = useLocation()
    const resetId = new URLSearchParams(location.search).get('id')
    const navigate = useNavigate()
    let initialStateErrors = {
        password: { required: false, valid: false },
        confirmPassword: { required: false, confirm: false },
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);

    const [inputs, setInputs] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.password === "") {
            error.password.required = true;
        }
        if (data.confirmPassword === "") {
            error.confirmPassword.required = true;
        }
        if (!isValidPassword(data.password)) {
            error.password.valid = true;
        }
        if (data.confirmPassword !== data.password) {
            error.confirmPassword.confirm = true;
        }
        return error
    }

    const handleInputs = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    }

    const handleErrors = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const prop = obj[key];
                if (prop.required === true || prop.valid === true || prop.confirm === true) {
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
            var data = {
                _id: resetId,
                password: inputs.confirmPassword
            }
            resetPassword(data)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate('/Login')
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };


    return (
        <>
            <div className='container-fluid forgotPassword-container d-flex justify-content-center align-items-center'>
                <div className='card  container border-0 shadow rounded-5 mt-5 mb-5' style={{ maxWidth: '550px' }}>
                    <img src={logo} alt="CompanyLogo" className='w-50 mt-5 mx-auto ' />
                    <p className='fs-3 fw-bold mt-3 text-center'>Reset Password</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
                            <input type="password" className="form-control rounded-3 p-3 " id="exampleInputPassword1" onChange={handleInputs} placeholder='Enter Password' name='password' />
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
                            <label htmlFor="PasswordConfirmation" className="form-label fw-bold">Password Confirmation</label>
                            <input type="password" className="form-control rounded-3 p-3 " id="PasswordConfirmation" onChange={handleInputs} placeholder='Re-Enter Password' name='confirmPassword' />
                            {errors.confirmPassword.required ? (
                                <span className="text-danger form-text">
                                    Confirm password is required.
                                </span>
                            ) :
                                errors.confirmPassword.confirm ? (
                                    <span className="text-danger form-text">
                                        Password and confirm password doesn't match.
                                    </span>
                                ) : null}
                        </div>
                        <div className='d-flex justify-content-center gap-3 mb-3'>
                            <Link to='/Login' type="button" className="w-100 p-2 btn rounded-5 text-dark fw-bold btn-outline-dark" style={{ backgroundColor: '#ffffff' }}>Back</Link>
                            <button type="submit" className="w-100 p-2 btn rounded-5 text-white fw-bold" style={{ backgroundColor: '#10429b' }}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;