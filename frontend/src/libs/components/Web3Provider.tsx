import React, { ReactNode } from "react";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { PRIORITIZED_CONNECTORS } from "../connections";
import { useEagerlyConnect } from "../hooks";
import { Connector } from "@web3-react/types";

export const Web3Provider = ({ children }: { children: ReactNode }) => {
    useEagerlyConnect();

    const connectorsArray = Object.values(PRIORITIZED_CONNECTORS).map(
        ({ connector, hooks }) => [connector, hooks] as [Connector, Web3ReactHooks]
    );

    return <Web3ReactProvider connectors={connectorsArray}>{children}</Web3ReactProvider>;
};
