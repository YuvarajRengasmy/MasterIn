import { Autocomplete, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import uploadImage from '../../Assets/Images/upload.jpg';
import { RiCloseFill } from "react-icons/ri";
import { getAllCategory } from "../../../api/category";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { uploadFile } from "../../../utils/FileUpload";
import { saveEvent } from "../../../api/event";
import { toast } from "react-toastify";
import { getMasterId } from "../../../utils/Storage";

const CreateEvents = ({ event, handleEventClose }) => {

    const initialState = {
        master: getMasterId(),
        title: '',
        type: 'event',
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

    const [category, setCategory] = useState([])
    const [inputs, setInputs] = useState(initialState)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState()

    useEffect(() => {
        getAllCategoryList()
    }, [])

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        if (handleErrors(newError)) {
            inputs.date = new Date(inputs?.date)
            inputs.toTime = new Date(inputs?.toTime)
            inputs.fromTime = new Date(inputs?.fromTime)
            saveEvent(inputs).then((res) => {
                toast.success('Successfully create a event');
                handleClose()
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

    const handleClose = () => {
        setInputs(initialState)
        setErrors(initialStateErrors)
        setSubmitted(false)
        handleEventClose()
    }

    return (
        <>
            <Dialog open={event} fullWidth maxWidth="md">
                <DialogTitle className='text-secondary pb-0'>
                    Create Events/WorkShops<IconButton className="float-end" onClick={handleClose} >
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
                            <button type="submit" className="btn btn-primary me-3" >Submit</button>
                            <button type="button" className="btn btn-light" onClick={handleClose}  >Cancel</button></div>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    )

}

export default CreateEvents;