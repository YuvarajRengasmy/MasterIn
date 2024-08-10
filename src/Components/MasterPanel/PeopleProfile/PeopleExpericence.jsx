import React, { useEffect,  useState } from 'react';
import '../../../Styles/ProfilePage.css'
import { localDate } from '../../../utils/dateformat';
import { useLocation } from 'react-router-dom';
import { getSingleMaster } from '../../../api/master';

const Header = () => {


    const location = useLocation()
    const id = new URLSearchParams(location.search).get('id')
    const [inputs, setInputs] = useState({});
    useEffect(() => {
        getProfileDetails()
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
                            <p className='fw-bold'>Experience</p>

                            <div className="modal fade " id="exampleModalToggleThree" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1" >
                                <div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable" >
                                    <div className="modal-content border-0 shadow-lg rounded m-3">

                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* { edit experiences. */}
                        {inputs?.experience?.map((experience, index) =>
                            <div key={index} className='card rounded mt-2 p-3 '>
                                    <div className='row row-cols-1 row-cols-md-2 '>
                                        <p className='fw-bold'>Postion - <span className='fw-lighter'> {experience?.title}</span></p>
                                        <p className='fw-bold'>CompanyName - <span className='fw-lighter'> {experience?.companyName}</span></p>
                                        <p className='fw-bold'>Location - <span className='fw-lighter'> {experience?.location}</span></p>
                                        <p className='fw-bold'>WorkMode -<span className='fw-lighter'> {experience?.workMode}</span></p>
                                        <p className='fw-bold'>StartDate - <span className='fw-lighter'> {localDate(experience?.startDate)}</span></p>
                                        <p className='fw-bold'>EndDate - <span className='fw-lighter'> {localDate(experience?.endDate)}</span></p>
                                        <p className='fw-bold col-md-12'>Skills <span className='fw-lighter'> - {experience?.skills}</span></p>
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