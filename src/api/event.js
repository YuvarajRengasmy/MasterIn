import API from "./api"
import { Event } from "./endpoints"


export const saveEvent = (data) => {
    return API.post(`${Event}`, data)
}

export const updateEvent = (data) => {
    return API.put(`${Event}`, data)
}

export const getFilterEvents = (data)=>{
    return API.put(`${Event}/getFilterEvents`,data)
}

export const deleteEvent = (data)=>{
    return API.delete(`${Event}`,{params:{_id:data}})
}

export const updateBookedUsers = (data)=>{
    return API.put(`${Event}/updateBookedUsers`,data)
}

export const getAllUpcomingEvents = ()=>{
    return API.get(`${Event}/getAllUpcomingEvents`)
}

export const getFilterUpComingEvents = (data)=>{
    return API.put(`${Event}/getFilterUpComingEvents`,data)
}