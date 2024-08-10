import React, { useEffect, useState } from 'react';

import { getUserId } from '../utils/Storage';
import { getFilterMaster } from '../api/master';
import { Link } from 'react-router-dom';
import { IoIosPeople } from 'react-icons/io';
import { getSingleUser, updateConnectedUser } from '../api/user';
import { Dialog, DialogContent } from '@mui/material';
import { toast } from 'react-toastify';

const UserLeftSideFeed = () => {
    const [inputs, setInputs] = useState();
    const [master, setMaster] = useState([]);
    const [userDetails, setUserDetails] = useState({})
    const [open, setOpen] = useState(false)
    const [connectId, setConnectId] = useState(false)
    const [connect, setConnect] = useState(false)

    useEffect(() => {
        getUserDetails();
    }, [])

    useEffect(() => {
        getSingleUserDetails()
        getAllMasters()
    }, [])

    const getUserDetails = () => {
        const data = getUserId()
        getSingleUser(data)
            .then((res) => {
                const result = res?.data?.result
                setInputs({ ...inputs, ...result });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const getAllMasters = () => {
        getFilterMaster('').then(res => {
            setMaster(res?.data?.result?.masterList)
        }).catch(err => { console.log(err); })
    }

    const handleConnecting = () => {
        const data = {
            connectedUsers: { user: connectId, modelType: 'Master', isConnect: connect },
            _id: getUserId()
        }
        updateConnectedUser(data).then(res => {
            toast.success(res?.data?.message)
            getSingleUserDetails();
            closePopup()
        }).catch(err => { console.log(err) })
    }

    const getSingleUserDetails = () => {
        const user = getUserId()
        getSingleUser(user).then(res => {
            setUserDetails(res?.data?.result)
        }).catch(err => { console.log(err) })
    }

    const openPopup = (user, connect) => {
        setConnectId(user)
        setOpen(true)
        setConnect(connect)
    }

    const closePopup = () => {
        setOpen(false)
    }


    return (
        <>
            <div className=' container mt-5 d-flex justify-content-center align-items-center ms-3' >
                <div className='sidemenu left-side mt-5' >
                    <div className="card  mt-1 rounded-2 w-100 community mx-auto" >
                        <div className=" ">
                            {/* Banner Image */}
                            <img src={inputs?.backgroundImage ? inputs?.backgroundImage : 'https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/empty-banner.svg'} className="card-img-top img-fluid rounded-top-2" alt="bannerImage" style={{ maxHeight: '5rem', objectFit: 'cover' }} />

                            {/* Profile Image */}
                            <div className="position-absolute top-55 start-50 translate-middle">
                                <img src={inputs?.image ? inputs?.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="rounded-circle img-fluid" alt="profileImage" style={{ width: '5rem', height: '5rem', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="card-body mt-5 text-center">
                            <h5 className="card-title fs-4">{inputs?.name}</h5>
                            <p className="card-text border-0 text-secondary">{inputs?.position ?? null}</p>
                        </div>
                    </div>
                    <div className="card scroll-bar w-100 mt-4 px-2 pb-3" style={{ maxHeight: '300px', minHeight: '300px', overflowY: 'scroll', marginBottom: '150px' }}>
                        <div className='mt-2 p-2 sticky-top bg-white text-center border-1 border-bottom'>Master</div>
                        {master?.map((data, index) =>
                            <div key={index} className='align-items-center d-flex gap-2 mb-2 mt-2'>
                                <img className='img-fluid rounded-circle' src={data?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ height: '2.5rem', width: '2.5rem', objectFit: 'cover' }} />
                                <div className='flex-grow-1'>
                                    <span className='fw-bolder'><Link className='text-decoration-none text-dark small' to={{pathname:'/MasterProfile',search:`?id=${data?._id}`}}>{data?.name}</Link></span><br />
                                    <small className='text-secondary'>{data?.postition ?? null}</small>
                                </div>
                                {userDetails?.connectedUsers?.some(x => x?.user === data?._id) ?
                                    (userDetails?.connectedUsers?.some(x => x?.user === data?._id && x?.isConnect === true) ?
                                        <button className='btn btn-success btn-sm p-1 px-2 d-flex align-items-center rounded-5 justify-content-center gap-2' onClick={() => openPopup(data?._id, data?.isPublic)}><IoIosPeople /> Connected</button> :
                                        <button className='btn btn-secondary btn-sm p-1 px-2 d-flex align-items-center rounded-5 justify-content-center gap-2' onClick={() => openPopup(data?._id, data?.isPublic)}><IoIosPeople /> Request</button>) :
                                    <button className='btn btn-primary btn-sm  px-3 d-flex align-items-center justify-content-center gap-2 rounded-5' onClick={() => openPopup(data?._id, data?.isPublic)} ><IoIosPeople /> Connect</button>}
                            </div>)}
                    </div>
                </div>
            </div>

            <Dialog open={open}>
                <DialogContent>
                    <div className="text-center m-4">
                        {userDetails?.connectedUsers?.some(x => x?.user === connectId) ?
                            (userDetails?.connectedUsers?.some(x => x?.user === connectId && x?.isConnect === true) ?
                                <h5 className="mb-4">Are you sure you want to Remove <br /> the Connected Master ?</h5> :
                                <h5 className="mb-4">Are you sure you want to Remove <br /> the Requested Master ?</h5>) :
                            <h5 className="mb-4">Are you sure you want to Connect <br /> the selected Master ?</h5>}
                        <button type="button" className="btn btn-primary mx-3" onClick={handleConnecting}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UserLeftSideFeed