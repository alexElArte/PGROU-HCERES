/**
 * Source from: https://github.com/JedWatson/react-select/issues/3140
 * Code: https://codesandbox.io/s/react-select-v2-required-input-3xvvb
 */
import React from "react";
import PropTypes from "prop-types";

const noop = () => {
    // no operation (do nothing real quick)
};

class FixRequiredSelect extends React.Component {
    state = {
        value: this.props.value || ""
    };

    selectRef = null;
    setSelectRef = ref => {
        this.selectRef = ref;
    };

    onChange = (value, actionMeta) => {
        this.props.onChange(value, actionMeta);
        this.setState({ value });
    };

    getValue = () => {
        if (this.props.value !== undefined) return this.props.value;
        return this.state.value || "";
    };

    render() {
        const { SelectComponent, required, styles, inputId, ...props } = this.props;
        const { isDisabled } = this.props;
        const enableRequired = !isDisabled;

        const selectorStyles = {
            ...styles,
            control: (base, state) => ({
                ...base,
                borderColor: state.isFocused ? '#0056b3' : '#6c757d',
                backgroundColor: 'transparent',
                borderRadius: '5px',
                padding: '0.25em 0.75em',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: 'none',
                '&:hover': {
                    borderColor: '#0175E4',
                    backgroundColor: '#f8f9fa',
                },
                ...(styles && styles.control ? styles.control(base, state) : {}),
            }),
            placeholder: (base) => ({
                ...base,
                color: '#6c757d',
                ...(styles && styles.placeholder ? styles.placeholder(base) : {}),
            }),
            singleValue: (base, state) => ({
                ...base,
                color: '#6c757d',
                ...(styles && styles.singleValue ? styles.singleValue(base, state) : {}),
            }),
            option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#0056b3' : state.isFocused ? '#f8f9fa' : 'transparent',
                color: state.isSelected ? '#ffffff' : state.isFocused ? '#0175E4' : '#6c757d',
                fontWeight: '700',
                cursor: 'pointer',
                '&:active': {
                    backgroundColor: '#0056b3',
                },
                ...(styles && styles.option ? styles.option(base, state) : {}),
            })
        };

        return (
            <div>
                <SelectComponent
                    {...props}
                    inputId={inputId}
                    styles={selectorStyles}
                    ref={this.setSelectRef}
                    onChange={this.onChange}
                />
                {enableRequired && (
                    <input
                        tabIndex={-1}
                        autoComplete="off"
                        style={{
                            opacity: 0,
                            width: "100%",
                            height: 0,
                            position: "absolute"
                        }}
                        value={this.getValue()}
                        onChange={noop}
                        onFocus={() => this.selectRef.focus()}
                        required={required}
                    />
                )}
            </div>
        );
    }
}

FixRequiredSelect.defaultProps = {
    onChange: noop
};

FixRequiredSelect.protoTypes = {
    // react-select component class (e.g. Select, Creatable, Async)
    selectComponent: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    required: PropTypes.bool
};

export default FixRequiredSelect;
