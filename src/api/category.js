import API from "./api"
import { Category } from "./endpoints"


export const getAllCategory = ()=>{
    return API.get(`${Category}`)
}