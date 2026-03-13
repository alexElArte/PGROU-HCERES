import ActivityTypes from "../../../const/ActivityTypes";
import {ActivityStatTemplate} from "../ActivityStatTemplate";

class NetworkStat extends ActivityStatTemplate {
    constructor() {
        super({
            idTypeActivity: ActivityTypes.NETWORK,
            label: "activity.network.title",
        });
    }

    prepareData = (activityList) => activityList.items;

    filters = [
        {
            // unique key across all filters
            key: "startDate",
            // label displayed for the input field
            label: "filter.network start after",
            // type of input field
            inputType: "date",
            // callback function to filter the data based on the input value
            callbackFilter: (network, startDate) => network.publicationDate >= startDate,
            initialValueCallback: (networkList) => {
                let minDate = networkList[0]?.publicationDate;
                networkList.forEach((network) => {
                    if (network.publicationDate < minDate) {
                        minDate = network.publicationDate;
                    }
                })
                return minDate;
            }
        }
    ]

    customGroupByList = [
        {
            key: "activeNetwork",
            label: "filter.network active",
            inputType: "select",
            callbackFilter: (postDoc, activeNetwork) => {
                if (!activeNetwork) return true;
                if (!postDoc.departureDateStr) return false;
                return postDoc.departureDateStr <= activeNetwork;
            },
            initialValueCallback: (list) => {
                list.forEach((p) => {
                    if (!p.activeNetwork) return;
                });
            },
        }
    ]
}

export default (new NetworkStat());