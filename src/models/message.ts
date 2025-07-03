import Joi from "joi";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./visaapplication";

export enum MessageStatus {
    new = "new",
    read = "read",
    replied = "replied",
    resolved = "resolved",
}

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("text")
    fullname!: string;

    @Column("text")
    email!: string;

    @Column("text")
    phone_number!: string;

    @Column("text")
    subject!: string;

    @Column("text")
    message!: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    submittedat!: string;

    @Column({ type: "enum", default: MessageStatus.new, enum: MessageStatus })
    status?: MessageStatus;
}

export const MessageSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required()
})