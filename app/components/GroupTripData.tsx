import { UUID } from "node:crypto";
import { uuidv4 } from "zod";

export interface GroupTripDataProp {
    id: UUID, // Custom ID for each trip signup
    mainPic: string, // The main landing page for theplace
    name: string, // Custom name for the url of the project
    tag: String[], // not less than 2 and not greater than five
    pName: String, // Place name like morocco, france, paris
    overview: String, // A well organized description of a name to visit
    tripTime: Duration[], // A list of duration of the trip 
    cost: Number, // Cost of the trip
    pTripod: String[], // Three pictures for area overview
    cHighlight: String[], // Highlights of the most outstanding places in pname
    perks: String[], // Goodthings to gain in the travel
    nPerks: String[], // Non Goodthings to gain in the travel
}

interface Duration {
    startDate: Date, // Start Date of trip
    endDate: Date, // End date of trip
}

const GroupData: GroupTripDataProp[] = [
    {
        id: "88138434-d3de-484e-bc6f-693d4e41568a",
        mainPic: "/trips/Egypt/flying-carpet-Si1MFhSLNWY-unsplash.jpg",
        name: "Egypt-eYel-gC76-G4AV",
        tag: ["Culture", "Cruise", "Desert", "Pyramid"],
        pName: "Egypt",
        overview: `
            Bringing you the magic of Egypt.

            This Egypt experience captures the heart of this ancient land – from the timeless Pyramids of Giza and the majestic Nile River to the temples of Luxor and the vibrant bazaars of Cairo. We’ve designed this journey for travelers seeking a perfect mix of history, adventure, and relaxation. Spend your days uncovering the wonders of one of the world’s oldest civilizations, then unwind on the stunning shores of the Red Sea – all you need to do is arrive, and we’ll handle the rest.

            Our trips are tailored to your preferences – you choose your daily activities and accommodations, making every detail work just for you.

            This package is perfect for:

                Solo travelers

                Group adventures

                Couples getaways
        `,
        tripTime: [
            {
                startDate: new Date(2025, 8, 21),
                endDate: new Date(2025, 8, 25)
            }
        ],
        cost: 750,
        pTripod: [],
        cHighlight: [],
        perks: [
            "Return flight tickets",
            "4 night stay in a 5 star hotel",
            "Breakfast, lunch and dinner",
            "Transportation",
            "Horse eiding in the red sea",
            "Day trip to the pyramids with lunch"
        ],
        nPerks: [""],
    }, // Egypt
    {
        id: "e58844b7-9a1b-4fcb-8e72-6ea328228ae6",
        mainPic: "",
        name: "Albania-kAWFtP-gKqchO-sAPzbx",
        tag: ["Culture", "History", "Beach", "Mountains"],
        pName: "Albania",
        overview: `
        Bringing you the hidden gem of the Balkans.

        This Albania experience highlights the very best of this captivating country – from the turquoise waters of the Albanian Riviera and the ancient ruins of Butrint to the cobbled streets of Berat and the dramatic peaks of the Accursed Mountains. We’ve designed this journey for travelers who crave a blend of culture, adventure, and coastal relaxation. Spend your days exploring UNESCO World Heritage sites, savoring Mediterranean flavors, and soaking up breathtaking views – all you need to do is arrive, and we’ll take care of the rest.

        Our trips are personalized to suit you – you choose your daily experiences and accommodations, ensuring every moment matches your style.

        This package is perfect for:

            Solo explorers

            Group adventures

            Couples retreats
        `,
        tripTime: [
            {
                startDate: new Date(2025, 8, 11),
                endDate: new Date(2025, 8, 14)
            }
        ],
        cost: 730,
        pTripod: [],
        cHighlight: [],
        perks: [
            "Return flight tickets",
            "Airport transfer",
            "4 night stay in a 5 star hotel",
            "Daily breakfast and drinks",
            "Boat cruise",
            "Cable car rides",
            "Karting"
        ],
        nPerks: [""],
    }, // Albania
    {
        id: "e58844b7-9a1b-4fcb-8e72-6ea328228ae6",
        mainPic: "",
        name: "Albania-kAWFtP-gKqchO-sAPzbx",
        tag: ["Culture", "History", "Beach", "Mountains"],
        pName: "Albania",
        overview: `
        Bringing you the hidden gem of the Balkans.

        This Albania experience highlights the very best of this captivating country – from the turquoise waters of the Albanian Riviera and the ancient ruins of Butrint to the cobbled streets of Berat and the dramatic peaks of the Accursed Mountains. We’ve designed this journey for travelers who crave a blend of culture, adventure, and coastal relaxation. Spend your days exploring UNESCO World Heritage sites, savoring Mediterranean flavors, and soaking up breathtaking views – all you need to do is arrive, and we’ll take care of the rest.

        Our trips are personalized to suit you – you choose your daily experiences and accommodations, ensuring every moment matches your style.

        This package is perfect for:

            Solo explorers

            Group adventures

            Couples retregetMonth().toString()ats
        `,
        tripTime: [
            {
                startDate: new Date(2025, 8, 11),
                endDate: new Date(2025, 8, 14)
            }
        ],
        cost: 730,
        pTripod: [],
        cHighlight: [],
        perks: [
            "Return flight tickets",
            "Airport transfer",
            "4 night stay in a 5 star hotel",
            "Daily breakfast and drinks",
            "Boat cruise",
            "Cable car rides",
            "Karting"
        ],
        nPerks: [""],
    }, // Albania
    {
        id: "e58844b7-9a1b-4fcb-8e72-6ea328228ae6",
        mainPic: "",
        name: "Albania-kAWFtP-gKqchO-sAPzbx",
        tag: ["Culture", "History", "Beach", "Mountains"],
        pName: "Albania",
        overview: `
        Bringing you the hidden gem of the Balkans.

        This Albania experience highlights the very best of this captivating country – from the turquoise waters of the Albanian Riviera and the ancient ruins of Butrint to the cobbled streets of Berat and the dramatic peaks of the Accursed Mountains. We’ve designed this journey for travelers who crave a blend of culture, adventure, and coastal relaxation. Spend your days exploring UNESCO World Heritage sites, savoring Mediterranean flavors, and soaking up breathtaking views – all you need to do is arrive, and we’ll take care of the rest.

        Our trips are personalized to suit you – you choose your daily experiences and accommodations, ensuring every moment matches your style.

        This package is perfect for:

            Solo explorers

            Group adventures

            Couples retreats
        `,
        tripTime: [
            {
                startDate: new Date(2025, 8, 11),
                endDate: new Date(2025, 8, 14)
            }
        ],
        cost: 730,
        pTripod: [],
        cHighlight: [],
        perks: [
            "Return flight tickets",
            "Airport transfer",
            "4 night stay in a 5 star hotel",
            "Daily breakfast and drinks",
            "Boat cruise",
            "Cable car rides",
            "Karting"
        ],
        nPerks: [""],
    }, // Albania
    {
        id: "a26436a1-6efa-4315-bfcc-9d275d364731",
        mainPic: "",
        name: "Morocco-VnSC7E-0fcYXJ-yddkTi",
        tag: ["Adventure","Culture","Desert Safari","Food"],
        pName: "Morocco",
        overview: `
        Bringing you the colors and charm of Morocco.

        This Morocco experience showcases the essence of this enchanting country – from the bustling souks of Marrakech and the blue-washed streets of Chefchaouen to the golden dunes of the Sahara and the serene Atlas Mountains. We’ve designed this journey for travelers seeking a vibrant mix of culture, adventure, and relaxation. Spend your days wandering ancient medinas, riding camels under starry desert skies, and indulging in rich Moroccan cuisine – all you need to do is arrive, and we’ll handle the rest.

        Our trips are crafted to your preferences – you choose your activities and accommodations, making each day truly your own.

        This package is perfect for:

            Solo travelers

            Group adventures

            Couples getaways
        `,
        tripTime: [
            {
                startDate: new Date(2025, 10, 24),
                endDate: new Date(2025, 10, 27)
            }
        ],
        cost: 730,
        pTripod: [],
        cHighlight: [],
        perks: [
            "E-Visa",
            "Returned flight",
            "3 night stay at a private villa",
            "Airport transfers",
            "Daily breakfast",
            "Quad biking",
            "Camel ride and dinner in the desert"
        ],
        nPerks: [""],
    }, // Morocco
    {
        id: "1028ace3-e598-4e5c-ada0-96bb102cf690",
        mainPic: "",
        name: "switzerland-YqLjhGVwxE-wLsNjlbO4o-PnK7uWItKv",
        tag: ["Hiking", "Skiing", "Mountains", "Lakes"],
        pName: "Switzerland",
        overview: `
        Bringing you the best of Switzerland.

        This Switzerland experience captures the beauty and elegance of this alpine paradise – from the snow-capped peaks of the Swiss Alps and the sparkling lakes of Lucerne and Geneva to the charming streets of Zurich and the storybook villages of Interlaken and Zermatt. We’ve designed this journey for travelers seeking a seamless blend of adventure, culture, and relaxation. Spend your days hiking breathtaking trails, riding scenic trains through mountain passes, and savoring world-famous Swiss chocolate and cheese – all you need to do is arrive, and we’ll take care of the rest.

        Our trips are customized to your preferences – you choose your activities and accommodations, making every detail perfectly suited to you.

        This package is perfect for:

            Solo travelers

            Group adventures

            Couples retreats
        `,
        tripTime: [
            {
                startDate: new Date(2025, 11, 20),
                endDate: new Date(2025, 11, 13)
            }
        ],
        cost: 940,
        pTripod: [],
        cHighlight: [],
        perks: [
            "Return flight tickets",
            "Airport transfer",
            "3 night stay at a 4 star hotel",
            "Daily breakfast",
            "Panoramic train rides to Grindelwald",
            "Toboggan run",
            "Cliff walk"
        ],
        nPerks: [""],
    }, // Switzerland
    // {
    //     id: "88138434-d3de-484e-bc6f-693d4e41568a",
    //     mainPic: "",
    //     name: "Egypt-ioiioio",
    //     tag: [],
    //     pName: "Egypt",
    //     overview: "",
    //     tripTime: [],
    //     cost: 1,
    //     pTripod: [],
    //     cHighlight: [],
    //     perks: [
    //         "Return flight tickets",
    //         "Airport transfer",
    //         "Hotels",
    //         "Daily breakfast and drinks",
    //         "Boat cruise",
    //         "Flying dress photoshoot at Oia (Dresses provided by photographer)"
    //     ],
    //     nPerks: [""],
    // } // Custom
]

export default GroupData;