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

import { http, HttpResponse } from "msw";

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
const getOptionsHandler = http.get("/api/options", async () => {
    return HttpResponse.json({
        options,
    });
});

// POST /api/options
// API to add new options for use in creatable select
// http.post is a HttpRequestHandler:
// type HttpRequestHandler = <Params extends PathParams<keyof Params> = PathParams,
//                            RequestBodyType extends DefaultBodyType = DefaultBodyType,
//                            ResponseBodyType extends DefaultBodyType = undefined,
//                            RequestPath extends Path = Path>(
//                                path: RequestPath,
//                                resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
//                                options?: RequestHandlerOptions) => HttpHandler;

type PostOptionsRequestBody = {
    option: SimpleOption;
};

type PostOptionsResponseBody = {
    options: SimpleOption[];
};

const postOptionsHandler = http.post<
    {}, // narrows Params type (N/A)
    PostOptionsRequestBody, // narrows RequestBodyType
    PostOptionsResponseBody, // narrows ResponseBodyType
    "/api/options"
>("/api/options", async ({ request }) => {
    // Parse JSON to get new option
    const requestData = await request.json();
    let newOption = requestData.option;

    // Add new option to the array
    options.push(newOption);

    // Return new array of options in response
    return HttpResponse.json({
        options: options,
    });
});

export const handlers = [testApiHandler, getOptionsHandler, postOptionsHandler];
