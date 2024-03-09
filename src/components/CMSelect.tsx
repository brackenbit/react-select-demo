/*
 * react-select-demo
 * Brackenbit 2024
 *
 * CMSelect
 * for _C_reatable _M_ulti select.
 * Fetches options from mocked backend using useOptions hook.
 * Posts newly created options to mocked backend.
 *
 * TODO - creating new option currently doesn't automatically select it.
 */

import CreatableSelect from "react-select/creatable";
import useOptions from "../CustomHooks/useOptions";
import { ActionMeta, OnChangeValue, StylesConfig } from "react-select";
import { SimpleOption } from "../mocks/handlers";

type OnChangeFunction = (
    newValue: OnChangeValue<SimpleOption, true>,
    actionMeta: ActionMeta<SimpleOption>
) => void;

interface CMSelectProps {
    value: readonly SimpleOption[];
    onChange: OnChangeFunction;
}

export const CMSelect: React.FC<CMSelectProps> = (props) => {
    // useOptions custom hook
    const {
        options,
        isLoading: isLoadingOptions,
        httpError: httpErrorOptions,
        handleCreateOption,
    } = useOptions();

    // Set up simple style for options - otherwise defaults to white-on-white
    const simpleStyle: StylesConfig<SimpleOption, true> = {
        // option refers to individual options rendered in drop-down menu
        option: (baseStyles, state) => ({
            ...baseStyles,
            color: "black",
        }),
    };

    return (
        <div>
            <CreatableSelect
                isMulti
                isClearable
                isDisabled={isLoadingOptions}
                isLoading={isLoadingOptions}
                onChange={props.onChange}
                onCreateOption={handleCreateOption}
                options={options}
                value={props.value}
                styles={simpleStyle}
            />
            {/* TEMP - testing */}
            <button
                onClick={() => {
                    console.log("Options state: ", options);
                }}
            >
                Log options state
            </button>
        </div>
    );
};
