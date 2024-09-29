import sharp from 'sharp';
import { BadRequest } from '../error/error.handler';

export async function uploadImage(imageBuffer: Buffer, fileName: string) {
    try {
        const compressedImage = await sharp(imageBuffer)
            .resize({ width: 800 }) 
            .jpeg({ quality: 80 })
            .toBuffer();

        const compressedBase64Image = compressedImage.toString('base64');

        const formData = new FormData();
        formData.append('file', compressedBase64Image);
        formData.append('fileName', fileName);

        const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ':').toString('base64'),
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw new BadRequest("Image upload failed");
    }
}

export async function uploadVideo(imageBuffer: Buffer, fileName: string) {
    try {

        const Base64Image = imageBuffer.toString('base64');

        const formData = new FormData();
        formData.append('file', Base64Image);
        formData.append('fileName', fileName);

        const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ':').toString('base64'),
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw new BadRequest("Image upload failed");
    }
}




