import { Request, Response } from "express";
import { addMessage, updateMessageStatus, getMessage } from "../services/messageservice";

export async function createMessage(req: Request, res: Response) {
    try {
        console.log(req.body)
        addMessage(req.body);
        return res.status(201).json({ message: "new message have been added" });
    } catch (err) {
        return res.status(400).json({ message: "Unable to add message" })
    }
}

export async function updateMessage(req: Request, res: Response) {
    try {
        let { id, status } = req.body;
        updateMessageStatus(id, status);
        return res.status(200).json({ message: `Updated message status of ${id}` })
    } catch (err) {
        return res.status(400).json({ message: "Unable to update the status of message" })
    }
}

export async function getallMessages(req: Request, res: Response) {
    try {
        let data = await getMessage();
        console.log("From the getall Message function", data)
        return res.status(200).json({ data });
    } catch (err) {
        return res.status(400).json({ message: "unable to return messages data" })
    }
}