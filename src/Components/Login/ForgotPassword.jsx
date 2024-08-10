import React, { useState } from 'react';
import '../../Styles/ForgotPassword.css';
import logo from '../../Components/Assets/Images/masterin-logo.svg';
import { isValidEmail } from '../../utils/validation';
import { forgotPassword } from '../../api/login';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    let initialStateErrors = {
        email: { required: false, valid: false },
    };

    

    const [errors, setErrors] = useState(initialStateErrors);

    const [inputs, setInputs] = useState({
        email: "",
    });
    const [submitted, setSubmitted] = useState(false)

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.email === "") {
            error.email.required = true;
        }
        if (!isValidEmail(data.email)) {
            error.email.valid = true
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
            var data = {
                email: inputs.email,
                link: "https://masterin.in/ResetPassword?id=",
            };
            forgotPassword(data)
                .then((res) => {
                    toast.success(res?.data?.message);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };


    return (
        <>
            <div className='container-fluid forgotPassword-container d-flex justify-content-center align-items-center'>
                <div className='card p-5 border-0 shadow-lg rounded-5' style={{ maxWidth: '550px' }}>
                    <img src={logo} alt="CompanyLogo" className='w-50 mx-auto' />
                    <p className='fs-3 fw-bold mt-4'>Forgot your password?</p>
                    <p className='fw-bold text-secondary'>We'll send a password reset link to your email</p>
                    <form className="needs-validation p-2" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email</label>
                            <input type="text" className="form-control rounded-3 p-3 " id="exampleInputEmail1" placeholder='Enter Email' name='email' onChange={handleInputs} />
                            {errors.email.required ? (
                                <span className="text-danger form-text">
                                    This field is required.
                                </span>
                            ) : errors.email.valid ? (
                                <span className="text-danger form-text">
                                    Enter valid Email Id.
                                </span>
                            ) : null}
                        </div>
                        <div className='d-flex justify-content-center gap-3'>
                          <button  className="w-75 p-2 btn rounded-5 text-dark fw-bold btn-outline-dark" style={{ backgroundColor: '#ffffff' }}> Back</button>
                            <button type="submit" className="w-75 p-2 btn rounded-5 text-white fw-bold" style={{ backgroundColor: '#10429b' }}>Send reset email</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;