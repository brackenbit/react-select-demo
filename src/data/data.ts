/*
 * react-select-demo
 * Brackenbit 2024
 */

export interface ColourOption {
    readonly value: string;
    readonly label: string;
}

export const colourOptions: readonly ColourOption[] = [
    {value: "red", label: "Red"},
    {value: "orange", label: "Orange"},
    {value: "yellow", label: "Yellow"},
    {value: "green", label: "Green"},
    {value: "blue", label: "Blue"},
    {value: "purple", label: "Purple"},
]