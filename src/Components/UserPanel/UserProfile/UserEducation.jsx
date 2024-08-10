import React, { useEffect, useRef, useState } from 'react'
import { MdEdit, MdOutlineDateRange } from 'react-icons/md'
import { localDate } from '../../../utils/dateformat';
import { getUserId } from '../../../utils/Storage'
import { deleteEducation, getSingleUser, updateEducation, updateUser } from '../../../api/user'
import { Link } from 'react-router-dom'
import { AiFillDelete, AiFillPlusCircle, AiOutlineRead } from 'react-icons/ai'
import { Dialog, DialogContent, IconButton, Tooltip } from '@mui/material'
import { toast } from 'react-toastify'
import { RiBookmark3Fill, RiBuilding2Fill } from 'react-icons/ri';
import { LiaBookSolid } from 'react-icons/lia';
import { LuClipboardList } from 'react-icons/lu';

const UserEducation = () => {

    let initialState = {
        institute:'',
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

    const [inputs, setInputs] = useState(initialState);
    const [education, setEducation] = useState([]);
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
                const result = res?.data?.result?.education
                setEducation(result)
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
                const data = {
                     _id: getUserId(),
                     education: inputs 
                    }
                updateEducation(data)
                .then(res => {
                    toast.success(res?.data?.message)
                    getUserDetails()
                    offcanvas.current.click()
                }).catch(err => console.log(err))
            }
            else {
                const data = {
                    _id: getUserId(),
                    education: inputs
                }
                updateUser(data).then(res => {
                    toast.success('Successfully Add Education')
                    getUserDetails()
                    offcanvas.current.click()
                }).catch(err => console.log(err))
            }
        }
    }

    const handleEditEducation = (data) => {
        setInputs(data)
        setSubmitted(false)
        setErrors(initialStateErrors)
    }

    const handleAddEducation = () => {
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
        const data = { _id: getUserId(), educationId: deleteId }
        deleteEducation(data).then(res => {
            toast.success(res?.data?.message)
            getUserDetails();
            closePopup()
        }).catch(err => console.log(err))
    }

    return (
        <>
            <div className='container'>
                <div>
                    <span style={{ fontSize: "18px", fontWeight: "500" }}>Education</span> <Tooltip title="Add Education"><IconButton onClick={() => { handleAddEducation() }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptionsThree" aria-controls="offcanvasWithBothOptionsThree">  <AiFillPlusCircle size={20} /></IconButton> </Tooltip>
                </div>
                {education?.map((data, index) =>
                    <div key={index} className='container card my-2 px-4'>
                        <div className='d-flex align-items-center mt-1 gap-3 justify-content-end '>
                            <Link onClick={() => handleEditEducation(data)} className="btn  btn-sm btn-light  border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptionsThree" aria-controls="offcanvasWithBothOptionsThree">
                                <MdEdit />
                            </Link>
                            <Link className="btn  btn-sm btn-light  border-0" onClick={() => openPopup(data?._id)} type="button"><AiFillDelete />
                            </Link>
                        </div>
                        <div className='row row-cols-1 row-cols-md-3'>
                            <p className='fw-bold text-secondary col'> <RiBuilding2Fill/> Institute  <span className='fw-lighter d-block'> {data?.institute}</span></p>
                            <p className='fw-bold text-secondary col'><LiaBookSolid/> Qualification <span className='fw-lighter d-block'> {data?.qualification}</span></p>
                            <p className='fw-bold text-secondary col'>  <AiOutlineRead /> Field Of Study <span className='fw-lighter d-block'> {data?.fieldOfStudy}</span></p>
                            <p className='fw-bold text-secondary col'> <RiBookmark3Fill/>  Grade/Percentage <span className='fw-lighter d-block'> {data?.grade}</span></p>
                            <p className='fw-bold text-secondary col'><MdOutlineDateRange /> Start Date <span className='fw-lighter d-block'> {localDate(data?.startDate)}</span></p>
                            <p className='fw-bold text-secondary col'><MdOutlineDateRange /> End Date<span className='fw-lighter d-block'> {localDate(data?.endDate)}</span></p>
                            <p className='fw-bold text-secondary col-md-12'> <LuClipboardList/> ExtraCurricular <span className='fw-lighter d-block'> {data?.extraCurricular}</span></p>

                        </div>
                    </div>
                )}
            </div>



            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptionsThree" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="static">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">{inputs?._id ? 'Edit Education' : 'Add Education'}</h5>
                    <button type="button" ref={offcanvas} className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form className='fw-bolder' onSubmit={handleSubmit} >
                        <div className="mt-3">
                            <label htmlFor="institute" className="form-label text-secondary" >Institute<span className="text-danger">*</span></label>
                            <input type="text" name="institute" value={inputs?.institute} placeholder='State University' onChange={handleInputs} className="form-control border-top-0 border-end-0 border-start-0" id="institute" />
                            {errors.institute.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="qualification" className="form-label text-secondary">Qualification<span className="text-danger">*</span></label>
                            <input type="text" name="qualification" placeholder='Bachelor' value={inputs?.qualification} onChange={handleInputs} className="form-control border-top-0 border-end-0 border-start-0" id="qualification" />
                            {errors.qualification.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="fieldOfStudy" className="form-label text-secondary">Field Of Study<span className="text-danger">*</span></label>
                            <input type="text" name="fieldOfStudy" placeholder='Computer Science' value={inputs?.fieldOfStudy} onChange={handleInputs} className="form-control border-top-0 border-end-0 border-start-0" id="fieldOfStudy" />
                            {errors.fieldOfStudy.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>

                        <div className='mt-3'>
                            <label className="form-label text-secondary">Start Date<span className="text-danger">*</span></label>
                            <input type="date" name="startDate" value={inputs?.startDate} onChange={handleInputs} className="form-control border-top-0 border-end-0 border-start-0" id="startDate" />
                            {errors.startDate.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                            <br />
                            <label className="form-label text-secondary">End Date<span className="text-danger">*</span></label>
                            <input type="date" name="endDate" value={inputs?.endDate} onChange={handleInputs} className="form-control border-top-0 border-end-0 border-start-0" id="endDate" />

                            {errors.endDate.required ? <span className="form-text text-danger">
                                This field is required.
                            </span> : null}
                        </div>


                        <div className="mt-3">
                            <label htmlFor="grade" className="form-label text-secondary">Grade<span className="text-danger">*</span></label>
                            <input type="text" name="grade" placeholder='Ex: 100%' value={inputs?.grade} onChange={handleInputs} className="form-control w-100 border-top-0 border-end-0 border-start-0" id="grade" />
                            {errors.grade.required ? <span className='form-text text-danger'>
                                This field is required.
                            </span> : null}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="Extracurricular" className="form-label text-secondary">ExtraCurricular<span className="text-danger">*</span></label>
                            <input type="text" name='extraCurricular' value={inputs?.extraCurricular} placeholder='Ex: Sports, Music, Dance etc..' onChange={handleInputs} className="form-control w-100 border-top-0 border-end-0 border-start-0" id="Extracurricular" />
                            {errors.extraCurricular.required ? <span className='form-text text-danger'>
                                This field is required.
                            </span> : null}
                        </div>
                        <div className="mt-5 mb-3 d-flex flex-wrap justify-content-end gap-2 align-items-center">
                        <button type='submit' className='btn btn-primary' >{inputs?._id ? 'Update' : 'Save'}</button>
                            <button className='btn btn-outline-danger' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </div>
                    </form>
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

export default UserEducation