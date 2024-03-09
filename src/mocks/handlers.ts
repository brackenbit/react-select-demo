/*
 * react-select-demo
 * Brackenbit 2024
 *
 * handlers.ts
 * Define MSW handlers for request interception.
 *
 * MSW with Typescript (https://mswjs.io/docs/best-practices/typescript):
 * All http request handlers support arguments:
 * http.get<Params, RequestBodyType, ResponseBodyType, Path>(path, resolver)
 */

import { http, HttpResponse, PathParams } from "msw";

// (Export for use in App, also.)
export type SimpleOption = {
    value: string;
    label: string;
};

// GET /api/test
// Simple test API to confirm correct setup
const testApiHandler = http.get("/api/test", async () => {
    return HttpResponse.json({
        message: "Hello world!",
    });
});

// GET /api/options
// API returning a list of options for use in multi-select.

// Define and initialise options to return with API
let options: SimpleOption[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
];

// Define handler
// Simple GET can infer types with no type arguments needed.
const getOptionsHandler = http.get("/api/options", async () => {
    return HttpResponse.json({
        options,
    });
});

// POST /api/options
// API to add new options for use in creatable select
// POST requires type arguments to be provided
const postOptionsHandler = http.post<
    PathParams, // narrows Params
    // ^ can simply use the inbuilt msw types for generics where you
    // only care about some of the type arguments.
    SimpleOption, // narrows RequestBodyType
    { options: SimpleOption[] } // narrows ResponseBodyType
    // It appears ResponseBodyType MUST be narrowed to a Record.
    // i.e. Not possible to return options array directly.
    // Some docs show redundant inclusion of path ("/api/options") as fourth
    // type argument; it seems this can be omitted with no effect.
>("/api/options", async ({ request }) => {
    // Parse JSON to get new option
    const newOption: SimpleOption = await request.json();

    // Add new option to the array
    options.push(newOption);

    // Return new array of options in response
    return HttpResponse.json({
        options,
    });
});

export const handlers = [testApiHandler, getOptionsHandler, postOptionsHandler];
