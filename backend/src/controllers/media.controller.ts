
import { Request, Response, NextFunction } from 'express';
import { getGcsSignedUrl } from '../services/s3.service';

export const getPresignedUrl = async (req: Request, res: Response, next: NextFunction) => {
    const { fileName, fileType } = req.query;

    if (!fileName || !fileType) {
        return res.status(400).json({ message: 'fileName and fileType query parameters are required' });
    }

    try {
        const result = await getGcsSignedUrl(fileName as string, fileType as string);
        res.json(result);
    } catch (error) {
        next(error);
    }
};