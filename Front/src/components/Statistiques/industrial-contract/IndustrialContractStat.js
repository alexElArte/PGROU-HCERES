// frontend/src/components/stat/industrial-contract/IndustrialContractStat.js

import ActivityTypes from "../../../const/ActivityTypes";
import { ActivityStatTemplate } from "../ActivityStatTemplate";

class IndustrialContractStat extends ActivityStatTemplate {
    constructor() {
        super({
            // adapte ce nom si ton enum diffère
            idTypeActivity: ActivityTypes.SEI_INDUSTRIAL_R_D_CONTRACT,
            label: "activity.industrial contracts",
        });
    }

    prepareData = (industrialContractStatSum) => {
        const items = Array.isArray(industrialContractStatSum?.items)
            ? industrialContractStatSum.items
            : [];

        if (items.length > 0) {
            console.log("IndustrialContractStat sample item:", items[0]);
        }

        const prepared = items.map((contract) => {
            const startRaw = contract.startDate || null;
            const endRaw = contract.endDate || null;

            const startDateObj = startRaw ? new Date(startRaw) : null;
            const endDateObj = endRaw ? new Date(endRaw) : null;

            return {
                ...contract,
                startDate: startRaw,
                endDate: endRaw,
                startDateObj,
                endDateObj,
                startDateStr: startDateObj
                    ? startDateObj.toISOString().slice(0, 10)
                    : null,
                endDateStr: endDateObj
                    ? endDateObj.toISOString().slice(0, 10)
                    : null,
            };
        });

        // Pour d’éventuels filtres select basés sur les données complètes
        this.lastPreparedData = prepared;

        return prepared;
    };

    filters = [
        // startDate
        {
            key: "startAfter",
            label: "filter.contract created after",
            inputType: "date",
            callbackFilter: (c, value) => {
                if (!value) return true;
                if (!c.startDateStr) return false;
                return c.startDateStr >= value;
            },
            initialValueCallback: (list) => {
                let min = null;
                list.forEach((c) => {
                    if (!c.startDateStr) return;
                    if (!min || c.startDateStr < min) min = c.startDateStr;
                });
                return min;
            },
        },
        {
            key: "startBefore",
            label: "filter.contract created before",
            inputType: "date",
            callbackFilter: (c, value) => {
                if (!value) return true;
                if (!c.startDateStr) return false;
                return c.startDateStr <= value;
            },
            initialValueCallback: (list) => {
                let max = null;
                list.forEach((c) => {
                    if (!c.startDateStr) return;
                    if (!max || c.startDateStr > max) max = c.startDateStr;
                });
                return max;
            },
        },

        // endDate
        {
            key: "endAfter",
            label: "filter.contract end after",
            inputType: "date",
            callbackFilter: (c, value) => {
                if (!value) return true;
                if (!c.endDateStr) return false;
                return c.endDateStr >= value;
            },
            initialValueCallback: (list) => {
                let min = null;
                list.forEach((c) => {
                    if (!c.endDateStr) return;
                    if (!min || c.endDateStr < min) min = c.endDateStr;
                });
                return min;
            },
        },
        {
            key: "endBefore",
            label: "filter.contract end before",
            inputType: "date",
            callbackFilter: (c, value) => {
                if (!value) return true;
                if (!c.endDateStr) return false;
                return c.endDateStr <= value;
            },
            initialValueCallback: (list) => {
                let max = null;
                list.forEach((c) => {
                    if (!c.endDateStr) return;
                    if (!max || c.endDateStr > max) max = c.endDateStr;
                });
                return max;
            },
        },

        // agreementAmount
        {
            key: "agreementMin",
            label: "filter.minimum agreement amount",
            inputType: "number",
            callbackFilter: (c, minAmount) => {
                if (minAmount === null || minAmount === undefined || minAmount === "") {
                    return true;
                }
                if (c.agreementAmount == null) return false;
                return Number(c.agreementAmount) >= Number(minAmount);
            },
            initialValueCallback: (list) => {
                let min = null;
                list.forEach((c) => {
                    if (c.agreementAmount == null) return;
                    if (min === null || c.agreementAmount < min) min = c.agreementAmount;
                });
                return min;
            },
        },
        {
            key: "agreementMax",
            label: "filter.maximum agreement amount",
            inputType: "number",
            callbackFilter: (c, maxAmount) => {
                if (maxAmount === null || maxAmount === undefined || maxAmount === "") {
                    return true;
                }
                if (c.agreementAmount == null) return false;
                return Number(c.agreementAmount) <= Number(maxAmount);
            },
            initialValueCallback: (list) => {
                let max = null;
                list.forEach((c) => {
                    if (c.agreementAmount == null) return;
                    if (max === null || c.agreementAmount > max) max = c.agreementAmount;
                });
                return max;
            },
        },
    ];

    customGroupByList = [
        {
            key: "startYear",
            label: "filter.start year",
            callbackGroupBy: (c) => {
                if (!c.startDateObj) return [];
                const year = c.startDateObj.getFullYear();
                return [{ groupKey: year, groupLabel: year }];
            },
        },
        {
            key: "company",
            label: "Company",
            callbackGroupBy: (c) => {
                const name = c.nameCompanyInvolved || "Unknown";
                return [{ groupKey: name, groupLabel: name }];
            },
        },
    ];
}

export default new IndustrialContractStat();
