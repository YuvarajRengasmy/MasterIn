import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { FaEarthAsia } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';
import { Autocomplete, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, TextField, InputLabel, MenuItem, Radio, RadioGroup, Select, } from '@mui/material';
import { uploadFile } from '../../../utils/FileUpload';
import { toast } from 'react-toastify';
import { localDate, timeCal } from '../../../utils/dateformat';
import { Link } from 'react-router-dom';
import { getMasterId } from '../../../utils/Storage';
import { deleteEvent, getFilterEvents, updateEvent } from '../../../api/event';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { getAllCategory } from '../../../api/category';
import { RiCloseFill } from 'react-icons/ri';
import uploadImage from '../../Assets/Images/upload.jpg';


const EventList = () => {
    const initialState = {
        master: getMasterId(),
        title: '',
        type:'',
        eventType: 'online',
        category: [],
        date: dayjs(new Date().setUTCHours(0, 0, 0, 0)),
        fromTime: dayjs(new Date()),
        toTime: dayjs(new Date()),
        location: '',
        isPaid: false,
        coins: 0,
        description: '',
        bannerImage: '',
        eventImage1: '',
        eventImage2: ''
    }
    const initialStateErrors = {
        title: { required: false },
        bannerImage: { required: false },
        category: { required: false },
        location: { required: false },
        coins: { required: false }
    }
    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState([])
    const [inputs, setInputs] = useState(initialState)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState()
    const [eventNext, setEventNext] = useState(0);
    const [scroll, setScroll] = useState(false);
    const [reload, setReload] = useState(false);
    const [count, setCount] = useState(0);
    const [event, setEvent] = useState([]);
    const [eventDelete, setEventDelete] = useState(false);
    const [modify, setModify] = useState(false)
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();


    useEffect(() => {
        getAllCategoryList()
        window.addEventListener('scroll', handleScroll);

    }, [])


    useEffect(() => {
        getFilterEventList();
    }, [eventNext])

    useEffect(() => {
        if (modify) {
            getFilterEventList()
        }
    }, [modify])

    // const getUserDetails = () => {
    //     const data = getMasterId()
    //     getSingleMaster(data)
    //         .then((res) => {
    //             const result = res?.data?.result
    //             setUser(result);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }


    const handleScroll = () => {
        const value = window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 800
        setScroll(value)
    };

    useEffect(() => {
        if (scroll) {
            loadMoreEvent();
        }
    }, [scroll])

    const loadMoreEvent = () => {
        let nextEvent = eventNext;
        if (eventDelete) {
            nextEvent = nextEvent + 4;
            setEventDelete(false)
        }
        else {
            nextEvent = nextEvent + 5;
        }
        if (count <= nextEvent) {
            setReload(true)
        }
        else {
            setEventNext(nextEvent);
        }

    };

    const handleEventList = () => {
        if (eventNext > 0) {
            setEventNext(0);
        } else {
            getFilterEventList();
        }
        setModify(true)
    }

    const getFilterEventList = () => {
        const data = {
            limit: 5,
            page: eventNext,
            master: getMasterId()
        }
        getFilterEvents(data)
            .then((res) => {
                setEvent(res?.data?.result?.eventList);
                setCount(res?.data?.result?.eventCount)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleInputs = (event) => {
        setInputs({ ...inputs, [event?.target?.name]: event?.target?.value })
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    }

    const handleDateChange = (newValue) => {
        setInputs({ ...inputs, date: newValue })
    }

    const handleFromTimeChange = (newValue) => {
        setInputs({ ...inputs, fromTime: newValue })
    }

    const handleToTimeChange = (newValue) => {
        setInputs({ ...inputs, toTime: newValue })
    }

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.title === "") {
            error.title.required = true;
        }
        if (data.category.length === 0) {
            error.category.required = true;
        }
        if (data.bannerImage === "") {
            error.bannerImage.required = true;
        }
        if (inputs?.eventType === 'offline' && data.location === "") {
            error.location.required = true;
        }
        if (inputs?.isPaid === true && data.coins === "") {
            error.coins.required = true;
        }
        return error
    }


    const handleErrors = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const prop = obj[key];
                if (prop.required === true || prop.valid === true) {
                    return false;
                }
            }
        }
        return true;
    }


    const getAllCategoryList = () => {
        getAllCategory().then(res => {
            setCategory(res?.data?.result)
        }).catch(err => { console.log(err) })
    }


    const handleCategory = (event, values) => {
        const category = values.map(x => x._id)
        setInputs({ ...inputs, category });
        if (submitted) {
            const newError = handleValidation({ ...inputs, category })
            setErrors(newError)
        }
    };

    const handlePayment = (event) => {
        const isPaid = event?.target?.value === 'true'
        setInputs({ ...inputs, isPaid })
    }

    const handleFormType = (event)=>{
        setInputs({...inputs,type:event?.target?.value})
    }                                            

    const handleFileChange = (event) => {
        const file = event?.target?.files[0];
        const folder = 'masterIn/event'
        if (file) {
            uploadFile(file, folder).then(res => {
                event.target.value = null;
                const url = res?.Location
                setInputs({ ...inputs, [event?.target?.id]: url })
                if (submitted && event?.target?.id === 'bannerImage') {
                    const newError = handleValidation({ ...inputs, bannerImage: url })
                    setErrors(newError)
                }
            }).catch(err => { console.log(err); })
        };

    };

    const openPopup = (data) => {
        setOpen(true)
        setSubmitted(false);
        setErrors(initialStateErrors)
        data.date = dayjs(data?.date)
        data.fromTime = dayjs(data?.fromTime)
        data.toTime = dayjs(data?.toTime)
        setInputs({ ...inputs, ...data })
    }

    const closePopup = () => {
        setOpen(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        if (handleErrors(newError)) {
            inputs.date = new Date(inputs?.date)
            inputs.toTime = new Date(inputs?.toTime)
            inputs.fromTime = new Date(inputs?.fromTime)
            if (inputs.eventType === 'online') { inputs.location = '' }
            if (inputs.isPaid === false) { inputs.coins = 0 }
            updateEvent(inputs).then((res) => {
                toast.success('Successfully update a event');
                closePopup()
                handleEventList()
            })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    }

    const handleCardClick = (event) => {
        // Trigger click on the file input
        const id = event?.target?.id
        if (id === 'image1') {
            document.getElementById('bannerImage').click();
        }
        if (id === 'image2') {
            document.getElementById('eventImage1').click();
        }
        if (id === 'image3') {
            document.getElementById('eventImage2').click();
        }
    };

    const handleNumberInputChange = (event) => {
        const { value } = event.target;
        if (/^\d*$/.test(value) || value === '') {
            handleInputs(event);
        }
    };

    const openDeletePopup = (data) => {
        setDeleteId(data)
        setOpenDelete(true)
    }

    const closeDeletePopup = () => {
        setOpenDelete(false)
    }

    const deleteEventDetails = () => {
        deleteEvent(deleteId).then(res => {
            toast.success(res?.data?.message);
            closeDeletePopup()
            const newEventList = event.filter(x => x._id !== deleteId)
            setEvent(newEventList)
            setEventDelete(true)
        }).catch(err => { console.log(err) })
    }

    return (

        <>

            <div className='scroll-bar' style={{ overflow: 'auto', maxHeight: 'calc(100vh - 50px)' }}>
                <div className='container mb-5' >

                    <div className='gap-3 d-flex flex-column' style={{ marginTop: '4.5rem' }}>

                        {event?.length === 0 ?
                            <div className='form-text text-danger'>There is no Event/WorkShop. </div> :
                            event?.map((data, index) =>
                                <div key={index} className="shadow border overflow-y-auto mt-3 p-2 mb-4 rounded" style={{ maxWidth: '500px' }}>
                                    <div className="container  mt-2 p-3">
                                        <div className='row  mb-2 '>
                                            <div className='col-lg-2 col-2 '>
                                                <img className='img-fluid  rounded-circle' src={data?.master?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                            </div>
                                            <div className=' col-lg-8 col-8 align-items-center'>
                                                <span className='fw-bolder'><Link className='text-decoration-none text-dark small'>{data?.master?.name}</Link></span><br />
                                                <small className='text-secondary d-flex gap-1 align-items-center'><FaEarthAsia /> {timeCal(data?.createdOn)}</small>
                                            </div>
                                            <div className='col-lg-1 col-2'>
                                                <div className="dropdown">
                                                    <button className="btn  rounded-5 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><HiDotsVertical /></button>
                                                    <ul className="dropdown-menu">
                                                        <li><Link className="dropdown-item d-flex align-items-center" onClick={() => openPopup(data)}  ><AiFillEdit className='me-2' /> Edit</Link></li>
                                                        <li><Link className="dropdown-item d-flex align-items-center" onClick={() => openDeletePopup(data?._id)} > <AiFillDelete className='me-2' /> Delete</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container bg-white mb-1">
                                        <img className="feedImage img-fluid" src={data?.bannerImage} alt="FeedImage" style={{ width: '700px' }} />
                                    </div>
                                    <div className='ms-3 m-2'>
                                        <div className='d-flex justify-content-between'>
                                            <span className='fw-bolder fs-5 text-uppercase'>{data?.title}</span>
                                            <span className='fs-10 mb-3'>{localDate(data?.date)}</span>
                                        </div>
                                        <div className='d-flex flex-column text-lg-start text-md-start text-sm-start text-center'>
                                            <p className=''>
                                                {data?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>)}
                        {reload ?
                            <div className='form-text text-danger text-center mb-5'>No Event/WorkShop</div> : null
                        }


                    </div>
                </div>
            </div>

            <Dialog open={open} fullWidth maxWidth="md">
                <DialogTitle className='text-secondary pb-0'>
                    Update Events/WorkShops<IconButton className="float-end" onClick={closePopup}  >
                        <RiCloseFill /> </IconButton>
                </DialogTitle>
                <DialogContent className='mb-5'>
                    <form onSubmit={handleSubmit} >
                        <div className='container  '>
                            <div className="row">
                            <div className="col-12">
                                        <RadioGroup row
                                            aria-labelledby="demo-radio-buttons-group-label" 
                                            name="isPaid" onChange={handleFormType} value={inputs?.type}
                                        >
                                            <FormControlLabel value={'event'} control={<Radio />} label="Event" />
                                            <FormControlLabel value={'workshop'} control={<Radio />} label="WorkShop" />
                                        </RadioGroup>
                                </div>
                                <div className="col-4">
                                    <label className="mb-2">Banner Image</label>
                                    <div className='card pointer p-0 align-items-center' onClick={handleCardClick}>
                                        <img src={inputs?.bannerImage ? inputs?.bannerImage : uploadImage} id="image1" alt="uploadImage" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                                    </div>
                                    <input
                                        type="file"
                                        id="bannerImage"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                    />
                                    {errors?.bannerImage?.required ? <span className="text-danger text-left form-text profile_error">
                                        This field is required.
                                    </span> : null
                                    }
                                </div>
                                <div className="col-4">
                                    <label className="mb-2">Event/WorkShop Image 1</label>
                                    <div className='card pointer align-items-center' onClick={handleCardClick} >
                                        <img src={inputs?.eventImage1 ? inputs?.eventImage1 : uploadImage} id="image2" alt="uploadImage" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                                    </div>

                                    <input
                                        type="file"
                                        id='eventImage1'
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    /></div>
                                <div className="col-4">
                                    <label className="mb-2">Event/WorkShop Image 2</label>
                                    <div className='card pointer align-items-center' onClick={handleCardClick} >
                                        <img src={inputs?.eventImage2 ? inputs?.eventImage2 : uploadImage} id="image3" alt="uploadImage" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                                    </div>

                                    <input
                                        type="file"
                                        id="eventImage2"
                                        style={{ display: 'none' }}
                                        accept="image/*" onChange={handleFileChange}
                                    /></div>
                            </div>
                            <div className="row g-3 mt-2">
                                <div className="col-6">
                                    <TextField fullWidth
                                        label="Title"
                                        name='title' onChange={handleInputs} value={inputs?.title} />
                                    {errors?.title?.required ? <span className="text-danger text-left form-text profile_error">
                                        This field is required.
                                    </span> : null
                                    }
                                </div>
                                <div className="col-6">
                                    <Autocomplete fullWidth
                                        disablePortal
                                        multiple
                                        id="combo-box-demo"
                                        options={category}
                                        getOptionLabel={(option) => option.category}
                                        limitTags={1}
                                        value={category?.filter((option) => inputs?.category?.includes(option._id))}
                                        onChange={handleCategory}
                                        renderInput={(params) => <TextField {...params} name="category" label="Category" placeholder='Categories' />}
                                    />
                                    {errors?.category?.required ? <span className="text-danger text-left form-text profile_error">
                                        This field is required.
                                    </span> : null
                                    }
                                </div>
                                <div className="col-6 mt-4">
                                    <FormControl fullWidth >
                                        <InputLabel id="event-type-label">Event/WorkShop Type</InputLabel>
                                        <Select
                                            name='eventType'
                                            labelId="event-type-label"
                                            label="Event/WorkShop Type"
                                            onChange={handleInputs} value={inputs?.eventType}
                                        >
                                            <MenuItem value={'online'}>Online</MenuItem>
                                            <MenuItem value={'offline'}>Offline</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-6">
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer sx={{ bgcolor: 'white' }} components={['DatePicker']}>
                                            <DatePicker label='Date' slotProps={{
                                                textField: {
                                                    readOnly: true, fullWidth: true
                                                },
                                            }} minDate={dayjs(new Date())} format='DD-MM-YYYY' name="date" value={inputs?.date} onChange={handleDateChange} />
                                        </DemoContainer>
                                    </LocalizationProvider></div>
                                <div className="col-6">
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer sx={{ bgcolor: 'white', }} components={['TimePicker']}>
                                            <TimePicker label="From Time" slotProps={{
                                                textField: {
                                                    readOnly: true, fullWidth: true
                                                },
                                            }} name="fromTime" value={inputs?.fromTime} onChange={handleFromTimeChange} />
                                        </DemoContainer>
                                    </LocalizationProvider></div>
                                <div className="col-6">
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer sx={{ bgcolor: 'white' }} components={['TimePicker']}>
                                            <TimePicker label="To Time" slotProps={{
                                                textField: {
                                                    readOnly: true, fullWidth: true
                                                },
                                            }} name="toTime" onChange={handleToTimeChange} value={inputs?.toTime} />
                                        </DemoContainer>
                                    </LocalizationProvider></div>
                                {inputs?.eventType === 'offline' && <div className="col-6 mt-4">
                                    <TextField fullWidth
                                        label="Location"
                                        name='location' onChange={handleInputs} value={inputs?.location} />
                                    {errors?.location?.required ? <span className="text-danger text-left form-text profile_error">
                                        This field is required.
                                    </span> : null
                                    }
                                </div>}

                                <div className="col-6 mt-3">
                                    <label>Price Details</label>
                                    <div className="d-flex align-items-center ">
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="isPaid" onChange={handlePayment} value={inputs?.isPaid}
                                            >
                                                <FormControlLabel value={false} control={<Radio />} label="Free" />
                                                <FormControlLabel value={true} control={<Radio />} label="Paid" />
                                            </RadioGroup>
                                        </FormControl>
                                        {inputs?.isPaid === true && <><TextField type="text" fullWidth className="ms-5"
                                            label="Coins" value={inputs?.coins}
                                            name='coins' onChange={handleNumberInputChange} />
                                            {errors?.coins?.required ? <span className="text-danger text-left form-text profile_error">
                                                This field is required.
                                            </span> : null}</>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <TextField fullWidth
                                        label="Description"
                                        multiline
                                        maxRows={3} name='description' value={inputs?.description} onChange={handleInputs} />
                                </div>
                            </div>
                        </div>
                        <div className='float-end mt-3' >
                            <button type="submit" className="btn btn-primary me-3" >Update</button>
                            <button type="button" className="btn btn-light" onClick={closePopup}  >Cancel</button></div>
                    </form>
                </DialogContent>
            </Dialog >

            <Dialog open={openDelete}>
                <DialogContent>
                    <div className="text-center m-4">
                        <h5 className="mb-4">Are you sure you want to Delete <br /> the selected Event/WorkShop ?</h5>
                        <button type="button" className="btn btn-primary mx-3" onClick={deleteEventDetails}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closeDeletePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )



}

export default EventList;