import React, { useEffect, useState } from 'react';
import '../../../Styles/Notification.css';
import { AiOutlineNotification } from 'react-icons/ai';
import { getFilterNotification } from '../../../api/notification';
import { Link } from 'react-router-dom';
import { timeCal } from '../../../utils/dateformat';
import { getUserId } from '../../../utils/Storage';
import UserNavbar from '../../../Pages/UserNavbar';

const UserNotification = () => {
    const [notification, setNotification] = useState([])
    const [count, setCount] = useState('')
    const [scroll, setScroll] = useState(false);
    const [next, setNext] = useState(0);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        getNotificationList()
    }, [next])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

    }, [])
    const handleScroll = () => {
        const value = window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 200
        setScroll(value)
    };
    useEffect(() => {
        if (scroll) {
            loadMoreNotification();
        }
    }, [scroll])

    const getNotificationList = () => {
        const findData = {
            limit: 10,
            page: next,
            to: getUserId()
        };
        getFilterNotification(findData).then(res => {
            const notificationList = res?.data?.result?.notificationList
            setNotification([...notification, ...notificationList]);
            setCount(res?.data?.result?.notificationCount)
        }).catch(err => console.log(err))
    }

    const loadMoreNotification = () => {
        let nextNotification = next;
        nextNotification = nextNotification + 10;
        if (count <= nextNotification) {
            setReload(true)
        }
        else {
            setNext(nextNotification);
        }
    };


    return (
        <>
            <div className='col-lg-6 scroll-bar mx-auto ' style={{ overflow: 'scroll' }}>
                <div className='container mb-5' >
                    <UserNavbar />
                    <div className='container d-flex flex-column border-start border-end gap-2 align-items-center py-5 bg-light mt-5'>
                        <div className="container bg-white text-center rounded-2 border shadow mt-5 p-2">
                            <span className='navbar-brand mb-0 h1 ms-3 d-flex gap-2 align-items-center'><AiOutlineNotification /> Notifications</span>
                        </div>
                        <div className='container bg-white border rounded-2 p-2 ' style={{ minHeight: '500px' }}>
                            <div className="tab-content w-100" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <div className='container-fluid bg-white'>
                                        <div className='card mt-2 mb-2'  >
                                            <div className='card-body p-2'>
                                                {notification.map((data, index) =>
                                                    <div key={index} className='row-col-lg-3 mb-3 d-flex align-items-center gap-2'>
                                                        <div className='col-lg-1 col-md-1 col-2'>
                                                            <img className='img-fluid rounded-circle' src={data?.from?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
                                                        </div>
                                                        <div className='col-lg-9 col-md-9 col-8 text-start'>
                                                             <span className='fw-bolder'><Link to={{pathname:'/MasterProfile',search:`?id=${data?._id}`}} className='text-decoration-none text-dark'>{data?.from?.user?.name}</Link></span><br />
                                                            <small className='text-secondary d-block'>{timeCal(data?.date)}</small>
                                                            <small className='text-secondary'>{data?.description}</small>
                                                        </div>
                                                    </div>)}
                                                {reload && notification.length > 0 ?
                                                    <div className='form-text text-danger text-center'>The notification has ended.</div> : null}
                                                {notification.length === 0 ?
                                                    <div className='form-text text-danger text-center'>Notifications aren't there.</div> : null}
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserNotification