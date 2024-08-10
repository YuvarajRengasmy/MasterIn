import React, { useEffect,  useState } from 'react'
import { MdEdit, MdOutlineDateRange } from 'react-icons/md'
import { localDate } from '../../../utils/dateformat';
import { Button } from 'bootstrap';


const UserPeopleEducation = () => {

   

 

    return (
        <>
            <div className='container'>
                <div>
                    <span style={{ fontSize: "18px", fontWeight: "500" }}>Job Post</span>
                </div>
              
                    <div  className='container card my-2 px-4 p-2'>
                        <div className='row row-cols-3 mt-2'>
                            <p className='fw-bold text-secondary col'>Role  <span className='fw-lighter d-block'> FrondEnd Developer</span></p>
                            <p className='fw-bold text-secondary col'>Qualification <span className='fw-lighter d-block'> BE</span></p>
                            <p className='fw-bold text-secondary col'>Skills <span className='fw-lighter d-block'> React Js</span></p>
                            <p className='fw-bold text-secondary col'>Experience <span className='fw-lighter d-block'> 5Year</span></p>
                            <p className='fw-bold text-secondary col'>Vaccency <span className='fw-lighter d-block'> 4</span></p>
                            <button className='btn btn-primary'>Apply </button>
                        </div>
                    </div>
             
            </div>
        </>
    )
}

export default UserPeopleEducation