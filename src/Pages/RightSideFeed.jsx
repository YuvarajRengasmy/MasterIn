import React, { useEffect, useState } from 'react';
import '../Styles/RightSideFeed.css';
import { Link } from 'react-router-dom'
import { AiFillEye } from 'react-icons/ai';
import { getMasterId } from '../utils/Storage';
import { getFilterBookSession } from '../api/bookSession';
import { localDate } from '../utils/dateformat';
const RightSideFeed = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        getBookSessionList()
    }, [])

    const getBookSessionList = () => {
        const data = { master: getMasterId() }
        getFilterBookSession(data).then(res => {
            const result = res?.data?.result?.bookSessionList
            const session = result?.map(x=>{
               x.time= new Date(x?.time).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  });
                  return x
            })
            setUser(session)
        }).catch(err => console.log(err))
    }

    return (
        <>
            <div className=' right-side border-end scroll-bar mt-5' style={{ maxHeight: 'calc(100vh - 50px)', marginLeft: '-10px' }}>
                <div className='sidemenu overflow-scroll menu_bottom' >
                    <p className='mt-3 p-2'>Session Booking Peoples</p>
                    {user?.map((data, index) =>
                        <div className='row align-items-start mb-2 ' key={index}>
                            <div className='col-lg-2 pe-0 '>
                                <img className='img-fluid rounded-circle' src={data?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ height: '2.5rem', width: '2.5rem', objectFit: 'cover' }} />
                            </div>
                            <div className='col-lg-7'>
                                <span className='fw-bolder'><Link className='text-decoration-none text-dark small' to={{pathname:'/ViewAppointment', search:`?id=${data?._id}`}}>{data?.user?.name}</Link></span><br />
                                <small className='text-secondary'>{localDate(data?.date)}</small>
                                <small className='text-secondary'>{' - '+data?.time}</small>
                            </div>
                            <div className='col-lg-3'>
                                <Link type='button' className='btn btn-success btn-sm p-1 d-flex align-items-center rounded-5 gap-1 ' to={{pathname:'/ViewAppointment', search:`?id=${data?._id}`}} ><AiFillEye/> View</Link>
                            </div>
                        </div>)}
                </div>

            </div>

        </>
    )
}

export default RightSideFeed;