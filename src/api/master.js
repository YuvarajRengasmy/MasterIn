import API from "./api"
import { Master } from "./endpoints"


export const saveMaster = (data) => {
    return API.post(`${Master}`, data)
}
export const AddExperience = (data) => {
    return API.post(`${Master}/addExperience`, data)
}
export const getSingleMaster = (data) => {
    return API.get(`${Master}/getSingleMaster`, { params: { _id: data } })
}
export const updateMaster = (data) => {
    return API.put(`${Master}`, data)
}
export const getFilterMaster = (data) => {
    return API.put(`${Master}/getFilterMaster`, data)
}

export const getAllMaster = () => {
    return API.get(`${Master}`)
}
export const Deleted = (data) => {
    return API.delete(`${Master}`, data)
}
export const updateConnectedUser = (data) => {
    return API.put(`${Master}/updateConnectedUser`, data)
}

export const updateEducation = (data) => {
    return API.put(`${Master}/updateMasterEducation`,  data)
}

export const deleteEducation = (data) => {
    return API.put(`${Master}/deleteMasterEducation`,  data)
}

export const updateExperience = (data) => {
    return API.put(`${Master}/updateMasterExperience`,  data)
}

export const deleteExperience = (data) => {
    return API.put(`${Master}/deleteMasterExperience`,  data)
}
export const updateMasterPassword = (data) => {
    return API.put(`${Master}/updateMasterPassword`, data)
}

export const getMastersAndPostsForSearch = (data) => {
    return API.get(`${Master}/getMastersAndPostsForSearch`, { params: { search: data } })
}