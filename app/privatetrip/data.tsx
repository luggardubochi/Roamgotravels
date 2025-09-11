type Continent = "Africa" | "Asia" | "Europe" | "North America" | "South America" | "Australia" | "Antartica";

type TripCardProps = {
    image: string;
    place: string;
    date: {
        startDate: Date;
        endDate: Date;
    }[];
    tags: string[];
    cost: number;
    title: string,
    description: string;
    booktrip: React.ReactNode;
    explore: string[];
    perks: string[];
    nperks: string[];
    continent: Continent;
};


const PrivateTrips: TripCardProps[] = [

]