import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Status {
    pending = "Pending",
    underreview = "Under Reveiw",
    approved = "Approved",
    rejected = "Rejected"
}


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

    @OneToOne(() => PersonalInfo)
    @JoinColumn({ name: 'id' })
    personalinfo!: PersonalInfo;

    @OneToOne(() => ContactInformation)
    @JoinColumn({ name: "contactid", foreignKeyConstraintName: "FK_ba1890ece4224d72abc6fb6e85aa703e" })
    contactinfo!: ContactInformation;

    @OneToOne(() => TravelInfo)
    @JoinColumn({ name: "id", foreignKeyConstraintName: "FK_02fde3d3e2af40bab4ae213e5a8f837e", })
    travelinfo!: TravelInfo;

    @Column({ type: 'enum', default: Status.pending, enum: Status })
    status!: Status;

    @Column({ type: "date" })
    submittedat!: string;
}
