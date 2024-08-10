import React, { useEffect, useRef, useState } from 'react';
import '../../../Styles/ProfilePage.css'
import { localDate } from '../../../utils/dateformat';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { MdOutlineDateRange, MdWorkOutline } from 'react-icons/md';
import { getSingleMaster } from '../../../api/master';


const Header = () => {
    
    const location = useLocation()
    const id = new URLSearchParams(location.search).get('id')
    const [inputs, setInputs] = useState({});
    useEffect(() => {
        getProfileDetails ()
    }, [])
  
    const getProfileDetails = () => {
        getSingleMaster(id).then(res => {
        setInputs(res?.data?.result)
      }).catch(err => { console.log(err); })
    }
  
    return (
        <>
            <div className='container p-0' >
                <div className='card  shadow border-0 rounded mt-5 p-4'>
                    <div className=''>
                        <div className='d-flex justify-content-between align-items-start'>
                            <p className='fw-bold'>Education</p>
                            {/* Add Education Modal */}
                            
                            
                        </div>
                        {inputs?.education?.map((education, index) =>
                            <div key={index} className='card rounded mt-2 p-3 '>
                                <div className='row row-cols-1 row-cols-md-2'>
                                        <p className='fw-bold'>Institute:<span className='fw-lighter'> {education?.institute}</span></p>
                                        <p className='fw-bold'>Qualification:<span className='fw-lighter'> {education?.qualification}</span></p>
                                        <p className='fw-bold'>FieldOfStudy:<span className='fw-lighter'> {education?.fieldOfStudy}</span></p>
                                        <p className='fw-bold'>Grade/Percentage:<span className='fw-lighter'> {education?.grade}</span></p>
                                        <p className='fw-bold'>StartDate - <span className='fw-lighter'> {localDate(education?.startDate)}</span></p>
                                        <p className='fw-bold'>EndDate - <span className='fw-lighter'> {localDate(education?.endDate)}</span></p>
                                        <p className='fw-bold col-md-12'>ExtraCurricular:<span className='fw-lighter'> {education?.extraCurricular}</span></p>
                                </div>



                               

                               

                            </div>
                        )}

                    </div>
                </div>
            </div>

        </>
    )
}

export default Header