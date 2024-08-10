import API from "./api"
import { Company } from "./endpoints"


export const saveCompany = (data) => {
    return API.post(`${Company}`, data)
}

export const getFilterCompany = (data) => {
    return API.put(`${Company}/getFilterCompany`, data)
}
export const getSigleCompany = (data) => {
    return API.get(`${Company}/getSingleCompany`, {params:{_id:data}})
}