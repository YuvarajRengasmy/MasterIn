import React, { useEffect,  useState } from 'react'
import { MdEdit, MdOutlineDateRange } from 'react-icons/md'
import { localDate } from '../../../utils/dateformat';
import { getSingleUser} from '../../../api/user';

import {  useLocation } from 'react-router-dom';
import { RiBookmark3Fill, RiBuilding2Fill } from 'react-icons/ri';
import { LiaBookSolid } from 'react-icons/lia';
import { AiOutlineRead } from 'react-icons/ai';
import { LuClipboardList } from 'react-icons/lu';

const UserPeopleEducation = () => {

   

    const location = useLocation()
    const id = new URLSearchParams(location.search).get('id')
    const [education, setEducation] = useState([]) ;
 

    useEffect(() => {
        getUserDetails()
    }, [])


    const getUserDetails = () => {
        // const data = getUserId()
        getSingleUser(id)
            .then((res) => {
                const result = res?.data?.result?.education
                setEducation(result)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className='container'>
                <div>
                    <span style={{ fontSize: "18px", fontWeight: "500" }}>Education</span>
                </div>
                {education?.map((data, index) =>
                    <div key={index} className='container card my-2 px-4 p-2'>
                        <div className='row row-cols-1 row-cols-md-3 mt-2'>
                        <p className='fw-bold text-secondary col'> <RiBuilding2Fill/> Institute  <span className='fw-lighter d-block'> {data?.institute}</span></p>
                            <p className='fw-bold text-secondary col'><LiaBookSolid/> Qualification <span className='fw-lighter d-block'> {data?.qualification}</span></p>
                            <p className='fw-bold text-secondary col'>  <AiOutlineRead/> Field Of Study <span className='fw-lighter d-block'> {data?.fieldOfStudy}</span></p>
                            <p className='fw-bold text-secondary col'> <RiBookmark3Fill/>  Grade/Percentage <span className='fw-lighter d-block'> {data?.grade}</span></p>
                            <p className='fw-bold text-secondary col'><MdOutlineDateRange /> Start Date <span className='fw-lighter d-block'> {localDate(data?.startDate)}</span></p>
                            <p className='fw-bold text-secondary col'><MdOutlineDateRange /> End Date<span className='fw-lighter d-block'> {localDate(data?.endDate)}</span></p>
                            <p className='fw-bold text-secondary col-md-12'> <LuClipboardList/> ExtraCurricular <span className='fw-lighter d-block'> {data?.extraCurricular}</span></p>

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserPeopleEducation