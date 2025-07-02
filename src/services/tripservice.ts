import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/database";
import { EmergencyContact, LocationPref, TripApplicationSchema, TripApplicationdb, TripPersonalInfo, TripUser } from "../models/tripapplication";
import { Status } from "../models/visaapplication";

const tripRepo = () => AppDataSource.getRepository(TripApplicationdb);
const personalinfo = () => AppDataSource.getRepository(TripPersonalInfo);
const user = () => AppDataSource.getRepository(TripUser);
const location = () => AppDataSource.getRepository(LocationPref);
const contact = () => AppDataSource.getRepository(EmergencyContact);

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
    suggestform?: string,
}

interface ContactInterface {
    fullname: string,
    phone: string,
    email: string,
}

interface TripInterface {
    user: UserInterface,
    personalinfo: PersonalInfoInterface,
    location: LocationInterface,
    hotelPref: Array<string>,
    duration: string,
    holidayvibe: string,
    flightvisa: DeepPartial<string[]>,
    packagetype?: string,
    holidaybudget: string,
    holidaybudgetcurrency: string,
    additionalnotes?: string,
    companions?: Array<object>,
    emergencycontact: ContactInterface,
    status: DeepPartial<Status>,
    submittedat: string
}


export async function addTrips(data: TripInterface) {
    const trip = tripRepo().create(data);
    trip.user = user().create(data.user);
    trip.personalinfo = personalinfo().create(data.personalinfo);
    trip.location = location().create(data.location);
    trip.emergencycontact = contact().create(data.emergencycontact)
    return true;
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
    const trip = await tripRepo().findOne({where: { id }})
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