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
import { ColourOption } from "./data/data";
import { ActionMeta, OnChangeValue } from "react-select";
import { SimpleOption } from "./mocks/handlers";
import { RainbowSelect } from "./components/RainbowSelect";
import { CMSelect } from "./components/CMSelect";

export const App = () => {
    const [valueRainbow, setValueRainbow] = useState<readonly ColourOption[]>(
        []
    );

    const onChangeRainbow = (
        newValue: OnChangeValue<ColourOption, true>,
        actionMeta: ActionMeta<ColourOption>
    ) => {
        setValueRainbow(newValue);
    };

    const [valueCMSelect, setValueCMSelect] = useState<readonly SimpleOption[]>(
        []
    );
    // It appears state used with react-select "value" must strictly use readonly

    const onChangeCMSelect = (
        newValue: OnChangeValue<SimpleOption, true>,
        // type OnChangeValue<Option, IsMulti extends boolean>
        // i.e. Option type is never an array, the 'true' flags it as Multi
        actionMeta: ActionMeta<SimpleOption>
    ) => {
        setValueCMSelect(newValue);
    };

    // Function to GET options from mocked backend
    // (Components get options from useOptions, this is for testing.)
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

    // Function to automatically select newly created options
    // A bit of a kludge, but concept proven.
    const selectNewOption = (inputValue: string) => {
        let value = inputValue.toLocaleLowerCase().replace(/\W/g, "");
        let label = inputValue;
        setValueCMSelect([...valueCMSelect, { value, label }]);
    };

    return (
        <>
            <div>
                <h1>react-select demo</h1>
                <h4>Rainbow multi-select</h4>
                <p>
                    No documentation to explain which keys refer to which
                    internal components? Time to make a horrible rainbow!
                </p>
                <RainbowSelect
                    value={valueRainbow}
                    onChange={onChangeRainbow}
                />
            </div>
            <div>
                <h4>Creatable Multi select</h4>
                <CMSelect
                    value={valueCMSelect}
                    onChange={onChangeCMSelect}
                    onCreateOption={selectNewOption}
                />
            </div>
            <div>
                <h4>Testing</h4>
                <button onClick={getOptions}>GET .../api/options</button>
                <button
                    onClick={() => {
                        console.log("CMSelect value: ", valueCMSelect);
                    }}
                >
                    Log CMSelect value
                </button>
            </div>
        </>
    );
};

export default App;
