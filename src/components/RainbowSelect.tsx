/*
 * react-select-demo
 * Brackenbit 2024
 *
 * RainbowSelect
 * Horrible rainbow select component, to work out the mapping of react-select internal component keys!
 */

import Select, { ActionMeta, OnChangeValue, StylesConfig } from "react-select";
import { ColourOption, colourOptions } from "../data/data";

type OnChangeFunction = (
    newValue: OnChangeValue<ColourOption, true>,
    actionMeta: ActionMeta<ColourOption>
) => void;

interface RainbowSelectProps {
    value: readonly ColourOption[];
    onChange: OnChangeFunction;
}

export const RainbowSelect: React.FC<RainbowSelectProps> = (props) => {
    // Define a custom style to apply to the multi-select
    // (react-select defaults to white text on white background, how helpful!
    //  Maybe Firefox bug?)
    const aahMyEyes: StylesConfig<ColourOption, true> = {
        // control refers to the overall input element
        // i.e. the entire box, including drop-down and clear buttons
        control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "purple",
            color: "burlywood",
        }),
        // input refers to the text input field itself, within the control
        input: (baseStyles) => ({
            ...baseStyles,
            color: "lime",
            backgroundColor: "navy",
        }),
        // option refers to individual options rendered in drop-down menu
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "pink",
            color: "teal",
        }),
        // multiValue refers to the chip representing a selected option
        multiValue: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "orange",
            color: "gold",
        }),
    };

    return (
        <Select
            value={props.value}
            isMulti
            name="colours"
            styles={aahMyEyes}
            className="basic-multi-select"
            classNamePrefix="select"
            options={colourOptions}
            onChange={props.onChange}
        />
    );
};
