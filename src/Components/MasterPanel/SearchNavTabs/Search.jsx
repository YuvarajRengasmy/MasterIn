import React, { useEffect, useRef, useState } from 'react';
import masterinLogo from '../../Assets/Images/masterin-logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import SideBar from '../../../Pages/SideBar';
import People from './People';
import PostFeed from './PostFeed';
import { getMastersAndPostsForSearch } from '../../../api/master';
 
const Search = () => {
    const [peoples, setPeoples] = useState([]);
    const [posts, setPosts] = useState([]);
    const [link, setLink] = useState('');
    const [data, setData] = useState(false);
    const search = useRef(null)
    const location = useLocation()
    var searchValue = location.state
 
    useEffect(() => {
        if (search.current) {
            search.current.focus()
        }
    }, [])
 
    useEffect(() => {
        if (searchValue) {
            search.current.value = searchValue.substring(1)
            handleSearch()
        }
    }, [searchValue])
 
    const handleSearch = (event) => {
        const data = search.current.value
        event?.preventDefault()
        getMastersAndPostsForSearch(data).then(res => {
            const userList = res?.data?.result?.masterList
            const postList = res?.data?.result?.postList
            setPeoples(userList)
            setPosts(postList)
            const result =
            postList.length !== 0 ? 'post' :
            userList.length !== 0 ? 'people' :''
        setLink(result);
        setData(result===''? true : false)
        }).catch(err => console.log(err))
    }
 
    const handleInputs = (event) => {
        if (event.key === 'Enter') {
            search.current.blur();
            handleSearch()
        }
    }
 
    return (
        <>
            <div className='container-fluid'>
                <div className="navbar navbar-white bg-white border-bottom shadow fixed-top row">
                    <div className='col-lg-3 col-12 d-flex justify-content-lg-start justify-content-center'>
                        <SideBar />
                        <img src={masterinLogo} className='img-fluid' alt="logo" style={{ width: '9rem' }} />
                    </div>
                    <form onSubmit={handleSearch} className='col-lg-6 col-12 d-flex align-items-center justify-content-center me-auto p-0' style={{ height: '3.5rem' }}>
                        <div className="input-group mb-4 border rounded-pill w-75 align-items-center mt-4 d-flex">
                            <input
                                type="search"
                                ref={search}
                                placeholder="What're you searching for?"
                                aria-describedby="button-addon3"
                                className="form-control bg-transparent border-0"
                                onChange={handleInputs}
                            />
                            <div className="input-group-append border-0">
                                <button id="button-addon3" type="submit" className="btn btn-link fw-bold text-primary fs-4"><CiSearch /></button>
                            </div>
                        </div>
                    </form>
                    <div className="container py-3 d-flex align-items-center justify-content-lg-center justify-content-center gap-4 mt-2 mb-2">
                        {posts.length > 0 ? <div>
                            <Link onClick={() => setLink('post')} className={`btn rounded-5 ${link === 'post' ? 'btn-dark text-white' : 'btn-outline-dark'}`}>Post</Link>
                        </div> : null}
                        {peoples.length > 0 ? <div>
                            <Link onClick={() => setLink('people')} className={`btn rounded-5 ${link === 'people' ? 'btn-dark text-white' : 'btn-outline-dark'}`}>People</Link>
                        </div> : null}
                    </div>
                    {data ? <div className='text-danger text-center' style={{ position: 'absolute', top: '300px' }}>No data found.</div> : null}
                    {link === 'post' ? <PostFeed posts={posts} handleSearch={handleSearch} /> :
                        link === 'people' ? <People peoples={peoples} /> : null}
                </div>
            </div>
        </>
    )
}
 
export default Search;