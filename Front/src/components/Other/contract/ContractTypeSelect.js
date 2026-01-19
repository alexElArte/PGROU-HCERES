import React from "react";
import Select from "react-select";
import {contractTypeToString} from "./ContractTypeToString";
import {ListGroup} from "react-bootstrap";
import FixRequiredSelect from "../../util/FixRequiredSelect";
import {fetchListContractTypes} from "../../../services/ContractType/ContractTypeActions";

/**
 * Return a <select> html element for all contract types in application
 *
 * @param props: {
 *     onChange: callback function with id of selected contract type as parameter,
 *               or an array of ids if isMulti is enabled
 *     isMulti: specify if select is multi select, otherwise it is single
 *     targetContractType: used for default value if present
 * }
 * @returns {JSX.Element} {Select} element, or {ListGroup.Item} if not selection is needed
 * @constructor
 */
function ContractTypeSelect(props) {
    // parameter constant
    const onChangeContractTypeId = props.onchange;
    const isMulti = props.isMulti ? props.isMulti : false;
    const placeHolder = isMulti ? "Choisie les types de contrats..." : "Choisie un type de contrat...";

    const targetContractType = props.targetContractType;
    // see https://www.freecodecamp.org/news/what-every-react-developer-should-know-about-state/
    const defaultValue = React.useMemo(() => {
        let value = targetContractType ? {
            value: targetContractType.contractTypeId,
            label: contractTypeToString(targetContractType),
            isFixed: true,
        } : undefined;
        if (value) {
            // if default value is set, call on change value so form variable is affected
            // even when user do not change input
            if (isMulti) {
                onChangeContractTypeId([value.value]);
            } else {
                onChangeContractTypeId(value.value);
            }
        }
        return value;
    }, [targetContractType, onChangeContractTypeId, isMulti]);

    // Cached state (for selection options)
    const [contractTypes, setContractTypes] = React.useState([]);
    const doRequireUsingSelectList = isMulti || !targetContractType
    const contractTypeSelectOptions = contractTypes.map(res => ({
        value: res.contractTypeId,
        label: contractTypeToString(res),
    }))

    // select value state
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        if (doRequireUsingSelectList) {
            fetchListContractTypes().then(list => setContractTypes(list));
        }
    }, [doRequireUsingSelectList])


    if (!doRequireUsingSelectList) {
        // there is no multi select option and target researcher is set
        // select is not required, returning list group instead
        return <ListGroup.Item
            variant={"primary"}>{contractTypeToString(props.targetContractType)}</ListGroup.Item>
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
                    onChangeContractTypeId([]);
                } else {
                    onChangeContractTypeId("");
                }
            } else {
                if (isMulti) {
                    onChangeContractTypeId(newValue.map(opt => opt.value));
                } else {
                    onChangeContractTypeId(newValue.value)
                }
            }
        }

        return <FixRequiredSelect
            SelectComponent={Select}
            options={contractTypeSelectOptions}
            value={value}
            placeholder={placeHolder}
            onChange={onChangeSelection}
            isMulti={isMulti}
            required={true}
        />
    }

}

export default ContractTypeSelect;