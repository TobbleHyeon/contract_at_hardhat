import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ConnectionOptions } from "../libs/components/ConnectionOptions";
import { ConnectionType, switchNetwork } from "../libs/connections";
import { CHAIN_INFO, INPUT_CHAIN_URL } from "../libs/constants";

import reactLogo from "../assets/react.svg";
import metaMaskLogo from "../assets/MetaMask_Fox.png";

const FallbackComponent = ({ error }: FallbackProps) => {
    return (
        <div>
            <h1>An error occurred: {error.message}</h1>
            <p>Please reload the application</p>
        </div>
    );
};
// Listen for new blocks and update the wallet
const useOnBlockUpdated = (callback: (blockNumber: number) => void) => {
    const { provider } = useWeb3React();
    useEffect(() => {
        if (!provider) {
            return;
        }
        const subscription = provider.on("block", callback);
        return () => {
            subscription.removeAllListeners();
        };
    });
};

const Example = () => {
    const { chainId, account, isActive } = useWeb3React();
    const [blockNumber, setBlockNumber] = useState<number>(0);
    const [connectionType, setConnectionType] = useState<ConnectionType | null>(null);

    // Listen for new blocks and update the wallet
    useOnBlockUpdated((blockNumber: number) => {
        setBlockNumber(blockNumber);
    });

    return (
        <div className='App w-[270px]'>
            <div className='flex items-center justify-center'>
                <img src={metaMaskLogo} className='logo' alt='Vite logo' />
                <img src={reactLogo} className='logo react' alt='React logo' />
            </div>
            <h2 className='text-3xl font-bold text-center'>MetaMask & React</h2>
            <ErrorBoundary FallbackComponent={FallbackComponent}>
                <div className='py-3'>
                    {INPUT_CHAIN_URL === "" && <h2 className='error'>Please set your RPC URL in config.ts</h2>}
                    <h3>{`Block Number: ${blockNumber + 1}`}</h3>
                </div>
                <ConnectionOptions
                    activeConnectionType={connectionType}
                    isConnectionActive={isActive}
                    onActivate={setConnectionType}
                    onDeactivate={setConnectionType}
                />
                <div className='flex flex-col flex-wrap w-full py-3 border-1'>
                    <p>{`ChainId: ${chainId ?? null}`}</p>
                    <p>{`Connected Account: ${account ?? null}`}</p>
                </div>
                <h5 className='font-bold'>Switch</h5>
                <ul className='w-full flex justify-center items-center gap-1 switch-chain [&_button]:w-full'>
                    {Object.keys(CHAIN_INFO).map((chainId) => (
                        <li key={chainId} className='w-full'>
                            <button onClick={() => switchNetwork(parseInt(chainId), connectionType)}>
                                {`${CHAIN_INFO[chainId].label}`}
                            </button>
                        </li>
                    ))}
                </ul>
            </ErrorBoundary>
        </div>
    );
};

export default Example;
