import ActivityTypes from "../../../const/ActivityTypes";
import { ActivityStatTemplate } from "../ActivityStatTemplate";

class ResearchContractFundedCharitStat extends ActivityStatTemplate {
    constructor() {
        super({
            idTypeActivity: ActivityTypes.RESEARCH_CONTRACT_FUNDED_PUBLIC_CHARITABLE_INST,
            label: "activity.research contract",
        });
    }

    prepareData = (researchContractStatSum) => {
        return researchContractStatSum.items.map((contract) => {
            const dateRaw = contract.dateContractAward || contract.date; // au cas où le DTO utilise "date"
            const dateObj = dateRaw ? new Date(dateRaw) : null;
            console.log(researchContractStatSum.items[0]);
            console.log("dateContractAward:", researchContractStatSum.items[0].dateContractAward);
            console.log("date:", researchContractStatSum.items[0].date);
            console.log("Item complet:", contract);


            return {
                ...contract,
                dateContractAward: dateRaw,               // string brute
                dateContractAwardObj: dateObj,            // objet Date
                dateContractAwardStr: dateObj
                    ? dateObj.toISOString().slice(0, 10)  // "yyyy-mm-dd"
                    : null,
            };
            
        });
    };
    


    filters = [
        {
            key: "startDate",
            label: "filter.contract awarded after",
            inputType: "date",
            callbackFilter: (contract, startDate) => {
                if (!startDate) return true; // pas de filtre si aucune valeur
                if (!contract.dateContractAwardStr) return false;
                return contract.dateContractAwardStr >= startDate;
            },
            initialValueCallback: (contractList) => {
                if (!contractList || contractList.length === 0) return null;
                let minDate = null;
                contractList.forEach((contract) => {
                    if (!contract.dateContractAwardStr) return;
                    if (!minDate || contract.dateContractAwardStr < minDate) {
                        minDate = contract.dateContractAwardStr;
                    }
                });
                return minDate;
            },
        },
        {
            key: "endDate",
            label: "filter.contract awarded before",
            inputType: "date",
            callbackFilter: (contract, endDate) => {
                if (!endDate) return true;
                if (!contract.dateContractAwardStr) return false;
                return contract.dateContractAwardStr <= endDate;
            },
            initialValueCallback: (contractList) => {
                if (!contractList || contractList.length === 0) return null;
                let maxDate = null;
                contractList.forEach((contract) => {
                    if (!contract.dateContractAwardStr) return;
                    if (!maxDate || contract.dateContractAwardStr > maxDate) {
                        maxDate = contract.dateContractAwardStr;
                    }
                });
                return maxDate;
            },
        },

        {
            // unique key across all filters
            key: "grantAmountMin",
            // label displayed for the input field
            label: "filter.minimum agreement amount",
            // type of input field
            inputType: "number",
            // callback function to filter the data based on the input value
            callbackFilter: (contract, grantAmountMin) => {
                if (grantAmountMin === null || grantAmountMin === undefined || grantAmountMin === "") {
                    return true; // pas de filtre
                }
                const min = Number(grantAmountMin);
                return Number(contract.grantAmount) >= min;
            },
            initialValueCallback: (contractList) => {
                if (!contractList || contractList.length === 0) return null;
                let minGrantAmount = contractList[0]?.grantAmount;
                contractList.forEach((contract) => {
                    if (contract.grantAmount < minGrantAmount) {
                        minGrantAmount = contract.grantAmount;
                    }
                });
                return minGrantAmount;
            },
        },
    ];

    customGroupByList = [
        {
            // unique key across all charts
            key: "year",
            // label displayed for the chart
            label: "filter.year",
            // callback function to group the data
            callbackGroupBy: (contract) => {
                const year = contract.dateContractAwardObj.getFullYear();
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

export default new ResearchContractFundedCharitStat();
