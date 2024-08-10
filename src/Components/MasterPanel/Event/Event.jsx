import React, { useEffect, useState } from 'react'
import Navbar from '../../../Pages/Navbar'
import banner from '../../../Components/Assets/Images/EventBanner.png'
import { CiSearch } from 'react-icons/ci'
import { Chip } from '@mui/material'
import { IoTicketSharp } from "react-icons/io5";
import { PiDotOutlineFill } from 'react-icons/pi'
import { FaStar } from 'react-icons/fa6'
import { getAllCategory } from '../../../api/category'
import { getFilterUpComingEvents } from '../../../api/event'

export default function Event() {
    const [category, setCategory] = useState([])
    const [eventFilter, setEventFilter] = useState('all')
    const [filter, setFilter] = useState('all')
    const [count, setCount] = useState('')
    const [workShopCount, setWorkShopCount] = useState('')
    const [next, setNext] = useState(0);
    const [reloadEvent, setReloadEvent] = useState(false)
    const [workShopList, setWorkShopList] = useState([])
    const [nextData, setNextData] = useState(0);
    const [reload, setReload] = useState(false)
    const [eventList, setEventList] = useState([])
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    useEffect(() => {
        getAllCategories()
    }, [])

    useEffect(() => {
        getEventList()
    }, [next])

    useEffect(() => {
        getWorkShopList()
    }, [nextData])

    const getEventList = () => {
        const findData = {
            limit: 6,
            page: next,
            filter: eventFilter,
            type: 'event'
        };
        getFilterUpComingEvents(findData).then(res => {
            const result = res?.data?.result?.eventList
            const event = result?.map(x => {
                x.fromTime = new Date(x?.fromTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
                x.toTime = new Date(x?.toTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
                return x
            })
            setEventList([...eventList, ...event]);
            setCount(res?.data?.result?.eventCount)
        }).catch(err => console.log(err))
    }

    const getWorkShopList = () => {
        const findData = {
            limit: 6,
            page: nextData,
            filter: filter,
            type: 'workshop'
        };
        getFilterUpComingEvents(findData).then(res => {
            const result = res?.data?.result?.eventList
            const workShop = result?.map(x => {
                x.fromTime = new Date(x?.fromTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
                x.toTime = new Date(x?.toTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
                return x
            })
            setWorkShopList([...workShopList, ...workShop]);
            setWorkShopCount(res?.data?.result?.eventCount)
        }).catch(err => console.log(err))
    }

    const loadMoreEvent = () => {
        let nextEvent = next;
        nextEvent = nextEvent + 6;
        if (count <= nextEvent) {
            setReloadEvent(true)
        }
        else {
            setNext(nextEvent);
        }
    };

    const loadMoreWorkShop = () => {
        let nextWorkShop = nextData;
        nextWorkShop = nextWorkShop + 6;
        if (workShopCount <= nextWorkShop) {
            setReload(true)
        }
        else {
            setNextData(nextWorkShop);
        }
    };

    const getAllCategories = () => {
        getAllCategory().then(res => {
            setCategory(res?.data?.result)
        }).catch(err => console.log(err))
    }

    const handleFilter = (tab) => {
        setFilter(tab)
        const filterData = tab
        setReload(false)
        if (nextData !== 0) {
            setWorkShopList([])
            setNextData(0)
        }
        else {
            const findData = {
                limit: 6,
                page: 0,
                filter: filterData,
                type: 'workshop'
            };
            getFilterUpComingEvents(findData).then(res => {
                const result = res?.data?.result?.eventList
                const workShopList = result?.map(x => {
                    x.fromTime = new Date(x?.fromTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                    x.toTime = new Date(x?.toTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                    return x
                })
                setWorkShopList([...workShopList]);
                setWorkShopCount(res?.data?.result?.eventCount)
            }).catch(err => console.log(err))
        }
    }


    const handleEventFilter = (tab) => {
        setEventFilter(tab)
        const filterData = tab
        setReloadEvent(false)
        if (next !== 0) {
            setEventList([])
            setNext(0)
        }
        else {
            const findData = {
                limit: 6,
                page: 0,
                filter: filterData,
                type: 'event'
            };
            getFilterUpComingEvents(findData).then(res => {
                const result = res?.data?.result?.eventList
                const eventList = result?.map(x => {
                    x.fromTime = new Date(x?.fromTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                    x.toTime = new Date(x?.toTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                    return x
                })
                setEventList([...eventList]);
                setCount(res?.data?.result?.eventCount)
            }).catch(err => console.log(err))
        }
    }




    return (
        <>
            <div className='container'>
                <Navbar />
                <div className='container mt-1 ' style={{ position: 'relative', top: '4rem' }}>
                    <div style={{ width: '100%', height: '300px', backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', height: '300px' }}>
                            <div className='text-center'>
                                <div className=' pt-4 text-light text-center ms-5'>
                                    <h4 className='mt-5 fw-bold '>Don't miss out!</h4>
                                    <h4 className='fw-bold' >Explore the vibrant events happening locally and globally.</h4>
                                </div>
                                <div className=' mt-4 position-relative'>
                                    <span class=" position-absolute start-25 text-center  p-2 px-3 border-0" id="inputGroup-sizing-default"><CiSearch className="fs-5" /></span>
                                    <input
                                        type="search"
                                        placeholder="Search"
                                        aria-describedby="button-addon3"
                                        className="form-control-lg bg-light border-0 ps-5  w-50 "

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-5 mx-3'>
                        <div className='mt-3'>
                            <h5 className='fw-bold'>Explore Categories</h5>
                            <div className='d-flex gap-4 mt-3 flex-wrap flex-md-nowrap justify-content-center'>
                                {category?.slice(0, 5)?.map((data, index) =>
                                    <button key={index} type='button' className=' btn fw-bold btn-lg fs-6 text-white shadow  p-2' style={{ backgroundImage: ` linear-gradient(135deg, #fa709a 10%, #fee140 100%)` }}>{data?.category}</button>
                                )}

                            </div>
                        </div>
                        <div className='mt-5'>
                            <h5 className='fw-bold'>Popular Events</h5>
                            <div className='d-flex gap-2 mt-3   '>
                                <Chip label="All" className='px-2 pointer' variant='filled' color={eventFilter === 'all' ? 'primary' : 'default'} onClick={() => handleEventFilter('all')} />
                                <Chip label="Today" className='px-2' variant='filled' color={eventFilter === 'today' ? 'primary' : 'default'} onClick={() => handleEventFilter('today')} />
                                <Chip label="Tomorrow" className='px-2' variant='filled' color={eventFilter === 'tomorrow' ? 'primary' : 'default'} onClick={() => handleEventFilter('tomorrow')} />
                            </div>
                            <div className='row mt-4'>
                                {eventList?.map((data, index) =>
                                    <div key={index} className='col-12 col-lg-6 col-xl-4  mb-3'>
                                        <img alt='events' style={{ width: '500px', height: '150px', objectFit: 'cover' }}
                                            src={data?.bannerImage} />
                                        <div className='row mt-2 px-3'>
                                            <div className='col-3 text-center '>
                                                <h5 ><span className='text-info fw-bold'>{monthNames[new Date(data?.date).getMonth()]}</span> <span className='fw-bold mx-auto'>{new Date(data?.date).getDate()}</span></h5>
                                            </div>
                                            <div className='col-9 '>
                                                <h6 className='m-0'>{data?.title}</h6>
                                                <small>{data?.eventType}</small>
                                                <small className='d-block'>{data?.fromTime} - {data?.toTime}</small>
                                                <h6><small  > <IoTicketSharp className='me-1' />{data?.coins > 0 ? `${data?.coins} Coins` : 'Free'} <PiDotOutlineFill /> <FaStar className='text-info' /> {data?.bookedUsers?.length} interested</small></h6>
                                            </div>
                                        </div>
                                    </div>)}

                            </div>
                            {reloadEvent && eventList?.length > 0 ?
                                <div className='form-text text-danger text-center '>The events has ended.</div> : null}
                            {eventList?.length === 0 ?
                                <div className='form-text text-danger text-center'>Events aren't there.</div> : null}
                            <div className=' mt-4 d-grid col-10  col-md-6 col-xl-4 mx-auto'>
                                <button type='button' className='btn btn-outline-dark mt-3' onClick={loadMoreEvent} > See More</button>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <h5 className='fw-bold'>Popular WorkShops</h5>
                            <div className='d-flex gap-2 mt-3 '>
                                <Chip label="All" className='px-2 pointer' variant='filled' color={filter === 'all' ? 'primary' : 'default'} onClick={() => handleFilter('all')} />
                                <Chip label="Today" className='px-2' variant='filled' color={filter === 'today' ? 'primary' : 'default'} onClick={() => handleFilter('today')} />
                                <Chip label="Tomorrow" className='px-2' variant='filled' color={filter === 'tomorrow' ? 'primary' : 'default'} onClick={() => handleFilter('tomorrow')} />
                            </div>
                            <div className='row mt-4'>
                                {workShopList?.map((data, index) =>
                                    <div key={index} className='col-12 col-lg-6 col-xl-4  mb-3'>
                                        <img alt='events' style={{ width: '500px', height: '150px', objectFit: 'cover' }}
                                            src={data?.bannerImage} />
                                        <div className='row mt-2 px-3'>
                                            <div className='col-3 text-center '>
                                                <h5 ><span className='text-info fw-bold'>{monthNames[new Date(data?.date).getMonth()]}</span> <span className='fw-bold mx-auto'>{new Date(data?.date).getDate()}</span></h5>
                                            </div>
                                            <div className='col-9 '>
                                                <h6 className='m-0'>{data?.title}</h6>
                                                <small>{data?.eventType}</small>
                                                <small className='d-block'>{data?.fromTime} - {data?.toTime}</small>
                                                <h6><small  > <IoTicketSharp className='me-1' />{data?.coins > 0 ? `${data?.coins} Coins` : 'Free'} <PiDotOutlineFill /> <FaStar className='text-info' /> {data?.bookedUsers?.length} interested</small></h6>
                                            </div>
                                        </div>
                                    </div>)}

                            </div>
                            {reload && workShopList?.length > 0 ?
                                <div className='form-text text-danger text-center '>The workshops has ended.</div> : null}
                            {workShopList?.length === 0 ?
                                <div className='form-text text-danger text-center'>workshops aren't there.</div> : null}
                            <div className=' mt-4 d-grid pb-5 col-10  col-md-6 col-xl-4 mx-auto'>
                                <button type='button' className='btn btn-outline-dark mt-3' onClick={loadMoreWorkShop} > See More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
