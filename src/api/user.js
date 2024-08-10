import API from "./api"
import { User } from "./endpoints"

export const saveUser = (data) => {
    return API.post(`${User}`, data)
}
export const getSingleUser = (data) => {
    return API.get(`${User}/getSingleUser`, { params: { _id: data } })
}

export const updateConnectedUser = (data) => {
    return API.put(`${User}/updateConnectedUser`, data)
}
export const updateUser = (data) => {
    return API.put(`${User}`, data)
}

export const getFilterUser = (data) => {
    return API.put(`${User}/getFilterUser`, data)
}

export const getUsersAndPostsForSearch = (data) => {
    return API.get(`${User}/getUsersAndPostsForSearch`, { params: { search: data } })
}
export const Deleted = (data) => {
    return API.delete(`${User}`, data)
}

export const updateUserPassword = (data) => {
    return API.put(`${User}/updateUserPassword`, data)
}

export const updateEducation = (data) => {
    return API.put(`${User}/updateUserEducation`,  data)
}

export const deleteEducation = (data) => {
    return API.put(`${User}/deleteUserEducation`,  data)
}

export const updateExperience = (data) => {
    return API.put(`${User}/updateUserExperience`,  data)
}

export const deleteExperience = (data) => {
    return API.put(`${User}/deleteUserExperience`,  data)
}