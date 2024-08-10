import React, { useEffect, useState } from 'react'
import { IoIosPeople, IoIosEye } from 'react-icons/io'
import { Link } from 'react-router-dom'
import '../Styles/RightSideFeed.css';

import { getFilterMaster } from '../api/master';
import { getUserId } from '../utils/Storage';
import { toast } from 'react-toastify';
import { getFilterUser, getSingleUser, updateConnectedUser } from '../api/user';
import { Chip, Dialog, DialogContent } from '@mui/material';
import { getFilterCompany } from '../api/company';
import { getAllUpcomingSessions } from '../api/bookSession';
import { localDate } from '../utils/dateformat';
import { getAllUpcomingEvents, updateBookedUsers } from '../api/event';

const UserRightSideFeed = () => {

    const [company, setCompany] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [user, setUser] = useState([]);
    const [userDetails, setUserDetails] = useState({})
    const [open, setOpen] = useState(false)
    const [connectId, setConnectId] = useState(false)
    const [events, setEvents] = useState([])
    const [bookEvent, setBookEvent] = useState(false)
    const [eventDetails, setEventDetails] = useState({})

    useEffect(() => {
        getSingleUserDetails();
        getAllCompany();
        getAllUsers();
        getAllUpcomingSessionList()
        getAllUpcomingEventsList()
    }, [])

    const getAllUpcomingSessionList = () => {
        getAllUpcomingSessions().then(res => {
            setSessions(res?.data?.result)
        }).catch(err => { console.log(err); })
    }


    const getAllUpcomingEventsList = () => {
        getAllUpcomingEvents().then(res => {
            setEvents(res?.data?.result)
        }).catch(err => { console.log(err); })
    }

    const getAllCompany = () => {
        getFilterCompany('').then(res => {
            setCompany(res?.data?.result?.companyList)
        }).catch(err => { console.log(err); })
    }

    const getAllUsers = () => {
        getFilterUser('').then(res => {
            setUser(res?.data?.result?.userList)
        }).catch(err => { console.log(err); })
    }

    const handleConnecting = () => {
        const data = {
            connectedUsers: { user: connectId, modelType: 'Company', isConnect: true },
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

    const openPopup = (user) => {
        setConnectId(user)
        setOpen(true)
    }

    const closePopup = () => {
        setOpen(false)
    }

    const openEventPopup = (data) => {
        setEventDetails(data)
        setBookEvent(true)
    }

    const closeEventPopup = () => {
        setBookEvent(false)
    }

    const handleBookEvent = ()=>{
        if (userDetails?.coins >= eventDetails?.coins ) {
          const data = {
            _id:eventDetails?._id,
            bookedUsers:getUserId()
          }
          updateBookedUsers(data).then(res => {
            toast.success('Successfully book a event')
            getAllUpcomingEventsList()
            closeEventPopup()
          }).catch(err => console.log(err))
        }
        else {
          toast.warning(`You don't have enough coins for this event.`)
        }
    }


    return (
        <div className='right-side'>
            <div className='sidemenu menu_bottom ' style={{ marginLeft: '-10px' }} >
                <div className='container p-0 mt-2 d-flex justify-content-center align-items-center' >
                    {/* Upcoming Session */}
                    <div className="card right-side scroll-bar mt-5 w-100 px-2 pb-3 " style={{ maxHeight: '300px', minHeight: '300px', overflowY: 'scroll', }}>
                        <div className='mt-2 p-2 sticky-top bg-white text-center border-1 border-bottom'>Upcoming Session</div>
                        {sessions?.map((data, index) =>
                            <div key={index} className='align-items-center justify-content-center d-flex gap-2 mb-2 mt-2'>
                                <img className='img-fluid rounded-circle' src={data?.master?.image ? data?.master?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ height: '2.5rem', width: '2.5rem', objectFit: 'cover' }} />
                                <div className='flex-grow-1'>
                                    <span className='fw-bolder pointer'>{data?.master?.name}</span><br />
                                    <small className='text-secondary'>{localDate(data?.date)} - {data?.time}</small>
                                    <small className='text-secondary d-block'>{data?.duration} session</small>
                                </div>
                            </div>)}
                        {sessions?.length === 0 && <div className='form-text text-danger m-auto'>There is no Upcoming Session</div>}
                    </div>
                </div>

                <div className='container p-0 mt-2 d-flex justify-content-center align-items-center' >
                    {/* Upcoming Session */}
                    <div className="card right-side scroll-bar mt-5 w-100 px-2 pb-3 " style={{ maxHeight: '300px', minHeight: '300px', overflowY: 'scroll', }}>
                        <div className='mt-2 p-2 sticky-top bg-white text-center border-1 border-bottom'>Upcoming Events</div>
                        {events?.map((data, index) =>
                            <div key={index} className="card rounded-4 border-1 p-2 mt-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <img className='img-fluid rounded-2' src={data?.bannerImage} alt="thumbnail" style={{ objectFit: 'cover', height: '50px', width: '75px' }} />
                                    <div>
                                        <h6 className="m-0 fw-bold"><small>{data?.title.length > 10 ? data?.title?.slice(0, 10) + '...' : data?.title}</small></h6>
                                        <span className="text-secondary"><small>{localDate(data?.date)}</small> </span>
                                    </div>
                                    {data?.bookedUsers?.includes(getUserId())?<Chip label="Booked" color='success'></Chip>:
                                    <button className='btn btn-sm btn-primary' onClick={()=>openEventPopup(data)}>Book Now</button>}
                                    
                                </div>
                            </div>)}
                        {events?.length === 0 && <div className='form-text text-danger m-auto'>There is no Upcoming Events</div>}
                    </div>
                </div>

                <div className='container p-0 mt-2 d-flex justify-content-center align-items-center' >
                    {/* Company */}
                    <div className="card right-side scroll-bar mt-5 w-100 px-2 pb-3 " style={{ maxHeight: '300px', minHeight: '300px', overflowY: 'scroll', }}>
                        <div className='mt-2 p-2 sticky-top bg-white text-center border-1 border-bottom'>Company</div>
                        {company?.map((data, index) =>
                            <div key={index} className='align-items-center d-flex gap-2 mb-2 mt-2'>
                                <img className='img-fluid rounded-circle' src={data?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ height: '2.5rem', width: '2.5rem', objectFit: 'cover' }} />
                                <div className='flex-grow-1'>
                                    <span className='fw-bolder pointer'>{data?.name}</span><br />
                                    <small className='text-secondary'>{data?.postition ?? null}</small>
                                </div>
                                {userDetails?.connectedUsers?.some(x => x?.user === data?._id) ?
                                    <button className='btn btn-success btn-sm p-1 px-2 d-flex align-items-center rounded-5 justify-content-center gap-2' onClick={() => openPopup(data?._id)}><IoIosPeople /> Connected</button> :
                                    <button className='btn btn-primary btn-sm  px-3 d-flex align-items-center justify-content-center gap-2 rounded-5' onClick={() => openPopup(data?._id)} ><IoIosPeople /> Connect</button>}
                            </div>)}
                    </div>
                </div>

                <div className='container p-0 d-flex justify-content-center align-items-center mb-4' >
                    {/* User */}
                    <div className="card right-side scroll-bar mt-4 w-100 mx-auto px-2 pb-3" style={{ maxHeight: '300px', minHeight: '300px', overflowY: 'scroll' }}>
                        <div className='mt-2 p-2 sticky-top bg-white text-center border-1 border-bottom'>User</div>
                        {user?.map((data, index) =>
                            <div key={index} className='align-items-center d-flex gap-2 mb-2 mt-2'>
                                <img className='img-fluid rounded-circle' src={data?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ height: '2.5rem', width: '2.5rem', objectFit: 'cover' }} />
                                <div className='flex-grow-1'>
                                    <span className='fw-bolder'><Link to={{ pathname: '/UserPeopleProfile', search: `?id=${data?._id}` }} className='text-decoration-none text-dark small'>{data?.name}</Link></span><br />
                                    <small className='text-secondary'>{data?.postition ?? null}</small>
                                </div>
                                <button className='btn btn-success  p-1 px-2 d-flex align-items-center rounded-5 justify-content-center gap-2 text-white' ><IoIosEye /><Link to={{ pathname: '/UserPeopleProfile', search: `?id=${data?._id}` }} className='text-decoration-none text-white small'>view</Link></button>
                            </div>)}
                    </div>
                </div>
            </div>

            <Dialog open={open}>
                <DialogContent>
                    <div className="text-center m-4">
                        {userDetails?.connectedUsers?.some(x => x?.user === connectId) ? <h5 className="mb-4">Are you sure you want to Remove <br /> the Connected Company ?</h5> :
                            <h5 className="mb-4">Are you sure you want to Connect <br /> the selected Company ?</h5>}
                        <button type="button" className="btn btn-primary mx-3" onClick={handleConnecting}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={bookEvent} fullWidth maxWidth='xs'>
                <DialogContent>
                    <div className="text-center m-4">
                        <h5 className="mb-4">Are you sure you want to Book <br /> the selected Event ? { eventDetails.coins > 0 ? `You will need to spend ${eventDetails.coins} coins for this session.` : `This event is coin-free.`}</h5>
                        <button type="button" className="btn btn-primary mx-3" onClick={handleBookEvent}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closeEventPopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default UserRightSideFeed