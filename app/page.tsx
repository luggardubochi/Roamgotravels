import Image from "next/image";
import TravelExperience from "./components/TravelExperience";
import SuggestedDestinations from "./components/SuggestedDestination";
import GroupDestinations from "./components/GroupDestination";

export default function Home() {
  return (
    <>
    <TravelExperience />
    <SuggestedDestinations />
    <GroupDestinations />
    </>
  );
}
