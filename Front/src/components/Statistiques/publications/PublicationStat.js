import ActivityTypes from "../../../const/ActivityTypes";
import {ActivityStatTemplate} from "../ActivityStatTemplate";

class PublicationStat extends ActivityStatTemplate {
    publicationTypeIdMap = [];
    constructor() {
        super({
            idTypeActivity: ActivityTypes.PUBLICATION,
            label: "Publications"
        });
    }

    prepareData = (publicationStatSum) => {
        // create a map from publicationTypeId to publicationType object
        this.publicationTypeIdMap = {};
        publicationStatSum.publicationTypes.forEach((publicationType) => {
            this.publicationTypeIdMap[publicationType.publicationTypeId] = publicationType;
        })
        return publicationStatSum.items.map((publication) => {
            return {
                ...publication,
                publicationDateObj: new Date(publication.publicationDate),
            }
        })
    }

    filters = [
        {
            // unique key across all filters
            key: "startDate",
            // label displayed for the input field
            label: "Publication après le",
            // type of input field
            inputType: "date",
            // callback function to filter the data based on the input value
            callbackFilter: (publication, startDate) => publication.publicationDate >= startDate,
            initialValueCallback: (publicationList) => {
                let minDate = publicationList[0]?.publicationDate;
                publicationList.forEach((publication) => {
                    if (publication.publicationDate < minDate) {
                        minDate = publication.publicationDate;
                    }
                })
                return minDate;
            }
        },
        {
            key: "endDate",
            label: "Publication avant le",
            inputType: "date",
            callbackFilter: (publication, endDate) => publication.publicationDate <= endDate,
            initialValueCallback: (publicationList) => {
                let maxDate = publicationList[0]?.publicationDate;
                publicationList.forEach((publication) => {
                    if (publication.publicationDate > maxDate) {
                        maxDate = publication.publicationDate;
                    }
                })
                return maxDate;
            }
        },
        {
            key: "minimalImpactFactor",
            label: "Facteur d'impact minimal",
            inputType: "number",
            callbackFilter: (publication, impactFactor) => publication.impactFactor >= impactFactor,
            initialValueCallback: (publicationList)=> {
                let minImpactFactor = publicationList[0]?.impactFactor;
                publicationList.forEach((publication) => {
                    if (publication.impactFactor < minImpactFactor) {
                        minImpactFactor = publication.publicationDate;
                    }
                })
                return minImpactFactor;
            }
        },
        {
            key: "publicationType",
            label: "Type de publication",
            inputType: "select",
            selectOptions: () => {
                return Object.values(this.publicationTypeIdMap).map((publicationType) => {
                    return {
                        // unique key across all options
                        key: publicationType.publicationTypeId,
                        // label displayed for the option
                        label: publicationType.publicationTypeName,
                        // value of the option to be used in the callbackFilter
                        value: publicationType.publicationTypeId,
                    }
                })
            },
            callbackFilter: (publication, selectedOptionValues) => selectedOptionValues.includes(publication.publicationTypeId),
        }
    ]

    customGroupByList = [
        {
            // unique key across all charts
            key: "year",
            // label displayed for the chart
            label: "année",
            // callback function to group the data
            callbackGroupBy: (publication) => {
                return [
                    {
                        groupKey: publication.publicationDateObj.getFullYear(),
                        groupLabel: publication.publicationDateObj.getFullYear(),
                    }
                ]
            },
        },
        {
            key: "publicationType",
            label: "type de publication",
            callbackGroupBy: (publication) => {
                return [
                    {
                        groupKey: publication.publicationTypeId,
                        groupLabel: this.publicationTypeIdMap[publication.publicationTypeId].publicationTypeName,
                    }
                ]
            }
        }
    ]
}

export default (new PublicationStat());