import ActivityTypes from "../../../const/ActivityTypes";
import {ActivityStatTemplate} from "../ActivityStatTemplate";

class CompanyCreationStat extends ActivityStatTemplate {
    constructor() {
        super({
            idTypeActivity: ActivityTypes.SEI_COMPANY_CREATION,
            label: "activity.creation",
        });
    }

    // companyCreationStatSum.items =
    // [
    //   {
    //     idActivity: 3,
    //     teamIds: [],
    //     dateCreation: "2025-11-06",
    //     companyCreationName: "test",
    //     companyCreationActive: true
    //   },
    //   ...
    // ]
    prepareData = (companyCreationStatSum) => {
        return companyCreationStatSum.items.map((companyCreation) => {
            const dateCreation = companyCreation.dateCreation || null;
            const dateCreationObj = dateCreation ? new Date(dateCreation) : null;

            return {
                ...companyCreation,
                dateCreation,
                dateCreationObj,
            };
        });
    };

    filters = [
    {
        key: "createdAfter",
        label: "filter.company created after",
        inputType: "date",
        callbackFilter: (companyCreation, createdAfter) => {
            if (!createdAfter) return true;
            if (!companyCreation.dateCreation) return false;
            return companyCreation.dateCreation >= createdAfter;
        },
        initialValueCallback: (list) => {
            if (!list || list.length === 0) return null;
            let minDate = null;
            list.forEach((c) => {
                if (!c.dateCreation) return;
                if (!minDate || c.dateCreation < minDate) {
                    minDate = c.dateCreation;
                }
            });
            return minDate;
        },
    },
    {
        key: "createdBefore",
        label: "filter.company created before",
        inputType: "date",
        callbackFilter: (companyCreation, createdBefore) => {
            if (!createdBefore) return true;
            if (!companyCreation.dateCreation) return false;
            return companyCreation.dateCreation <= createdBefore;
        },
        initialValueCallback: (list) => {
            if (!list || list.length === 0) return null;
            let maxDate = null;
            list.forEach((c) => {
                if (!c.dateCreation) return;
                if (!maxDate || c.dateCreation > maxDate) {
                    maxDate = c.dateCreation;
                }
            });
            return maxDate;
        },
    },
    {
        key: "isActive",
        label: "filter.company active",
        inputType: "checkbox",
        callbackFilter: (companyCreation, isActiveChecked) => {
            if (!isActiveChecked) return true;
            return companyCreation.companyCreationActive === true;
        },
        initialValueCallback: () => false,
    },
];


    customGroupByList = [
        {
            // unique key across all charts
            key: "year",
            // label displayed for the chart
            label: "filter.year",
            // callback function to group the data
            callbackGroupBy: (companyCreation) => {
                if (!companyCreation.dateCreationObj) {
                    return [];
                }
                const year = companyCreation.dateCreationObj.getFullYear();
                return [
                    {
                        groupKey: year,
                        groupLabel: year,
                    },
                ];
            },
        },
    ];
}

export default new CompanyCreationStat();
