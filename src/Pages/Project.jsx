import React from 'react';
import { useParams } from "react-router-dom";
import Residential from "./Projects/Categories/Residential";
import Offices from "./Projects/Categories/Offices";
import Commercial from "./Projects/Categories/Commercial";
import Graphic from "./Projects/Categories/Graphic";
import PageNotFound from "./PageNotFound";
import IcarusSports from "./Projects/IcarusSports";
import ConnectToTechnology from "./Projects/ConnectToTechnology";
import Kampi from "./Projects/Kampi";
import Soil from "./Projects/Soil";
import Paros from "./Projects/Residential/Paros";
import GreyHouse from "./Projects/Residential/GreyHouse";
import SmallButClassyApartment from "./Projects/Residential/SmallButClassyApartment";
import PlayfulApartment from "./Projects/Residential/PlayfulApartment";
import ItsAGirlsGame from "./Projects/Residential/ItsAGirlsGame";
import Prigkiponnison from "./Projects/Residential/Prigkiponnison";
import Karaklioumi from "./Projects/Residential/Karaklioumi";
import Elianthos from "./Projects/Residential/Elianthos";

const Project = () => {
    let { topicId, projectId } = useParams();
    if (projectId) {
        switch (projectId) {
            case "blown-by-the-wind": return <IcarusSports />;
            case "connect-to-technology": return <ConnectToTechnology />;
            case "kampi": return <Kampi />;
            case "soil": return <Soil />;
            case "paros": return <Paros />;
            case "grey-house": return <GreyHouse />;
            case "small-but-classy-apartment": return <SmallButClassyApartment />;
            case "playful-apartment": return <PlayfulApartment />;
            case "its-a-girls-game": return <ItsAGirlsGame />;
            case "home-sweet-home": return <Prigkiponnison />;
            case "endless-lines": return <Karaklioumi />;
            case "elianthos": return <Elianthos />;
            default: return <PageNotFound />;
        }
    } else {
        switch (topicId) {
            case "residential": return <Residential />;
            case "offices": return <Offices />;
            case "commercial": return <Commercial />;
            case "graphic": return <Graphic />;
            default: return <PageNotFound />;
        }
    }
};

export default Project;
