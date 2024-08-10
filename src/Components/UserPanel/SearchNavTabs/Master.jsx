import { Dialog, DialogContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import {  getUserId } from '../../../utils/Storage'
import { getSingleUser, updateConnectedUser } from '../../../api/user'
 
const SearchMaster = ({ masters }) => {
  const [userDetails, setUserDetails] = useState({})
  const [open, setOpen] = useState(false)
  const [connectId, setConnectId] = useState(false)
  const [connect, setConnect] = useState(false)

  useEffect(() => {
    getSingleUserDetails()
  }, [])
 
 
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
 
  const openPopup = (user,connect) => {
    setConnectId(user)
    setOpen(true)
    setConnect(connect)

  }
 
  const closePopup = () => {
    setOpen(false)
  }
 
  return (
    <>
      <div className='scroll-bar bg-light ' style={{ overflow: 'scroll', height:'100vh'  }}>
        <div className='container mb-5' >
          <div className='container-fluid d-flex flex-column border-start border-end gap-2 bg-white pb-5 w-75 'style={{minHeight:'100vh'}} >
            <div className='container pb-5'>
              <p className='fw-lighter  my-lg-2 my-5'>About {masters?.length} result's</p>
              <div className='card rounded-4 '>
                {masters?.map((data, index) =>
                  <div key={index} className='container-fluid'>
                    <div className='d-flex flex-wrap align-items-center justify-content-between mt-2 mb-2'>
                      <div className='d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-lg-between mt-2 mb-2'>
                        <div>
                          <img
                            className='img-fluid rounded-circle'
                            src={data?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'}
                            alt="avatar"
                            style={{ width: '4rem', height: '4rem', objectFit: 'cover' }}
                          />
                        </div>
                        <div className='text-center text-lg-start text-md-start'>
                          <Link className='text-decoration-none text-dark'  to={{ pathname: '/PeopleProfile', search: `id=${data?._id}` }}><span className='fw-bold'>{data?.name}</span></Link> <br />
                          {data?.position && <><span className='text-secondary'>{data?.position}</span><br /></>}
                          {data?.location && <><span className='text-secondary'>{data?.location}</span><br /></>}
                          {/* <span className='text-secondary'><a className='text-decoration-none text-dark fw-bold align-items-center' href='/ProfilePage' style={{ fontSize: '12px' }}><FaUserFriends /> Bumble Bee</a> is a mutual connection</span> */}
                        </div>
                      </div>
                      <div className='d-flex mx-auto mx-lg-0'>
                      {userDetails?.connectedUsers?.some(x => x?.user === data?._id) ? 
                       (userDetails?.connectedUsers?.some(x => x?.user === data?._id && x?.isConnect === true) ?
                      <button className='btn btn-success rounded-3 px-3 py-1 ' onClick={() => openPopup(data?._id,data?.isPublic)}>Connected</button> :
                          <button className='btn btn-secondary rounded-3 px-3 py-1 ' onClick={() => openPopup(data?._id,data?.isPublic)} >Request</button>):
                          <button className='btn btn-primary rounded-3 px-3 py-1 ' onClick={() => openPopup(data?._id,data?.isPublic)} >Connect</button>}
                      </div>
                    </div>
                    <hr />
                  </div>)}
              </div>
            </div>
          </div>
 
        </div>
      </div>
 
      <Dialog open={open}>
                <DialogContent>
                    <div className="text-center m-4">
                        {userDetails.connectedUsers?.some(x => x?.user === connectId) ?
                        (userDetails.connectedUsers?.some(x=>x?.user===connectId && x?.isConnect===true)?
                         <h5 className="mb-4">Are you sure you want to Remove <br /> the Connected User ?</h5> :
                         <h5 className="mb-4">Are you sure you want to Remove <br /> the Requested User ?</h5> ):
                            <h5 className="mb-4">Are you sure you want to Connect <br /> the selected User ?</h5>}
                        <button type="button" className="btn btn-primary mx-3" onClick={handleConnecting}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>
    </>
  )
}
 
export default SearchMaster