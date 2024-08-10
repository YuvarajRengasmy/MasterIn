import React, { useEffect, useState, useRef } from 'react';
import '../../../Styles/ProfilePage.css'
import { localDate } from '../../../utils/dateformat';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FiEdit, } from 'react-icons/fi';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdOutlineDateRange, MdWorkOutline } from 'react-icons/md';
import { getSingleMaster, updateEducation, updateMaster, deleteEducation } from '../../../api/master';
import { getMasterId } from '../../../utils/Storage';
import { Dialog, DialogContent, IconButton, Tooltip } from '@mui/material'

import { AiFillDelete, AiFillPlusCircle, AiOutlineRead } from 'react-icons/ai'


const Header = () => {


    let initialStateEducation = {
        institute: '',
        qualification: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        grade: '',
        extraCurricular: '',
    }
    let initialStateEducationErrors = {
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

    const [inputs, setInputs] = useState(initialStateEducation);
    const [education, setEducation] = useState([]);
    const [educationErrors, setEducationErrors] = useState(initialStateEducationErrors);
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
                const result = res?.data?.result?.education
                setEducation(result)
            })
            .catch((err) => {
                console.log(err);
            });
    }



    const handleEducationInputs = (event) => {
        setInputs({ ...inputs, [event?.target?.name]: event?.target?.value })
        if (submitted) {
            const newError = handleEducationValidation({ ...inputs, [event.target.name]: event.target.value })
            setEducationErrors(newError)
        }
    }

    const handleEducationValidation = (data) => {
        let error = initialStateEducationErrors;
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


    const handleSaveEducation = (event) => {
        event.preventDefault();
        const newErrorEducation = handleEducationValidation(inputs)
        setEducationErrors(newErrorEducation)
        setSubmitted(true)
        if (handleEducationErrors(newErrorEducation)) {
            if (inputs?._id) {
                const data = {
                    _id: getMasterId(),
                    education: inputs
                }
                updateEducation(data)
                    .then((res) => {
                        toast.success("Successfully Update Education");
                        getUserDetails()
                        modal.current.click()
                    })
                    .catch(err => console.log(err))

            }
            else {
                const data = {
                    _id: getMasterId(),
                    education: inputs
                }
                updateMaster(data)
                    .then((res) => {
                        toast.success("Successfully Add Education");
                        getUserDetails()
                        modal.current.click()
                    })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }

        }
    }

    const handleEditEducation = (data) => {
        setInputs(data)
        setSubmitted(false)
        setEducationErrors(initialStateEducationErrors)
    }

    const handleAddEducation = () => {
        setInputs(initialStateEducation)
        setSubmitted(false)
        setEducationErrors(initialStateEducationErrors)

    }

    const openPopup = (data) => {
        setOpen(true)
        setDeleteId(data)
    }

    const closePopup = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        const data = { _id: getMasterId(), educationId: deleteId }
        deleteEducation(data).then(res => {
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
                            <p className='fw-bold'>Education</p>
                            <div className='modal-btn'>
                                <a className='text-decoration-none text-dark' data-bs-toggle="modal" data-bs-target="#modal_5" aria-controls="modal_5" onClick={() => { handleAddEducation() }} role="button"><IoMdAddCircleOutline /></a>
                            </div>
                            <div className="modal fade " id="modal_5" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" >
                                <div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable" >
                                    <div className="modal-content border-0 shadow-lg rounded m-3">
                                        <div className="card w-100  border-0  shadow" style={{ height: '600px' }} >
                                            <div className="modal-header d-flex justify-content-between align-items-center">
                                                <p className="modal-title fs-4 fw-bolder mb-3" id="exampleModalToggleLabel">{inputs?._id ? 'Edit Education' : 'Add Education'}</p>
                                                <button type="button" ref={modal} className="btn-close bg-white border rounded-5 m-0 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body  ">
                                                <div className='container-fluid'>
                                                    <form className='fw-bolder' onSubmit={handleSaveEducation}>
                                                        <div className=' row row-cols-lg-2 row-cols-1'>
                                                            <div className="mb-3 col">
                                                                <label htmlFor="institute" className="form-label text-secondary" >Institute<span className="text-danger">*</span></label>
                                                                <input type="text" name="institute" value={inputs?.institute} onChange={handleEducationInputs} placeholder='State University' className="form-control" id="institute" />
                                                                {educationErrors.institute.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label htmlFor="qualification" className="form-label text-secondary">Degree<span className="text-danger">*</span></label>
                                                                <input type="text" name="qualification" value={inputs?.qualification} onChange={handleEducationInputs} placeholder='Bachelor' className="form-control" id="qualification" />
                                                                {educationErrors.qualification.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label htmlFor="fieldOfStudy" className="form-label text-secondary">Field of study<span className="text-danger">*</span></label>
                                                                <input type="text" name="fieldOfStudy" value={inputs?.fieldOfStudy} onChange={handleEducationInputs} placeholder='Computer Science' className="form-control" id="fieldOfStudy" />
                                                                {educationErrors.fieldOfStudy.required ? <span className="form-text text-danger">
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
                                                                <input type="date" name="startDate" value={inputs?.startDate} onChange={handleEducationInputs} className="form-control" id="startDate" />
                                                                {educationErrors.startDate.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className='mb-3 col'>
                                                                <label className="form-label text-secondary">End Date<span className="text-danger">*</span></label>
                                                                <input type="date" name="endDate" value={inputs?.endDate} onChange={handleEducationInputs} className="form-control" id="endDate" />

                                                                {educationErrors.endDate.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label htmlFor="grade" className="form-label text-secondary">Grade<span className="text-danger">*</span></label>
                                                                <input type="text" name="grade" value={inputs?.grade} onChange={handleEducationInputs} placeholder='Ex: 100%' className="form-control w-100" id="grade" />
                                                                {educationErrors.grade.required ? <span className="form-text text-danger">
                                                                    This field is required.
                                                                </span> : null}
                                                            </div>



                                                            <div className="mb-2 w-100">
                                                                <label htmlFor="Extracurricular" className="form-label text-secondary">Extracurricular<span className="text-danger">*</span></label>
                                                                <textarea type="text" name='extraCurricular' value={inputs?.extraCurricular} onChange={handleEducationInputs} placeholder='Ex: Sports, Music, Dance etc..' className="form-control w-100" id="Extracurricular" />
                                                                {educationErrors.extraCurricular.required ? <span className="form-text text-danger">
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
                        {education?.map((data, index) =>
                            <div key={index} className='card rounded mt-2 px-3 pt-1 '>
                                <div className='container'>
                                    <div className='modal-btn d-flex gap-2 align-items-center justify-content-end'>
                                        <Link onClick={() => handleEditEducation(data)} className="btn  btn-sm btn-light  border-0" data-bs-toggle="modal" data-bs-target="#modal_5" aria-controls="modal_5" type="button"><FiEdit />
                                        </Link>
                                        <Link className="btn  btn-sm btn-light  border-0" onClick={() => openPopup(data?._id)} type="button"><RiDeleteBin5Line />
                                        </Link>
                                    </div>
                                </div>
                                <div className='row row-cols-md-2 row-cols-1'>
                                        <p className='fw-bold '>Institute - <span className='fw-lighter'> {data?.institute}</span></p>
                                        <p className='fw-bold '>Qualification - <span className='fw-lighter'> {data?.qualification}</span></p>
                                        <p className='fw-bold '>FieldOfStudy - <span className='fw-lighter'> {data?.fieldOfStudy}</span></p>
                                        <p className='fw-bold '>Grade/Percentage - <span className='fw-lighter'> {data?.grade}</span></p>
                                        <p className='fw-bold '>Start Date - <span className='fw-lighter'> {localDate(data?.startDate)}</span></p>
                                        <p className='fw-bold '>End Date - <span className='fw-lighter'> {localDate(data?.endDate)}</span></p>
                                        <p className='fw-bold col-md-12'>ExtraCurricular - <span className='fw-lighter'> {data?.extraCurricular}</span></p>
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
                        <h5 className="mb-4">Are you sure you want to remove <br /> the selected Education Details ?</h5>
                        <button type="button" className="btn btn-primary mx-3" onClick={handleDelete}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default Header;