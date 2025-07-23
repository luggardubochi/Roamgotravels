import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Joi, { ValidationOptions } from "joi";
import { TripApplicationdb } from "./tripapplication";
import { User } from "./user";

export enum Status {
    pending = "Pending",
    underreview = "Under Reveiw",
    approved = "Approved",
    rejected = "Rejected"
}


export const personalSchema = Joi.object({
    fullname: Joi.string().required(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    nationality: Joi.string().required(),
    passportNumber: Joi.string().required(),
    passport: Joi.string().required(),
})


export const contactSchema = Joi.object({
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
})

export const travelSchema = Joi.object({
    purpose: Joi.string().required(),
    memberstate: Joi.string().required(),
    arrivaldate: Joi.string().isoDate().required(),
    departuredate: Joi.string().isoDate().required()
})

export const visaSchema = Joi.object({
    personalInfo: personalSchema,
    contactInfo: contactSchema,
    travelInfo: travelSchema,
    status: Joi.string().required(),
    submitted: Joi.string().required(),
})


@Entity()
export class PersonalInfo {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: "text" })
    fullname!: string;

    @Column("text")
    gender!: string;

    @Column({ type: "date" })
    dob!: string;

    @Column("text")
    nationality!: string;

    @Column("text")
    passportNumber!: string;

    @Column("text")
    passport!: string;
}

@Entity()
export class ContactInformation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: "text" })
    phone!: string;

    @Column({ type: "text" })
    email!: string;

    @Column({ type: "text" })
    address!: string;
}

@Entity()
export class TravelInfo {
    @PrimaryGeneratedColumn("uuid")
    contactid!: string;

    @Column({ type: 'text' })
    purpose!: string;

    @Column({ type: "text" })
    memberstate!: string;

    @Column({ type: 'date' })
    arrivaldate!: string;

    @Column({ type: "text" })
    departuredate!: string;
}


@Entity()
export class VisaApplicationdb {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @OneToOne(() => TripApplicationdb)
    @JoinColumn({ name: "tripid", referencedColumnName: "id" })
    tripId!: TripApplicationdb;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @OneToOne(() => PersonalInfo)
    @JoinColumn({ name: 'personalid' })
    personalinfo!: PersonalInfo;

    @OneToOne(() => ContactInformation)
    @JoinColumn({ name: "contactid" })
    contactinfo!: ContactInformation;

    @OneToOne(() => TravelInfo)
    @JoinColumn({ name: "travelid" })
    travelinfo!: TravelInfo;

    @Column({ type: 'enum', default: Status.pending, enum: Status })
    status!: Status;

    @Column({ type: "date" })
    submittedat!: string;
}
