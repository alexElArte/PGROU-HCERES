import ActivityTypes from "../../../const/ActivityTypes";
import {ActivityStatTemplate} from "../ActivityStatTemplate";

class NetworkStat extends ActivityStatTemplate {
    constructor() {
        super({
            idTypeActivity: ActivityTypes.NETWORK,
            label: "activity.network.title",
        });

        // lastPreparedData is used by some filters to build select options
        this.lastPreparedData = [];
    }

    prepareData = (networkStatSum) => {
        const items = Array.isArray(networkStatSum?.items) ? networkStatSum.items : [];

        if (items.length > 0) {
            console.log("NetworkStat - sample item:", items[0]);
        }

        this.lastPreparedData = items;

        return items.map((item) => {
            // On peut recevoir les données à plat (item.*) ou dans un sous-objet network (item.network.*)
            const networkData = item.network ? item.network : item;

            // On prend la date dans le champ startDate ou date (selon le back)
            const dateRaw = networkData.startDate || networkData.date || item.startDate || item.date;
            const dateObj = dateRaw ? new Date(dateRaw) : null;

            return {
                ...item, // idActivity + teamIds
                ...networkData, // aplanir le sous-objet network si présent

                startDate: dateRaw,
                startDateObj: dateObj,
                startDateStr: dateObj ? dateObj.toISOString().slice(0, 10) : null,
            };
        });
    };

    filters = [
        {
            key: "startDate",
            label: "filter.network start after",
            inputType: "date",
            callbackFilter: (network, startDate) => {
                if (!startDate) return true;
                if (!network.startDateStr) return false;
                return network.startDateStr >= startDate;
            },
            initialValueCallback: (networkList) => {
                let minDate = null;
                networkList.forEach((network) => {
                    if (!network.startDateStr) return;
                    if (!minDate || network.startDateStr < minDate) {
                        minDate = network.startDateStr;
                    }
                });
                return minDate;
            },
        },
        {
            key: "activeNetwork",
            label: "filter.network active",
            inputType: "select",
            selectOptions: () => {
                const activeSet = new Set();
                return this.lastPreparedData
                    .filter((n) => n.activeNetwork != null)
                    .map((n) => n.activeNetwork.toString())
                    .filter((value) => !activeSet.has(value) && activeSet.add(value))
                    .map((value) => ({
                        key: value,
                        label: value === "true" ? "Oui" : value === "false" ? "Non" : value,
                        value: value,
                    }));
            },
            callbackFilter: (network, selectedValues) => {
                if (!selectedValues || selectedValues.length === 0) return true;
                const activeValue = network.activeNetwork === null || network.activeNetwork === undefined
                    ? ""
                    : network.activeNetwork.toString();
                return selectedValues.includes(activeValue);
            },
            initialValueCallback: () => "",
        },
    ];

    customGroupByList = [
        {
            key: "activeNetwork",
            label: "filter.network active",
            callbackGroupBy: (network) => {
                const value = network.activeNetwork;
                const label = value === true ? "Oui" : value === false ? "Non" : "Non défini";
                return [
                    {
                        groupKey: value,
                        groupLabel: label,
                    },
                ];
            },
        },
        {
            key: "year",
            label: "filter.year",
            callbackGroupBy: (network) => {
                if (!network.startDateObj || isNaN(network.startDateObj)) {
                    return [
                        {
                            groupKey: "N/A",
                            groupLabel: "Non défini",
                        },
                    ];
                }
                const year = network.startDateObj.getFullYear();
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

export default (new NetworkStat());