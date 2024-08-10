import API from "./api"
import { Post } from "./endpoints"

export const savePost = (data)=>{
    return API.post(`${Post}`,data)
}

export const updatePost = (data)=>{
    return API.put(`${Post}`,data)
}

export const deletePost = (data)=>{
    return API.delete(`${Post}`,{params:{_id:data}})
}

export const getFilterPost = (data)=>{
    return API.put(`${Post}/getFilterPost`,data)
}

export const getFilterPostUser = (data)=>{
    return API.put(`${Post}/getFilterPostByUser`,data)
}
export const getSinglePost = (data) => {
    return API.get(`${Post}/getSinglePost`, { params: { _id: data } })
}

export const saveLikes = (data) => {
    return API.post(`${Post}/savePostLikes`,data);
  };

  export const savePostComments = (data) => {
    return API.post(`${Post}/createPostComments`, data)
}

export const updatePostReport = (data) => {
    return API.put(`${Post}/updatePostReport`, data)
}

export const updateBlockPost = (data) => {
    return API.put(`${Post}/updatePostBlockUsers`, data)
}

export const getPostForPlayList = () => {
    return API.get(`${Post}/getPostForPlayList`)
}


