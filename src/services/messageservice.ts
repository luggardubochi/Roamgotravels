import { AppDataSource } from "../config/database"
import { Message } from "../models/message"
import { MessageStatus } from "../models/message";

const messageRepo = () => AppDataSource.getRepository(Message);

interface MessageInterface {
    fullname: string,
    email: string,
    phone_number: string,
    subject: string,
    message: string,
}

export async function getMessage() {
    let messages = await messageRepo().find();
    console.log(messages);
    return messages;
}

export async function addMessage(data: MessageInterface) {
    let message = messageRepo().create(data)
    messageRepo().save(message);
}

export async function updateMessageStatus(id: string, status: string) {
    let message = await messageRepo().findOne({ where: { id } })
    if (!message) throw new Error("Message not found");
    switch (status) {
        case "resolved":
            message.status = MessageStatus.resolved;
            break;
        case "replied":
            message.status = MessageStatus.replied;
            break;
        case "read":
            message.status = MessageStatus.read;
            break;
        default:
            message.status = MessageStatus.new
            break;
    }
    if (await messageRepo().save(message))
        return true;
    return false;
}

