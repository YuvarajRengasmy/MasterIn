import API from "./api"
import { Dashboard } from "./endpoints"


export const getMasterDashboardCounts = () => {
    return API.get(`${Dashboard}`)
}

export const getMasterDashboardList = () => {
    return API.get(`${Dashboard}/getMasterDashboardList`)
}

export const getAllMasterEvents = () => {
    return API.get(`${Dashboard}/getAllMasterEvents`)
}

export const getDashboardEventsFilter = (data) => {
    return API.put(`${Dashboard}/getDashboardEventsFilter`,data)
}


export const getAllMasterWorkShops = () => {
    return API.get(`${Dashboard}/getAllMasterWorkShops`)
}

export const getDashboardWorkShopsFilter = (data) => {
    return API.put(`${Dashboard}/getDashboardWorkShopsFilter`,data)
}