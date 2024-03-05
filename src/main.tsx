import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Function to set up MSW
// Service worker registration is async, so this function is used to
// defer loading the application until mocking setup is complete.
async function enableMocking() {
    // Only enable mocking if in dev environment
    if (process.env.NODE_ENV !== "development") {
        return;
    }

    const { serviceWorker } = await import("./mocks/browser.ts");

    return serviceWorker.start();
    // ^ returns a Promise that is resolved once serviceWorker is
    // ready to intercept requests
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});
