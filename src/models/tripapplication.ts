import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import { Status } from "./visaapplication";
import Joi, { string } from "joi";

export const EmergencyContactSchema = Joi.object({
    fullname: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required()
})

@Entity()
export class EmergencyContact {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: "text" })
    fullname!: string;

    @Column("text")
    phone!: string;

    @Column({ type: "text" })
    email!: string;
}

export const LocationPrefSchema = Joi.object({
    location1: Joi.string(),
    location2: Joi.string(),
    location3: Joi.string(),
    suggestionform: Joi.string(),
})

@Entity()
export class LocationPref {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text" })
    location1?: string;

    @Column({ type: "text" })
    location2?: string;

    @Column({ type: "text" })
    location3?: string;

    @Column({ type: "text" })
    suggestform?: string;
}


export const TripUserSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required()
})


@Entity()
export class TripUser {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text" })
    fullname!: string;

    @Column({ type: "text" })
    email!: string;
}

export const TripPersnalInfoSchema = Joi.object({
    fullname: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    nationality: Joi.string().required(),
})

@Entity()
export class TripPersonalInfo {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: "text" })
    fullname!: string;

    @Column("text")
    phone!: string;

    @Column({ type: "text" })
    email!: string;

    @Column("text")
    nationality!: string;
}

export const TripApplicationSchema = Joi.object({
    user: Joi.string().uuid().required(),
    personalinfo: Joi.string().uuid().required(),
    location: Joi.string().uuid().required(),
    hotelpref: Joi.array().items(Joi.string()).required(),
    duration: Joi.string().required(),
    holidayvibe: Joi.string().required(),
    flightvisa: Joi.string().required(),
    holidaybudget: Joi.string().required(),
    holidaybudgetcurrency: Joi.string().required().max(4),
    additionalnotes: Joi.string(),
    companions: Joi.array().items(Joi.object({})).required(),
    emergencycontect: Joi.string().uuid().required(),
    status: Joi.string().required().default(Status.pending),
    submittedat: Joi.date().iso().required()
})

@Entity()
export class TripApplicationdb {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @OneToOne(() => TripUser, { cascade: true, onDelete: "CASCADE" })
    user!: TripUser;

    @OneToOne(() => TripPersonalInfo, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'id' })
    personalinfo!: TripPersonalInfo;

    @OneToOne(() => LocationPref, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'id', foreignKeyConstraintName: "FK_8bb42562c15145c29be087800c7d35f6" })
    location!: LocationPref;

    @Column({ type: "simple-array" })
    hotelpref!: string[];

    @Column({ type: "text" })
    duration!: string;

    @Column({ type: "text" })
    holidayvibe!: string;

    @Column({ type: "simple-array" })
    flightvisa!: string[];

    @Column({ type: "text" })
    packagetype!: string;

    @Column({ type: "text" })
    holidaybudget!: string;

    @Column({ type: "text" })
    holidaybudgetcurrency!: string;

    @Column({ type: "text" })
    additionalnotes!: string;

    @Column({ type: "simple-array" })
    companions!: object[];

    @OneToOne(() => EmergencyContact, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'id', foreignKeyConstraintName: "FK_e8a212e140a64b0eab79b6940d3671c3" })
    emergencycontact!: EmergencyContact;

    @Column({ type: 'enum', default: Status.pending, enum: Status })
    status!: Status;

    @Column({ type: "date" })
    submittedat!: string;
}
