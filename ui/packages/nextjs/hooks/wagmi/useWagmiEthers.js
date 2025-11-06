"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWagmiEthers = void 0;
const react_1 = require("react");
const ethers_1 = require("ethers");
const wagmi_1 = require("wagmi");
const useWagmiEthers = (initialMockChains) => {
    const { address, isConnected, chain } = (0, wagmi_1.useAccount)();
    const { data: walletClient } = (0, wagmi_1.useWalletClient)();
    const chainId = chain?.id ?? walletClient?.chain?.id;
    const accounts = address ? [address] : undefined;
    const ethersProvider = (0, react_1.useMemo)(() => {
        if (!walletClient)
            return undefined;
        const eip1193Provider = {
            request: async (args) => {
                return await walletClient.request(args);
            },
            on: () => {
                console.log("Provider events not fully implemented for wagmi");
            },
            removeListener: () => {
                console.log("Provider removeListener not fully implemented for wagmi");
            },
        };
        return new ethers_1.ethers.BrowserProvider(eip1193Provider);
    }, [walletClient]);
    const ethersReadonlyProvider = (0, react_1.useMemo)(() => {
        if (!ethersProvider)
            return undefined;
        const rpcUrl = initialMockChains?.[chainId || 0];
        if (rpcUrl) {
            return new ethers_1.ethers.JsonRpcProvider(rpcUrl);
        }
        return ethersProvider;
    }, [ethersProvider, initialMockChains, chainId]);
    const ethersSigner = (0, react_1.useMemo)(() => {
        if (!ethersProvider || !address)
            return undefined;
        return new ethers_1.ethers.JsonRpcSigner(ethersProvider, address);
    }, [ethersProvider, address]);
    // Stable refs consumers can reuse
    const ropRef = (0, react_1.useRef)(ethersReadonlyProvider);
    const chainIdRef = (0, react_1.useRef)(chainId);
    (0, react_1.useEffect)(() => {
        ropRef.current = ethersReadonlyProvider;
    }, [ethersReadonlyProvider]);
    (0, react_1.useEffect)(() => {
        chainIdRef.current = chainId;
    }, [chainId]);
    return {
        chainId,
        accounts,
        isConnected,
        ethersProvider,
        ethersReadonlyProvider,
        ethersSigner,
        ropRef,
        chainIdRef,
    };
};
exports.useWagmiEthers = useWagmiEthers;
