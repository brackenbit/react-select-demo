/*
 * react-select-demo
 * Brackenbit 2024
 */

import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const serviceWorker = setupWorker(...handlers);
