import React, { useEffect, useState } from 'react';
import uploadImage from '../../Assets/Images/upload.jpg';
import { getMasterId } from '../../../utils/Storage';
import { uploadFile } from '../../../utils/FileUpload';
import { toast } from 'react-toastify';
import { getSinglePlayList, savePlayList, updatePlayList } from '../../../api/playlist';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getPostForPlayList } from '../../../api/post';
import { Autocomplete, TextField } from '@mui/material';
import { getAllCategory } from '../../../api/category';


const CreatePlaylist = () => {
    let initialState = {
        name: '',
        thumbnail: '',
        user: getMasterId(),
        post: [],
        description: '',
        category: '',
    }

    let initialStateErrors = {
        name: {
            required: false
        },
        thumbnail: { required: false },
        category: { required: false }
    };

    const [selectedVideos, setSelectedVideos] = useState([]);
    const [inputs, setInputs] = useState(initialState);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [post, setPost] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate()
    const location = useLocation()
    const id = new URLSearchParams(location.search).get('id')

    useEffect(() => {
        getAllPostList()
        getAllCategoryList()
    }, [])
    

    const getAllPostList = () => {
        getPostForPlayList().then(res => {
            const result =res?.data?.result
            if (id) {
                getPlayListDetails(result)
            }
            else{setPost(result)}
        }).catch(err => console.log(err))
    }

    const getPlayListDetails = (data) => {
        getSinglePlayList(id).then(res => {
            const result = res?.data?.result
            setInputs(result)
            setSelectedVideos(result?.post?.map(x=>x?._id))
            setPost([...result?.post,...data])
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
        if (data.name === "") {
            error.name.required = true;
        }
        if (data.thumbnail === "") {
            error.thumbnail.required = true;
        }
        if (data.category === "") {
            error.category.required = true;
        }
        return error
    }


    const handleErrors = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const prop = obj[key];
                if (prop.required === true) {
                    return false;
                }
            }
        }
        return true;
    }

    const handleFileChange = (event) => {
        const file = event?.target?.files[0];
        const folder = 'masterIn/playlistThumbnail'
        if (file) {
            uploadFile(file, folder).then(res => {
                event.target.value = null;
                const thumbnail = res?.Location
                setInputs({ ...inputs, thumbnail })
                if (submitted) {
                    const newError = handleValidation({ ...inputs, thumbnail })
                    setErrors(newError)
                }
            }).catch(err => { console.log(err); })
        };

    };


    const handleVideoSelection = (data) => {
        if (selectedVideos?.includes(data)) {
            setSelectedVideos(selectedVideos.filter(x => x !== data))
        }
        else {
            setSelectedVideos([...selectedVideos, data])
        }
    };

    const handleThumbnailClick = () => {
        document.getElementById('playlistThumbnailInput').click();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        if (handleErrors(newError)) {
            if (inputs.category.length >= 2) {
                if (inputs?._id) {
                    const removelist = inputs?.post.map(x=>{
                        return selectedVideos.includes(x?._id)?'':x?._id
                    }).filter(Boolean)
                    const addlist = selectedVideos.map(x=>{
                        return inputs?.post.some(y=>y?._id===x)?'':x
                    }).filter(Boolean)
                    inputs.removePost=removelist
                    inputs.addPost=addlist
                    inputs.post = selectedVideos 
                    updatePlayList(inputs).then((res) => {
                        toast.success('Successfully edit a playlist');
                        navigate('/Home')
                    })
                        .catch((err) => {
                            toast.error(err?.response?.data?.message);
                        });
                }
                else {
                    inputs.post = selectedVideos
                    savePlayList(inputs).then((res) => {
                        toast.success('Successfully create a playlist');
                        navigate('/Home')
                    })
                        .catch((err) => {
                            toast.error(err?.response?.data?.message);
                        });
                }
            }
            else {
                toast.error('Please select at least two categories.');

            }
        }
    }

    const handleCategory = (event, values) => {
        const category = values.map(x => x._id)
        setInputs({ ...inputs, category });
        if (submitted) {
            const newError = handleValidation({ ...inputs, category })
            setErrors(newError)
        }
    };

    const getAllCategoryList = () => {
        getAllCategory().then(res => {
            setCategory(res?.data?.result)
        }).catch(err => { console.log(err) })
    }



    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">{inputs?._id ? 'Edit PlayList' : 'Create a New Playlist'}</h2>

            <div className="row shadow bg-light border rounded-5 p-3  gap-5 mb-5 mt-5 justify-content-center">
                {/* Create Playlist and Thumbnail */}
                <div className='col-lg-4  container mt-3 mb-lg-5'>
                    <div className=" border border-2 border-light rounded mb-3">
                        <label htmlFor="playlistName" className="form-label">
                            Playlist Thumbnail
                        </label>
                        <img
                            src={inputs?.thumbnail ? inputs?.thumbnail : uploadImage}
                            alt="Sample Thumbnail"
                            className="img-fluid"
                            onClick={handleThumbnailClick}
                            width="100%"
                            style={{ cursor: 'pointer', objectFit: 'cover', height: '250px' }}
                        />
                        <input
                            type="file"
                            className="form-control"
                            id="playlistThumbnailInput"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        {errors?.thumbnail?.required ? <span className="text-danger form-text profile_error">
                            This field is required.
                        </span> : null
                        }
                    </div>
                    <div className='mb-3'>
                        <TextField
                            label="Playlist Name"
                            className='w-100' multiline value={inputs?.name}
                            maxRows={3} name='name' onChange={handleInputs} />
                        {errors?.name?.required ? <span className="text-danger form-text profile_error">
                            This field is required.
                        </span> : null
                        }
                    </div>
                    <div className='mb-3'>
                        <Autocomplete
                            disablePortal
                            multiple
                            id="combo-box-demo"
                            options={category}
                            getOptionLabel={(option) => option.category}
                            className='w-100'
                            limitTags={1}
                            value={category?.filter((option) => inputs?.category?.includes(option._id))}
                            onChange={handleCategory}
                            renderInput={(params) => <TextField {...params} name="category" label="Category" placeholder='Categories' />}
                        />
                        {errors?.category?.required ? <span className="text-danger form-text profile_error">
                            This field is required.
                        </span> : null
                        }
                    </div>
                    <div>
                        <TextField
                            label="Description" value={inputs?.description}
                            className='w-100' multiline
                            maxRows={3} name='description' onChange={handleInputs} />
                    </div>
                </div>
                {/* Select Videos */}
                <div className="col-lg-7  mt-lg-2   mb-5 rounded p-2">
                    <label htmlFor="playlistVideos" className="form-label">
                        Select Videos
                    </label>
                    <div className="row scroll-bar" style={{ overflowX: 'auto', maxHeight: '420px' }}>
                        {post?.map((data, index) =>
                            <div key={index} className="col-lg-3 col-md-6 col-sm-6 mb-3">
                                <div
                                    className={`card rounded ${selectedVideos?.includes(data?._id) ? 'opacity-25' : ''}`}
                                    onClick={() => handleVideoSelection(data?._id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <video
                                        className="card-img-top rounded"
                                        width="100%"
                                        style={{ objectFit: 'cover', height: '200px' }}
                                        src={data?.url}
                                    >
                                    </video>
                                </div>
                            </div>
                        )}
                    </div>
                    {post?.length === 0 ? <div className='form-text text-danger d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
                        Videos are not available for playlist creation.
                    </div> : null}
                </div>


            </div>

            <div className='d-flex flex-wrap justify-content-lg-end justify-content-center align-items-center gap-4 mb-3'>
                <Link type="button" to="/Home" className="btn btn-outline-danger" style={{ width: '10rem' }}>
                    Back
                </Link>
                <Link type="button" onClick={handleSubmit} className="btn btn-outline-success" style={{ width: '10rem' }}>
                    {inputs?._id ? 'Edit Playlist' : 'Create Playlist'}
                </Link>
            </div>
        </div>
    );
};

export default CreatePlaylist;
