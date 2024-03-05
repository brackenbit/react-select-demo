/*
 * react-select-demo
 * Brackenbit 2024
 *
 * handlers.ts
 * Define MSW handlers for request interception.
 */

import { http, HttpResponse } from "msw";

type TestApiResponseBody = {
    message: string;
};

export const handlers = [
    http.get<TestApiResponseBody, "/api/test">("/api/test", async () => {
        return HttpResponse.json({
            message: "Hello world!",
        });
    }),
];
