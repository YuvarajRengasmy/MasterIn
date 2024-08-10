import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { SlLocationPin } from 'react-icons/sl'

const CompanyPanelProfile = () => {

    return (
        <>
            <div className='container mt-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <span style={{ fontSize: "18px", fontWeight: "500" }}>About</span>
                </div>
                <div className='mt-3'> 
                    <p className='text-secondary mt-2'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae distinctio eius ea quod, iste porro delectus magnam alias minima accusantium error voluptate temporibus quis, sequi assumenda ab blanditiis hic eaque.
                    </p>
                    <p className='text-secondary mt-1 d-flex align-items-center gap-2'>
                        <HiOutlineBuildingOffice /> Pixalive
                    </p>
                    <p className='text-secondary mt-1 d-flex align-items-center gap-2'>
                        <SlLocationPin /> Banglore
                    </p>
                </div>
            </div>
        </>
    )
}

export default CompanyPanelProfile