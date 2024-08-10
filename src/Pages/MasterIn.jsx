import React, { useEffect } from 'react'
import '../Styles/MasterIn.css';

import Header from './Header';
import Footer from './Footer';

import Aos from 'aos';
import 'aos/dist/aos.css';

import { IoMdCheckmark } from 'react-icons/io';
import { isAuthenticated } from '../utils/Auth';
import { Navigate } from 'react-router-dom';
import { getLoginType } from '../utils/Storage';

const MasterIn = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    if (isAuthenticated()) {
        const type = getLoginType()
        if(type==='master'){ return <Navigate to="/Home" />}
        else if(type==='user'){return  <Navigate to="/UserHome" />}
        else{return <Navigate to="/Home" />}  
    }
    return (
        <div className='overflow-hidden'>
            <Header />
            <div className='scroll-bar container d-flex justify-content-center align-items-center' style={{ marginTop: '10rem' }}>
                <div className='row mt-5 align-items-center  home-page mx-auto'>
                    <div data-aos='zoom-in' className='col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-ld-start justify-content-md-start justify-content-center'>
                        <p className='fw-bolder fs-lg-1 fs-2 fs-md-3' style={{ fontSize: '4rem' }}>Build your <span className='text'>network</span></p>
                        <p className='text-secondary' style={{ fontSize: '1.5rem' }}>Join 20K+ members on MasterIN changing the networking game, one verification at a time.</p>
                        <a className='text-decoration-none btn-1 btn rounded-5 p-3' href="/SignUp" style={{ maxWidth: '10rem', minWidth: '15rem' }}>Join MasterIN</a>
                    </div>
                    <div data-aos='zoom-in' className='col-lg-6 col-md-6 col-12 mt-lg-0 mt-5 d-flex justify-content-center'>
                        <img className='img-fluid rounded-5 anime-img' src="https://i.pinimg.com/564x/6f/be/9e/6fbe9eede13753c0b7b3ea423ea52192.jpg" alt="" />
                    </div>
                </div>
            </div>

            <div className='container mt-5 mb-5'>
                <p className='text-secondary fs-5'>
                    See who’s connecting on MasterIn
                </p>
                <div className='row '>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <div data-aos='fade-up' className='d-flex gap-1'>
                            <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef4f99829dccb61d0cc1e_amazon-logo.svg" alt="CompanyImage" />
                            <div className='d-flex flex-wrap'>
                                <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef5105a6b6bceb4223639_user-image-6-min.png" alt="dummyImage" style={{ width: '4rem', maxWidth: '100%', display: 'inline-block', marginRight: '-1.4rem' }} />
                                <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef511b5fa37c0ebec5e15_user-image-7-min.png" alt="dummyImage" style={{ width: '4rem', maxWidth: '100%', display: 'inline-block', marginRight: '-1.4rem' }} />
                                <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef5116f3186c4eb0c49dd_user-image-8-min.png" alt="dummyImage" style={{ width: '4rem', maxWidth: '100%', display: 'inline-block', marginRight: '-1.4rem' }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <div data-aos='fade-up' className='d-flex gap-1'>
                            <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef4fa5fd23352ab4d3777_toronto-uni-logo.svg" alt="CompanyImage" />
                            <div className='d-flex flex-wrap'>
                                <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef50e9829dccb61d0ee8b_user-image-3-min.png" alt="dummyImage" style={{ width: '4rem', maxWidth: '100%', display: 'inline-block', marginRight: '-1.4rem' }} />
                                <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef50f8bec5d555e7ccbde_user-image-4-min.png" alt="dummyImage" style={{ width: '4rem', maxWidth: '100%', display: 'inline-block', marginRight: '-1.4rem' }} />
                                <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef510f8883627f8aefbb7_user-image-5-min.png" alt="dummyImage" style={{ width: '4rem', maxWidth: '100%', display: 'inline-block', marginRight: '-1.4rem' }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <div data-aos='fade-up' className='d-flex gap-1'>
                            <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef4fab3ab6d8b20612e54_waterloo-uni-logo.svg" alt="CompanyImage" />
                            <div className='d-flex flex-wrap'>
                                <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef50e10d25f591edea552_user-image-min.png" alt="dummyImage" style={{ width: '4rem', maxWidth: '100%', display: 'inline-block', marginRight: '-1.4rem' }} />
                                <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef50f085eaf1f1f591b06_user-image-1-min.png" alt="dummyImage" style={{ width: '4rem', maxWidth: '100%', display: 'inline-block', marginRight: '-1.4rem' }} />
                                <img src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/64fef50f3c93b0af27d3f814_user-image-2-min.png" alt="dummyImage" style={{ width: '4rem', maxWidth: '100%', display: 'inline-block', marginRight: '-1.4rem' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container card-container'>
                <p data-aos='zoom-out-up' className='fs-1 fw-bolder text-center'>Take your career to new <br /> heights</p>
                <p data-aos='zoom-out-up' className=' text-center text-secondary'>
                    Showcase your unique personal brand and skills, not just your resume.
                </p>
                <div className='container mt-5 rounded-3 shadow rounded-4 p-3 Home-cardImage'>
                    <span className='bg-white rounded-5 p-2 text-primary fw-bolder shadow-sm'>Awards</span>
                    <div className='row mt-4'>
                        <div data-aos='zoom-in-up' className='col-lg-4 col-md-4 col-12 p-3'>
                            <p className='fw-bolder fs-4'>Receive verifiable awards</p>
                            <p>Enhance your profile with on-chain awards and <br /> credentials, showcasing your expertise</p>
                        </div>
                        <div data-aos='zoom-out-up' className='col-lg-8 col-md-8 col-12 d-flex justify-content-center home-page'>
                            <img className='img-fluid w-lg-100 w-50 anime-img' src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/6500940252099402b2f12a6b_card-image-2-min.png" alt="CardImage" style={{ display: 'inline-block', marginRight: '-5rem' }} />
                            <img className='img-fluid w-lg-100 w-50 anime-img' src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/650093f801de7b5ec3ac6c60_card-image-1-min-p-500.png" alt="CardImage" style={{ display: 'inline-block', marginRight: '-5rem' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row gap-2 d-flex justify-content-center'>
                    <div data-aos="zoom-out-right" className='col-lg-5 col-md-5 mt-5'>
                        <div className='card border-0 rounded-4 shadow-lg bg-white p-4' style={{ height: '35rem' }}>
                            <span className='bg-white rounded-5 p-2 text-success fw-bolder mt-3 text-center shadow d-inline'>Profile</span>
                            <p className='fw-bolder fs-4 mt-5'>Verify your experience</p>
                            <p className='text-secondary'>Validate your journey by asking current and former colleagues to verify your experience.</p>
                            <img className='img-fluid' src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/65009e738e0c284ad756edc8_card2-image-p-500.png" alt="Card" />
                        </div>
                    </div>
                    <div data-aos="zoom-out-left" className='col-lg-5 col-md-5 mt-5'>
                        <div className='card border-0 rounded-4 shadow-lg bg-white p-4' style={{ height: '35rem' }}>
                            <span className='bg-white rounded-5 p-2 text-primary fw-bolder  mt-3 text-center shadow'>Video</span>
                            <p className='fw-bolder fs-4 mt-5'>Build social proof</p>
                            <p className='text-secondary'>Let your personality shine through video intro's that confirm your real identity.</p>
                            <img className='img-fluid' src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/65009edb8c98efacbb6ead8c_card-3-image-p-500.png" alt="Card" />
                        </div>
                    </div>
                </div>
            </div>

            <div data-aos="zoom-in-up"  className='container mt-5 text-center'>
                <p className='fw-bolder fs-1'>Loop into a <span className='text-color'>trusted community</span> </p>
                <p className='mt-5 fs-5'>Unlock opportunities, make connections,<br /> and launch your career.</p>
            </div>

            <div className='container home-nav-tabs mt-5'>
                <nav>
                    <div data-aos='zoom-in-up' className="nav nav-pills nav-home mb-3 shadow" id="nav-tab" role="tablist">
                        <button className="nav-link pill-tab active fw-bolder text-dark" id="nav-individual-tab" data-bs-toggle="tab" data-bs-target="#nav-individual" type="button" role="tab" aria-controls="nav-individual" aria-selected="true">Individual</button>
                        <button className="nav-link pill-tab fw-bolder text-dark" id="nav-company-tab" data-bs-toggle="tab" data-bs-target="#nav-company" type="button" role="tab" aria-controls="nav-company" aria-selected="false">Company</button>
                    </div>
                </nav>
                <div className="tab-content p-3" id="nav-tabContent">
                    <div data-aos="zoom-in" className="tab-pane fade active show" id="nav-individual" role="tabpanel" aria-labelledby="nav-individual-tab">
                        <p className='fw-bolder fs-4 text-center'>For individuals</p>
                        <div className='d-flex  gap-3 justify-content-center'>
                            <p><IoMdCheckmark className='text-primary fw-bolder' /></p>
                            <p className='text-secondary'> Stay in the loop with Ribbon's feed, keeping tabs on your peers' achievements.</p>
                        </div>
                        <div className='d-flex  gap-3 justify-content-center'>
                            <p><IoMdCheckmark className='text-primary fw-bolder' /></p>
                            <p className='text-secondary'> Customized profile with verified experience, creative avatars, and video introductions.</p>
                        </div>
                        <div className='d-flex  gap-3 justify-content-center'>
                            <p><IoMdCheckmark className='text-primary fw-bolder' /></p>
                            <p className='text-secondary'> Embrace your journey. Ribbon awards are yours, always accessible.</p>
                        </div>
                        <img data-aos="flip-up" className='img-fluid d-flex justify-content-center align-items-center w-50 mx-auto' src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/6509a1705596fea69cb78102_tab-illustration-min-p-1080.png" alt="cardImage" />
                    </div>
                    <div data-aos="zoom-in" className="tab-pane fade" id="nav-company" role="tabpanel" aria-labelledby="nav-company-tab">
                        <p className='fw-bolder fs-4 text-center'>For companies</p>
                        <div className='d-flex  gap-3 justify-content-center'>
                            <p><IoMdCheckmark className='text-primary fw-bolder' /></p>
                            <p className='text-secondary'> Onboard and invite your team to start rewarding them for their milestones.</p>
                        </div>
                        <div className='d-flex  gap-3 justify-content-center'>
                            <p><IoMdCheckmark className='text-primary fw-bolder' /></p>
                            <p className='text-secondary'> Celebrate professional achievements by sending verifiable on-chain Ribbon awards.</p>
                        </div>
                        <div className='d-flex  gap-3 justify-content-center'>
                            <p><IoMdCheckmark className='text-primary fw-bolder' /></p>
                            <p className='text-secondary'> Showcase your organizations accomplishments and milestones.</p>
                        </div>
                        <img data-aos="flip-up" className='img-fluid d-flex justify-content-center align-items-center w-50 mx-auto' src="https://assets-global.website-files.com/63b6c43d8a44f00d7d134ee6/6500a188ed73447224c33298_company-image-min.png" alt="cardImage" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default MasterIn;