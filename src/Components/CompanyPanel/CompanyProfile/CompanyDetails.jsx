import { CiLinkedin } from 'react-icons/ci'
import { SiGnuprivacyguard } from 'react-icons/si'
import { Link } from 'react-router-dom'
import CompanyProfileEdit from './CompanyProfileEdit'
const CompanyDetails = () => {

  
    return (
        <div className='container'>
            <div className='card shadow border-0 p-3'>
                <CompanyProfileEdit   />
                <div className="mb-2 ">
                            {/* Banner Image */}
                            <img src='https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/empty-banner.svg' className="card-img-top img-fluid rounded-top-2" alt="bannerImage" style={{ maxHeight: '6rem', objectFit: 'cover' }} />

                            {/* Profile Image */}
                            <div className="position-absolute top-55 start-50 translate-middle">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="rounded-circle img-fluid mx-auto" alt="profileImage" style={{ width: '7rem', height: '7rem', objectFit: 'cover' }} />
                            </div>
                        </div>
                <span className='text-center mt-5' style={{ fontSize: "25px", fontWeight: "500" }}>Kailash Rajkumar</span>
                <p className='text-center text-secondary mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi fugit ex expedita consectetur unde alias molestiae illo, placeat nesciunt optio. Animi repellat a praesentium voluptatem consectetur minus nemo aspernatur voluptas.</p>
                <div>
                    <span className='text-secondary fw-bolder'>SOCIAL LINKS</span>
                    <div className='d-flex align-items-center gap-2 mt-2'>
                        <Link to='https://www.linkedin.com' target='_blank' className='text-decoration-none d-flex align-items-center text-secondary'><CiLinkedin className='fs-4 text-dark '/>LinkedIn</Link>
                        {/* <Link to=''><VscGithub className='fs-4 text-dark' /></Link> */}
                    </div>
                </div>
                <div className='card border-0 p-2 mt-3' style={{ backgroundColor: "#f1f1f4" }}>
                    <div className='card-body'>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <span className='fs-5' style={{ fontWeight: "500" }}>Private Info</span>
                            <small class="badge bg-white rounded-5 text-secondary p-2"><SiGnuprivacyguard className='text-dark' /> only visible to you</small>
                        </div>
                        <div className=''>
                            <p className='text-secondary mt-2'>Mobile:- 93446853886</p>
                            <p className='text-secondary mt-2'>Email:- kailashrajkumar14@gmail.com</p>
                            <p className='text-secondary mt-2'>Position:- Developer</p>
                            <p className='text-secondary mt-2'>Location:- Banglore</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDetails;