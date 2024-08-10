import React, { useState } from 'react';
import '../../../Styles/Chat.css';
import { BsChatQuoteFill, BsFillTelephoneFill } from 'react-icons/bs';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { BiSolidMicrophone } from 'react-icons/bi';
import { FaFaceSmile } from 'react-icons/fa6';
import { AiOutlineSend } from 'react-icons/ai';
import Navbar from '../../../Pages/Navbar';
import RightSideFeed from '../../../Pages/RightSideFeed';

const Chat = () => {

    const [messages, setMessages] = useState([
        {
            text: 'Hello, I am the sender!',
            time: '01:00PM',
            isUser: false,
        },
        // Initial user message
        {
            text: 'Hi, I am the user!',
            time: '01:01PM',
            isUser: true,
        },
    ]);

    const [currentMessage, setCurrentMessage] = useState('');

    const handleInputChange = (e) => {
        setCurrentMessage(e.target.value);
    }

    const handleSend = () => {
        if (currentMessage.trim() !== '') {
            const newMessage = {
                text: currentMessage,
                time: new Date().toLocaleTimeString(),
                isUser: true,
            };

            setMessages([...messages, newMessage]);
            setCurrentMessage(''); // Clear the input field
        }
    }

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }


    return (
        <>
            <div className='row'>
                <div className='col-lg-3'>

                </div>
                <div className='col-lg-5 scroll-bar' style={{ overflow: 'auto', maxHeight: 'calc(100vh - 25px)' }}>
                    <div className='container mb-5' >
                       <Navbar />
                        <div className='container-fluid d-flex flex-column border-start border-end gap-2 align-items-center bg-light pb-5 mt-5'>
                            <div className="container  bg-white rounded-2 shadow mt-5 p-2" >
                                <span className="navbar-brand d-flex align-items-center justify-content-center gap-2"><BsChatQuoteFill /> ChatBox</span>
                            </div>
                            <div className='card container-fluid rounded-1 border-0 shadow mx-sm-0 mx-auto mt-3' style={{ maxWidth: '100%' }} >
                                <div className='card-header bg-transparent'>
                                    <div className="navbar navbar-expand p-0">
                                        <ul className="navbar-nav me-auto align-items-center">
                                            <li className="nav-item">
                                                <a href="#!" className="nav-link">
                                                    <div className="position-relative" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #3be818', padding: '2px' }}>
                                                        <img src="https://nextbootstrap.netlify.app/assets/images/profiles/1.jpg"
                                                            className="img-fluid rounded-circle" alt="" />
                                                        <span
                                                            className="position-absolute bottom-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
                                                            <span className="visually-hidden">New alerts</span>
                                                        </span>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="/ProfilePage" className="nav-link">Naruto Uzumaki</a>
                                            </li>
                                        </ul>
                                        <ul className="navbar-nav ms-auto">
                                            <li className="nav-item">
                                                <button className="nav-link">
                                                    <BsFillTelephoneFill />
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button className="nav-link">
                                                    <BsFillCameraVideoFill />
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button className="nav-link">
                                                    <IoClose />
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='card-body p-4' style={{ height: '500px', overflow: 'auto' }}>
                                    {messages.map((message, index) => (
                                        <div key={index} className={message.isUser ? 'd-flex align-items-baseline text-end justify-content-end' : 'd-flex align-items-baseline'}>
                                            {!message.isUser && (
                                                <div className='position-relative avatar'>
                                                    <img src="https://nextbootstrap.netlify.app/assets/images/profiles/1.jpg"
                                                        className="img-fluid rounded-circle" alt="avatar" />
                                                    <span className="position-absolute bottom-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
                                                        <span className="visually-hidden">New alerts</span>
                                                    </span>
                                                </div>
                                            )}
                                            <div className='pe-2'>
                                                <div>
                                                    <div className='card card-text d-inline-block p-2 px-3 m-1'>{message.text}</div>
                                                </div>
                                                <div>
                                                    <div className='small'>{message.time}</div>
                                                </div>
                                            </div>
                                            {message.isUser && (
                                                <div className='position-relative avatar'>
                                                    <img src="https://nextbootstrap.netlify.app/assets/images/profiles/2.jpg"
                                                        className="img-fluid rounded-circle" alt="" />
                                                    <span
                                                        className="position-absolute bottom-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
                                                        <span className="visually-hidden">New alerts</span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className='card-footer  bg-white position-absolute w-100 bottom-0 m-0 p-1 ' style={{ maxWidth: '95%' }}>
                                    <div className='input-group'>
                                        <div className='input-group-text bg-transparent border-0'>
                                            <button className='btn btn-light text-secondary'>
                                                <GrAttachment />
                                            </button>
                                        </div>
                                        <input
                                            type='text'
                                            className='form-control border-0'
                                            placeholder='Write a message...'
                                            value={currentMessage}
                                            onChange={handleInputChange}
                                            onKeyPress={handleInputKeyPress}
                                        />
                                        <div className='input-group-text bg-transparent border-0 gap-2'>
                                            <button className='btn btn-light text-secondary' onClick={handleSend}>
                                                <AiOutlineSend />
                                            </button>
                                            <button className='btn btn-light text-secondary'>
                                                <FaFaceSmile />
                                            </button>
                                            <button className='btn btn-light text-secondary'>
                                                <BiSolidMicrophone />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-3 mt-2'>
                    <RightSideFeed />
                </div>
            </div>
        </>
    )
}

export default Chat;    