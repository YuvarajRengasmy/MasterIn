import React, { useEffect, useState, useRef } from 'react';
import '../../../Styles/ProfilePage.css'
import { localDate } from '../../../utils/dateformat';

import { FiEdit, } from 'react-icons/fi';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdOutlineDateRange, MdWorkOutline } from 'react-icons/md';
import { getMasterId } from '../../../utils/Storage';
import { Dialog, DialogContent, IconButton, Tooltip } from '@mui/material';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { ImOffice } from 'react-icons/im';

import { LiaIndustrySolid } from 'react-icons/lia';
import { IoLocationSharp } from 'react-icons/io5';
import { GiSkills } from 'react-icons/gi';

import { AiFillDelete, AiFillPlusCircle, AiOutlineRead } from 'react-icons/ai'

import { getSingleMaster, updateExperience, updateMaster, deleteExperience } from '../../../api/master';


const Header = () => {
    let initialStateExperience = {
        title: '',
        workMode: '',
        companyName: '',
        location: '',

        startDate: '',
        endDate: '',
        skills: '',
    }
    let initialStateExperienceErrors = {
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

    const [inputs, setInputs] = useState(initialStateExperience);
    const [experience, setExperience] = useState([]);
    const [experienceErrors, setExperienceErrors] = useState(initialStateExperienceErrors);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const modal = useRef(null)
    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        const data = getMasterId()
        getSingleMaster(data)
            .then((res) => {
                const result = res?.data?.result?.experience
                setExperience(result)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const handleExperienceInputs = (event) => {
        setInputs({ ...inputs, [event?.target?.name]: event?.target?.value })
        if (submitted) {
            const newError = handleExperienceValidation({ ...inputs, [event.target.name]: event.target.value })
            setExperienceErrors(newError)
        }
    }


    const handleExperienceValidation = (data) => {
        let error = initialStateExperienceErrors;
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

    const handleExperienceErrors = (obj) => {
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
    const handleSaveExperience = (event) => {
        event.preventDefault();
        const newErrorExperience = handleExperienceValidation(inputs)
        setExperienceErrors(newErrorExperience)
        setSubmitted(true)
        if (handleExperienceErrors(newErrorExperience)) {
            if (inputs?._id) {
                const data = {
                    _id: getMasterId(),
                    experience: inputs
                }
                updateExperience(data)
                    .then((res) => {
                        toast.success("Successfully Update Experience");
                        getUserDetails()
                        modal.current.click()
                    })
                    .catch(err => console.log(err))

            }
            else {
                const data = {
                    _id: getMasterId(),
                    experience: inputs
                }
                updateMaster(data)
                    .then((res) => {
                        toast.success("Successfully Add Experience");
                        getUserDetails()
                        modal.current.click()
                    })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }

        }
    }

    const handleEditExperience = (data) => {
        setInputs(data)
        setSubmitted(false)
        setExperienceErrors(initialStateExperienceErrors)
    }

    const handleAddExperience = () => {
        setInputs(initialStateExperience)
        setSubmitted(false)
        setExperienceErrors(initialStateExperienceErrors)


    }

    const openPopup = (data) => {
        setOpen(true)
        setDeleteId(data)
    }

    const closePopup = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        const data = { _id: getMasterId(), experienceId: deleteId }
        deleteExperience(data).then(res => {
            toast.success(res?.data?.message)
            getUserDetails();
            closePopup()
        }).catch(err => console.log(err))
    }






    return (
        <>
            <div className='container p-0' >
                <div className='card  shadow border-0 rounded mt-5 p-4'>

                    <div className=''>

                        <div className='d-flex justify-content-between align-items-start'>
                            <p className='fw-bold'>Experience</p>
                            <div className='modal-btn'>
                                <a className='text-decoration-none text-dark' data-bs-toggle="modal" data-bs-target="#modal_4" aria-controls="modal_4" onClick={() => { handleAddExperience() }} role="button"><IoMdAddCircleOutline /></a>
                            </div>
                            <div className="modal fade " id="modal_4" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
                                <div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable" >
                                    <div className="modal-content border-0 shadow-lg rounded m-3">
                                        <div className="card w-100  border-0  shadow" style={{ height: '600px' }} >
                                            <div className="modal-header d-flex justify-content-between align-items-center">
                                                <p className="modal-title fs-4 fw-bolder mb-3" id="exampleModalToggleLabel">{inputs?._id ? 'Edit Experience' : 'Add Experience'}</p>
                                                <button type="button" ref={modal} className="btn-close bg-white border rounded-5 m-0 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body  ">
                                                <div className='container-fluid'>
                                                    <form className='fw-bolder' onSubmit={handleSaveExperience}>
                                                        <div className=' row row-cols-lg-2 row-cols-1'>

                                                            <div className="mb-3 col">
                                                                <label htmlFor="title" className="form-label text-secondary" >Title<span className="text-danger">*</span></label>
                                                                <input type="text" name="title" value={inputs?.title} onChange={handleExperienceInputs} placeholder='State University' className="form-control" id="title" />
                                                                {experienceErrors.title.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label htmlFor="companyName" className="form-label text-secondary">CompanyName<span className="text-danger">*</span></label>
                                                                <input type="text" name="companyName" value={inputs?.companyName} onChange={handleExperienceInputs} placeholder='Bachelor' className="form-control" id="companyName" />
                                                                {experienceErrors.companyName.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>

                                                            <div className="mb-3 col">
                                                                <label htmlFor="workMode" className="form-label text-secondary">Employement Type<span className="text-danger">*</span></label>
                                                                <select name="workMode" value={inputs?.workMode} onChange={handleExperienceInputs} className="form-select" aria-label="Default select example" id="selectOne">
                                                                    <option selected>Please Select</option>
                                                                    <option value={'fulltime'}>Full-time</option>
                                                                    <option value={'parttime'}>Part-time</option>
                                                                    <option value={'selfemployed'}>Self-employed</option>
                                                                    <option value={'freelance'}>Freelance</option>
                                                                    <option value={'internship'}>Internship</option>
                                                                    <option value={'trainee'}>Trainee</option>
                                                                </select>
                                                                {experienceErrors.workMode.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            {/* <div className='mb-3'>
                                                                <div className="form-check">
                                                                    <input className="form-check-input border" type="checkbox" name="currentlyStudying" onChange={handleEducationInputs} id="flexCheckDefault" />
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                        Currently pursuing
                                                                    </label>
                                                                    {educationErrors.currentlyStudying.required ? <span className="form-text text-danger">
                                                                        This field is required.
                                                                    </span> : null}
                                                                </div>
                                                            </div> */}

                                                            <div className='mb-3 col'>
                                                                <label className="form-label text-secondary">Start Date<span className="text-danger">*</span></label>
                                                                <input type="date" name="startDate" value={inputs?.startDate} onChange={handleExperienceInputs} className="form-control" id="startDate" />
                                                                {experienceErrors.startDate.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className='mb-3 col'>
                                                                <label className="form-label text-secondary">End Date<span className="text-danger">*</span></label>
                                                                <input type="date" name="endDate" value={inputs?.endDate} onChange={handleExperienceInputs} className="form-control" id="endDate" />

                                                                {experienceErrors.endDate.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label htmlFor="location" className="form-label text-secondary">Location<span className="text-danger">*</span></label>
                                                                <input type="text" name="location" value={inputs?.location} onChange={handleExperienceInputs} placeholder='Ex: 100%' className="form-control w-100" id="location" />
                                                                {experienceErrors.location.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className="mb-2 w-100">
                                                                <label htmlFor="skills" className="form-label text-secondary">Skills<span className="text-danger">*</span></label>
                                                                <textarea type="text" name='skills' value={inputs?.skills} onChange={handleExperienceInputs} placeholder='Ex:React,Node,Python etc..' className="form-control w-100" id="skills" />
                                                                {experienceErrors.skills.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer d-flex gap-3 mb-5" >
                                                            <button type="submit" className="btn btn-primary" >{inputs?._id ? 'Update' : 'Save'}</button>
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>






                        </div>
                        {experience?.map((data, index) =>
                            <div key={index} className='card rounded mt-2 px-3 pt-1 '>
                                <div className='container'>
                                    <div className='modal-btn d-flex gap-2 align-items-center justify-content-end'>
                                        <Link onClick={() => handleEditExperience(data)} className="btn  btn-sm btn-light  border-0" data-bs-toggle="modal" data-bs-target="#modal_4" aria-controls="modal_4" type="button"><FiEdit />
                                        </Link>
                                        <Link className="btn  btn-sm btn-light  border-0" onClick={() => openPopup(data?._id)} type="button"><RiDeleteBin5Line />
                                        </Link>
                                    </div>
                                </div>
                                <div className='row row-cols-md-2 row-cols-1'>
                                    <p className='fw-bold '>Title - <span className='fw-lighter'> {data?.title}</span></p>
                                    <p className='fw-bold '>CompanyName - <span className='fw-lighter'> {data?.companyName}</span></p>
                                    <p className='fw-bold '>WorkMode - <span className='fw-lighter'> {data?.workMode}</span></p>
                                    <p className='fw-bold '>location - <span className='fw-lighter'> {data?.location}</span></p>
                                    <p className='fw-bold '>Start Date - <span className='fw-lighter'> {localDate(data?.startDate)}</span></p>
                                    <p className='fw-bold '>End Date - <span className='fw-lighter'> {localDate(data?.endDate)}</span></p>
                                    <p className='fw-bold col-md-12'>Skills - <span className='fw-lighter'> {data?.skills}</span></p>
                                </div>
                            </div>

                        )}
                        {/* Education Modal */}



                    </div>

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

export default Header