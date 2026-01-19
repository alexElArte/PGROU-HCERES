import ActivityTypes from "../../../const/ActivityTypes";
import {ActivityStatTemplate} from "../ActivityStatTemplate";

class BookStat extends ActivityStatTemplate {
    constructor() {
        super({
            idTypeActivity: ActivityTypes.BOOK,
            label: "Livres",
        });
    }

    prepareData = (bookStatSum) => {
        return bookStatSum.items.map((book) => {
            return {
                ...book,
                publicationDateObj: new Date(book.publicationDate),
            }
        })
    }

    filters = [
        {
            // unique key across all filters
            key: "startDate",
            // label displayed for the input field
            label: "Livre publie après le",
            // type of input field
            inputType: "date",
            // callback function to filter the data based on the input value
            callbackFilter: (book, startDate) => book.publicationDate >= startDate,
            initialValueCallback: (bookList) => {
                let minDate = bookList[0]?.publicationDate;
                bookList.forEach((book) => {
                    if (book.publicationDate < minDate) {
                        minDate = book.publicationDate;
                    }
                })
                return minDate;
            }
        },
        {
            key: "endDate",
            label: "Livre publie avant le",
            inputType: "date",
            callbackFilter: (book, endDate) => book.publicationDate <= endDate,
            initialValueCallback: (bookList) => {
                let maxDate = bookList[0]?.publicationDate;
                bookList.forEach((book) => {
                    if (book.publicationDate > maxDate) {
                        maxDate = book.publicationDate;
                    }
                })
                return maxDate;
            }
        }
    ]

    customGroupByList = [
        {
            // unique key across all charts
            key: "year",
            // label displayed for the chart
            label: "année",
            // callback function to group the data
            callbackGroupBy: (book) => {
                return [
                    {
                        groupKey: book.publicationDateObj.getFullYear(),
                        groupLabel: book.publicationDateObj.getFullYear(),
                    }
                ]
            },
        }
    ]
}

export default (new BookStat());