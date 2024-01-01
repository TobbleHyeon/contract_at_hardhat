import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Buffer } from "buffer";
import { Web3ContextProvider } from "./libs/components/Web3ContextProvider";
import Example from "./example/Example";

window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Web3ContextProvider>
        <Example />
    </Web3ContextProvider>
);
