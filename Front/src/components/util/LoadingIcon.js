import {Oval} from "react-loading-icons";
import React from "react";

const LoadingIcon = (props) => {
    const color = props.color ? props.color : "rgb(1, 127, 255";
    const text = props.text ? props.text : null;
    const loadingIcon = <Oval className="mr-2" width={20} height={20} stroke={color}/>;
    if (text) return <>{loadingIcon} {text}</>
    else return loadingIcon;
}


export default LoadingIcon;