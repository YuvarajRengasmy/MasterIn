import API from "./api"
import { BookSession } from "./endpoints"


export const saveBookSession = (data) => {
    return API.post(`${BookSession}`, data)
}

export const getFilterBookSession = (data) => {
    return API.put(`${BookSession}/getFilterBookSession`, data)
}

export const getSingleBookSession = (data) => {
    return API.get(`${BookSession}/getSingleBookSession`, { params: { _id: data } })
}

export const getAllUpcomingSessions = () => {
    return API.get(`${BookSession}/getAllUpcomingSessions`)
}