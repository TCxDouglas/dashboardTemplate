import { UploadFile } from "antd";

export interface Photo {
    id: number
    url: string
}

export interface ImageInfo {
    file: UploadFile;
    preview: string;
}