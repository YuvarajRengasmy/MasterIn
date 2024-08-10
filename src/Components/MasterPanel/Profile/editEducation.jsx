import React, { useEffect, useRef, useState } from 'react';
import '../../../Styles/ProfilePage.css'
import { localDate } from '../../../utils/dateformat';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { MdOutlineDateRange, MdWorkOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { getSingleMaster, updateEducation } from '../../../api/master';
const Header = () => {
    let initialState = {
        institute: '',
        qualification: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        grade: '',
        extraCurricular: '',
    }

    let initialStateErrors = {
        institute: {
            required: false
        },
        qualification: {
            required: false
        },
        fieldOfStudy: {
            required: false
        },

        startDate: {
            required: false
        },
        endDate: {
            required: false
        },
        grade: {
            required: false
        },
        extraCurricular: {
            required: false
        },

    };






    const location = useLocation()
    const id = new URLSearchParams(location.search).get('id')
    const [inputs, setInputs] = useState(initialState);
    const [errors, setErrors] = useState(initialStateErrors);

    const [submitted, setSubmitted] = useState(false);
    // const [education, setEducation] = useState(initialState);
    const navigate = useNavigate()
    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {

        getSingleMaster(id).then(res => {
            console.log("yu", res)
            setInputs(res?.data?.result?.education?._id)

        }).catch(err => { console.log(err); })
    }

    const handleInputs = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    };

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.institute === "") {
            error.institute.required = true;
        }
        if (data.qualification === "") {
            error.qualification.required = true;
        }
        if (data.fieldOfStudy === "") {
            error.fieldOfStudy.required = true;
        }

        if (data.startDate === "") {
            error.startDate.required = true;
        }
        if (data.endDate === "") {
            error.endDate.required = true;
        }
        if (data.grade === "") {
            error.grade.required = true;
        }
        if (data.extraCurricular === "") {
            error.extraCurricular.required = true;
        }
        return error
    }

    const handleEducationErrors = (obj) => {
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


    const handleUpdateEducation = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        const allInputsValid = Object.values(newError)
        const valid = allInputsValid.every(x => x.required === false)
        if (valid) {

            updateEducation(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate("/ProfilePage")
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    }



    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Generate an array of the past 10 years
    const years = Array.from({ length: 25 }, (_, index) => currentYear - index);

    // Generate an array of months
    const months = Array.from({ length: 12 }, (_, index) => index + 1); // Months are one-indexed

    // Generate an array of days for the current month
    const days = Array.from({ length: new Date(currentYear, currentMonth, 0).getDate() }, (_, index) => index + 1);
    return (
        <>



            <div className="card w-50  border-0   p-3 mx-auto" style={{ height: '500px' }} >
                <div className="modal-header d-flex justify-content-between align-items-center">
                    <p className="modal-title fs-4 fw-bolder mb-3" id="exampleModalToggleLabel">Edit Education</p>
                </div>

                <div className="modal-body  " >
                    <div className='container-fluid mb-5'>
                        <form className='fw-bolder' onSubmit={handleUpdateEducation}>
                            <div className="mb-3">
                                <label htmlFor="school" className="form-label text-secondary" >School<span className="text-danger">*</span></label>
                                <input type="text" name="institute" value={inputs?.education?.institute} onChange={handleInputs} placeholder='State University' className="form-control" id="school" />
                                {errors.institute.required ? <span className="form-text text-danger">
                                    This field is required.
                                </span> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="degree" className="form-label text-secondary">Degree<span className="text-danger">*</span></label>
                                <input type="text" name="qualification" value={inputs?.education?.qualification} onChange={handleInputs} placeholder='Bachelor' className="form-control" id="degree" />
                                {errors.qualification.required ? <span className="form-text text-danger">
                                    This field is required.
                                </span> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fieldOfStudy" className="form-label text-secondary">Field of study<span className="text-danger">*</span></label>
                                <input type="text" value={inputs?.fieldOfStudy} name="fieldOfStudy" onChange={handleInputs} placeholder='Computer Science' className="form-control" id="fieldOfStudy" />
                                {errors.fieldOfStudy.required ? <span className="form-text text-danger">
                                    This field is required.
                                </span> : null}
                            </div>
                            {/* <div className='mb-3'>
                                <div className="form-check">
                                    <input className="form-check-input border" value={education?.currentlyStudying} type="checkbox" name="currentlyStudying" onChange={handleEducationInputs} id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Currently pursuing
                                    </label>
                                    {educationErrors.currentlyStudying.required ? <span className="form-text text-danger">
                                        This field is required.
                                    </span> : null}
                                </div>
                            </div> */}

                            <div className='mb-3'>
                                <label className="form-label text-secondary">Start date<span className="text-danger">*</span></label>
                                <div className="row gap-2 d-flex justify-content-around">
                                    <div className="col-md-5">
                                        <select id="yearSelect" value={inputs?.startDate} onChange={handleInputs} name="startDate" className="form-select  form-select-sm" >
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="col-md-5">
                                        <select id="monthSelect" name="startDate" value={inputs?.startDate} onChange={handleInputs} className="form-select form-select-sm" >
                                            {months.map((month) => (
                                                <option key={month} value={month} selected={month === currentMonth}>
                                                    {new Date(0, month - 1).toLocaleString('en-US', { month: 'long' })}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                </div>
                                {errors.startDate.required ? <span className="form-text text-danger">
                                    This field is required.
                                </span> : null}
                                <br />
                                <label className="form-label text-secondary">End date<span className="text-danger">*</span></label>
                                <div className="row gap-2 d-flex justify-content-around">
                                    <div className="col-md-5">
                                        <select id="yearSelect" value={inputs?.endDate?.year} onChange={handleInputs} name="endDate" className="form-select  form-select-sm" >
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-5">
                                        <select id="monthSelect" value={inputs?.endDate?.month} onChange={handleInputs} name="endDate" className="form-select form-select-sm" >
                                            {months.map((month) => (
                                                <option key={month} value={month} selected={month === currentMonth}>
                                                    {new Date(0, month - 1).toLocaleString('en-US', { month: 'long' })}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                {errors.endDate.required ? <span className="form-text text-danger">
                                    This field is required.
                                </span> : null}
                            </div>


                            <div className="mb-3">
                                <label htmlFor="grade" className="form-label text-secondary">Grade<span className="text-danger">*</span></label>
                                <input type="text" name="grade" value={inputs?.grade} onChange={handleInputs} placeholder='Ex: 100%' className="form-control w-100" id="grade" />
                                {errors.grade.required ? <span className="form-text text-danger">
                                    This field is required.
                                </span> : null}
                            </div>



                            <div className="mb-3">
                                <label htmlFor="Extracurricular" className="form-label text-secondary">Extracurricular<span className="text-danger">*</span></label>
                                <input type="text" value={inputs?.education?.extraCurricular} name='extraCurricular' onChange={handleInputs} placeholder='Ex: Sports, Music, Dance etc..' className="form-control w-100" id="Extracurricular" />
                                {errors.extraCurricular.required ? <span className="form-text text-danger">
                                    This field is required.
                                </span> : null}
                            </div>
                            <div className="modal-footer d-flex gap-3 align-items-center mt-5 mb-5">
                                <button type="button" className="btn btn-danger"><Link to="/profilePage" className='text-decoration-none text-white' >Cancel</Link></button>
                                <button type="submit" className="btn btn-primary" >Save</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header