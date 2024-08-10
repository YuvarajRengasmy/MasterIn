import React, { useEffect, useState } from 'react';
import '../../../Styles/ProfilePage.css'
import { localDate } from '../../../utils/dateformat';
import { MdWorkOutline } from 'react-icons/md';
import { ImOffice } from 'react-icons/im';
import { MdOutlineDateRange } from 'react-icons/md';
import { LiaIndustrySolid } from 'react-icons/lia';
import { IoLocationSharp } from 'react-icons/io5';
import { GiSkills } from 'react-icons/gi';
import { SlLocationPin } from 'react-icons/sl'
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { IoMdClock } from 'react-icons/io'
const MasterPeopleExpericence = ({ experience }) => {

    return (
        <>
            <div className='container p-0' >


                <div className='card  shadow border-0 rounded mt-5 p-4'>
                    <div className=''>
                        <div className='d-flex justify-content-between align-items-start'>
                            <p className='fw-bold'>Experience</p>

                            <div className="modal fade " id="exampleModalToggleThree" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1" >
                                <div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable" >
                                    <div className="modal-content border-0 shadow-lg rounded m-3">

                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* { edit experiences. */}
                        {experience?.map((experience, index) =>
                            <div key={index} className='card rounded mt-2 p-3 '>

                                <div className='row row-cols-1 row-cols-md-2'>
                                    <p className='fw-bold'><MdWorkOutline /> Postion - <span className='fw-lighter'> {experience?.title}</span></p>
                                    <p className='fw-bold'> <HiOutlineBuildingOffice /> Company Name - <span className='fw-lighter' > {experience?.companyName}</span></p>
                                    <p className='fw-bold'> <SlLocationPin /> Location  - <span className='fw-lighter'> {experience?.location}</span></p>
                                    <p className='fw-bold'> <IoMdClock /> Work Mode -<span className='fw-lighter '> {experience?.workMode}</span></p>
                                    <p className='fw-bold'><MdOutlineDateRange /> Start Date - <span className='fw-lighter '> {localDate(experience?.startDate)}</span></p>
                                    <p className='fw-bold'><MdOutlineDateRange /> End Date - <span className='fw-lighter'> {localDate(experience?.endDate)}</span></p>
                                    <p className='fw-bold col-md-12'><GiSkills /> Skills <span className='fw-lighter '> - {experience?.skills}</span></p>

                                </div>
                            </div>
                        )}

            </div>

        </div >
            </div >

        </>
    )
}

export default MasterPeopleExpericence