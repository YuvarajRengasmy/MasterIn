
import UserNavbar from '../../../Pages/UserNavbar'
import React from 'react'
import '../../../Styles/UserProfile.css'
import CompanyJob from './CompanyJob'
// import UserPeopleExperience from './UserPeopleExperience'
import CompanyDetails from './CompanyDetails'

const UserPeopleProfile = () => {

  return (
    <>

      <div className='scroll-bar'>
        <div className='container mb-5' >
          <UserNavbar />
          <div className='container-fluid d-flex flex-column border-start border-end gap-2  bg-white mt-5'>
            <div className='row gap-lg-2 gap-md-2 gap-2 p-0 mt-5 d-flex justify-content-center'>
              <div className='container mt-5'>
                <div className='row'>
                  <div className='col-lg-4'>
                    <CompanyDetails />
                  </div>
                  <div className='col-lg-8 scroll-hide' style={{ maxHeight: 'calc(100vh - 50px)', overflow: 'auto'}}>
                      <CompanyJob /> 
                      {/* <UserPeopleEducation />
                      <UserPeopleExperience /> */}
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

export default UserPeopleProfile