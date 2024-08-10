import React, { useEffect, useState } from 'react';
import '../../../Styles/Home.css';
import emptyCard from '../../Assets/Images/empty-feed-card.webp';
import uploadImage from '../../Assets/Images/upload.jpg';

import { AiFillDelete, AiFillEdit, AiFillHeart, AiOutlineClose, AiOutlineHeart } from 'react-icons/ai';
import { LuMessagesSquare, LuSend } from "react-icons/lu";
import { BsSearch } from 'react-icons/bs';
import { BiMessageRounded } from 'react-icons/bi';
import { RiCloseFill, RiPlayFill, RiPlayList2Fill, RiPlayList2Line, RiShareForwardLine } from 'react-icons/ri';
import { FaEarthAsia } from 'react-icons/fa6';
import { GoFileMedia } from 'react-icons/go';
import { GrArticle } from 'react-icons/gr';
import { HiDotsVertical } from 'react-icons/hi';
import { MdCheckCircle, MdHideSource, MdOutlineEventNote, MdOutlineVideoCameraBack } from 'react-icons/md';
import { Autocomplete, Chip, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { uploadFile } from '../../../utils/FileUpload';
import { toast } from 'react-toastify';
import { deletePost, getFilterPost, getSinglePost, saveLikes, savePost, savePostComments, updateBlockPost, updatePost, updatePostReport } from '../../../api/post';
import { timeCal } from '../../../utils/dateformat';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { FiAlertCircle } from 'react-icons/fi';
import { isValidHashtag } from '../../../utils/validation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import LeftSideFeed from '../../../Pages/LeftSideFeed';
import Navbar from '../../../Pages/Navbar';
import RightSideFeed from '../../../Pages/RightSideFeed';
import { getAllMaster, getSingleMaster } from '../../../api/master';
import { getMasterId } from '../../../utils/Storage';
import { deletePlayList, getAllPlayListByUser, getFilterPlayList } from '../../../api/playlist';
import { HiOutlineHandThumbUp } from 'react-icons/hi2'
import { IoShareSocial } from 'react-icons/io5'
import CreateEvents from './CreateEvent';

Quill.register('modules/imageResize', ImageResize);


const Home = () => {

    let initialState = {
        url: '',
        title: '',
        description: '',
        user: getMasterId(),
        fileType: '',
        hashtag: '',
        mention: [],
        type: ''
    }

    let initialStateErrors = {
        url: {
            required: false
        },
        title: {
            required: false
        },
        hashtag: { valid: false }
    };



    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState(initialState);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [userId, setUserId] = useState()
    const [postNext, setPostNext] = useState(0);
    const [scroll, setScroll] = useState(false);
    const [reload, setReload] = useState(false);
    const [count, setCount] = useState(0);
    const [post, setPost] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [postDelete, setPostDelete] = useState(false);
    const [modify, setModify] = useState(false)
    const [postLikes, setPostLikes] = useState('')
    const [openComments, setOpenComments] = useState(false);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState()
    const [share, setShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [content, setContent] = useState('');
    const [openReport, setOpenReport] = useState(false)
    const [report, setReport] = useState({});
    const [openDescription, setOpenDescription] = useState(false);
    const [submitReport, setSubmitReport] = useState(false);
    const [reportId, setReportId] = useState('');
    const [reportResponse, setReportResponse] = useState(false);
    const [hide, setHide] = useState(false);
    const [hideId, setHideId] = useState('')
    const [options, setOptions] = useState([])
    const [article, setArticle] = useState(false)
    const [value, setValue] = useState('');
    const [playList, setPlayList] = useState([])
    const [playNext, setPlayNext] = useState(0);
    const [playScroll, setPlayScroll] = useState(false);
    const [playReload, setPlayReload] = useState(false);
    const [playListCount, setPlayListCount] = useState(0);
    const [currentView, setCurrentView] = useState('feed');
    const [list, setList] = useState('');
    const [hover, setHover] = useState('')
    const [deletePlay, setDeletePlay] = useState(false)
    const [playDeleteId, setPlayDeleteId] = useState('')
    const [playDelete, setPlayDelete] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [events, setEvents] = useState()

    useEffect(() => {
        const current = location?.state ?? 'feed'
        setCurrentView(current)
        const user = getMasterId()
        setUserId(user)
        getUserDetails()
        getAllUsersList()
        getAllPlayListByUsers()
    }, [])

    useEffect(() => {
        const handleScrollEvent = (event) => {
            if (currentView === 'feed') {
                handleScroll(event);
            } else {
                handlePlayScroll(event);
            }
        };
        window.addEventListener('scroll', handleScrollEvent);
        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };
    }, [currentView]);

    useEffect(() => {
        if (modify === false) {
            getFilterPostList()
        }
    }, [postNext])

    useEffect(() => {
        getPlayList();
    }, [playNext])

    useEffect(() => {
        if (modify) {
            getFilterPostList()
        }
    }, [modify])


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

    const getAllUsersList = () => {
        getAllMaster().then(res => {
            const result = res?.data?.result;
            const list = result
                ?.filter(x => x._id !== getMasterId())
                .map(x => ({ name: x.name, id: x._id }));
            setOptions(list)
        }).catch(err => console.log(err))
    }

    const getAllPlayListByUsers = () => {
        getAllPlayListByUser().then(res => {
            const result = res?.data?.result;
            setList(result)
        }).catch(err => console.log(err))
    }

    const handleScroll = () => {
        const value = window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 800
        setScroll(value)
    };
    useEffect(() => {
        if (scroll) {
            loadMorePost();
        }
    }, [scroll])

    const loadMorePost = () => {
        let nextPost = postNext;
        if (postDelete) {
            nextPost = nextPost + 4;
            setPostDelete(false)
        }
        else {
            nextPost = nextPost + 5;
        }
        if (count <= nextPost) {
            setReload(true)
        }
        else {
            setPostNext(nextPost);
        }

    };


    const getFilterPostList = () => {
        const data = {
            limit: 5,
            page: postNext,
        };
        getFilterPost(data).then(res => {
            const postList = res?.data?.result?.postList;
            setCount(res?.data?.result?.postCount)
            if (modify) {
                setPost([...postList])
                setModify(false)
            }
            else {
                setPost([...post, ...postList])
            }
        }).catch(err => { console.log(err); })
    }


    const handlePlayScroll = () => {
        const value = window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 800
        setPlayScroll(value)
    };

    useEffect(() => {
        if (playScroll) {
            loadMorePlay();
        }
    }, [playScroll])

    const loadMorePlay = () => {
        let nextPlay = playNext;
        if (playDelete) {
            nextPlay = nextPlay + 9;
            setPlayDelete(false)
        }
        else {
            nextPlay = nextPlay + 10;
        }
        if (playListCount <= nextPlay) {
            setPlayReload(true)
        }
        else {
            setPlayNext(nextPlay);
        }

    };


    const getPlayList = () => {
        const data = {
            limit: 10,
            page: playNext,
        };
        getFilterPlayList(data).then(res => {
            const list = res?.data?.result?.playList;
            setPlayListCount(res?.data?.result?.playListCount)
            setPlayList([...playList, ...list])
        }).catch(err => { console.log(err); })
    }


    const handleInputs = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    };


    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.url === "") {
            error.url.required = true;
        }
        if (data.title === "") {
            error.title.required = true;
        }
        if (data?.hashtag !== '' && !isValidHashtag(data.hashtag)) {
            error.hashtag.valid = true;
        }

        return error
    }


    const handleErrors = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const prop = obj[key];
                if (prop.required === true || prop.valid === true) {
                    return false;
                }
            }
        }
        return true;
    }

    const handleFileChange = (event) => {
        const file = event?.target?.files[0];
        const folder = 'masterIn/post'
        if (file) {
            uploadFile(file, folder).then(res => {
                event.target.value = null;
                const url = res?.Location
                setInputs({ ...inputs, url })
                if (submitted) {
                    const newError = handleValidation({ ...inputs, url })
                    setErrors(newError)
                }
            }).catch(err => { console.log(err); })
        };

    };

    const singlePost = (postId) => {
        getSinglePost(postId).then(res => {
            const result = res?.data?.result
            const data = post.map(item =>
                item._id === result?._id ? { ...item, likeCount: result?.likeCount, likes: result?.likes, commentCount: result?.commentCount, comment: result?.comment } : item
            );
            setPost(data)
        }).catch(err => {
            console.log(err);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        if (handleErrors(newError)) {
            inputs.type = 'post'
            if (inputs?.playListId) { inputs.playList = true }
            setModify(true)
            setPostNext(0)
            if (inputs?._id) {
                updatePost(inputs).then((res) => {
                    toast.success('Successfully Edit a post');
                    closePopup()
                })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }
            else {
                savePost(inputs).then((res) => {
                    toast.success('Successfully create a post');
                    closePopup()
                    if (inputs.playList) { setPlayList(playList.map(x => x._id === inputs?.playListId ? { ...x, postCount: x.postCount + 1 } : x)) }
                })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }
        }
    }


    const handleArticle = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        if (handleErrors(newError)) {
            inputs.fileType = 1
            inputs.description = value
            inputs.type = 'article'
            setModify(true)
            setPostNext(0)
            if (inputs?._id) {
                updatePost(inputs).then((res) => {
                    toast.success('Successfully Edit a article');
                    closeArticle()
                })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }
            else {
                savePost(inputs).then((res) => {
                    toast.success('Successfully create a article');
                    closeArticle()
                })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }
        }
    }


    const handleCardClick = () => {
        // Trigger click on the file input
        document.getElementById('fileInput').click();
    };

    const openPopup = (data, fileType) => {
        data.fileType = fileType
        setInputs(data);
        setErrors(initialStateErrors)
        setSubmitted(false)
        setOpen(true)
    }

    const closePopup = () => {
        setOpen(false)
    }

    const openDeletePopup = (data) => {
        setDeleteId(data)
        setOpenDelete(true)
    }

    const closeDeletePopup = () => {
        setOpenDelete(false)
    }

    const deletePostDetails = () => {
        deletePost(deleteId).then(res => {
            toast.success(res?.data?.message);
            closeDeletePopup()
            const newPostList = post.filter(x => x._id !== deleteId)
            setPost(newPostList)
            setPostDelete(true)
        }).catch(err => { console.log(err) })
    }

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

    const handleMessage = (event) => {
        setMessage(event?.target?.value)
    }

    const getPostCommentsList = (commentId) => {
        if (openComments === commentId) {
            setOpenComments('')
        }
        else {
            setOpenComments(commentId)
        }
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

    const handleHidePost = () => {
        const data = { _id: hideId, block: { user: userId, modelType: 'Master' } }
        updateBlockPost(data).then(res => {
            closeHidePopup()
            toast.success(res?.data?.message)
            const newPostList = post.filter(x => x._id !== hideId)
            setPost(newPostList)
        }).catch(err => {
            console.log(err);
        })
    }

    const openHidePopup = (hideId) => {
        setHideId(hideId)
        setHide(true);
    };
    const closeHidePopup = () => {
        setHide(false);
    };

    const openReportPopup = (data) => {
        setReportId(data)
        setOpenReport(true)
    }
    const closeReportPopup = () => {
        setOpenReport(false)
    }

    const openDescriptionPopup = (data) => {
        setReport({ ...report, type: data })
        setSubmitReport(false)
        closeReportPopup()
        setOpenDescription(true)
    }
    const closeDescriptionPopup = () => {
        setOpenDescription(false)
    }

    const openReportResponsePopup = () => {
        setReportResponse(true)
    }
    const closeReportResponsePopup = () => {
        setReportResponse(false)
    }

    const handleDescription = (event) => {
        const description = event?.target.value
        setReport({ ...report, description })
    }

    const handleReport = () => {
        setSubmitReport(true)
        if (report?.description) {
            const data = {
                _id: reportId,
                report: {
                    user: userId,
                    modleType: 'Master',
                    type: report?.type,
                    description: report?.description
                }
            }
            updatePostReport(data).then(res => {
                closeDescriptionPopup();
                openReportResponsePopup()
            }).catch(err => { console.log(err); })
        }

    }


    const handleMention = (event, values) => {
        setInputs({ ...inputs, mention: values.map(x => x.id) });
    };

    const handlePlayList = (event, values) => {
        setInputs({ ...inputs, playListId: values?._id });
    };

    const openArticle = (data) => {
        setInputs(data)
        setValue(data?.description)
        setArticle(true)
        setErrors(initialStateErrors)
        setSubmitted(false)
    }

    const closeArticle = () => {
        setArticle(false)
    }


    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ["link", "image", "video"],
        ['clean'],
    ];


    const modules = {
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        },
        toolbar: toolbarOptions
    }

    // Feed and Playlist Navigate Tabs


    const switchToFeed = () => {
        setCurrentView('feed');
    };

    const switchToPlaylist = () => {
        setCurrentView('playlist');
    };

    const handleMouseOver = (data) => {
        setHover(data)
    }

    const handleMouseOut = () => {
        setHover('')
    }

    const openPlayDeletePopup = (data) => {
        setPlayDeleteId(data)
        setDeletePlay(true)
    }

    const closePlayDeletePopup = () => {
        setDeletePlay(false)
    }

    const deletePlayDetails = () => {
        deletePlayList(playDeleteId).then(res => {
            toast.success(res?.data?.message);
            closePlayDeletePopup()
            const newPlayList = playList.filter(x => x._id !== playDeleteId)
            setPlayList(newPlayList)
            setPlayDelete(true)
            setModify(true)
            setPostNext(0)
        }).catch(err => { console.log(err) })
    }


    const handleEventOpen = () => {
        setEvents(true)
    }

    const handleEventClose = () => {
        setEvents(false)
    }

    return (

        <>
            <div className='row'>
                <div className='col-lg-3'>
                    <LeftSideFeed />
                </div>
                <div className='col-lg-6'>
                    <div className='d-flex align-items-center'>
                        <div className='container'>
                            <Navbar />
                            <div className='container d-flex flex-column border-start border-end gap-2 align-items-center bg-light mt-5 p-2' style={{ height: '100%' }}>
                                <div className='container post-create rounded bg-white border p-3 mt-5'>
                                    {/* <div className='row align-items-center'>
                                        <div className='col-lg-2 col-2 d-flex align-items-center justify-content-end'>
                                            <a href="/ProfilePage">
                                                <img className='rounded-circle img-fluid ' style={{ border: '2px solid #d3d3d3', width: '3.5rem', height: '3.5rem', objectFit: 'cover' }}
                                                    src={user?.image ? user?.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="avatar" />
                                            </a>
                                        </div>
                                        <div className='col-9 col-lg-10'>
                                            <input type="text" className="form-control rounded-5 p-3 " id="exampleInput" placeholder='Start a post or discussion' required />
                                        </div>
                                    </div> */}
                                    <div className='container mt-3'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-around gap-3'>
                                            <button className='btn btn-sm btn-light border d-flex align-items-center gap-2' onClick={() => openPopup(initialState, 1)}><GoFileMedia /> Photo</button>
                                            <button className='btn btn-sm btn-light border d-flex align-items-center gap-2' onClick={() => openPopup(initialState, 2)}><MdOutlineVideoCameraBack /> Video</button>
                                            <button className='btn btn-sm btn-light border d-flex align-items-center gap-2' onClick={() => openArticle(initialState)}><GrArticle /> Write article</button>
                                            <Link to='/CreatePlaylist' className='btn btn-sm btn-light border d-flex align-items-center gap-2' ><RiPlayList2Fill /> Create Playlist</Link>
                                            <button className='btn btn-sm btn-light border d-flex align-items-center gap-2' onClick={handleEventOpen}><MdOutlineEventNote /> Create Events/WorkShops </button>
                                        </div>
                                        <hr />
                                        <div className='container mt-2 d-flex flex-wrap align-items-center mt-3 justify-content-start  gap-3'>
                                            <button className={`btn btn-sm btn-outline-success border d-flex align-items-center rounded-5 gap-2 fw-bolder ${currentView === 'feed' ? 'active' : ''}`} onClick={switchToFeed}><GoFileMedia /> Feed</button>
                                            <button className={`btn btn-sm btn-outline-success border d-flex align-items-center rounded-5 gap-2 fw-bolder ${currentView === 'playlist' ? 'active' : ''}`} onClick={switchToPlaylist}><RiPlayList2Fill /> Playlist</button>
                                        </div>
                                    </div>
                                </div>

                                {currentView === 'feed' ? (
                                    // Feed
                                    <div>
                                        {post?.length === 0 ? <div className='container  p-5 bg-white rounded'>
                                            <div className='text-center'>
                                                <BsSearch />
                                            </div>
                                            <div className='text-center mt-5'>
                                                <p className='fs-4 fw-bolder'>Nothing to see here yet</p>
                                                <p className='fs-6'>Follow people or join an organization to see <br /> more posts</p>
                                            </div>
                                            <div className='text-center'>
                                                <img className='img-fluid' src={emptyCard} alt="emptyCard" />
                                            </div>
                                        </div> :
                                            post?.map((data, index) =>
                                                <div key={index} className="shadow border overflow-y-auto mt-3 p-2 mb-4 rounded" style={{ maxWidth: '500px' }}>
                                                    <div className="container  mt-2 p-3">
                                                        <div className='row  mb-2 '>
                                                            <div className='col-lg-2 col-2 '>
                                                                <img className='img-fluid  rounded-circle' src={data?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                                            </div>
                                                            <div className=' col-lg-8 col-8 align-items-center'>
                                                                <span className='fw-bolder'><Link to={{ pathname: data?.user?._id === userId ? '/ProfilePage' : '/PeopleProfile', search: `?id=${data?.user?._id}` }} className='text-decoration-none text-dark small'>{data?.user?.name}</Link></span><br />
                                                                <small className='text-secondary d-flex gap-1 align-items-center'><FaEarthAsia /> {timeCal(data?.createdOn)}</small>
                                                            </div>
                                                            <div className='col-lg-1 col-2'>
                                                                <div className="dropdown">
                                                                    <button className="btn  rounded-5 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><HiDotsVertical /></button>
                                                                    <ul className="dropdown-menu">
                                                                        {data?.user?._id !== userId ? <><li><Link className="dropdown-item d-flex align-items-center" onClick={() => openHidePopup(data?._id)}><FiAlertCircle className='me-2' /> Hide</Link></li>
                                                                            <li><Link className="dropdown-item d-flex align-items-center" onClick={() => openReportPopup(data?._id)} ><MdHideSource className='me-2' /> Report</Link></li></> :
                                                                            <> {data?.type === 'article' ? <li><Link className="dropdown-item d-flex align-items-center" onClick={() => openArticle(data)} ><AiFillEdit className='me-2' /> Edit</Link></li> :
                                                                                <li><Link className="dropdown-item d-flex align-items-center" onClick={() => openPopup(data, data?.fileType)} ><AiFillEdit className='me-2' /> Edit</Link></li>}
                                                                                <li><Link className="dropdown-item d-flex align-items-center" onClick={() => openDeletePopup(data?._id)} > <AiFillDelete className='me-2' /> Delete</Link></li></>}
                                                                    </ul>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="container bg-white mb-1">
                                                        {data?.fileType === 1 ? <img className="feedImage img-fluid" src={data?.url} alt="FeedImage" style={{ width: '700px' }} /> :
                                                            <video className="feedImage img-fluid" src={data?.url} controls alt="FeedImage" style={{ width: '700px' }} />}
                                                    </div>
                                                    <div className='ms-2'>
                                                        <span>
                                                            {data?.hashtag?.split(' ')?.map((hash, index) =>
                                                                <Link to='/Search' state={hash} key={index} className='text-decoration-none'>
                                                                    {hash + ' '}
                                                                </Link>)}
                                                            {' '}
                                                            {data?.type === 'article' ? <ReactQuill
                                                                value={data?.description}
                                                                theme="snow"
                                                                modules={{ toolbar: false }}
                                                                className="custom-quill-editor"
                                                            /> : <div> {data?.description}</div>}
                                                        </span></div>
                                                    <hr />
                                                    <div className='d-flex justify-content-around align-items-center'>
                                                        <p><button className='text-decoration-none btn border-0 text-dark d-flex align-items-center gap-2'>
                                                            {postLikes === data?._id || data?.likes?.some(x => x.user === userId) ?
                                                                <AiFillHeart color='red' onClick={() => savePostLikes(data?._id, 'remove')} /> :
                                                                <AiOutlineHeart onClick={() => savePostLikes(data?._id, 'add')} />}
                                                            <span className="number">{data?.likeCount} </span>
                                                        </button></p>
                                                        <p>
                                                            <button
                                                                className='text-decoration-none btn border-0 text-dark d-flex align-items-center gap-2'
                                                                onClick={() => getPostCommentsList(data?._id)}>
                                                                <BiMessageRounded /> {data?.commentCount}
                                                            </button>
                                                        </p>
                                                        <p><button className='text-decoration-none btn border-0 text-dark d-flex align-items-center gap-2' onClick={() => openSharePopup(data?.url, data?.description)}><RiShareForwardLine /> </button></p>
                                                    </div>

                                                    {openComments === data?._id ?
                                                        <>
                                                            {data?.comment?.map((comment, index) =>
                                                                <div key={index} className=' mt-3 mb-3 ps-3'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <img className='img-fluid rounded-circle' src={comment?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} />
                                                                        <div className='container rounded-4'>
                                                                            <div className='card rounded-4 w-75 p-2'>
                                                                                <div className='d-flex justify-content-between'>
                                                                                    <div className='d-flex align-items-center justify-content-around gap-1'>
                                                                                        <span className='fw-bolder'>{comment?.user?.name}</span>
                                                                                        <span>{timeCal(comment?.createdOn)}</span>
                                                                                    </div>
                                                                                    {/* <button className='float-end'><PiDotsThree /></button> */}
                                                                                </div>
                                                                                {comment?.comments}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className='d-flex align-items-center gap-2 ms-5'>
                                                                        <button className="btn border-0 text-secondary fw-lighter" style={{ maxWidth: '2.5rem', marginBottom: '1.3rem' }}>Like</button>
                                                                        <button className="btn border-0 text-secondary fw-lighter" style={{ maxWidth: '4rem', marginBottom: '1.3rem' }}>Reply</button>
                                                                    </div> */}
                                                                </div>)}
                                                            <div className="container p-2 d-flex align-items-center justify-content-around ">
                                                                {/* Add your comment section components here */}
                                                                <img className='img-fluid rounded-circle' src={user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
                                                                <div className=" d-flex">
                                                                    <input className='form-control messageInput' type="text" value={message} onChange={handleMessage} placeholder="Write a comment..." />
                                                                    <label className='sendIcon'><Link onClick={() => handleComments(data?._id)} ><LuSend className='fs-5 text-dark ' /></Link></label>
                                                                </div>
                                                            </div></> : null}
                                                </div>)}
                                        {reload ?
                                            <div className='form-text text-danger text-center mb-5'>No Post</div> : null
                                        }
                                    </div>

                                    // Playlist
                                ) : (
                                    < >
                                        <div className='container mt-3'>
                                            <div className="row">
                                                {playList.map((video, index) => (
                                                    <div key={index} className="col-lg-12 col-12 container mb-3 mx-auto" style={{ maxWidth: '500px' }}>
                                                        <div
                                                            className='card border-0 rounded shadow'
                                                        >
                                                            <div className='card-body'>
                                                                <div className='row align-items-center'>
                                                                    <div className='col-lg-2 col-3'>
                                                                        <img className='img-fluid  rounded-circle' src={video?.user?.image ? video?.user?.image : 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                                                    </div>
                                                                    <div className=' col-lg-8 col-7 align-items-center'>
                                                                        <span className='fw-bolder'><Link to={{ pathname: video?.user?._id === userId ? '/ProfilePage' : '/PeopleProfile', search: `?id=${video?.user?._id}` }} className='text-decoration-none text-dark small fs-5'>{video?.user?.name}</Link></span><br />
                                                                        {/* <small className='text-secondary d-flex gap-1 align-items-center'><FaEarthAsia /> 1hr ago</small> */}
                                                                    </div>
                                                                    {/* <div className='col-lg-1 col-1'>
                                                                        <FiAlertCircle className='fs-5 pointer' />
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                            <div className='card-body thumbnail-card p-2' onMouseEnter={() => handleMouseOver(video?._id)}
                                                                onMouseLeave={handleMouseOut} onClick={() => navigate(`/ViewPlaylist?id=${video?._id}`)}>
                                                                {/* Playlist img */}
                                                                <img alt='thumbnail'
                                                                    className="card-img-top rounded-4  rounded-bottom-0 w-100 thumbnail-image"
                                                                    style={{ objectFit: 'cover', height: '250px' }} src={video?.thumbnail}
                                                                />
                                                                {/* Text overlay */}
                                                                <div className='small'>
                                                                    <p
                                                                        className='small p-1 rounded text-white playlist-thumbnail-count'

                                                                    >
                                                                        <RiPlayList2Fill /> {video?.postCount} videos
                                                                    </p>
                                                                    {hover === video?._id && <h6 className=' thumbnail-title '><RiPlayFill className='fs-3' /> PLAY All </h6>}
                                                                </div>
                                                            </div>
                                                            <div className='card-body mt-0 pt-0 pb-0 small'>
                                                                <div className='d-flex flex-wrap align-items-center justify-content-lg-between justify-content-md-between justify-content-sm-between justify-content-center'>
                                                                    <div>
                                                                        <span className='fw-bolder fs-5 text-uppercase'>{video?.name}</span>
                                                                    </div>
                                                                    {video?.user?._id === userId ? <div className='d-flex gap-2'>
                                                                        <Link className='btn btn-sm' to={{ pathname: '/CreatePlaylist', search: `?id=${video?._id}` }}><AiFillEdit /></Link>
                                                                        <Link className='btn btn-sm' onClick={() => openPlayDeletePopup(video?._id)}><AiFillDelete /></Link>
                                                                    </div> : null}
                                                                </div>
                                                                <div className='d-flex flex-column text-lg-start text-md-start text-sm-start text-center'>
                                                                    <span className='fs-10 mb-3'>{timeCal(video?.createdOn)}</span>
                                                                    <p className=''>
                                                                        {video?.description}
                                                                    </p>
                                                                    <span className='fs-10 text-secondary mb-3'>{video?.category?.map(x => x.category).join(', ')}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {playReload ?
                                                <div className='form-text text-danger text-center mb-5'>No PlayList</div> : null
                                            }
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div >
                </div >
                <div className='col-lg-3 mt-4 p-0 small'  >
                    <RightSideFeed />
                </div>
            </div >

            {/* Events Dialog Component */}
            <CreateEvents event={events} handleEventClose={handleEventClose} />

            <Dialog open={open} fullWidth maxWidth="sm">
                <DialogTitle className='text-secondary'>
                    {inputs?._id ? 'Edit Post' : 'Create New Post'}<IconButton className="float-end" onClick={closePopup} >
                        <RiCloseFill /> </IconButton>
                </DialogTitle>
                <DialogContent className='mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='container d-flex flex-column align-items-center justify-content-center gap-4'>
                            <div>
                                <div className='card pointer' onClick={!inputs?._id ? handleCardClick : null}>
                                    {inputs?.fileType === 1 ? <img src={inputs?.url ? inputs?.url : uploadImage} alt="uploadImage" style={{ width: '500px', objectFit: 'cover' }} /> :
                                        <video poster={!inputs?.url ? uploadImage : null} src={inputs?.url} alt="uploadImage" controls style={{ width: '500px', objectFit: 'cover' }} />}
                                </div>
                                {errors?.url.required ? <span className="text-danger form-text profile_error">
                                    This field is required.
                                </span> : null
                                }</div>
                            <div className='justify-content-center d-flex flex-column gap-4 w-100'>
                                <div className="form-floating">
                                    <TextField
                                        label="Title"
                                        className='w-100'
                                        multiline
                                        maxRows={3} name='title' value={inputs?.title} onChange={handleInputs} />
                                    {errors?.title?.required ? <span className="text-danger text-left form-text profile_error">
                                        This field is required.
                                    </span> : null
                                    }
                                </div>
                            </div>
                            <div className='text-center d-flex flex-column gap-4 w-100'>
                                <div className="form-floating" >
                                    <TextField
                                        label="Captions"
                                        className='w-100'
                                        multiline
                                        maxRows={3} name='description' value={inputs?.description} onChange={handleInputs} />
                                </div>

                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    accept={inputs?.fileType === 1 ? "image/*" : "video/*"}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className='justify-content-center d-flex flex-column gap-4 w-100'>
                                <div className="form-floating">
                                    <TextField
                                        label="Hashtag"
                                        className='w-100'
                                        multiline
                                        maxRows={3} name='hashtag' value={inputs?.hashtag} onChange={handleInputs} />
                                    {errors?.hashtag?.valid ? <span className="text-danger text-left form-text profile_error">
                                        Enter valid hashtag.
                                    </span> : null
                                    }
                                </div>
                            </div>
                            <div className='justify-content-center d-flex flex-column gap-4 w-100'>
                                <Autocomplete
                                    disablePortal
                                    multiple
                                    id="combo-box-demo"
                                    options={options}
                                    getOptionLabel={(option) => option.name}
                                    className='w-100'
                                    onChange={handleMention}
                                    readOnly={inputs?._id ? true : false}
                                    value={options?.filter((option) => inputs?.mention?.includes(option.id))}
                                    renderInput={(params) => <TextField {...params} name="mention" label="Mentions" />}
                                />
                            </div>
                            {inputs?.fileType === 2 ? <div className='justify-content-center d-flex flex-column gap-4 w-100'>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={list}
                                    getOptionLabel={(list) => list.name}
                                    className='w-100'
                                    onChange={handlePlayList}
                                    renderInput={(params) => <TextField {...params} name="playList" label="Add PlayList" />}
                                />
                            </div> : null}
                        </div>
                        <div className='float-end mt-3' >
                            {inputs?._id ? <button type="submit" className="btn btn-primary me-3" >Edit</button> :
                                <button type="submit" className="btn btn-primary me-3" >Submit</button>}
                            <button type="button" className="btn btn-light" onClick={closePopup} >Cancel</button></div>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={article} fullWidth maxWidth="sm">
                <DialogTitle className='text-secondary'>
                    {inputs?._id ? 'Edit Article' : 'Create New Article'}<IconButton className="float-end" onClick={closeArticle} >
                        <RiCloseFill /> </IconButton>
                </DialogTitle>
                <DialogContent className='mb-5'>
                    <form onSubmit={handleArticle}>
                        <div className='container d-flex flex-column align-items-center gap-4 justify-content-center '>
                            <div >
                                <div className='card pointer' onClick={!inputs?._id ? handleCardClick : null}>
                                    <img src={inputs?.url ? inputs?.url : uploadImage} alt="uploadImage" style={{ width: '500px', objectFit: 'cover' }} />
                                </div>
                                {errors?.url.required ? <span className="text-danger form-text profile_error">
                                    This field is required.
                                </span> : null
                                }
                            </div>
                            <div className='justify-content-center d-flex flex-column gap-4 w-100'>
                                <div className="form-floating">
                                    <TextField
                                        label="Title"
                                        className='w-100'
                                        multiline
                                        maxRows={3} name='title' value={inputs?.title} onChange={handleInputs} />
                                    {errors?.title?.required ? <span className="text-danger text-left form-text profile_error">
                                        This field is required.
                                    </span> : null
                                    }
                                </div>
                            </div>
                            <div className='text-center d-flex flex-column w-100'>
                                <ReactQuill theme="snow" value={value} placeholder='Write here.' modules={modules} onChange={setValue} />
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className='justify-content-center d-flex flex-column  w-100'>
                                <div >
                                    <TextField
                                        label="Hashtag"
                                        className='w-100'
                                        multiline
                                        maxRows={3} name='hashtag' value={inputs?.hashtag} onChange={handleInputs} />
                                    {errors?.hashtag?.valid ? <span className="text-danger text-left form-text profile_error">
                                        Enter valid hashtag.
                                    </span> : null
                                    }
                                </div>
                            </div>
                            <div className='justify-content-center d-flex flex-column  w-100'>
                                <Autocomplete
                                    disablePortal
                                    multiple
                                    id="combo-box-demo"
                                    options={options}
                                    getOptionLabel={(option) => option.name}
                                    className='w-100'
                                    value={options?.filter((option) => inputs?.mention?.includes(option.id))}
                                    onChange={handleMention}
                                    readOnly={inputs?._id ? true : false}
                                    renderInput={(params) => <TextField {...params} name="mention" value={inputs?.mention} label="Mentions" />}
                                />
                            </div>
                        </div>
                        <div className='float-end mt-3' >
                            {inputs?._id ? <button type="submit" className="btn btn-primary me-3" >Edit</button> :
                                <button type="submit" className="btn btn-primary me-3" >Submit</button>}
                            <button type="button" className="btn btn-light" onClick={closeArticle} >Cancel</button></div>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={openDelete}>
                <DialogContent>
                    <div className="text-center m-4">
                        <h5 className="mb-4">Are you sure you want to Delete <br /> the selected Post ?</h5>
                        <button type="button" className="btn btn-primary mx-3" onClick={deletePostDetails}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closeDeletePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>

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

            <Dialog open={hide}>
                <DialogContent>
                    <div className="text-center m-4">
                        <h5 className="mb-4">Are you sure you want to hide <br /> the selected Post ?</h5>
                        <button type="button" className="btn btn-primary mx-3" onClick={handleHidePost}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closeHidePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openReport} fullWidth maxWidth="xs" >
                <DialogTitle>Report
                    <IconButton className="float-end" onClick={closeReportPopup} >
                        <AiOutlineClose />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className='report'>
                        <h6>Report this Post</h6>
                        <span>Help us understand what's happening with this post. How would you describe it?</span>
                        <ul className='mt-2'>
                            <li> <span onClick={() => openDescriptionPopup('Misleading or scam')}>Misleading or scam </span> </li>
                            <li> <span onClick={() => openDescriptionPopup('Sexually inappropriate')}> Sexually inappropriate </span></li>
                            <li><span onClick={() => openDescriptionPopup('Offensive')}>Offensive</span></li>
                            <li><span onClick={() => openDescriptionPopup('Violence')}>Violence</span></li>
                            <li><span onClick={() => openDescriptionPopup('Prohibited content')}>Prohibited content</span> </li>
                            <li><span onClick={() => openDescriptionPopup('Spam')}>Spam </span> </li>
                            <li><span onClick={() => openDescriptionPopup('False news')}>False news </span></li>
                            <li><span onClick={() => openDescriptionPopup('Political candidate or issue')}>Political candidate or issue </span> </li>
                            <li><span onClick={() => openDescriptionPopup('Other')}>Other</span></li>
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openDescription} fullWidth maxWidth="sm" >
                <DialogTitle>Report
                    <IconButton className="float-end" onClick={closeDescriptionPopup} >
                        <AiOutlineClose />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                                <label className='mb-2'>Description</label>
                                <textarea className="form-control" rows={4} onChange={handleDescription} name='description' placeholder="Description"></textarea>
                                {!report?.description && submitReport ? (
                                    <span className="form-text text-danger">
                                        This field is required.
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="float-end mt-3">
                        <button type="button" className="btn btn-primary mx-3" onClick={handleReport} >Submit</button>
                        <button type="button" className="btn btn-light " onClick={closeDescriptionPopup}>Cancel</button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={reportResponse} fullWidth maxWidth="xs" >
                <DialogTitle className='p-0'>
                    <IconButton className="float-end m-2" onClick={closeReportResponsePopup} >
                        <AiOutlineClose />
                    </IconButton>
                </DialogTitle>
                <DialogContent className='responseModal'>
                    <span><MdCheckCircle size={'3rem'} color='green' /></span>
                    <h5 className='mt-2'>Thank you for submitting a report.</h5>
                    <div className='my-2'><Chip color="primary" variant="outlined" label={report?.type}></Chip></div>
                    <span>We'll let you know when there's an update on this report.</span>
                </DialogContent>
            </Dialog>

            <Dialog open={deletePlay}>
                <DialogContent>
                    <div className="text-center m-4">
                        <h5 className="mb-4">Are you sure you want to Delete <br /> the selected Playlist ?</h5>
                        <button type="button" className="btn btn-primary mx-3" onClick={deletePlayDetails}>Yes</button>
                        <button type="button" className="btn btn-light " onClick={closePlayDeletePopup}>No</button>
                    </div>
                </DialogContent>
            </Dialog>


        </>
    )
}

export default Home;