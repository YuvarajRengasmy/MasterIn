import API from "./api"
import { PlayList } from "./endpoints"

export const savePlayList = (data)=>{
    return API.post(`${PlayList}`,data)
}

export const updatePlayList = (data)=>{
    return API.put(`${PlayList}`,data)
}

export const getFilterPlayList = (data)=>{
    return API.put(`${PlayList}/getFilterPlayList`,data)
}


export const getAllPlayListByUser = (data)=>{
    return API.get(`${PlayList}/getAllPlayListByUser`,data)
}

export const getSinglePlayList = (data)=>{
    return API.get(`${PlayList}/getSinglePlayList`,{params:{_id:data}})
}

export const deletePlayList = (data)=>{
    return API.delete(`${PlayList}/`,{params:{_id:data}})
}