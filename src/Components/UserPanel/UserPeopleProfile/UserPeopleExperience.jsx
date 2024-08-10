import React, { useEffect,  useState } from 'react'
import { SlLocationPin } from 'react-icons/sl'
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { MdOutlineDateRange, MdOutlineWorkOutline } from 'react-icons/md'
import { localDate } from '../../../utils/dateformat';
import { getSingleUser} from '../../../api/user';

import {  useLocation } from 'react-router-dom';
import { AiOutlineGlobal, AiOutlineRead } from 'react-icons/ai';
import { IoMdClock } from 'react-icons/io';

const UserPeopleExperience = () => {

    const location = useLocation()
    const id = new URLSearchParams(location.search).get('id')
    const [experience, setExperience] = useState([]) ;
 

    useEffect(() => {
        getUserDetails()
    }, [])


    const getUserDetails = () => {
        // const data = getUserId()
        getSingleUser(id)
            .then((res) => {
                const result = res?.data?.result?.experience
                setExperience(result)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <div className='container'>
                <div className='mt-4'>
                    <span style={{ fontSize: "18px", fontWeight: "500" }}>Experience</span>
                </div>
                {experience?.map((data, index) =>
                <div className='container card my-2 px-4 p-2'>
               
                    <div  key={index} className='row row-cols-1 row-cols-md-3 mt-2'>
                    <p className='text-secondary fw-bold  '>
                                <MdOutlineWorkOutline /> Title <span className='fw-lighter d-block'>{data?.title}</span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <HiOutlineBuildingOffice /> Company Name <span className='fw-lighter d-block'> {data?.companyName} </span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <SlLocationPin /> Location <span className='fw-lighter d-block'> {data?.location} </span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <IoMdClock /> Work Mode <span className='fw-lighter d-block'> {data?.workMode} </span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <MdOutlineDateRange /> Start Date <span className='fw-lighter d-block'> {data?.startDate} </span>
                            </p>
                            <p className='text-secondary fw-bold'>
                                <MdOutlineDateRange /> End Date <span className='fw-lighter d-block'> {data?.endDate} </span>
                            </p>
                            <p className='text-secondary fw-bold '>
                                <AiOutlineGlobal /> Currently Working <span className='fw-lighter d-block'> {data?.currentlyWorking ? 'Yes' : 'No'} </span>
                            </p>
                            <p className='text-secondary fw-bold col-md-8'>
                                <AiOutlineRead /> Skills <span className='fw-lighter d-block'> {data?.skills} </span>
                            </p>

                    </div>

                </div>
                                )}
            </div>
        </>
    )
}

export default UserPeopleExperience