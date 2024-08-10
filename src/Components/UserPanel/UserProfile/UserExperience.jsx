import React, { useEffect, useRef, useState } from 'react'
import { SlLocationPin } from 'react-icons/sl'
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { MdEdit, MdOutlineDateRange, MdOutlineWorkOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { AiFillDelete, AiFillPlusCircle, AiOutlineGlobal, AiOutlineRead } from 'react-icons/ai'
import { Dialog, DialogContent, IconButton, Tooltip } from '@mui/material'
import { getUserId } from '../../../utils/Storage'
import { deleteExperience, getSingleUser, updateExperience, updateUser } from '../../../api/user'
import { toast } from 'react-toastify'
import { IoMdClock } from 'react-icons/io'

const UserExperience = () => {

    let initialState = {
        title: '',
        workMode: '',
        companyName: '',
        location: '',
        currentlyWorking: false,
        skills: '',
        startDate: '',
        endDate: '',
    }

    let initialStateErrors = {
        title: {
            required: false
        },
        workMode: {
            required: false
        },
        companyName: {
            required: false
        },
        location: {
            required: false
        },
        startDate: {
            required: false
        },
        endDate: {
            required: false
        },
        skills: {
            required: false
        }

    };

    const [inputs, setInputs] = useState(initialState);
    const [experience, setExperience] = useState([]);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const offcanvas = useRef(null)

    useEffect(() => {
        getUserDetails()
    }, [])


    const getUserDetails = () => {
        const data = getUserId()
        getSingleUser(data)
            .then((res) => {
                const result = res?.data?.result?.experience
                setExperience(result)
            })
            .catch((err) => {
                console.log(err);
            });
    }



    const handleInputs = (event) => {
        setInputs({ ...inputs, [event?.target?.name]: event?.target?.value })
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    }

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.title === "") {
            error.title.required = true;
        }
        if (data.workMode === "") {
            error.workMode.required = true;
        }
        if (data.companyName === "") {
            error.companyName.required = true;
        }
        if (data.location === "") {
            error.location.required = true;
        }
        if (data.startDate === "") {
            error.startDate.required = true;
        }
        if (data.endDate === "") {
            error.endDate.required = true;
        }
        if (data.skills === "") {
            error.skills.required = true;
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

    const handleSubmit = (event) => {
        event?.preventDefault()
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        if (handleErrors(newError)) {
            if (inputs?._id) {
                const data = { _id: getUserId(), experience: inputs }
                updateExperience(data).then(res => {
                    toast.success(res?.data?.message)
                    getUserDetails()
                    offcanvas.current.click()
                }).catch(err => console.log(err))
            }
            else {
                const data = {
                    _id: getUserId(),
                    experience: inputs
                }
                updateUser(data).then(res => {
                    toast.success('Successfully Add Experience')
                    getUserDetails()
                    offcanvas.current.click()
                }).catch(err => console.log(err))
            }
        }
    }

    const handleEditExperience = (data) => {
        setInputs(data)
        setErrors(initialStateErrors)
        setSubmitted(false)

    }

    const handleAddExperience = () => {
        setInputs(initialState)
        setSubmitted(false)
        setErrors(initialStateErrors)
    }

    const openPopup = (data) => {
        setOpen(true)
        setDeleteId(data)
    }

    const closePopup = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        const data = { _id: getUserId(), experienceId: deleteId }
        deleteExperience(data).then(res => {
            toast.success(res?.data?.message)
            getUserDetails();
            closePopup()
        }).catch(err => console.log(err))
    }



    return (
        <>
            <div className='container'>
                <div className='mt-4'>
                    <span style={{ fontSize: "18px", fontWeight: "500" }}>Experience</span><Tooltip title="Add Experience"> <IconButton onClick={() => { handleAddExperience() }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptionsTwo" aria-controls="offcanvasWithBothOptionsTwo"> <AiFillPlusCircle size={20} /></IconButton> </Tooltip>
                </div>
                {experience?.map((data, index) =>
                    <div key={index} className='container card my-2 px-4'>
                        <div className='d-flex align-items-center mt-1 gap-3 justify-content-end '>
                            <Link onClick={() => handleEditExperience(data)} className="btn btn-sm btn-light  border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptionsTwo" aria-controls="offcanvasWithBothOptionsTwo">
                                <MdEdit />
                            </Link>
                            <Link className="btn  btn-sm btn-light  border-0" onClick={() => openPopup(data?._id)} type="button"><AiFillDelete />
                            </Link>
                        </div>
                        <div className='row row-cols-1 row-cols-md-3'>
                            <p className='text-secondary fw-bold  '>
                                <MdOutlineWorkOutline /> Title <span className='fw-lighter d-block'>{data?.title}</span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <HiOutlineBuildingOffice /> Company Name <span className='fw-lighter d-block'> {data?.companyName} </span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <SlLocationPin /> Location <span className='fw-lighter d-block'> {data?.location} </span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <IoMdClock /> Work Mode <span className='fw-lighter d-block'> {data?.workMode} </span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <MdOutlineDateRange /> Start Date <span className='fw-lighter d-block'> {data?.startDate} </span>
                            </p>
                            <p className='text-secondary fw-bold'>
                                <MdOutlineDateRange /> End Date <span className='fw-lighter d-block'> {data?.endDate} </span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <AiOutlineGlobal /> Currently Working <span className='fw-lighter d-block'> {data?.currentlyWorking ? 'Yes' : 'No'} </span>
                            </p>
                            <p className='text-secondary fw-bold col-md-8'>
                                <AiOutlineRead /> Skills <span className='fw-lighter d-block'> {data?.skills} </span>
                            </p>
                        </div>
                    </div>)}
            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptionsTwo" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="static" >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">{inputs?._id ? 'Edit Experience' : 'Add Experience'}</h5>
                    <button type="button" ref={offcanvas} className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-3">
                            <label htmlFor="title" className="form-label text-secondary" >Title<span className="text-danger">*</span></label>
                            <input type="text" name="title" value={inputs?.title} onChange={handleInputs} placeholder='Ex: React Developer' className="form-control border-top-0 border-end-0 border-start-0" id="title" />
                            {errors.title.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="selectOne" className="form-label text-secondary">Employement Type<span className="text-danger">*</span></label>
                            <select name="workMode" value={inputs?.workMode} onChange={handleInputs} className="form-select border-top-0 border-end-0 border-start-0" aria-label="Default select example" id="selectOne">
                                <option selected>Please Select</option>
                                <option value={'fulltime'}>Full-time</option>
                                <option value={'parttime'}>Part-time</option>
                                <option value={'selfemployed'}>Self-employed</option>
                                <option value={'freelance'}>Freelance</option>
                                <option value={'internship'}>Internship</option>
                                <option value={'trainee'}>Trainee</option>
                            </select>
                            {errors.workMode.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="companyName" className="form-label text-secondary">Company Name<span className="text-danger">*</span></label>
                            <input type="text" placeholder='Ex: Microsoft' value={inputs?.companyName} onChange={handleInputs} name="companyName" className="form-control border-top-0 border-end-0 border-start-0" id="companyName" />
                            {errors.companyName.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="location" className="form-label text-secondary">Location<span className="text-danger">*</span></label>
                            <input type="text" placeholder='Ex: Banglore' value={inputs?.location} onChange={handleInputs} name="location" className="form-control border-top-0 border-end-0 border-start-0" id="location" />
                            {errors.location.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>

                        <div className='mt-3'>
                            <label className="form-label text-secondary">Start date<span className="text-danger">*</span></label>
                            <input type="date" name="startDate" value={inputs?.startDate} onChange={handleInputs} className="form-control border-top-0 border-end-0 border-start-0" id="startDate" />
                            {errors.startDate.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>

                        <div className="mt-3">
                            <label className="form-label text-secondary">End date<span className="text-danger">*</span></label>
                            <input type="date" name="endDate" value={inputs?.endDate} onChange={handleInputs} className="form-control border-top-0 border-end-0 border-start-0" id="endDate" />
                            {errors.endDate.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>

                        <div className='mt-3'>
                            <div className="form-check">
                                <input className="form-check-input border" onChange={(event) => setInputs({ ...inputs, currentlyWorking: event?.target?.checked })} name="currentlyWorking" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" name="currentlyWorking" for="flexCheckDefault">
                                    I am currently working in this role
                                </label>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="skills" className="form-label text-secondary">Skills<span className="text-danger">*</span></label>
                            <input type="text" name="skills" onChange={handleInputs} value={inputs?.skills} placeholder='Ex: ReactJs, NodeJs, etc...' className="form-control w-100 border-top-0 border-end-0 border-start-0" id="skills" />
                            {errors.skills.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>

                        <div className="mt-5 mb-3 d-flex flex-wrap justify-content-end gap-2 align-items-center">
                            <button className='btn btn-primary' type='submit'> {inputs?._id ? 'Update' : 'Save'}</button>
                            <button className='btn btn-outline-danger' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            <Dialog open={open}>
                <DialogContent>
                    <div className="text-center m-4">
                        <h5 className="mb-4">Are you sure you want to remove <br /> the selected Experience Details ?</h5>
                        <button type="button" className="btn btn-primary mx-3" onClick={handleDelete}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UserExperience