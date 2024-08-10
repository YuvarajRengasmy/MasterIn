import { CiSearch } from "react-icons/ci"
import Navbar from "../../../Pages/Navbar"
import { AiFillDownSquare, AiFillNotification } from "react-icons/ai"
import { IoIosArrowBack, IoIosArrowForward, IoMdShare } from "react-icons/io"
import { FaBell } from "react-icons/fa6"
import { RiCloseFill, RiDownload2Line } from "react-icons/ri"
import { PiCoins, PiUsersThree } from "react-icons/pi";
import { LiaCheckCircle } from "react-icons/lia"
import { TbProgressBolt } from "react-icons/tb"
import { MdEventAvailable, MdOutlineArrowForwardIos, MdOutlinePlayLesson } from "react-icons/md"
import { GoClock } from "react-icons/go"
import { PieChart } from '@mui/x-charts/PieChart';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { getAllMasterEvents, getAllMasterWorkShops, getDashboardEventsFilter, getDashboardWorkShopsFilter, getMasterDashboardCounts, getMasterDashboardList } from "../../../api/dashboard"
import { useEffect, useState } from "react"
import { localDate, timeCal } from "../../../utils/dateformat"
import { Link } from "react-router-dom"
import { GrWorkshop } from "react-icons/gr"
import { Avatar, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const localizer = momentLocalizer(moment)
const Dashboard = () => {
    const [details, setDetails] = useState({})
    const [events, setEvents] = useState([])
    const [view, setView] = useState('month');
    const [open, setOpen] = useState(false)
    const [workShop, setWorkShop] = useState(false)
    const [list, setList] = useState({})
    const [eventList, setEventList] = useState([])
    const [title, setTitle] = useState([])
    const [filter, setFilter] = useState([])
    const [workShopList, setWorkShopList] = useState([])
    const [workShopTitle, setWorkShopTitle] = useState([])
    const [workShopFilter, setWorkShopFilter] = useState([])

    useEffect(() => {
        getAllCounts()
        getAllList()
        getAllEvents()
        getAllWorkShop()
    }, [])

    useEffect(() => {
        if (filter?.length === 0) {
            getEventsFilter()
        }
    }, [filter])

    useEffect(() => {
        if (workShopFilter?.length === 0) {
            getWorkShopsFilter()
        }
    }, [workShopFilter])

    const getAllCounts = () => {
        getMasterDashboardCounts().then(res => {
            setDetails(res?.data?.result)
        }).catch(err => console.log(err))
    }

    const getAllList = () => {
        getMasterDashboardList().then(res => {
            const result = res?.data?.result
            setList(result)
            const events = result?.sessionList?.map(x => {
                // const start = new Date(x?.time)
                // const hour = new Date(x?.time).getHours()
                // const minute = new Date(x?.time).getMinutes()
                // var end = new Date(x?.time)
                // if (x.duration === '1 hour') { end = end.setHours(hour + 1) }
                // else { end = end.setMinutes(minute + 30) }
                const start = moment(x?.time).toDate()
                const end = x.duration === '1 hour' ? moment(x?.time).add(1, 'hour').toDate() : moment(x?.time).add(30, 'minutes').toDate()
                const color = x.duration === '1 hour' ? '#009900' : '#ff0066'
                return {
                    title: x?.user?.name, start: start, end: end, avatar: x?.user?.image, color: color
                }
            })
            setEvents(events)
        }).catch(err => { console.log(err) })
    }

    const EventComponent = ({ event }) => (
        <div>
            <div className="d-flex  align-items-center">
                <img src={event.avatar ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                <strong>{event.title}</strong>
            </div>
        </div>
    );


    const handleViewChange = newView => {
        setView(newView);
    };

    const openEvent = () => {
        setFilter([])
        setOpen(true)
    }

    const closeEvent = () => {
        setOpen(false)
    }

    const openWorkShop = () => {
        setWorkShopFilter([])
        setWorkShop(true)
    }

    const closeWorkShop = () => {
        setWorkShop(false)
    }

    const handleReset = () => {
        setFilter([])
    }

    const handleWorkShopReset = () => {
        setWorkShopFilter([])
    }


    const getAllEvents = () => {
        getAllMasterEvents().then(res => {
            setTitle(res?.data?.result)
        }).catch(err => console.log(err))
    }

    const handleFilter = (data) => {
        if (filter?.includes(data)) {
            const result = filter?.filter(x => x !== data)
            setFilter(result)
        }
        else {
            setFilter([...filter, data])
        }
    }

    const getEventsFilter = () => {
        const data = filter?.length > 0 ? { filter } : ''
        getDashboardEventsFilter(data).then(res => {
            const result = res?.data?.result
            const event = result?.map(x => {
                x.bookedUsers.map(y => y.date = x?.date)
                return x.bookedUsers
            }).flat()
            setEventList(event)

        }).catch(err => console.log(err))
    }

    const getAllWorkShop = () => {
        getAllMasterWorkShops().then(res => {
            setWorkShopTitle(res?.data?.result)
        }).catch(err => console.log(err))
    }

    const handleWorkShopFilter = (data) => {
        if (workShopFilter?.includes(data)) {
            const result = workShopFilter?.filter(x => x !== data)
            setWorkShopFilter(result)
        }
        else {
            setWorkShopFilter([...workShopFilter, data])
        }
    }

    const getWorkShopsFilter = () => {
        const data = workShopFilter?.length > 0 ? { filter:workShopFilter } : ''
        getDashboardWorkShopsFilter(data).then(res => {
            const result = res?.data?.result
            const workShop = result?.map(x => {
                x.bookedUsers.map(y => y.date = x?.date)
                return x.bookedUsers
            }).flat()
            setWorkShopList(workShop)

        }).catch(err => console.log(err))
    }

    return (
        <>
            <div className="container">
                <Navbar />
                <div className="container mt-4 mt-lg-0" style={{ position: 'relative', top: '6rem' }}>
                    <div className="row d-flex align-items-center">
                        <div className='col-md-4 col-sm-12 mt-lg-0 mt-2 d-flex gap-2 justify-content-center align-items-center'>
                            <img className='img-fluid  rounded-circle' src={details?.master?.image ? details?.master?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '4rem', height: '3.5rem', objectFit: 'cover' }} />
                            <h5>Welcome back, {details?.master?.name} 🙋‍♂️ </h5>
                        </div>
                        <div className='col-md-6 col-sm-12 mt-lg-0 mt-2 position-relative'>
                            <span class=" position-absolute start-25 text-center  p-2 px-3 border-0" id="inputGroup-sizing-default"><CiSearch className="fs-5" /></span>
                            <input
                                type="search"
                                placeholder="Search"
                                aria-describedby="button-addon3"
                                className="form-control-lg bg-light border-0 ps-5 rounded-4 w-100 "

                            />
                        </div>
                        <div className='col-md-2 col-sm-12 mt-lg-0 mt-2 d-flex justify-content-center gap-4'>
                            <span><FaBell className="fs-5" /></span>
                            <span><RiDownload2Line className="fs-5" /></span>
                            <span><IoMdShare className="fs-5" /></span>
                        </div>
                    </div>
                    <div className='row mt-4 justify-content-center'>
                        <div className="col-lg-4 mb-3  col-sm-6">
                            <div className="card rounded-4 border-2 p-2">
                                <div className="d-flex  gap-3 justify-content-center align-items-center">
                                    <div className=" avatar rounded-circle bg-warning bg-opacity-25 text-warning   d-flex justify-content-center align-items-center"> <PiCoins className='fs-3' /> </div>
                                    <div>
                                        <h2 className="m-0 fw-bold">{details?.master?.coins}</h2>
                                        <h6> <span className=" text-secondary ">Total Earnings</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3   col-sm-6">
                            <div className="card rounded-4 border-2 p-2">
                                <div className="d-flex gap-3 justify-content-center align-items-center">
                                    <div className=" avatar rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center"> <LiaCheckCircle className='fs-3' /> </div>
                                    <div>
                                        <h2 className="m-0 fw-bold">0</h2>
                                        <h6><span className="text-secondary">Session Completed</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-lg-4 mb-3  col-sm-6">
                            <div className="card rounded-4 border-2 p-2">
                                <div className="d-flex gap-3 justify-content-center align-items-center">
                                    <div className=" avatar rounded-circle bg-info bg-opacity-25 text-info d-flex justify-content-center align-items-center"> <TbProgressBolt className='fs-3' /> </div>
                                    <div>
                                        <h2 className="m-0 fw-bold">{details?.bookedSession}</h2>
                                        <h6><span className="text-secondary ">Booked Session</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3  mb-sm-0 col-sm-6">
                            <div className="card rounded-4 border-2 p-2 pointer" onClick={openEvent}>
                                <div className="d-flex  gap-3 justify-content-center align-items-center">
                                    <div className=" avatar rounded-circle bg-primary bg-opacity-25 text-primary d-flex justify-content-center align-items-center"> <MdEventAvailable className='fs-3' /> </div>
                                    <div>
                                        <h2 className="m-0 fw-bold">{details?.bookedEvents}</h2>
                                        <h6><span className="text-secondary ">Booked Events</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 mb-sm-0  col-sm-6">
                            <div className="card rounded-4 border-2 p-2 pointer" onClick={openWorkShop}>
                                <div className="d-flex  gap-3 justify-content-center align-items-center">
                                    <div className=" avatar rounded-circle bg-secondary bg-opacity-25 text-secondary d-flex justify-content-center align-items-center"> <GrWorkshop className='fs-3' /> </div>
                                    <div>
                                        <h2 className="m-0 fw-bold">{details?.bookedWorkShops}</h2>
                                        <h6><span className="text-secondary ">Booked WorkShops</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4  col-sm-6">
                            <div className="card rounded-4 border-2 p-2">
                                <div className="d-flex gap-3 justify-content-center align-items-center">
                                    <div className=" avatar rounded-circle bg-danger bg-opacity-25 text-danger d-flex justify-content-center align-items-center"> <PiUsersThree className='fs-3' /> </div>
                                    <div>
                                        <h2 className="m-0 fw-bold">{details?.totalPlayList}</h2>
                                        <h6><span className="text-secondary ">Total Playlist</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className="col-lg-8 mb-4 mb-lg-0 col-12">
                            <div className=" card rounded-4 border-1 p-3  ">
                                <Calendar
                                    localizer={localizer}
                                    onView={handleViewChange}
                                    components={{
                                        event: EventComponent, toolbar: ({ label, onView, onNavigate }) => (
                                            <div className="rbc-toolbar">
                                                <span className="rbc-btn-group ">
                                                    <button type="button" className="btn btn-sm " onClick={() => onNavigate('TODAY')}>
                                                        Today
                                                    </button>
                                                    <button type="button" className="btn btn-sm " onClick={() => onNavigate('PREV')}>
                                                        <small><IoIosArrowBack /></small>
                                                    </button>
                                                    <button type="button" className="btn btn-sm  " onClick={() => onNavigate('NEXT')}>
                                                        <small ><IoIosArrowForward /></small>
                                                    </button>
                                                </span>

                                                <span className="rbc-toolbar-label">{label}</span>
                                                <span className="rbc-btn-group ">
                                                    <button type="button" className={`btn btn-sm ${view === 'day' ? 'active btn-light' : ''}`} onClick={() => onView('day')}>
                                                        Day
                                                    </button>
                                                    <button type="button" className={`btn btn-sm ${view === 'week' ? 'active btn-light' : ''}`} onClick={() => onView('week')}>
                                                        Week
                                                    </button>
                                                    <button type="button" className={`btn btn-sm ${view === 'month' ? 'active btn-light' : ''}`} onClick={() => onView('month')}>
                                                        Month
                                                    </button>
                                                    <button type="button" className={`btn btn-sm ${view === 'agenda' ? 'active btn-light' : ''}`} onClick={() => onView('agenda')}>
                                                        Agenda
                                                    </button>
                                                </span>
                                            </div>
                                        ),
                                    }}
                                    events={events}
                                    eventPropGetter={(event) => ({
                                        style: {
                                            backgroundColor: event?.color
                                        }
                                    })}
                                    style={{ height: 440 }} views={['day', 'month', 'week', 'agenda']}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className=" card rounded-4 border-1 scroll-bar" style={{ height: '474px', overflow: 'scroll' }}>
                                <h4 className="border-bottom mb-3 p-3">My Playlist</h4>
                                {list?.playList?.map((data, index) =>
                                    <div key={index} className="card rounded-4 border-1 p-2 mx-3  mb-3">
                                        <div className="d-flex gap-4 align-items-center">
                                            <img className='img-fluid rounded-2' src={data?.thumbnail} alt="thumbnail" style={{ objectFit: 'cover', height: '50px', width: '75px' }} />
                                            <div>
                                                <h5 className="m-0 fw-bold">{data?.name}</h5>
                                                <span className="text-secondary">{localDate(data?.createdOn)} </span>
                                            </div>
                                        </div>
                                    </div>)}
                                {details?.playList?.length === 0 && <div className="text-center text-danger my-auto">There is no Playlist</div>}
                                <Link type="button" to='/Home' state='playlist' className="btn btn-primary text-bottom rounded-4 mt-auto btn-block mx-3 "> See All</Link>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className="col-lg-5 col-12 mb-4">
                            <div className=" card rounded-4 border-1">
                                <h4 className="border-bottom  p-3">My Progress</h4>
                                <div className="mx-auto my-2  my-xl-4" style={{ height: 272, width: 380 }}>
                                    <PieChart tooltip={{ trigger: 'item' }}
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: details?.master?.coins, label: 'Total Earnings', color: '#ffff4d' },
                                                    { id: 2, value: 0, label: 'Session Completed', color: '#66ff99' },
                                                    { id: 1, value: details?.bookedSession, label: 'Booked Session', color: '#ff6666' },
                                                    { id: 3, value: details?.totalPlayList, label: 'Total Playlist', color: '#ff80df' },
                                                ], innerRadius: 50, outerRadius: 100, cx: 100
                                            },
                                        ]}
                                        slotProps={{
                                            legend: {
                                                labelStyle: {
                                                    fontSize: 12,
                                                    fontWeight: 'bold'
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" col-lg-7 col-12 mb-4">
                            <div className=" card rounded-4 border-1">
                                <div className="border-bottom d-flex justify-content-between align-items-center p-3" >
                                    <h4 >Events and Workshops</h4>
                                    <h6><Link className="text-decoration-none text-dark" to='/ProfilePage' state={'event'}>See All <MdOutlineArrowForwardIos /></Link></h6></div>
                                <div className="row p-3">
                                    {list?.eventList?.map((data, index) =>
                                        <div key={index} className=" col-12 mb-3 mb-sm-0 col-sm-6">
                                            <div className=" card rounded-4 border-1 p-3">
                                                <div className=' d-flex gap-2  align-items-center'>
                                                    <img className='img-fluid  rounded-circle' src={data?.master?.image ? data?.master?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
                                                    <h6 className="fw-bold">{data?.master?.name}</h6>
                                                </div>
                                                <div className="mt-2">
                                                    <img className='img-fluid rounded-2' src={data?.bannerImage} style={{ width: '300px', height: '168px', }} alt="events" />
                                                </div>
                                                <div className="d-flex justify-content-between mt-1">
                                                    <h6><small> {data?.title}</small></h6>
                                                    <h6><small> {localDate(data?.date)}</small></h6>
                                                </div>
                                            </div>
                                        </div>)}
                                    {details?.eventList?.length === 0 && <div className="text-center text-danger my-auto">There is no Events.</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Dialog open={open} fullWidth maxWidth="md">
                <DialogTitle className='text-secondary '>
                    Event Booked User List<IconButton className="float-end" onClick={closeEvent} >
                        <RiCloseFill /> </IconButton>
                </DialogTitle>
                <DialogContent className='mb-5 bg-light'>
                    <div>
                        <div className="row mt-3">
                            <div className="col-4">
                                <div className="card py-2 px-3 scroll-bar" style={{ maxHeight: 375, overflow: 'scroll' }}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={filter?.length === 0} disabled={filter?.length > 0} />} label="All" />
                                        {title?.map((data, index) => <FormControlLabel key={index} control={<Checkbox checked={filter?.includes(data?.title)} onChange={() => handleFilter(data?.title)} />} label={data?.title} />)}
                                    </FormGroup>
                                    <div className="d-flex gap-3 justify-content-end">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={getEventsFilter}>Filter</button>
                                        <button type="button" className="btn btn-secondary btn-sm " onClick={handleReset}>Reset</button>
                                    </div>
                                </div>

                            </div>
                            <div className="col-8">
                                <div className="card">
                                    <TableContainer className="scroll-bar" component={Paper} sx={{ maxHeight: 375 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead >
                                                <TableRow>
                                                    <TableCell align="center" className="fw-bold">S.No.</TableCell>
                                                    <TableCell align="center" className="fw-bold">Image</TableCell>
                                                    <TableCell align="center" className="fw-bold">Name</TableCell>
                                                    <TableCell align="center" className="fw-bold">Event Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {eventList?.map((data, index) =>
                                                    <TableRow key={index}>
                                                        <TableCell align="center" >{index + 1}</TableCell>
                                                        <TableCell align="center"><Avatar alt="Remy Sharp" className="mx-auto" src={data?.image ? data?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} /></TableCell>
                                                        <TableCell align="center">{data?.name}</TableCell>
                                                        <TableCell align="center">{localDate(data?.date)}</TableCell>
                                                    </TableRow>)}
                                                {eventList?.length === 0  ? <TableRow> <TableCell className="form-text text-danger text-center" colSpan={4}> This event does not have any users.</TableCell></TableRow> : null}                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >

            <Dialog open={workShop} fullWidth maxWidth="md">
                <DialogTitle className='text-secondary '>
                    WorkShop Booked User List<IconButton className="float-end" onClick={closeWorkShop} >
                        <RiCloseFill /> </IconButton>
                </DialogTitle>
                <DialogContent className='mb-5 bg-light'>
                    <div>
                        <div className="row mt-3">
                            <div className="col-4">
                                <div className="card py-2 px-3 scroll-bar" style={{ maxHeight: 375, overflow: 'scroll' }}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={workShopFilter?.length === 0} disabled={workShopFilter?.length > 0}  />} label="All" />
                                        {workShopTitle?.map((data, index) => <FormControlLabel key={index} control={<Checkbox checked={workShopFilter?.includes(data?.title)} onChange={() => handleWorkShopFilter(data?.title)} />} label={data?.title} />)}
                                    </FormGroup>
                                    <div className="d-flex gap-3 justify-content-end">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={getWorkShopsFilter}>Filter</button>
                                        <button type="button" className="btn btn-secondary btn-sm " onClick={handleWorkShopReset}>Reset</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card">
                                    <TableContainer className="scroll-bar" component={Paper} sx={{ maxHeight: 375 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead >
                                                <TableRow>
                                                    <TableCell align="center" className="fw-bold">S.No.</TableCell>
                                                    <TableCell align="center" className="fw-bold">Image</TableCell>
                                                    <TableCell align="center" className="fw-bold">Name</TableCell>
                                                    <TableCell align="center" className="fw-bold">WorkShop Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {workShopList?.map((data, index) =>
                                                    <TableRow key={index}>
                                                        <TableCell align="center" >{index + 1}</TableCell>
                                                        <TableCell align="center"><Avatar alt="Remy Sharp" className="mx-auto" src={data?.image ? data?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} /></TableCell>
                                                        <TableCell align="center">{data?.name}</TableCell>
                                                        <TableCell align="center">{localDate(data?.date)}</TableCell>
                                                    </TableRow>)}
                                                {workShopList?.length === 0   ? <TableRow> <TableCell className="form-text text-danger text-center" colSpan={4}> This WorkShop does not have any users.</TableCell></TableRow> : null}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )

}

export default Dashboard