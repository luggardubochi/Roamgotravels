import { Request, Response } from "express";
import * as tripservice from "../services/tripservice"

export const getTrips = async (req: Request, res: Response) => {
    const result = await tripservice.getAllTrips();
    if (result) {
        if (result.length > 1) { return res.status(200).json({ data: result }) }
        else if (result.length == 0) {
            return res.status(200).json({ messafe: "No trips have been upload ed to the database" })
        }
    }
    return res.status(404).json({ error: "Unable to geturn all users"});
}

export const addTrip = async (req: Request, res: Response) => {
    const result = await tripservice.addTrips(req.body)
    if (result) {
        return res.status(201).json({message: "Successfully added new trips into the database"});
    }
    return res.status(404).json({error: "Unable to add trips into the database"});
}

export const updateTripStatus = async (req: Request, res: Response) => {
    const {id, status} = req.body;
    const result = await tripservice.editsingletripstatus(id, status);
    if (result) {
        return res.status(201).json({message: `Updated the trip status to ${status}`});
    }
    return res.status(404).json({error: "unable to update status of trip"});
}