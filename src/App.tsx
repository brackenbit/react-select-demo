/*
 * react-select-demo
 * Brackenbit 2024
 *
 * Originally this was intended to be a simple demo app to test out and learn react-select.
 * Given limited documentation for react-select and MSW v2+ with Typescript, it became an
 * experiment to work out how react-select / msw types work.
 */

import { useState } from "react";
import "./App.css";
import { ColourOption, colourOptions } from "./data/data";
import Select, { StylesConfig } from "react-select";
import { ActionMeta, OnChangeValue } from "react-select";
import { SimpleOption } from "./mocks/handlers";

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

    const testFetch = async () => {
        const url: string = "http://localhost:5173/api/test";
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch /api/test");
        }

        const responseJson = await response.json();
        console.log(responseJson);
    };

    const getOptions = async () => {
        const url: string = "http://localhost:5173/api/options";
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch /api/options");
        }

        const responseJson = await response.json();
        console.log(responseJson);
    };

    const postOptions = async (newOption: SimpleOption) => {
        const url: string = "http://localhost:5173/api/options";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newOption),
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to POST to /api/options");
        }

        const responseJson = await response.json();
        console.log(responseJson);
    };

    // TEMP Kludge - okay for a demo!
    // Just to help me work out how msw handles types.
    let newOptionIncrement = 3;

    function testNewOption() {
        postOptions({
            value: newOptionIncrement.toString(),
            label: newOptionIncrement.toString(),
        });
        newOptionIncrement++;
    }

    return (
        <>
            <div>
                <h1>react-select demo</h1>
                <h4>Rainbow multi-select</h4>
                <p>
                    No documentation to explain which keys refer to which
                    internal components? Time to make a horrible rainbow!
                </p>
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
            <div>
                <h4>MSW testing</h4>
                <button onClick={testFetch}>GET .../api/test</button>
                <button onClick={getOptions}>GET .../api/options</button>
                <button onClick={testNewOption}>POST .../api/options</button>
            </div>
        </>
    );
};

export default App;
