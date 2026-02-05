// frontend/src/components/stat/training-thesis/TrainingThesisStat.js

import ActivityTypes from "../../../const/ActivityTypes";
import { ActivityStatTemplate } from "../ActivityStatTemplate";

class TrainingThesisStat extends ActivityStatTemplate {
    constructor() {
        super({
            idTypeActivity: ActivityTypes.TRAINING_THESIS_PUBLICATION,
            label: "activity.training thesis",
        });
    }

    prepareData = (trainingThesisStatSum) => {
        const items = Array.isArray(trainingThesisStatSum?.items)
            ? trainingThesisStatSum.items
            : [];

        if (items.length > 0) {
            console.log("TrainingThesisStat sample item:", items[0]);
        }

        const prepared = items.map((thesis) => {
            const startRaw = thesis.thesisStart || null;
            const defenseRaw = thesis.thesisDefenseDate || null;

            const startDateObj = startRaw ? new Date(startRaw) : null;
            const defenseDateObj = defenseRaw ? new Date(defenseRaw) : null;

            return {
                ...thesis,
                thesisStart: startRaw,
                thesisDefenseDate: defenseRaw,
                thesisStartObj: startDateObj,
                thesisDefenseDateObj: defenseDateObj,
                thesisStartStr: startDateObj
                    ? startDateObj.toISOString().slice(0, 10)
                    : null,
                thesisDefenseDateStr: defenseDateObj
                    ? defenseDateObj.toISOString().slice(0, 10)
                    : null,
            };
        });

        this.lastPreparedData = prepared;
        return prepared;
    };

    filters = [
        // thesisStart
        {
            key: "startAfter",
            label: "filter.training thesis after",
            inputType: "date",
            callbackFilter: (t, value) => {
                if (!value) return true;
                if (!t.thesisStartStr) return false;
                return t.thesisStartStr >= value;
            },
            initialValueCallback: (list) => {
                let min = null;
                list.forEach((t) => {
                    if (!t.thesisStartStr) return;
                    if (!min || t.thesisStartStr < min) min = t.thesisStartStr;
                });
                return min;
            },
        },
        {
            key: "startBefore",
            label: "filter.training thesis before",
            inputType: "date",
            callbackFilter: (t, value) => {
                if (!value) return true;
                if (!t.thesisStartStr) return false;
                return t.thesisStartStr <= value;
            },
            initialValueCallback: (list) => {
                let max = null;
                list.forEach((t) => {
                    if (!t.thesisStartStr) return;
                    if (!max || t.thesisStartStr > max) max = t.thesisStartStr;
                });
                return max;
            },
        },

        // thesisDefenseDate
        {
            key: "defenseAfter",
            label: "filter.defense after",
            inputType: "date",
            callbackFilter: (t, value) => {
                if (!value) return true;
                if (!t.thesisDefenseDateStr) return false;
                return t.thesisDefenseDateStr >= value;
            },
            initialValueCallback: (list) => {
                let min = null;
                list.forEach((t) => {
                    if (!t.thesisDefenseDateStr) return;
                    if (!min || t.thesisDefenseDateStr < min) min = t.thesisDefenseDateStr;
                });
                return min;
            },
        },
        {
            key: "defenseBefore",
            label: "filter.defense before",
            inputType: "date",
            callbackFilter: (t, value) => {
                if (!value) return true;
                if (!t.thesisDefenseDateStr) return false;
                return t.thesisDefenseDateStr <= value;
            },
            initialValueCallback: (list) => {
                let max = null;
                list.forEach((t) => {
                    if (!t.thesisDefenseDateStr) return;
                    if (!max || t.thesisDefenseDateStr > max) max = t.thesisDefenseDateStr;
                });
                return max;
            },
        },

        // thesisNumberArticles
        {
            key: "articlesMin",
            label: "filter.minimum article count",
            inputType: "number",
            callbackFilter: (t, minArticles) => {
                if (minArticles === null || minArticles === undefined || minArticles === "") {
                    return true;
                }
                if (t.thesisNumberArticles == null) return false;
                return Number(t.thesisNumberArticles) >= Number(minArticles);
            },
            initialValueCallback: (list) => {
                let min = null;
                list.forEach((t) => {
                    if (t.thesisNumberArticles == null) return;
                    if (min === null || t.thesisNumberArticles < min) min = t.thesisNumberArticles;
                });
                return min;
            },
        },

        // thesisTypeId (1 Academic, 2 CIFRE)
        {
            key: "thesisType",
            label: "filter.thesis type",
            inputType: "select",
            selectOptions: () => [
                { key: 1, label: "Academic", value: 1 },
                { key: 2, label: "CIFRE", value: 2 },
            ],
            callbackFilter: (t, selectedValues) => {
                if (!selectedValues || selectedValues.length === 0) return true;
                return selectedValues.includes(t.thesisTypeId);
            },
        },
    ];

    customGroupByList = [
        {
            key: "startYear",
            label: "filter.start year",
            callbackGroupBy: (t) => {
                if (!t.thesisStartObj) return [];
                const y = t.thesisStartObj.getFullYear();
                return [{ groupKey: y, groupLabel: y }];
            },
        },
        {
            key: "thesisType",
            label: "filter.thesis type",
            callbackGroupBy: (t) => {
                let label;
                switch (t.thesisTypeId) {
                    case 1:
                        label = "Academic";
                        break;
                    case 2:
                        label = "CIFRE";
                        break;
                    default:
                        label = "Unknown";
                }
                return [
                    {
                        groupKey: t.thesisTypeId,
                        groupLabel: label,
                    },
                ];
            },
        },
    ];
}

export default new TrainingThesisStat();
