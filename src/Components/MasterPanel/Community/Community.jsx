import React, { useEffect, useState } from 'react';
import '../../../Styles/Community.css';

import { SlUserFollow } from 'react-icons/sl'
import { MdOutlineGroups } from 'react-icons/md';
import { getMasterId } from '../../../utils/Storage';
import { toast } from 'react-toastify';
import { Dialog, DialogContent } from '@mui/material';
import Navbar from '../../../Pages/Navbar';
import { Link } from 'react-router-dom';
import { getFilterMaster, getSingleMaster, updateConnectedUser } from '../../../api/master';
const Community = () => {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState({})
    const [open, setOpen] = useState(false)
    const [connectId, setConnectId] = useState(false)

    useEffect(() => {
        getSingleUserDetails()
        getAllUsers()
    }, [])

    const getAllUsers = () => {
        getFilterMaster('').then(res => {
            setUsers(res?.data?.result?.masterList)
        }).catch(err => { console.log(err); })
    }

    const handleConnecting = () => {
        const data = {
            connectedUsers: connectId,
            _id: getMasterId()
        }
        updateConnectedUser(data).then(res => {
            toast.success(res?.data?.message)
            getSingleUserDetails();
            closePopup()
        }).catch(err => { console.log(err) })
    }

    const getSingleUserDetails = () => {
        const user = getMasterId()
        getSingleMaster(user).then(res => {
            setUserDetails(res?.data?.result)
        }).catch(err => { console.log(err) })
    }

    const openPopup = (user) => {
        setConnectId(user)
        setOpen(true)
    }

    const closePopup = () => {
        setOpen(false)
    }


    return (
        <>
            <div className='scroll-bar' style={{ overflow: 'auto', maxHeight: 'calc(100vh - 50px)' }}>
                <div className='container mb-5' >
                    <Navbar />
                    <div className='container-fluid d-flex flex-column border-start border-end gap-2  bg-white mt-5'>
                        <span className=" w-75  bg-white rounded-2 shadow mt-5 p-3 navbar-brand mb-0 h1 text-center m-auto gap-2"><MdOutlineGroups /> Community</span>
                        <div className='row gap-lg-2 gap-md-2 gap-2 p-0 mt-5 d-flex justify-content-center'>
                            {users?.map((data, index) =>
                                <div key={index} className='col-lg-3 col-md-5 col-11 col-sm-6 '>
                                    <div className="card  rounded-4  community" >
                                        <div className=" ">
                                            {/* Banner Image */}
                                            <img src={data?.backgroundImage ?data?.backgroundImage: 'https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/Ui.jpeg'} className="card-img-top img-fluid rounded-top-4" alt="bannerImage" style={{ maxHeight: '3.5rem', objectFit: 'cover' }} />
                                            {/* Profile Image */}
                                            <div className="position-absolute top-55 start-50 translate-middle">
                                                <img src={data?.image ?data?.image :'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} className="rounded-circle img-fluid" alt="profileImage" style={{ width: '3.5rem', height:'3.5rem', objectFit: 'cover' }} />
                                            </div>
                                        </div>

                                        <div className="card-body mt-5 text-center">
                                            <h5 className="card-title fs-6"><Link to={{ pathname: '/PeopleProfile', search: `?id=${data?._id}` }} className='text-decoration-none text-dark small'>{data?.name}</Link></h5>
                                            <p className="card-text border-0 ">{data?.category?.category} </p>
                                            <img src='https://pixaliveplatforms.com/assets/images/logo.svg' className='img-fluid' alt="logo" style={{ width: '6rem' }} />
                                            <div className='mt-2 connect-btn'>
                                                {userDetails?.connectedUsers?.includes(data?._id) ? <button id='btn-2' className='btn  bg-success p-1 border-white rounded-5 text-white d-flex justify-content-center align-items-center w-100 ' onClick={()=>openPopup(data?._id)}><SlUserFollow /> Connected</button> :
                                                    <button id='btn-1' className='btn  bg-white p-1 border-primary rounded-5 text-primary d-flex justify-content-center align-items-center w-100 ' onClick={()=>openPopup(data?._id)}><SlUserFollow /> Connect</button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                        </div>
                    </div>

                </div>
            </div>
            <Dialog open={open}>
                <DialogContent>
                    <div className="text-center m-4">
                        {userDetails.connectedUsers?.includes(connectId) ? <h5 className="mb-4">Are you sure you want to Remove <br /> the Connected User ?</h5> :
                            <h5 className="mb-4">Are you sure you want to Connect <br /> the selected User ?</h5>}
                        <button type="button" className="btn btn-primary mx-3" onClick={handleConnecting}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default Community;