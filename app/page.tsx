import Image from "next/image";
import TravelExperience from "./components/TravelExperience";
import SuggestedDestinations from "./components/SuggestedDestination";
import GroupDestinations from "./components/GroupDestination";
import TripOptions from "./components/Browse";

export default function Home() {
  return (
    <>
    <TripOptions />
    <TravelExperience />
    <SuggestedDestinations />
    <GroupDestinations />
    </>
  );
}
