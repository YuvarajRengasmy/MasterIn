import API from "./api"
import { Notification } from "./endpoints"


export const getFilterNotification = (data)=>{
    return API.put(`${Notification}/getFilterNotification`,data)
}

export const getUnviewedNotification = ()=>{
    return API.get(`${Notification}/getUnviewedNotification`)
}

export const updateNotificationView = ()=>{
    return API.put(`${Notification}/updateNotificationView`,)
}

