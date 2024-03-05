/*
 * react-select-demo
 * Brackenbit 2024
 *
 * Given limited documentation for react-select, especially with Typescript,
 * this demo app seeks to work out how to drive it from analysing the source
 * and experimenting.
 */

import { useState } from "react";
import "./App.css";
import { ColourOption, colourOptions } from "./data/data";
import Select, { StylesConfig } from "react-select";
import { ActionMeta, OnChangeValue } from "react-select";

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

export const App = () => {
    const [value, setValue] = useState<readonly ColourOption[]>();

    const onChange = (
        newValue: OnChangeValue<ColourOption, true>,
        actionMeta: ActionMeta<ColourOption>
    ) => {
        console.log(newValue);
        console.log(actionMeta.action);
        setValue(newValue);
    };

    return (
        <>
            <div>
                <h1>react-select demo</h1>
                <h4>Rainbow multi-select:</h4>
                <Select
                    value={value}
                    isMulti
                    name="colours"
                    styles={aahMyEyes}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    options={colourOptions}
                    onChange={onChange}
                />
                <button
                    onClick={() => {
                        console.log(value);
                    }}
                >
                    Log value
                </button>
            </div>
            <div></div>
        </>
    );
};

export default App;
