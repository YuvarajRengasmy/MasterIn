import React from 'react';
import '../../../Styles/ProfilePage.css'
import { localDate } from '../../../utils/dateformat';
import { MdOutlineDateRange, MdWorkOutline } from 'react-icons/md';
import { getSingleMaster } from '../../../api/master';
import { RiBookmark3Fill, RiBuilding2Fill } from 'react-icons/ri';
import { LiaBookSolid } from 'react-icons/lia';
import { LuClipboardList } from 'react-icons/lu';
import { AiOutlineRead } from 'react-icons/ai'


const MasterPeopleEducation = ({education}) => {
  
    return (
        <>


            <div className='container p-0' >
                <div className='card  shadow border-0 rounded mt-5 p-4'>
                    <div className=''>
                        <div className='d-flex justify-content-between align-items-start'>
                            <p className='fw-bold'>Education</p>
                            {/* Add Education Modal */}
                            
                            
                        </div>
                        {education?.map((education, index) =>
                            <div key={index} className='card rounded mt-2 p-3 '>
                                <div className='row row-cols-1 row-cols-md-2'>
                                        <p className='fw-bold'> <RiBuilding2Fill/> Institute -<span className='fw-lighter'> {education?.institute}</span></p>
                                        <p className='fw-bold'><LiaBookSolid/> Qualification -<span className='fw-lighter'> {education?.qualification}</span></p>
                                        <p className='fw-bold'><AiOutlineRead /> Field Of Study -<span className='fw-lighter'> {education?.fieldOfStudy}</span></p>
                                        <p className='fw-bold'><RiBookmark3Fill/>  Grade/Percentage -<span className='fw-lighter'> {education?.grade}</span></p>
                                        <p className='fw-bold'><MdOutlineDateRange /> StartDate - <span className='fw-lighter'> {localDate(education?.startDate)}</span></p>
                                        <p className='fw-bold'><MdOutlineDateRange /> End Date - <span className='fw-lighter'> {localDate(education?.endDate)}</span></p>
                                        <p className='fw-bold col-md-12'> <LuClipboardList/> ExtraCurricular -<span className='fw-lighter'> {education?.extraCurricular}</span></p>
                                </div>



                               

                               

                            </div>
                        )}

                    </div>
                </div>
            </div>

        </>
    )
}

export default MasterPeopleEducation