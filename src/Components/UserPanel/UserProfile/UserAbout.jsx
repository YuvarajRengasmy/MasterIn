import React, { useEffect, useState } from 'react'
import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { SlLocationPin } from 'react-icons/sl'
import { getUserId } from '../../../utils/Storage'
import { getSingleUser } from '../../../api/user'

const UserAbout = () => {

    const [inputs, setInputs] = useState();

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        const data = getUserId()
        getSingleUser(data)
            .then((res) => {
                const result = res?.data?.result
                console.log(result)
                setInputs({ ...inputs, ...result });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <div className='container mt-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <span style={{ fontSize: "18px", fontWeight: "500" }}>About</span>
                </div>
                <div className='mt-3'> 
                    <p className='text-secondary mt-2'>
                        {inputs?.description}
                    </p>
                    <p className='text-secondary mt-1 d-flex align-items-center gap-2'>
                        <HiOutlineBuildingOffice /> Pixalive
                    </p>
                    <p className='text-secondary mt-1 d-flex align-items-center gap-2'>
                        <SlLocationPin /> {inputs?.location}
                    </p>
                </div>
            </div>
        </>
    )
}

export default UserAbout