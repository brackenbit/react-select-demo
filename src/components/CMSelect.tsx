/*
 * react-select-demo
 * Brackenbit 2024
 *
 * CMSelect
 * for _C_reatable _M_ulti select.
 * Fetches options from mocked backend using useOptions hook.
 * Posts newly created options to mocked backend.
 * Newly created options are automatically selected by call to parent onCreateOption.
 */

import CreatableSelect from "react-select/creatable";
import useOptions from "../CustomHooks/useOptions";
import { ActionMeta, OnChangeValue, StylesConfig } from "react-select";
import { SimpleOption } from "../mocks/handlers";

type OnChangeFunction = (
    newValue: OnChangeValue<SimpleOption, true>,
    actionMeta: ActionMeta<SimpleOption>
) => void;

type OnCreateOptionFunction = (inputValue: string) => void;

interface CMSelectProps {
    value: readonly SimpleOption[];
    onChange: OnChangeFunction;
    onCreateOption: OnCreateOptionFunction;
}

export const CMSelect: React.FC<CMSelectProps> = (props) => {
    // useOptions custom hook
    const {
        options,
        isLoading: isLoadingOptions,
        httpError: httpErrorOptions,
        handleCreateOption: handleCreateOptionHook,
    } = useOptions();

    // Set up simple style for options - otherwise defaults to white-on-white
    const simpleStyle: StylesConfig<SimpleOption, true> = {
        // option refers to individual options rendered in drop-down menu
        option: (baseStyles, state) => ({
            ...baseStyles,
            color: "black",
        }),
    };

    const handleCreateOption = (inputValue: string) => {
        // Pass to useOptions
        handleCreateOptionHook(inputValue);

        // Also pass to parent onCreateOption
        // (to handle automatic selection of newly created options)
        props.onCreateOption(inputValue);
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
        </div>
    );
};
