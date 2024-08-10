import React from 'react'
import { Link } from 'react-router-dom'


const SearchPeoples = ({ peoples }) => {

  return (
    <>
      <div className='scroll-bar bg-light ' style={{ overflow: 'scroll',height:'100vh' }}>
        <div className='container mb-5' >
          <div className='container-fluid d-flex flex-column border-start border-end gap-2 bg-white  pb-5 w-75' style={{minHeight:'100vh'}} >
            <div className='container pb-5'>
              <p className='fw-lighter  my-lg-2 my-5'>About {peoples?.length} result's</p>
              <div className='card rounded-4 '>
                {peoples?.map((data, index) =>
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
                          <Link className='text-decoration-none text-dark' to={{ pathname: '/PeopleProfile', search: `id=${data?._id}` }}><span className='fw-bold'>{data?.name}</span></Link> <br />
                          {data?.position && <><span className='text-secondary'>{data?.position}</span><br /></>}
                          {data?.location && <><span className='text-secondary'>{data?.location}</span><br /></>}
                          {/* <span className='text-secondary'><a className='text-decoration-none text-dark fw-bold align-items-center' href='/ProfilePage' style={{ fontSize: '12px' }}><FaUserFriends /> Bumble Bee</a> is a mutual connection</span> */}
                        </div>
                      </div>

                    </div>
                    <hr />
                  </div>)}
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default SearchPeoples