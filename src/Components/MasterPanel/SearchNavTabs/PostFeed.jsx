import React, { useEffect, useState } from 'react'
import { FaEarthAsia } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { MdCheckCircle, MdHideSource } from 'react-icons/md';
import { RiCloseFill, RiShareForwardLine } from 'react-icons/ri';
import { AiFillDelete, AiFillEdit, AiFillHeart, AiOutlineClose, AiOutlineHeart } from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';
import { Autocomplete, Chip, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import ReactQuill, { Quill } from 'react-quill';
import uploadImage from '../../Assets/Images/upload.jpg';
import { LuSend } from 'react-icons/lu';
import { timeCal } from '../../../utils/dateformat';
import { FiAlertCircle } from 'react-icons/fi';
import { deletePost, getSinglePost, saveLikes, savePostComments, updateBlockPost, updatePost, updatePostReport } from '../../../api/post';
import { toast } from 'react-toastify';
import { isValidHashtag } from '../../../utils/validation';
import { getAllMaster, getSingleMaster } from '../../../api/master';
import { getMasterId } from '../../../utils/Storage';
 
 
const PostFeed = ({ posts, handleSearch }) => {
 
 
    let initialStateErrors = {
        url: {
            required: false
        },
        hashtag: { valid: false }
    };
 
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [userId, setUserId] = useState()
    const [post, setPost] = useState();
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
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
    const [article, setArticle] = useState(false)
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([])
 
 
    useEffect(() => {
        const user = getMasterId()
        setUserId(user)
        getUserDetails()
        getAllUsersList()
    }, [])
 
    useEffect(() => {
        console.log('ppppppppp',posts);
        setPost(posts)
    }, [posts])
 
 
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
 
    const handleInputs = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    };
 
 
    const handleValidation = (data) => {
        let error = initialStateErrors;
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
            updatePost(inputs).then((res) => {
                toast.success('Successfully Edit a post');
                closePopup()
                handleSearch()
            })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
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
            updatePost(inputs).then((res) => {
                toast.success('Successfully Edit a article');
                closeArticle()
                handleSearch()
            })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
 
 
        }
    }
 
 
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
            handleSearch()
            // const newPostList = post.filter(x => x._id !== deleteId)
            // setPost(newPostList)
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
            handleSearch()
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
    return (
        <>
            <div className='scroll-bar bg-light' style={{ overflow: 'scroll', maxHeight: 'calc(100vh - 150px)' }}>
                <div className='container mb-5' >
                    <div className='gap-3 d-flex   flex-column'>
                        {post?.map((data, index) =>
                            <div key={index} className="shadow mx-auto  overflow-y-auto mt-3 p-2 mb-4" style={{ maxWidth: '500px' }}>
                                <div className="container  mt-2 p-3">
                                    <div className='row  mb-2 '>
                                        <div className='col-lg-2 col-2 '>
                                            <img className='img-fluid  rounded-circle' src={data?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                                        </div>
                                        <div className=' col-lg-8 col-8 align-items-center'>
                                            <span className='fw-bolder'><a href="/Chat" className='text-decoration-none text-dark'>{data?.user?.name}</a></span><br />
                                            <small className='text-secondary d-flex gap-1 align-items-center'><FaEarthAsia /> {timeCal(data?.createdOn)}</small>
                                        </div>
                                        <div className='col-lg-1 col-2'>
                                            <div className="dropdown">
                                                <button className="btn btn-light rounded-5 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"><HiDotsVertical /></button>
                                                <ul className="dropdown-menu" style={{ right: '0', left: 'unset' }}>
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
                                                {hash+' '}
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
                                <div className='d-flex justify-content-around align-items-center  bg-light'>
                                    <p><button className='text-decoration-none btn btn-light border-0 text-dark d-flex align-items-center gap-2'>
                                        {postLikes === data?._id ||data?.likes?.some(x => x.user === userId) ?
                                            <AiFillHeart color='red' onClick={() => savePostLikes(data?._id, 'remove')} /> :
                                            <AiOutlineHeart onClick={() => savePostLikes(data?._id, 'add')} />}
                                        <span className="number">{data?.likeCount} </span>
                                    </button></p>
                                    <p>
                                        <button
                                            className='text-decoration-none btn btn-light border-0 text-dark d-flex align-items-center gap-2'
                                            onClick={() => getPostCommentsList(data?._id)}>
                                            <BiMessageRounded /> {data?.commentCount}
                                        </button>
                                    </p>
                                    <p><button className='text-decoration-none btn btn-light border-0 text-dark d-flex align-items-center gap-2' onClick={() => openSharePopup(data?.url, data?.description)}><RiShareForwardLine /> </button></p>
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
                                                <textarea className='form-control messageInput' type="text" value={message} onChange={handleMessage} placeholder="Write a comment..." />
                                                <label className='sendIcon'><Link onClick={() => handleComments(data?._id)} ><LuSend /></Link></label>
                                            </div>
                                            {/* <button className='btn btn-sm btn-light'><FaRegFaceSmile className='fs-4' /></button>
                                                        <button className='btn btn-sm btn-light'><FcAddImage className='fs-4' /></button> */}
                                        </div></> : null}
                            </div>)}
                        {/* {reload ?
                                    <div className='form-text text-danger text-center mb-5'>No Post</div> : null
                                } */}
                    </div>
                </div>
            </div>
 
            <Dialog open={open} fullWidth maxWidth="sm">
                <DialogTitle className='text-secondary'>
                    Edit Post<IconButton className="float-end" onClick={closePopup} >
                        <RiCloseFill /> </IconButton>
                </DialogTitle>
                <DialogContent className='mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='container d-flex flex-column align-items-center justify-content-center gap-4'>
                            <div>
                                <div className='card pointer' >
                                    {inputs?.fileType === 1 ? <img src={inputs?.url ? inputs?.url : uploadImage} alt="uploadImage" style={{ width: '500px', objectFit: 'cover' }} /> :
                                        <video poster={!inputs?.url ? uploadImage : null} src={inputs?.url} alt="uploadImage" controls style={{ width: '500px', objectFit: 'cover' }} />}
                                </div>
                                {errors?.url.required ? <span className="text-danger form-text profile_error">
                                    This field is required.
                                </span> : null
                                }</div>
                            <div className='text-center d-flex flex-column gap-4 w-100'>
                                <div className="form-floating" >
                                    <TextField
                                        label="Captions"
                                        sx={{ width: '59ch' }}
                                        multiline
                                        maxRows={3} name='description' value={inputs?.description} onChange={handleInputs} />
                                </div>
 
                            </div>
                            <div className='justify-content-center d-flex flex-column gap-4 w-100'>
                                <div>
                                    <TextField
                                        label="Hashtag"
                                        sx={{ width: '59ch' }}
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
                                    sx={{ width: '59ch' }}
                                    readOnly
                                    value={options?.filter((option) => inputs?.mention?.includes(option.id))}
                                    renderInput={(params) => <TextField {...params} name="mention" label="Mentions" />}
                                />
                            </div>
                        </div>
                        <div className='float-end mt-3' >
                            <button type="submit" className="btn btn-primary me-3" >Edit</button>
                            <button type="button" className="btn btn-light" onClick={closePopup} >Cancel</button></div>
                    </form>
                </DialogContent>
            </Dialog>
 
            <Dialog open={article} fullWidth maxWidth="sm">
                <DialogTitle className='text-secondary'>
                    Edit Article<IconButton className="float-end" onClick={closeArticle} >
                        <RiCloseFill /> </IconButton>
                </DialogTitle>
                <DialogContent className='mb-5'>
                    <form onSubmit={handleArticle}>
                        <div className='container d-flex flex-column align-items-center gap-4 justify-content-center '>
                            <div >
                                <div className='card pointer'>
                                    <img src={inputs?.url ? inputs?.url : uploadImage} alt="uploadImage" style={{ width: '500px', objectFit: 'cover' }} />
                                </div>
                                {errors?.url.required ? <span className="text-danger form-text profile_error">
                                    This field is required.
                                </span> : null
                                }</div>
                            <div className='text-center d-flex flex-column w-100'>
                                <ReactQuill theme="snow" value={value} placeholder='Write here.' modules={modules} onChange={setValue} />
                            </div>
                            <div className='justify-content-center d-flex flex-column  w-100'>
                                <div >
                                    <TextField
                                        label="Hashtag"
                                        sx={{ width: '59ch' }}
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
                                    sx={{ width: '59ch' }}
                                    value={options?.filter((option) => inputs?.mention?.includes(option.id))}
                                    readOnly
                                    renderInput={(params) => <TextField {...params} name="mention" value={inputs?.mention} label="Mentions" />}
                                />
                            </div>
                        </div>
                        <div className='float-end mt-3' >
                            <button type="submit" className="btn btn-primary me-3" >Edit</button>
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
        </>
    )
}
 
export default PostFeed;