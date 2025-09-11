import Link from "next/link";
import { NoResultsProps } from "../components/NoResult";

type TripTab = "Upcoming Trips" | "Past Trips" | "Saved Trips" | "Canceled";

const customTripMessages: Record<TripTab, NoResultsProps> = {
    "Upcoming Trips": {
        message: "No Upcoming Trips",
        details: "You haven't signed up for any upcoming trips yet.",
        button: (
            <Link
                href="/grouptrip"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Browse Group Trips
            </Link>
        ),
    },
    "Past Trips": {
        message: "No Past Trips",
        details: "You don’t have any completed trips in your history.",
        button: (
            <Link
                href="/grouptrip"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
                Plan Another Trip
            </Link>
        ),
    },
    "Saved Trips": {
        message: "No Saved Trips",
        details: "Trips you save for later will appear here.",
    },
    "Canceled": {
        message: "No Canceled Trips",
        details: "Any trips you cancel will show up in this section.",
    },
};

export default customTripMessages;
