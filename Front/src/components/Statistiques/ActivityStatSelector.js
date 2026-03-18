import React from 'react';
import PublicationStat from "./publications/PublicationStat";
import ActivityStatDisplay from "./ActivityStatDisplay";
import ActivityTypes from "../../const/ActivityTypes";
import {ActivityStatTemplate} from "./ActivityStatTemplate";
import FixRequiredSelect from "../util/FixRequiredSelect";
import Select from "react-select";
import BookStat from "./books/BookStat";
import CompanyCreationStat from './company-creation/CompanyCreationStat';
import ResearchContractFundedCharitStat from './research-contract-funded-charit/ResearchContractFundedCharitStat';
import PostDocStat from './post-doc/PostDocStat';
import IndustrialContractStat from './industrial-contract/IndustrialContractStat';
import TrainingThesisStat from './training-thesis/TrainingThesisStat';
import SrAwardStat from './sraward/SrAwardStat';

import NetworkStat from "./network/NetworkStat";

import { useTranslation } from 'react-i18next';

//Permet de mettre les filtres
const activityStatTemplates = [
    // Pas de Book et Publication pour le 1er rendu
    // PublicationStat, 
    // BookStat,
    
    PostDocStat,
    IndustrialContractStat,
    ResearchContractFundedCharitStat,
    TrainingThesisStat,
    SrAwardStat,
    CompanyCreationStat,

    NetworkStat,
    

    // ...Object.keys(ActivityTypes).map(activityType => new ActivityStatTemplate({
    //     idTypeActivity: ActivityTypes[activityType],
    //     label: activityType,
    // })),
// clear duplicates stat templates based on idTypeActivity
].filter((activityStatTemplate, index, self) =>
        index === self.findIndex((t) => (
            t.idTypeActivity === activityStatTemplate.idTypeActivity
        ))
);



export default function ActivityStatSelector() {
    const { t } = useTranslation();

    const activityStatOptions = activityStatTemplates.map(activityStatTemplate => {
        return {
            value: activityStatTemplate,
            label: t(activityStatTemplate.label),
        }
    });

    const [selectedOption, setSelectedOption] = React.useState(activityStatOptions[0]);

    return (
        <div style={{justifyContent: 'center', alignItems: 'center', minHeight: '100%'}} role="main">
            <FixRequiredSelect
                SelectComponent={Select}
                options={activityStatOptions}
                onChange={(option) => {
                    setSelectedOption(option)
                }}
                value={selectedOption}
                required={true}
            />
            <ActivityStatDisplay
                activityStatEntry={selectedOption.value}
            />
        </div>
    );
}
