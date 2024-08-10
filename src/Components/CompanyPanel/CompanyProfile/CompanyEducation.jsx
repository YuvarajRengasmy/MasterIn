import { MdEdit, MdOutlineDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { AiFillDelete, AiFillPlusCircle, AiOutlineRead } from 'react-icons/ai'
import { IconButton, Tooltip } from '@mui/material'
import { RiBookmark3Fill, RiBuilding2Fill } from 'react-icons/ri';
import { LiaBookSolid } from 'react-icons/lia';
import { LuClipboardList } from 'react-icons/lu';

const CompanyEducation = () => {


    return (
        <>
            <div className='container'>
                <div>
                    <span style={{ fontSize: "18px", fontWeight: "500" }}>Education</span> <Tooltip title="Add Education"><IconButton data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptionsThree" aria-controls="offcanvasWithBothOptionsThree">  <AiFillPlusCircle size={20} /></IconButton> </Tooltip>
                </div>
               
                    <div  className='container card my-2 px-4'>
                        <div className='d-flex align-items-center mt-1 gap-3 justify-content-end '>
                            <Link  className="btn  btn-sm btn-light  border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptionsThree" aria-controls="offcanvasWithBothOptionsThree">
                                <MdEdit />
                            </Link>
                            <Link className="btn  btn-sm btn-light  border-0" type="button"><AiFillDelete />
                            </Link>
                        </div>
                        <div className='row row-cols-3'>
                            <p className='fw-bold text-secondary col'> <RiBuilding2Fill/> Institute  <span className='fw-lighter d-block'> Hindustan College Of Arts and Science</span></p>
                            <p className='fw-bold text-secondary col'><LiaBookSolid/> Qualification <span className='fw-lighter d-block'> MSC</span></p>
                            <p className='fw-bold text-secondary col'>  <AiOutlineRead /> Field Of Study <span className='fw-lighter d-block'> Computer Science</span></p>
                            <p className='fw-bold text-secondary col'> <RiBookmark3Fill/>  Grade/Percentage <span className='fw-lighter d-block'> 70%</span></p>
                            <p className='fw-bold text-secondary col'> <LuClipboardList/> ExtraCurricular <span className='fw-lighter d-block'> Music and Books</span></p>
                            <p className='fw-bold text-secondary col'><MdOutlineDateRange /> Start Date <span className='fw-lighter d-block'> 12/12/2019 </span></p>
                            <p className='fw-bold text-secondary col'><MdOutlineDateRange /> End Date<span className='fw-lighter d-block'> 12/12/2021 </span></p>
                        </div>
                    </div>
            </div>



            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptionsThree" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="static">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Edit Education</h5>
                    <button type="button"  className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form className='fw-bolder'>
                        <div className="mt-3">
                            <label htmlFor="institute" className="form-label text-secondary" >Institute<span className="text-danger">*</span></label>
                            <input type="text" name="institute"  placeholder='State University'className="form-control border-top-0 border-end-0 border-start-0" id="institute" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="qualification" className="form-label text-secondary">Qualification<span className="text-danger">*</span></label>
                            <input type="text" name="qualification" placeholder='Bachelor'className="form-control border-top-0 border-end-0 border-start-0" id="qualification" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="fieldOfStudy" className="form-label text-secondary">Field Of Study<span className="text-danger">*</span></label>
                            <input type="text" name="fieldOfStudy" placeholder='Computer Science'className="form-control border-top-0 border-end-0 border-start-0" id="fieldOfStudy" />
                        </div>

                        <div className='mt-3'>
                            <label className="form-label text-secondary">Start Date<span className="text-danger">*</span></label>
                            <input type="date" name="startDate" className="form-control border-top-0 border-end-0 border-start-0" id="startDate" />
                            <br />
                            <label className="form-label text-secondary">End Date<span className="text-danger">*</span></label>
                            <input type="date" name="endDate" className="form-control border-top-0 border-end-0 border-start-0" id="endDate" />
                        </div>


                        <div className="mt-3">
                            <label htmlFor="grade" className="form-label text-secondary">Grade<span className="text-danger">*</span></label>
                            <input type="text" name="grade" placeholder='Ex: 100%' className="form-control w-100 border-top-0 border-end-0 border-start-0" id="grade" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="Extracurricular" className="form-label text-secondary">ExtraCurricular<span className="text-danger">*</span></label>
                            <input type="text" name='extraCurricular' placeholder='Ex: Sports, Music, Dance etc..' className="form-control w-100 border-top-0 border-end-0 border-start-0" id="Extracurricular" />
                        </div>
                        <div className="mt-5 mb-3 d-flex flex-wrap justify-content-end gap-2 align-items-center">
                        <button type='submit' className='btn btn-primary' >Save</button>
                            <button className='btn btn-outline-danger' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CompanyEducation