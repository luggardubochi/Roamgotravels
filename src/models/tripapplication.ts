import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Status } from "./visaapplication";
import Joi, { string } from "joi";
import { User } from "./user";

export const CompanionSchema = Joi.object({
    fullname: Joi.string().required(),
    relationship: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required()
})

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
    suggestionforme: Joi.string(),
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
    suggestforme?: string;
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

export const TripPersonalInfoSchema = Joi.object({
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

    @ManyToOne(() => User)
    @JoinColumn({ name: "tripuserid", referencedColumnName: "user_id" })
    user!: User;

    @OneToOne(() => TripPersonalInfo, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
    personalinfo!: TripPersonalInfo;

    @OneToOne(() => LocationPref, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
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
    packagetype?: string;

    @Column({ type: "text" })
    holidaybudget!: string;

    @Column({ type: "text" })
    holidaybudgetcurrency!: string;

    @Column({ type: "text" })
    additionalnotes!: string;

    @OneToMany(() => Companion, companion => companion.trip, { onDelete: "CASCADE", nullable: true })
    companions?: Companion[];

    @OneToOne(() => EmergencyContact, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
    emergencycontact!: EmergencyContact;

    @Column({ type: 'enum', default: Status.pending, enum: Status })
    status!: Status;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    submittedat!: string;
}

@Entity()
export class Companion {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text" })
    fullname!: string;

    @Column({ type: 'text' })
    relationship!: string;

    @Column({ type: 'text' })
    phone!: string;

    @Column({ type: "text" })
    email!: string;

    @Column({ type: 'date' })
    dob!: string;

    @Column({ type: "text" })
    address!: string;

    @ManyToOne(() => TripApplicationdb, trippy => trippy.companions, {
        onDelete: "CASCADE"
    })
    trip!: TripApplicationdb;
}
