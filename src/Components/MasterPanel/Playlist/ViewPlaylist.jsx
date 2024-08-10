import React, { useEffect, useState } from 'react'
import '../../../Styles/ViewPlaylist.css'
import { RiCloseFill, RiPlayList2Line } from 'react-icons/ri'
import LeftSideFeed from '../../../Pages/LeftSideFeed'
import Navbar from '../../../Pages/Navbar'
import { HiHandThumbUp, HiOutlineHandThumbUp } from 'react-icons/hi2'
import { LuMessagesSquare } from 'react-icons/lu'
import { IoShareSocial } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { getSinglePlayList } from '../../../api/playlist'
import { timeCal } from '../../../utils/dateformat'
import { FaPlay } from 'react-icons/fa6'
import { AiOutlineSend } from 'react-icons/ai'
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { getMasterId } from '../../../utils/Storage'
import { getSinglePost, saveLikes, savePostComments } from '../../../api/post'
import { getSingleMaster } from '../../../api/master'
import { toast } from 'react-toastify'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
const ViewPlaylist = () => {
    const location = useLocation()
    const id = new URLSearchParams(location.search).get('id')
    const [playList, setPlayList] = useState([])
    const [playVideo, setPlayVideo] = useState({})
    const [userId, setUserId] = useState()
    const [postLikes, setPostLikes] = useState('')
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState()
    const [share, setShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const user = getMasterId()
        setUserId(user)
        getPlayListDetails()
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        const data = getMasterId()
        getSingleMaster(data)
            .then((res) => {
                const result = res?.data?.result
                setUser(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getPlayListDetails = () => {
        getSinglePlayList(id).then(res => {
            const result = res?.data?.result
            setPlayList(result)
            setPlayVideo(result?.post[0])
        }).catch(err => console.log(err))
    }

    const handlePlayList = (data) => {
        setPlayVideo(data)
    }

    const toggleCommentBox = () => {
        setShowCommentBox((prev) => !prev);
    };

    const savePostLikes = (postId, like) => {
        if (like === 'add') {
            setPostLikes(postId)
        }
        else { setPostLikes('') }
        const data = {
            _id: postId,
            likes: {
                user: userId, modelType: 'Master'
            }
        }
        saveLikes(data).then(res => {
            singlePost(postId)
        }).catch(err => {
            console.log(err);
        })
    }

    const singlePost = (postId) => {
        getSinglePost(postId).then(res => {
            const result = res?.data?.result
            setPlayVideo(result)
        }).catch(err => {
            console.log(err);
        })
    }

    const handleMessage = (event) => {
        setMessage(event?.target?.value)
    }

    const handleComments = (id) => {
        if (message) {
            const data = {
                _id: id,
                comment: {
                    comments: message,
                    user: userId,
                    modelType: 'Master'
                }
            }
            savePostComments(data).then(res => {
                setMessage('')
                singlePost(id)
            }).catch(err => { console.log(err) })
        }
        else {
            toast.warning('Please enter the comment')
        }
    }

    const openSharePopup = (url, content) => {
        setShareUrl(url);
        setContent(content)
        setShare(true)
    };
    const closeSharePopup = () => {
        setShare(false);
    };

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <LeftSideFeed />
                    </div>

                    {/* Middle */}
                    <div className='col-lg-6 col-12 col-sm-12 col-md-12'>
                        <div className=''>
                            <div className='container'>
                                <Navbar />
                                <div className='container d-flex flex-column border-start border-end gap-2 align-items-center bg-light mt-5 p-2' style={{ height: 'max-content', minHeight: 'max-content' }} >
                                    <div className='container post-create rounded bg-white border p-3 mb-3 mt-5'>
                                        {/* Playlist Thumbnail and details */}
                                        <div className='d-flex align-items-center justify-content-center w-100'>
                                            <div className='rounded-4 shadow-sm w-100'>
                                                <div className='thumbnail-card  mt-3'>
                                                    <video src={playVideo?.url} className='img-fluid rounded  card-img w-100' controls style={{ maxHeight: '350px', objectFit: 'contain' }} />
                                                </div>
                                                <div className='card-body mt-2 pt-0 p-2 pb-0 small'>
                                                    <div className='d-flex align-items-center justify-content-lg-between justify-content-between'>
                                                        <span className='fw-bolder fs-5 text-uppercase'>{playVideo?.title}</span>
                                                        <div className='d-flex gap-2'>
                                                            <button className='btn rounded-5 border-0' type="button">
                                                                {postLikes === playVideo?._id || playVideo?.likes?.some(x => x.user === userId) ?
                                                                    <HiHandThumbUp color='blue' onClick={() => savePostLikes(playVideo?._id, 'remove')} /> :
                                                                    <HiOutlineHandThumbUp onClick={() => savePostLikes(playVideo?._id, 'add')} />}
                                                                <span className="number ps-1">{playVideo?.likeCount} </span>
                                                            </button>
                                                            <button className='btn rounded-5 border-0' type="button" onClick={toggleCommentBox}><LuMessagesSquare />
                                                                <span className="number ps-1"> {playVideo?.commentCount}</span></button>
                                                            <button className='btn rounded-5 border-0' type="button" onClick={() => openSharePopup(playVideo?.url, playVideo?.description)}><IoShareSocial /></button>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex flex-column mt-2'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='d-flex align-items-center gap-2 pointer'>
                                                                <img className='img-fluid rounded-circle' src={playList?.user?.image ? playList?.user?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="profile" style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                                                                <span className='fw-lighter fs-6'>{playList?.user?.name}</span>
                                                            </div>
                                                            <div>
                                                                <span className='text-secondary opacity-75'>{timeCal(playVideo?.createdOn)}</span>
                                                            </div>
                                                        </div>
                                                        <p className='mt-2'>
                                                            {playVideo?.description}
                                                        </p>
                                                        <span className='text-primary'>
                                                            {playVideo?.hashtag?.split(' ')?.map((hash, index) =>
                                                                <Link to='/Search' state={hash} key={index} className='text-decoration-none'>
                                                                    {hash + ' '}
                                                                </Link>)}
                                                        </span>
                                                    </div>
                                                    {/* Comment Input Box */}
                                                    <div className='card border border-0 w-100 mt-1'>
                                                        {showCommentBox && (
                                                            <>
                                                                <div className='card-lg-body'>
                                                                    {playVideo?.comment?.map((data, index) =>
                                                                        <div className='d-flex align-items-center mt-2' key={index}>
                                                                            <img className='img-fluid rounded-circle' src={data?.user?.image ? playVideo?.comment?.user?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} />
                                                                            <div className='container rounded-4'>
                                                                                <div className='card rounded-4 w-100 p-2'>
                                                                                    <div className='card-title'>
                                                                                        <div className='d-flex flex-wrap align-items-center justify-content-between mt-2'>
                                                                                            <span className='fw-bolder'>{data?.user?.name}</span>
                                                                                            <span>{timeCal(data?.createdOn)}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <span>{data?.comments}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>)}
                                                                </div>
                                                                <div className='card-body p-2 d-flex align-items-center mb-3 gap-2'>
                                                                    <img className='img-fluid rounded-circle' src={user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="profile" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                                                    <div className='input-group flex-grow-1'>
                                                                        <input type='text' placeholder='Write a comment...' className='form-control' value={message} onChange={handleMessage} />
                                                                        <button className='btn btn-sm btn-primary border-0' type='button' onClick={() => handleComments(playVideo?._id)}><AiOutlineSend /></button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className='col-lg-3 col-12 col-sm-12 col-md-12 mt-lg-5 mx-lg-0 mx-auto fixed-right-content'>
                        {/* List Of Video */}
                        <div className="scroll-bar w-100 mt-5 px-2 pb-3" style={{ height: '50vh', overflowY: 'scroll' }}>
                            <div className='mt-2 p-2 sticky-top bg-white fw-bold text-center'>{playList?.name}</div>
                            {playList?.post?.map((data, index) => <div className={`card rounded-2 border border-0 shadow-sm border border-light p-2 pointer mb-3  ${playVideo._id === data?._id ? 'video-card' : null}`} onClick={() => handlePlayList(data)}   >
                                <div className='row d-flex align-items-center' key={index} >
                                    <div className='col-lg-4 col-4 col-sm-3 col-md-2 d-flex align-items-center justify-content-around rounded-3' >
                                        {playVideo?._id === data?._id ? <span className=''><FaPlay style={{ fontSize: '10px' }} /></span> : <span className=''>{index + 1}</span>}
                                        <video className='img-fluid rounded-2 w-75' src={data?.url} style={{ objectFit: 'cover', height: '50px' }} />
                                    </div>
                                    <div className='col-lg-8 col-8 col-sm-8 col-md-10 text-lg-start  text-center'>
                                        <span className='fw-bold small'>{data?.title}</span> <br />
                                        <span className='text-secondary opacity-75 small'>{timeCal(data?.createdOn)} </span>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>

            </div >

            <Dialog open={share} fullWidth maxWidth="xs">
                <DialogTitle className='text-secondary'>
                    Share On Social Media<IconButton className="float-end" onClick={closeSharePopup} >
                        <RiCloseFill />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className="p-4 d-flex justify-content-between">
                        <WhatsappShareButton url={shareUrl} title={content} >
                            <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>
                        <FacebookShareButton url={shareUrl} title={content} >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title={content}>
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                        <TelegramShareButton url={shareUrl} title={content}>
                            <TelegramIcon size={32} round={true} />
                        </TelegramShareButton>
                        <LinkedinShareButton url={shareUrl} title={content}>
                            <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>
                        <EmailShareButton url={shareUrl} title={content}>
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                    </div>
                </DialogContent>
            </Dialog>


        </>
    )
}

export default ViewPlaylist