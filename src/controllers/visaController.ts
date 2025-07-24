import { AuthRequest } from "../middlewares/authMiddleware";
import { uploadToCloudinary } from "../middlewares/validate";
import * as visaService from "../services/visaApplicationService";
import { Request, Response } from "express";

export const getAllVisasAdmin = async (req: Request, res: Response) => {
    try {
        const allvisa = await visaService.getAllVisa();
        res.json({ data: allvisa });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export const createVisa = async (req: AuthRequest, res: Response) => {
    let imageUrl = req.body.passport;
    if (req.file) {
        try {
            imageUrl = await uploadToCloudinary(req.file.buffer);
        } catch (err) {
            return res.status(500).json({ message: 'Image upload failed' });
        }
    }
    const visaData = {...req.body, passport: imageUrl};
    const tripId = req.params.tripId;
    const userId = req.user.id;
    try {
        const visa = await visaService.createVisaApplication(tripId, userId, visaData);
        return res.json({data: visa});
    } catch(err) {
        return res.status(400).json({message: err});
    }
}


export const updateVisa = async (req: AuthRequest, res: Response) => {
    let imageUrl = req.body.passport;
    if (req.file) {
        try {
            imageUrl = await uploadToCloudinary(req.file.buffer);
        } catch (err) {
            return res.status(500).json({ message: 'Image upload failed' });
        }
    }
    const visaData = {...req.body, passport: imageUrl};
    const visaId = req.params.visaId;
    const userId = req.user.id;
    try {
        const visa = await visaService.updateVisaFromUser(userId, visaId, visaData);
        return res.json({data: visa});
    } catch(err) {
        return res.status(400).json({message: err});
    }
}
export async function updateVisaStatus(req: AuthRequest, res: Response) {
    let status = req.body.status;
    let visaId = req.params.visaId;
    try {
        const visa = await visaService.updateVisaStatus(visaId, status);
        return res.json({data: visa})
    } catch(err) {
        return res.status(500).json({message:err});
    }
}

export async function deleteVisa(req: AuthRequest, res: Response) {
    let visaId = req.params.visaId;
    const userId = req.user.id;
    try {
        await visaService.deleteVisa(userId, visaId);
        return res.json({message: "Visa Application have been deleted successfully"})
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

export async function getVisa(req: AuthRequest, res: Response) {
    try {
        const visa = await visaService.getVisaApplicationsfromUser(req.user.id);
        return res.json({data: visa});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

export async function getSingleVisa(req: AuthRequest, res: Response) {
    try {
        const visa = await visaService.getSingleVisaApplicationsfromUser(req.user.id, req.params.visaId);
        return res.json({data: visa});
    } catch(err) {
        return res.status(500).json({message: err})
    }
}