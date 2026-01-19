import ActivityTypes from "../../../const/ActivityTypes";
import { ActivityStatTemplate } from "../ActivityStatTemplate";

class PostDocStat extends ActivityStatTemplate {
    constructor() {
        super({
            idTypeActivity: ActivityTypes.POST_DOC,
            label: "PostDoc",
        });
    }

    /**
     * Exemple d’item reçu du back :
     * {
     *   arrivalDate: "2023-01-10",
     *   departureDate: "2024-03-15",
     *   duration: 14,
     *   nationality: "Spanish",
     *   originalLab: "UPMC",
     *   associatedFunding: "ERC Grant",
     *   associatedPubliRef: "...",
     *   namePostDoc: "...",
     *   nameSupervisor: "..."
     * }
     */
    prepareData = (postDocStatSum) => {
        const items = Array.isArray(postDocStatSum?.items)
            ? postDocStatSum.items
            : [];

        if (items.length > 0) {
            console.log("PostDocStat sample item:", items[0]);
        }

        return items.map((postDoc) => {
            const arrivalRaw = postDoc.arrivalDate || null;
            const departureRaw = postDoc.departureDate || null;

            const arrivalDateObj = arrivalRaw ? new Date(arrivalRaw) : null;
            const departureDateObj = departureRaw ? new Date(departureRaw) : null;

            return {
                ...postDoc,

                arrivalDate: arrivalRaw,
                departureDate: departureRaw,

                arrivalDateObj,
                departureDateObj,

                arrivalDateStr: arrivalDateObj
                    ? arrivalDateObj.toISOString().slice(0, 10)
                    : null,
                departureDateStr: departureDateObj
                    ? departureDateObj.toISOString().slice(0, 10)
                    : null,
            };
        });
    };


    filters = [
        {
            key: "arrivalAfter",
            label: "Arrival after",
            inputType: "date",
            callbackFilter: (postDoc, arrivalAfter) => {
                if (!arrivalAfter) return true;
                if (!postDoc.arrivalDateStr) return false;
                return postDoc.arrivalDateStr >= arrivalAfter;
            },
            initialValueCallback: (list) => {
                let min = null;
                list.forEach((p) => {
                    if (!p.arrivalDateStr) return;
                    if (!min || p.arrivalDateStr < min) min = p.arrivalDateStr;
                });
                return min;
            },
        },
        {
            key: "arrivalBefore",
            label: "Arrival before",
            inputType: "date",
            callbackFilter: (postDoc, arrivalBefore) => {
                if (!arrivalBefore) return true;
                if (!postDoc.arrivalDateStr) return false;
                return postDoc.arrivalDateStr <= arrivalBefore;
            },
            initialValueCallback: (list) => {
                let max = null;
                list.forEach((p) => {
                    if (!p.arrivalDateStr) return;
                    if (!max || p.arrivalDateStr > max) max = p.arrivalDateStr;
                });
                return max;
            },
        },

        // Departure date filters
        {
            key: "departureAfter",
            label: "Departure after",
            inputType: "date",
            callbackFilter: (postDoc, departureAfter) => {
                if (!departureAfter) return true;
                if (!postDoc.departureDateStr) return false;
                return postDoc.departureDateStr >= departureAfter;
            },
            initialValueCallback: (list) => {
                let min = null;
                list.forEach((p) => {
                    if (!p.departureDateStr) return;
                    if (!min || p.departureDateStr < min) min = p.departureDateStr;
                });
                return min;
            },
        },
        {
            key: "departureBefore",
            label: "Departure before",
            inputType: "date",
            callbackFilter: (postDoc, departureBefore) => {
                if (!departureBefore) return true;
                if (!postDoc.departureDateStr) return false;
                return postDoc.departureDateStr <= departureBefore;
            },
            initialValueCallback: (list) => {
                let max = null;
                list.forEach((p) => {
                    if (!p.departureDateStr) return;
                    if (!max || p.departureDateStr > max) max = p.departureDateStr;
                });
                return max;
            },
        },

        // Duration (number)
        {
            key: "durationMin",
            label: "Minimum duration (months)",
            inputType: "number",
            callbackFilter: (postDoc, durationMin) => {
                if (!durationMin) return true;
                return Number(postDoc.duration) >= Number(durationMin);
            },
            initialValueCallback: (list) => {
                let min = null;
                list.forEach((p) => {
                    if (p.duration == null) return;
                    if (min === null || p.duration < min) min = p.duration;
                });
                return min;
            },
        },

        // Associated funding (select)
        {
            key: "funding",
            label: "Associated funding",
            inputType: "select",
            selectOptions: () => {
                const fundingSet = new Set();
                return this.lastPreparedData
                    ? this.lastPreparedData
                          .filter((p) => p.associatedFunding)
                          .map((p) => p.associatedFunding)
                          .filter((f) => !fundingSet.has(f) && fundingSet.add(f))
                          .map((funding) => ({
                              key: funding,
                              label: funding,
                              value: funding,
                          }))
                    : [];
            },
            callbackFilter: (postDoc, selectedValues) => {
                if (!selectedValues || selectedValues.length === 0) return true;
                return selectedValues.includes(postDoc.associatedFunding);
            },
        },
    ];

    // -----------------------
    //       GROUP BY
    // -----------------------
    customGroupByList = [
        {
            key: "arrivalYear",
            label: "Arrival year",
            callbackGroupBy: (p) => {
                if (!p.arrivalDateObj) return [];
                const y = p.arrivalDateObj.getFullYear();
                return [{ groupKey: y, groupLabel: y }];
            },
        },
        {
            key: "nationality",
            label: "Nationality",
            callbackGroupBy: (p) => {
                const nat = p.nationality || "Unknown";
                return [{ groupKey: nat, groupLabel: nat }];
            },
        },
    ];
}

export default new PostDocStat();
