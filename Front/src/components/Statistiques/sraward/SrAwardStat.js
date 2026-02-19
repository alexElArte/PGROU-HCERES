import ActivityTypes from "../../../const/ActivityTypes";
import { ActivityStatTemplate } from "../ActivityStatTemplate";

class SrAwardsStat extends ActivityStatTemplate {
    constructor() {
        super({
            idTypeActivity: ActivityTypes.SR_AWARD,
            label: "activity.scientific recognition",
        });

        // filets de sécurité au cas où
        if (!this.filters) this.filters = [];
        if (!this.customGroupByList) this.customGroupByList = [];
    }

    // srAwardStatSum est censé ressembler à :
    // {
    //   items: [
    //     {
    //       idActivity: ...,
    //       teamIds: [...],
    //       awardeeName: "...",
    //       awardDate: "2025-11-06",
    //       description: "..."
    //     },
    //     ...
    //   ]
    // }
    prepareData = (srAwardStatSum) => {
        const items = Array.isArray(srAwardStatSum?.items)
            ? srAwardStatSum.items
            : [];

        if (items.length > 0) {
            console.log("SrAwardsStat sample item:", items[0]);
        } else {
            console.log("SrAwardsStat: no items received");
        }

        return items.map((award) => {
            const dateRaw = award.awardDate || award.date || null;
            const dateObj = dateRaw ? new Date(dateRaw) : null;

            return {
                ...award,
                awardDate: dateRaw,
                awardDateObj: dateObj,
                awardDateStr: dateObj
                    ? dateObj.toISOString().slice(0, 10)
                    : null,
            };
        });
    };

    filters = [
        {
            key: "startDate",
            label: "filter.awarded after",
            inputType: "date",
            callbackFilter: (award, startDate) => {
                if (!startDate) return true;
                if (!award.awardDateStr) return false;
                return award.awardDateStr >= startDate;
            },
            initialValueCallback: (awardList) => {
                if (!awardList || awardList.length === 0) return null;
                let minDate = null;
                awardList.forEach((award) => {
                    if (!award.awardDateStr) return;
                    if (!minDate || award.awardDateStr < minDate) {
                        minDate = award.awardDateStr;
                    }
                });
                return minDate;
            },
        },
        {
            key: "endDate",
            label: "filter.awarded before",
            inputType: "date",
            callbackFilter: (award, endDate) => {
                if (!endDate) return true;
                if (!award.awardDateStr) return false;
                return award.awardDateStr <= endDate;
            },
            initialValueCallback: (awardList) => {
                if (!awardList || awardList.length === 0) return null;
                let maxDate = null;
                awardList.forEach((award) => {
                    if (!award.awardDateStr) return;
                    if (!maxDate || award.awardDateStr > maxDate) {
                        maxDate = award.awardDateStr;
                    }
                });
                return maxDate;
            },
        },
    ];

    customGroupByList = [
        {
            key: "year",
            label: "filter.year",
            callbackGroupBy: (award) => {
                if (!award.awardDateObj || isNaN(award.awardDateObj.getTime())) {
                    return [];
                }
                const year = award.awardDateObj.getFullYear();
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

export default new SrAwardsStat();
