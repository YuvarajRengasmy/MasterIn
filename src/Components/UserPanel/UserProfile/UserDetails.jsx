import { CiLinkedin } from 'react-icons/ci'
import { RiCoinsFill } from 'react-icons/ri'
import { SiGnuprivacyguard } from 'react-icons/si'
import { Link } from 'react-router-dom'
import UserProfileEdit from './UserProfileEdit'
import React, { useEffect, useState } from 'react'

import { getUserId } from '../../../utils/Storage';

import { getSingleUser } from '../../../api/user';
const UserDetails = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        const data = getUserId()
        getSingleUser(data)
            .then((res) => {
                const result = res?.data?.result
                setUser(result)
            })
            .catch((err) => {
                console.log(err);
            });
    }
  
    return (
        <div className='container'>
            <div className='card shadow border-0 p-3'>
                <UserProfileEdit user={user} getUserDetails={getUserDetails}  />
                <div className="mb-2 ">
                            {/* Banner Image */}
                            <img src={user?.backgroundImage ? user?.backgroundImage : 'https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/empty-banner.svg'} className="card-img-top img-fluid rounded-top-2" alt="bannerImage" style={{ maxHeight: '6rem', objectFit: 'cover' }} />

                            {/* Profile Image */}
                            <div className="position-absolute top-55 start-50 translate-middle">
                            <img src={user?.image ? user?.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="rounded-circle img-fluid mx-auto" alt="profileImage" style={{ width: '7rem', height: '7rem', objectFit: 'cover' }} />
                            </div>
                        </div>
                <span className='text-center mt-5' style={{ fontSize: "25px", fontWeight: "500" }}>{user?.name}</span>
                <p className='text-center text-secondary mt-2'>{user?.description}</p>
                <div className='card shadow border-1 rounded p-3 mt-3 mb-3'>
                    <span className='text-secondary fw-bolder d-flex align-items-center justify-content-center gap-2 text-uppercase'>Available Coins: <span><RiCoinsFill className='text-warning fs-4' /> {user?.coins}</span> </span>
                </div>
                <div>
                    <span className='text-secondary fw-bolder'>SOCIAL LINKS</span>
                    <div className='d-flex align-items-center gap-2 mt-2'>
                        <Link to={user?.link}  className='text-decoration-none d-flex align-items-center text-secondary' style={{ fontSize: "12px" }}><CiLinkedin className='fs-4 text-dark '/> {user?.link}</Link>
                        {/* <Link to=''><VscGithub className='fs-4 text-dark' /></Link> */}
                    </div>
                </div>
                <div className='card border-0 p-2 mt-3' style={{ backgroundColor: "#f1f1f4" }}>
                    <div className='card-body'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <span className='fs-5' style={{ fontWeight: "500" }}>Private Info</span>
                            <small class="badge bg-white rounded-5 text-secondary p-2"><SiGnuprivacyguard className='text-dark' /> only visible to you</small>
                        </div>
                        <div className=''>
                            <p className='text-secondary mt-2'>Mobile:- {user?.mobile}</p>
                            <p className='text-secondary mt-2'>Email:- {user?.email}</p>
                            <p className='text-secondary mt-2'>Position:- {user?.position}</p>
                            <p className='text-secondary mt-2'>Location:- {user?.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;