import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getUserId } from '../../../utils/Storage';
import { getSingleUser } from '../../../api/user';
import { saveBookSession } from '../../../api/bookSession';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { getSingleMaster } from '../../../api/master';

const MasterMeetingSession = ({ id }) => {
  const initialState = {
    user: getUserId(),
    master: id,
    date: dayjs(new Date().setUTCHours(0, 0, 0, 0)),
    time: dayjs(new Date()),
    duration: '30 minutes',
    description: '',
    coins: ''
  }

  const [inputs, setInputs] = useState(initialState)
  const [user, setUser] = useState({})
  const [master, setMaster] = useState({})

  useEffect(() => {
    getUserDetails()
    getMasterDetails()
  }, [])


  const handleInputs = (event) => {
    setInputs({ ...inputs, [event?.target?.name]: event?.target?.value })
  }

  const handleDateChange = (newValue) => {
    setInputs({ ...inputs, date: newValue })
  }

  const handleTimeChange = (newValue) => {
    setInputs({ ...inputs, time: newValue })
  }

  const getUserDetails = () => {
    const user = getUserId()
    getSingleUser(user).then(res => {
      setUser(res?.data?.result)
    }).catch(err => console.log(err))
  }

  const getMasterDetails = () => {
    getSingleMaster(id).then(res => {
      setMaster(res?.data?.result)
    }).catch(err => console.log(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (user?.coins >= master?.sessionCoins || inputs?.duration==='30 minutes') {
      inputs.date = new Date(inputs?.date)
      inputs.coins = inputs?.duration === '1 hour' ? master?.sessionCoins : 0
      inputs.time = new Date(inputs?.time)
      saveBookSession(inputs).then(res => {
        toast.success('Successfully book your slot')
        setInputs(initialState)
      }).catch(err => console.log(err))
    }
    else {
      toast.warning(`You don't have enough coins for this session.`)
    }
  }

  const handleReset = () => {
    setInputs(initialState)
  }

  return (
    <>
      <div className='container-fluid w-100'>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <div>
              <h1 className=" fs-5 text-danger text-center">Book Your Slot!</h1>
              <hr />
            </div>
            <div className='row row-cols-1 row-cols-md-2'>
              <div>
                <label htmlFor="name" className="form-label text-secondary" >Full Name</label>
                <TextField
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder='Enter your name'
                  value={user?.name} disabled
                />
              </div>
              <div >
                <label htmlFor="mobile" className="form-label text-secondary" >Mobile</label>
                <TextField
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder='Enter your phone number'
                  value={user?.mobile} disabled
                />
              </div>
            </div>
            <div className='row row-cols-1 row-cols-md-3 mt-3'>
              <div>
                <label className="form-label text-secondary" >Select Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DemoContainer sx={{ paddingTop: '0', bgcolor: 'white' }} components={['DatePicker']}>
                    <DatePicker slotProps={{
                      textField: {
                        readOnly: true,
                      },
                    }} minDate={dayjs(new Date())} format='DD-MM-YYYY' value={inputs?.date} onChange={handleDateChange} />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                <label className="form-label text-secondary">Select Time</label>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DemoContainer sx={{ paddingTop: '0', bgcolor: 'white' }} components={['TimePicker']}>
                    <TimePicker slotProps={{
                      textField: {
                        readOnly: true,
                      },
                    }} value={inputs?.time} onChange={handleTimeChange} />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                <label className="form-label text-secondary" >Select Duration</label>
                <FormControl fullWidth sx={{ bgcolor: 'white' }}>
                  <Select
                    name='duration'
                    value={inputs?.duration}
                    onChange={handleInputs}
                  >
                    <MenuItem value='30 minutes'>30 minutes</MenuItem>
                    <MenuItem value='1 hour'>1 hour</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="mt-3">
              <label className="form-label text-secondary" >Description</label>
              <TextField
                type="text"
                multiline
                maxRows={3}
                className="form-control"
                name='description'
                placeholder='Description'
                value={inputs?.description}
                onChange={handleInputs}
              />
            </div>
            {inputs?.duration === '1 hour' && <div className='mt-3'>
              <p className='text-danger fs-5 fw-bold small'>*Note : You will need to spend {master?.sessionCoins} coins for this session.</p>
            </div>}
            <div className='mt-4 gap-2 d-flex justify-content-end'>
              <button type='submit' className='btn btn-md btn-success'>
                Schedule Session
              </button>
              <button type='button' onClick={handleReset} className='btn btn-md btn-secondary'>
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default MasterMeetingSession 