import React from "react";
import Select from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
import {teamToString} from "./TeamToString";
import {ListGroup} from "react-bootstrap";
import {fetchListTeams} from "../../services/Team/TeamActions";

/**
 * Return a <select> html element for all teams in application
 *
 * @param props: {
 *     onChange: callback function with id of selected team as parameter,
 *               or an array of ids if isMulti is enabled
 *     isMulti: specify if select is multi select, otherwise it is single
 *     targetResearcher: used for default value if present
 * }
 * @returns {JSX.Element} {Select} element, or {ListGroup.Item} if not selection is needed
 * @constructor
 */
function TeamSelect(props) {
    // parameter constant
    const isFieldRequired = props.required ? props.required : false;
    const onChangeTeamId = props.onchange;
    const isMulti = props.isMulti ? props.isMulti : true;
    const placeHolder = isMulti ? "Choisie les équipes..." : "Choisie une équipe...";

    const targetTeam = props.targetTeam ? props.targetTeam : undefined;
    // see https://www.freecodecamp.org/news/what-every-react-developer-should-know-about-state/
    const defaultValue = React.useMemo(() => {
        let value = targetTeam ? {
            value: targetTeam.teamId,
            label: teamToString(targetTeam),
            isFixed: true,
        } : undefined;
        if (value) {
            // if default value is set, call on change value so form variable is affected
            // even when user do not change input
            if (isMulti) {
                onChangeTeamId([value.value]);
            } else {
                onChangeTeamId(value.value);
            }
        }
        return value;
    }, [targetTeam, onChangeTeamId, isMulti]);

    // Cached state (for selection options)
    const [teams, setTeams] = React.useState([]);
    const doRequireUsingSelectList = isMulti || !targetTeam
    const teamSelectOptions = teams.map(res => ({
        value: res.teamId,
        label: teamToString(res),
    }))

    // select value state
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        if (doRequireUsingSelectList) {
            fetchListTeams().then(list => setTeams(list));
        }
    }, [doRequireUsingSelectList])


    if (!doRequireUsingSelectList) {
        // there is no multi select option and target team is set
        // select is not required, returning list group instead
        return <ListGroup.Item
            variant={"primary"}>{teamToString(props.targetTeam)}</ListGroup.Item>
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
                    onChangeTeamId([]);
                } else {
                    onChangeTeamId("");
                }
            } else {
                if (isMulti) {
                    onChangeTeamId(newValue.map(opt => opt.value));
                } else {
                    onChangeTeamId(newValue.value)
                }
            }
        }

        return <FixRequiredSelect
            SelectComponent={Select}
            options={teamSelectOptions}
            value={value}
            placeholder={placeHolder}
            onChange={onChangeSelection}
            isMulti={isMulti}
            required={isFieldRequired}
        />
    }

}

export default TeamSelect;