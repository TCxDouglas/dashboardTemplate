import { API_PROAFI } from "@/constants/constants"

export const addPathImage = (url: string) => {

    const urlAPI = new URL(API_PROAFI)

    return urlAPI.origin + url
}