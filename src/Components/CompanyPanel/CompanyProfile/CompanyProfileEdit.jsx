import { MdEdit } from 'react-icons/md';
import { AiFillCamera } from 'react-icons/ai';


const CompanyProfileEdit = () => {

    return (
        <>
            <div className='d-flex align-items-center justify-content-end mb-1 '>
                <a className="btn btn-sm btn-light border-0" type="button" data-bs-toggle="offcanvas" href="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                    <MdEdit />
                </a>
            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptions" data-bs-backdrop="static" >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Edit Profile</h5>
                    <button type="button"  className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div>
                            <div className='text-center'>
                                <label htmlFor='BanerImageInput' className='profile-image-label' style={{ width: '100%' }}>
                                    {/* Banner Image */}
                                    <img
                                        src='https://webalive-adearns.s3.ap-south-1.amazonaws.com/masterIn/backgroundImage/empty-banner.svg'
                                        className="card-img-top img-fluid rounded-top-2"
                                        alt="bannerImage"
                                        style={{ maxHeight: '6rem',objectFit:'cover'}} />
                                    <AiFillCamera size={20} style={{ cursor: 'pointer', marginTop: '55px', marginLeft: '-25px' }} />

                                </label>
                                <input
                                    type="file"
                                    id="BanerImageInput"
                                    name="backgroundImage"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />

                                <label htmlFor="profileImageInput" className='profile-image-label'>
                                    {/* Profile Image */}
                                    <div className="position-relative top-55 start-50 translate-middle">
                                        <img
                                            id="fileInput"
                                            src='https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'
                                            width={80} height={70}
                                            className="rounded-circle img-fluid"
                                            alt="media"
                                            style={{ objectFit: 'cover', cursor: 'pointer', width: '5rem', height: '5rem' }}
                                        /> <AiFillCamera size={20} style={{ cursor: 'pointer', marginTop: '55px', marginLeft: '-20px' }} />

                                    </div>

                                </label>
                                <input
                                    type="file"
                                    id="profileImageInput"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />
                            </div>
                            <div>
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Full Name<span className="text-danger">*</span></label>
                                <input type="text" className="form-control border-top-0 border-end-0 border-start-0" id="exampleInputName" name="name" />
                            </div>

                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Position<span className="text-danger">*</span></label>
                                <input type="text" name='position' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="React Js Developer"></input>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Mobile<span className="text-danger">*</span></label>
                                <input type="text" name="mobile" className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="enter the number"></input>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Email<span className="text-danger">*</span></label>
                                <input type="text" name='email' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="optimuzprime@example.com"></input>
                            </div>

                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Location<span className="text-danger">*</span></label>
                                <input type="text" name='location' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="Enter your location"></input>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Linkedin</label>
                                <input type="text" name='link' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="https://www.optimuz.com"></input>
                            </div>
                            <div className="mt-3">
                                <label htmlFor="formControlInput" className="form-label" style={{ fontSize: "18px", fontWeight: "500" }}>Description</label>
                                <input type="text" name='description' className="form-control border-top-0 border-end-0 border-start-0" id="formControlInput" placeholder="Enter the Description"></input>

                            </div>
                            <div className="mt-5 mb-3 d-flex flex-wrap justify-content-end gap-2 align-items-center">
                                <button className='btn btn-primary' type='submit'>Update</button>
                                <button className='btn btn-outline-danger' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CompanyProfileEdit