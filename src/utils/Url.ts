import { API_URL } from "@/constants/constants"

export const addPathImage = (url: string) => {

    const urlAPI = new URL(API_URL)

    return urlAPI.origin + url
}