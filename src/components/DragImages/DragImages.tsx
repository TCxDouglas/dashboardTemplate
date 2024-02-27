/* eslint-disable @next/next/no-img-element */
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { Button, Popconfirm, Upload } from 'antd';
import styles from './DragImages.module.css';
import { ImageInfo, Photo } from '@/types/Photo';
import { CancelIcon } from '@/assets/icons/CancellIcon';

const { Dragger } = Upload;

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface Props {
    onChangePhotos: (value: ImageInfo[]) => void;
    listPhotos: ImageInfo[];
    listPreview: Photo[]
    onChangePreview: (images: Photo[]) => void
}

export const DragImages = ({ onChangePhotos, listPhotos, listPreview, onChangePreview }: Props) => {
    const onRemoveList = (file: ImageInfo) => {
        const filter = listPhotos.filter((value) => value.file.uid !== file.file.uid);

        onChangePhotos(filter);
    };

    const onRemovePreview = (imageInfo: Photo) => {
        const filter = listPreview.filter(value => value.id !== imageInfo.id)
        onChangePreview(filter)
    }

    const props: UploadProps = {
        name: 'file',
        showUploadList: false,
        multiple: true,
        accept: 'image/*',
        beforeUpload: async (_, files) => {
            const promisesFile = files.map((value) => getBase64(value));
            const promises = await Promise.all(promisesFile);
            const newFiles = promises.map((value, i) => {
                return {
                    file: files[i],
                    preview: value,
                };
            });
            onChangePhotos([...listPhotos, ...newFiles]);

            return false;
        },
    };

    return (
        <div className={styles.contentDrag}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Selecciona o arrastra tus imagenes</p>
            </Dragger>
            <div className={styles.containerImagesPreview}>
                {listPreview.map((image) => {
                    return (
                        <div className={styles.contentImage} key={image.id}>
                            <Popconfirm title='Esta seguro de eliminar esta imagen?' onConfirm={() => onRemovePreview(image)}>
                                <Button
                                    type="text"
                                    icon={<CancelIcon />}
                                    className={styles.buttonCancel}
                                ></Button>
                            </Popconfirm>
                            <img src={image.url} alt="Imagen" className={styles.image}></img>
                        </div>
                    );
                })}
                {listPhotos.map((image, index) => {
                    return (
                        <div className={styles.contentImage} key={index}>
                            <Popconfirm title='Esta seguro de eliminar esta imagen?' onConfirm={() => onRemoveList(image)} >
                                <Button
                                    type="text"
                                    icon={<CancelIcon />}
                                    className={styles.buttonCancel}
                                ></Button>
                            </Popconfirm>
                            <img src={image.preview} alt="Imagen" className={styles.image}></img>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
