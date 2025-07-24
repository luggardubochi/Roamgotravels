import { AppDataSource } from '../config/database';
import { TripApplicationdb } from '../models/tripapplication';
import { User } from '../models/user';
import { visaSchema, VisaApplicationdb, Status } from '../models/visaapplication';

const visaRepo = () => AppDataSource.getRepository(VisaApplicationdb);
const tripRepo = () => AppDataSource.getRepository(TripApplicationdb);
const userRepo = () => AppDataSource.getRepository(User);

interface personalInterface {
    tripid: string,
    fullname: string,
    gender: string,
    dob: string,
    nationality: string,
    passportNumber: string,
    passport: string,
}

interface contactInterface {
    phone: string,
    email: string,
    address: string,
}

interface travelInterface {
    purpose: string,
    memberstate: string,
    arrivaldate: string,
    departuredate: string
}

interface visaInterface {
    personal: personalInterface,
    contact: contactInterface,
    travel: travelInterface,
    status: string,
    submittedat: string
}

export async function createVisaApplication(tripId: string, userId: string, data: visaInterface) {
    const { error, value } = visaSchema.validate(data);
    if (error) throw new Error(error.details[0].message);
    const trip = await tripRepo().find({ where: { id: tripId } });
    const user = await userRepo().find({ where: { user_id: userId } });
    if (!trip) throw new Error("Trip not found");
    const visa = await visaRepo().create({ ...value, trip, user })
    return visaRepo().save(visa);
}

export async function getVisaApplicationsfromUser(userID: string) {
    const user = await userRepo().findOne({ where: { user_id: userID } });
    if (!user) return new Error("User not found");
    const visa = await visaRepo().find({ where: { user: user } });
    if (!visa) return [];
    return visa;
}

export async function getSingleVisaApplicationsfromUser(userID: string, visaID: string) {
    const user = await userRepo().findOne({ where: { user_id: userID } });
    if (!user) return new Error("User not found");
    const visa = await visaRepo().find({ where: { user: user, id: visaID } });
    if (!visa) return new Error(`Visa with id: ${visaID} does not exists`);
    return visa;
}


export async function updateVisaFromUser(userID: string, visaID: string, data: any) {
    const user = await userRepo().findOne({ where: { user_id: userID } });
    if (!user) return new Error("User not found");
    const visa = await visaRepo().find({ where: { user: user, id: visaID } });
    if (!visa) return new Error("Unable to find visa");
    const newvisa = { ...visa, ...data }
    await visaRepo().save(newvisa)
}

export async function updateVisaStatus(id: string, status: string) {
    const trip = await visaRepo().findOne({ where: { id } })
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
    if (await visaRepo().save(trip))
        return true;
    return false;

}

export async function getAllVisa() {
    return await visaRepo().find();
}

export async function deleteVisa(userID: string, visaID: string) {
    const user = await userRepo().findOne({ where: { user_id: userID } });
    if (!user) return new Error("User not found");
    const visa = await visaRepo().find({ where: { id: visaID, user: user } });
    if (!visa) return new Error("Unable to find visa");
    visaRepo().remove(visa);
    return true
}