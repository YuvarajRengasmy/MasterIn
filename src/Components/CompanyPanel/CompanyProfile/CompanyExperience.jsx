import { SlLocationPin } from 'react-icons/sl'
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { MdEdit, MdOutlineDateRange, MdOutlineWorkOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { AiFillDelete, AiFillPlusCircle, AiOutlineGlobal, AiOutlineRead } from 'react-icons/ai'
import { IconButton, Tooltip } from '@mui/material'
import { IoMdClock } from 'react-icons/io'

const CompanyExperience = () => {

    return (
        <>
            <div className='container'>
                <div className='mt-4'>
                    <span style={{ fontSize: "18px", fontWeight: "500" }}>Experience</span><Tooltip title="Add Experience"> <IconButton  data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptionsTwo" aria-controls="offcanvasWithBothOptionsTwo"> <AiFillPlusCircle size={20} /></IconButton> </Tooltip>
                </div>
               
                    <div className='container card my-2 px-4'>
                        <div className='d-flex align-items-center mt-1 gap-3 justify-content-end '>
                            <Link className="btn btn-sm btn-light  border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptionsTwo" aria-controls="offcanvasWithBothOptionsTwo">
                                <MdEdit />
                            </Link>
                            <Link className="btn  btn-sm btn-light  border-0" type="button"><AiFillDelete />
                            </Link>
                        </div>
                        <div className='row row-cols-3'>
                            <p className='text-secondary fw-bold  '>
                                <MdOutlineWorkOutline /> Title <span className='fw-lighter d-block'>Developer</span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <HiOutlineBuildingOffice /> Company Name <span className='fw-lighter d-block'>Pixalive</span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <SlLocationPin /> Location <span className='fw-lighter d-block'>Banglore</span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <IoMdClock /> Work Mode <span className='fw-lighter d-block'>Office</span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <MdOutlineDateRange /> Start Date <span className='fw-lighter d-block'> 12/12/2019 </span>
                            </p>
                            <p className='text-secondary fw-bold'>
                                <MdOutlineDateRange /> End Date <span className='fw-lighter d-block'> 12/12/2021</span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <AiOutlineGlobal /> Currently Working <span className='fw-lighter d-block'> Yes</span>
                            </p>
                            <p className='text-secondary fw-bold'>
                                <AiOutlineRead /> Skills <span className='fw-lighter d-block'> React, Node , MongoDB, Express</span>
                            </p>
                        </div>
                    </div>
            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptionsTwo" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="static" >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Edit Experience</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div className="mt-3">
                            <label htmlFor="title" className="form-label text-secondary" >Title<span className="text-danger">*</span></label>
                            <input type="text" name="title" placeholder='Ex: React Developer' className="form-control border-top-0 border-end-0 border-start-0" id="title" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="selectOne" className="form-label text-secondary">Employement Type<span className="text-danger">*</span></label>
                            <select name="workMode" className="form-select border-top-0 border-end-0 border-start-0" aria-label="Default select example" id="selectOne">
                                <option selected>Please Select</option>
                                <option value={'fulltime'}>Full-time</option>
                                <option value={'parttime'}>Part-time</option>
                                <option value={'selfemployed'}>Self-employed</option>
                                <option value={'freelance'}>Freelance</option>
                                <option value={'internship'}>Internship</option>
                                <option value={'trainee'}>Trainee</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="companyName" className="form-label text-secondary">Company Name<span className="text-danger">*</span></label>
                            <input type="text" placeholder='Ex: Microsoft'name="companyName" className="form-control border-top-0 border-end-0 border-start-0" id="companyName" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="location" className="form-label text-secondary">Location<span className="text-danger">*</span></label>
                            <input type="text" placeholder='Ex: Banglore' name="location" className="form-control border-top-0 border-end-0 border-start-0" id="location" />
                        </div>

                        <div className='mt-3'>
                            <label className="form-label text-secondary">Start date<span className="text-danger">*</span></label>
                            <input type="date" name="startDate" className="form-control border-top-0 border-end-0 border-start-0" id="startDate" />
                        </div>

                        <div className="mt-3">
                            <label className="form-label text-secondary">End date<span className="text-danger">*</span></label>
                            <input type="date" name="endDate" className="form-control border-top-0 border-end-0 border-start-0" id="endDate" />
                        </div>

                        <div className='mt-3'>
                            <div className="form-check">
                                <input className="form-check-input border" name="currentlyWorking" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" name="currentlyWorking" for="flexCheckDefault">
                                    I am currently working in this role
                                </label>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="skills" className="form-label text-secondary">Skills<span className="text-danger">*</span></label>
                            <input type="text" name="skills" placeholder='Ex: ReactJs, NodeJs, etc...' className="form-control w-100 border-top-0 border-end-0 border-start-0" id="skills" />
                        </div>

                        <div className="mt-5 mb-3 d-flex flex-wrap justify-content-end gap-2 align-items-center">
                            <button className='btn btn-primary' type='submit'>Save</button>
                            <button className='btn btn-outline-danger' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CompanyExperience