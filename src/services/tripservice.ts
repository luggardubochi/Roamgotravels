import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/database";
import { Companion, EmergencyContact, LocationPref, TripApplicationSchema, TripApplicationdb, TripPersonalInfo, TripUser } from "../models/tripapplication";
import { Status } from "../models/visaapplication";
import { User } from "../models/user";

const tripRepo = () => AppDataSource.getRepository(TripApplicationdb);
const personalinfo = () => AppDataSource.getRepository(TripPersonalInfo);
const userRepo = AppDataSource.getRepository(User);
const user = () => AppDataSource.getRepository(TripUser);
const location = () => AppDataSource.getRepository(LocationPref);
const contact = () => AppDataSource.getRepository(EmergencyContact);
const compan = () => AppDataSource.getRepository(Companion);

interface UserProps {
    user_id: string,
    email: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    created_at: Date,
    updated_at: Date,
    is_active: Boolean,
    last_login: Date,
    role: string,
}

interface UserInterface {
    fullname: string,
    email: string,
}

interface PersonalInfoInterface {
    fullname: string,
    phone: string,
    email: string,
    nationality: string,
}

interface LocationInterface {
    location1?: string,
    location2?: string,
    location3?: string,
    suggestforme?: string,
}

interface ContactInterface {
    fullname: string,
    phone: string,
    email: string,
}

interface CompanionInterface {
    fullname: string,
    relationship: string,
    dob: string,
    phone: string,
    passportnumber: string,
    passportexpiry: string,
}

interface TripInterface {
    user: DeepPartial<User>,
    personalinfo: PersonalInfoInterface,
    location: LocationInterface,
    hotelpref: Array<string>,
    duration: string,
    holidayvibe: string,
    flightvisa: DeepPartial<string[]>,
    packagetype?: string,
    holidaybudget: string,
    holidaybudgetcurrency: string,
    additionalnotes?: string,
    companion: DeepPartial<Companion>[],
    emergencycontact: ContactInterface,
    status: DeepPartial<Status>,
    submittedat: string
}


export async function addTrips(user_id: string, data: TripInterface) {
    const user = await userRepo.findOneBy({ user_id }) as DeepPartial<User>;
    if (user) {
        const trip = tripRepo().create({
            ...data,
            user: user,
            personalinfo: personalinfo().create(data.personalinfo),
            location: location().create(data.location),
            emergencycontact: contact().create(data.emergencycontact),
        });
        if (data.companion) {
            trip.companions = data.companion.map(value => compan().create(value));
        }

        await tripRepo().save(trip);
        return { state: true, data: trip };
    }
    return false;
}

export async function getAllTrips() {
    return tripRepo().find({
        relations: {
            user: true,
            personalinfo: true,
            location: true,
            emergencycontact: true
        }
    });
}

export async function editsingletripstatus(id: string, status: string) {
    const trip = await tripRepo().findOne({ where: { id } })
    if (!trip) throw new Error("Trip not found");
    switch (status) {
        case "review":
            trip.status = Status.underreview;
            break;
        case "approved":
            trip.status = Status.approved;
            break;
        case "rejected":
            trip.status = Status.rejected;
            break;
        default:
            trip.status = Status.pending
            break;
    }
    if (await tripRepo().save(trip))
        return true;
    return false;

}

export async function getTripUser(userg: UserProps) {
    const user = await userRepo.findOneBy({ user_id: userg.user_id });
    if (!user) throw new Error("User Not found")
    const trip = await tripRepo().findBy({ user: user });
    if (!trip) throw new Error("Trip not found");
    return trip;
}