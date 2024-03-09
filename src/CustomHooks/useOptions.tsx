/*
 * react-select-demo
 * Brackenbit 2024
 *
 * useOptions
 * Custom hook to return a list of options for react-select.
 */

import { useEffect, useState } from "react";
import { SimpleOption } from "../mocks/handlers";

function useOptions() {
    const [options, setOptions] = useState<SimpleOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const fetchOptions = async () => {
        const url = "http://localhost:5173/api/options";

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch options");
        }

        const responseJson = await response.json();
        // Response returns options array with name "options"
        setOptions(responseJson.options);

        setIsLoading(false);
    };

    const handleCreateOption = async (inputValue: string) => {
        let value = inputValue.toLocaleLowerCase().replace(/\W/g, "");
        let label = inputValue;
        let newOption = { value, label };

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

        // Successful POST returns new options list in response
        const responseJson = await response.json();
        // Response returns options array with name "options"
        setOptions(responseJson.options);
    };

    useEffect(() => {
        fetchOptions().catch((error) => {
            // Error encountered - stop loading and set HTTP error
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []); // Run once, rely on POST returns after that.

    return {
        options,
        isLoading,
        httpError,
        handleCreateOption,
    };
}

export default useOptions;
