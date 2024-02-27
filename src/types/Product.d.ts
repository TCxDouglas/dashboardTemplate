import { Category } from "./Category"
import { Photo } from "./Photo"

export interface Product {
    id: number
    name: string
    description: string
    price: number
    country: string
    createdAt: string
    updatedAt: string
    category?: Category
    cover?: Photo
}

export interface ProductForm {
    name: string;
    description: string
    price: number
    country: string
    category?: number
}