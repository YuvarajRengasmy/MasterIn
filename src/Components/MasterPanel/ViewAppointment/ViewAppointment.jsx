import React, { useEffect, useState } from 'react'
import Navbar from '../../../Pages/Navbar'
import { getSingleBookSession } from '../../../api/bookSession'
import { useLocation } from 'react-router-dom'
import { localDate } from '../../../utils/dateformat'
import moment from 'moment'

const ViewAppointment = () => {
  const [details, setDetails] = useState({})
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')

  useEffect(() => {
    getBookSessionDetails()
  }, [])

  const getBookSessionDetails = () => {
    getSingleBookSession(id).then(res => {
      const result = res?.data?.result
      result.startTime = new Date(result?.time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const endTime = result.duration === '1 hour' ? moment(result?.time).add(1, 'hour').toDate() : moment(result?.time).add(30, 'minutes').toDate()
      result.endTime = new Date(endTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setDetails(result)
    }).catch(err => console.log(err))
  }

  return (
    <div className='col-lg-8 col-md-8 scroll-bar mx-auto ' style={{ overflow: 'auto' }}>
      <div className='d-flex align-items-center'>
        <div className='container' >
          <Navbar />
          <div className='container d-flex flex-column border-start border-end gap-2 align-items-center mt-5' style={{ minHeight: 'calc(200vh - 100px)' }} >
            <div className='container-fluid d-flex flex-column justify-content-center mt-5  p-0 shadow rounded-3'>
              <div className="card w-100   border-0 " style={{ objectFit: 'cover' }} >
                {/* ProfilePage Banner */}

                <img className='img-fluid rounded-top-3' src={details?.user?.backgroundImage ?details?.user?.backgroundImage : 'https://i.pinimg.com/564x/7a/c0/5b/7ac05bd582cb302b4486a19357084670.jpg'} alt="BackgroundImage" style={{ height: '250px', objectFit: 'cover' }} />
                <div className="card-img-overlay card-image">
                  <div className='profile-image'>
                    {/* Profile Image Outside */}
                    <img id="profileImageOutsideModal" src={details?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} className='img-fluid rounded-circle' style={{ width: "10rem", height: "10rem", border: '2px solid #ffffff', position: 'absolute', top: '75%', left: '12%', transform: 'translate(-50%, -50%)', objectFit: 'cover' }} alt="avatar" />
                  </div>
                </div>
              </div>
              <div className='container p-4 d-flex  flex-wrap justify-content-between  align-items-center'>
                <div className='' >
                  <small className='fs-5 fw-bold'>{details?.user?.name}</small> <br />
                  <small className='text-secondary'>{details?.user?.position}</small> <br />
                  <small className='text-secondary'>{details?.user?.location}</small>
                </div>
                <div className='container-fluid mt-4'>
                  <div className='card border-0 shadow-sm rounded-4' style={{ background: '#E6EEF2' }}>
                    <div className='card-body' >
                      <p className='fw-bolder fs-5' style={{ color: '#4C84C3' }}>About</p>
                      <small className='text-secondary'>
                        {details?.user?.description?details?.user?.description:'There is no Content'}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='container mt-4 mb-3'>
              <p className='fw-bolder fs-5 mt-3 text-start' style={{ color: '#4C84C3' }}>Booking Details</p>
              <div className='row   mt-5 p-0 shadow rounded-3'>
                {/* Form */}
                <div className='col-lg-6'>
                  <div className='container p-2'>
                    <div className='d-flex flex-column justify-content-between align-items-center'>
                      <div className='container-fluid p-2'>
                        <div className="mt-3">
                          <label htmlFor="name" className="form-label small">Name and Surname</label>
                          <input
                            type="text"
                            className="form-control bg-secondary bg-opacity-10 border-0"
                            id="name"
                            placeholder='Name and Surname' readOnly
                            style={{ fontSize: '12px' }}
                            value={details?.user?.name}
                          />
                        </div>
                        <div className="mt-3">
                          <label htmlFor="email" className="form-label small">Email Address</label>
                          <input
                            type="email"
                            className="form-control bg-secondary bg-opacity-10 border-0"
                            id="email"
                            placeholder='Email Address' readOnly
                            style={{ fontSize: '12px' }}
                            value={details?.user?.email}
                          />
                        </div>
                        <div className="mt-3">
                          <label htmlFor="mobile" className="form-label small">Mobile Number</label>
                          <input
                            type="text"
                            className="form-control bg-secondary bg-opacity-10 border-0"
                            id="mobile"
                            placeholder='Mobile Number' readOnly
                            style={{ fontSize: '12px' }}
                            value={details?.user?.mobile}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Booking Period */}
                <div className='col-lg-6 align-items-center d-flex mb-lg-0 mb-4 mt-lg-5'>
                  <div className='container'>
                    <div className='container-fluid d-flex flex-column justify-content-center text-white lh-lg  rounded-3' style={{ background: '#4C84C3', height: '13rem' }}>
                      <p className='fw-bolder text-center fs-6'>Booking Period</p>
                      <hr className='text-white' />
                      <div className='row  fw-bold' style={{ fontSize: '12px' }}>
                        <small className='col-6 text-end'>Date :</small>
                        <small className='col-6'>{localDate(details?.date)}</small>
                      </div>
                      {/* <div className='d-flex justify-content-lg-around justify-content-sm-around justify-content-between fw-bold' style={{ fontSize: '12px' }}>
                        <small>Day:</small>
                        <small>Tuesday</small>
                      </div> */}
                      <div className='row fw-bold' style={{ fontSize: '12px' }}>
                        <small className='col-6 text-end' > Start Time :</small>
                        <small className='col-6 '>{details?.startTime}</small>
                      </div>
                      <div className='row fw-bold' style={{ fontSize: '12px' }}>
                        <small className='col-6 text-end' > End Time :</small>
                        <small className='col-6 '>{details?.endTime}</small>
                      </div>
                      <div className='row fw-bold' style={{ fontSize: '12px' }}>
                        <small className='col-6 text-end' > Duration :</small>
                        <small className='col-6 '>{details?.duration}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='container-fluid my-4'>
                  <div className='card border-0 shadow-sm rounded-4' style={{ background: '#E6EEF2' }}>
                    <div className='card-body' >
                      <p className='fw-bolder fs-5' style={{ color: '#4C84C3' }}>Description</p>
                      <small className='text-secondary'>
                        {details?.description?details?.description:'There is no Content'}
                      </small>
                    </div>
                  </div>
                </div>
                {/* <div className="d-flex flex-wrap justify-content-center gap-5 mt-5 mb-5">
                  <button className="btn col-lg-4" type="button" style={{ background: '#fa8b02', color: 'white' }}>Confirm Appointment</button>
                  <button className="btn col-lg-4" type="button" style={{ background: '#e26969', color: 'white' }}>Reject Appointment</button>
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAppointment