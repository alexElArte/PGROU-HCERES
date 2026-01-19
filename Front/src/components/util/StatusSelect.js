import React from "react";
import Select from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
import {statusToString} from "./StatusToString";
import {ListGroup} from "react-bootstrap";
import {fetchListStatus} from "../../services/Status/StatusActions";

/**
 * Return a <select> html element for all statutes in application
 *
 * @param props: {
 *     onChange: callback function with id of selected status as parameter,
 *               or an array of ids if isMulti is enabled
 *     isMulti: specify if select is multi select, otherwise it is single
 *     targetStatus: used for default value if present
 * }
 * @returns {JSX.Element} {Select} element, or {ListGroup.Item} if not selection is needed
 * @constructor
 */
function StatusSelect(props) {
    // parameter constant
    const onChangeStatusId = props.onchange;
    const isMulti = props.isMulti ? props.isMulti : false;
    const placeHolder = isMulti ? "Choisie les statuts..." : "Choisie un statut...";

    const targetStatus = props.targetStatus;
    // see https://www.freecodecamp.org/news/what-every-react-developer-should-know-about-state/
    const defaultValue = React.useMemo(() => {
        let value = targetStatus ? {
            value: targetStatus.statusId,
            label: statusToString(targetStatus),
            isFixed: true,
        } : undefined;
        if (value) {
            // if default value is set, call on change value so form variable is affected
            // even when user do not change input
            if (isMulti) {
                onChangeStatusId([value.value]);
            } else {
                onChangeStatusId(value.value);
            }
        }
        return value;
    }, [targetStatus, onChangeStatusId, isMulti]);

    // Cached state (for selection options)
    const [status, setStatus] = React.useState([]);
    const doRequireUsingSelectList = isMulti || !targetStatus
    const statusSelectOptions = status.map(res => ({
        value: res.statusId,
        label: statusToString(res),
    }))

    // select value state
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        if (doRequireUsingSelectList) {
            fetchListStatus().then(list => setStatus(list));
        }
    }, [doRequireUsingSelectList])


    if (!doRequireUsingSelectList) {
        // there is no multi select option and target status is set
        // select is not required, returning list group instead
        return <ListGroup.Item
            variant={"primary"}>{statusToString(props.targetStatus)}</ListGroup.Item>
    } else {

        // selection is required
        const onChangeSelection = (e, option) => {
            let newValue = e;
            if (option)
                switch (option.action) {
                    case "remove-value":
                    case "pop-value":
                        if (option.removedValue.isFixed)
                            return;
                        break;
                    case "clear":
                        newValue = option.removedValues.filter(item => item.isFixed)
                        break;
                    default:
                        break;
                }
            setValue(newValue)
            if (newValue === null) {
                if (isMulti) {
                    onChangeStatusId([]);
                } else {
                    onChangeStatusId("");
                }
            } else {
                if (isMulti) {
                    onChangeStatusId(newValue.map(opt => opt.value));
                } else {
                    onChangeStatusId(newValue.value)
                }
            }
        }

        return <FixRequiredSelect
            SelectComponent={Select}
            options={statusSelectOptions}
            value={value}
            placeholder={placeHolder}
            onChange={onChangeSelection}
            isMulti={isMulti}
            required={true}
        />
    }

}

export default StatusSelect;