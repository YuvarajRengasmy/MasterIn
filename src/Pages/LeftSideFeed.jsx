import React, { useEffect, useState } from 'react';
import '../Styles/LeftSideFeed.css';

import { getSingleMaster, updateConnectedUser } from '../api/master';
import { getMasterId } from '../utils/Storage';
import { IoIosPeople } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { getFilterCompany } from '../api/company';
import { toast } from 'react-toastify';
import { Dialog, DialogContent } from '@mui/material';



const LeftSideFeed = () => {
    
    const [master, setMaster] = useState();
    const [open, setOpen] = useState(false)
    const [connectId, setConnectId] = useState(false)
    const [company, setCompany] = useState([]);

    useEffect(() => {
        getUserDetails();
        getAllCompany();

    }, [])
    const getUserDetails = () => {
        const data = getMasterId()
        getSingleMaster(data)
            .then((res) => {
                const result = res?.data?.result
                setMaster({ ...master, ...result });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getAllCompany = () => {
        getFilterCompany('').then(res => {
            setCompany(res?.data?.result?.companyList)
        }).catch(err => { console.log(err); })
    }

    const handleConnecting = () => {
        const data = {
            connectedUsers: connectId,
            _id: getMasterId()
        }
        updateConnectedUser(data).then(res => {
            toast.success(res?.data?.message)
            getUserDetails();
            closePopup()
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

            <div className='container bg-dark mt-5 d-flex justify-content-center align-items-center ms-3' >
                <div className='sidemenu left-side mt-5'  >
                    <div className="card rounded-2 w-100 community m-auto" >
                        <div className=" ">
                            {/* Banner Image */}
                            <img src={master?.backgroundImage ? master?.backgroundImage : ' https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/Ui.jpeg'} className="card-img-top img-fluid rounded-top-2" alt="bannerImage" style={{ maxHeight: '5rem', objectFit: 'cover' }} />

                            {/* Profile Image */}
                            <div className="position-absolute top-55 start-50 translate-middle">
                                <img src={master?.image ? master?.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="rounded-circle img-fluid" alt="profileImage" style={{ width: '5rem', height: '5rem', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="card-body mt-5 text-center">
                            <h5 className="card-title fs-4">{master?.name ??null}</h5>
                            <p className="card-text border-0 text-secondary">{master?.position ?? null}</p>
                        </div>
                    </div>
                    <div className="card scroll-bar w-100 mt-4 px-2 pb-3" style={{ maxHeight: '300px', minHeight: '300px', overflowY: 'scroll', marginBottom: '150px' }}>
                        <div className='mt-2 p-2 sticky-top bg-white text-center border-1 border-bottom'>Company</div>
                        {company?.map((data, index) =>
                            <div key={index} className='align-items-center d-flex gap-2 mb-2 mt-2'>
                                <img className='img-fluid rounded-circle' src={data?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ height: '2.5rem', width: '2.5rem', objectFit: 'cover' }} />
                                <div className='flex-grow-1'>
                                    <span className='fw-bolder'><Link  className='text-decoration-none text-dark small'>{data?.name}</Link></span><br />
                                    <small className='text-secondary'>{data?.postition ?? null}</small>
                                </div>
                                {master?.connectedUsers?.includes(data?._id) ?
                                    <button className='btn btn-success btn-sm p-1 px-2 d-flex align-items-center rounded-5 justify-content-center gap-2' onClick={() => openPopup(data?._id)}><IoIosPeople /> Connected</button> :
                                    <button className='btn btn-primary btn-sm  px-3 d-flex align-items-center justify-content-center gap-2 rounded-5' onClick={() => openPopup(data?._id)} ><IoIosPeople /> Connect</button>}
                            </div>)}
                    </div>
                </div>

            </div>

            <Dialog open={open}>
                <DialogContent>
                    <div className="text-center m-4">
                        {master?.connectedUsers?.includes(connectId) ? <h5 className="mb-4">Are you sure you want to Remove <br /> the Connected Company ?</h5> :
                            <h5 className="mb-4">Are you sure you want to Connect <br /> the selected Company ?</h5>}
                        <button type="button" className="btn btn-primary mx-3" onClick={handleConnecting}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default LeftSideFeed