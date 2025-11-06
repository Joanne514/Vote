"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFHECounterWagmi = void 0;
const react_1 = require("react");
const helper_1 = require("../helper");
const useWagmiEthers_1 = require("../wagmi/useWagmiEthers");
const _fhevm_sdk_1 = require("@fhevm-sdk");
const ethers_1 = require("ethers");
const wagmi_1 = require("wagmi");
/**
 * useFHECounterWagmi - Minimal FHE Counter hook for Wagmi devs
 *
 * What it does:
 * - Reads the current encrypted counter
 * - Decrypts the handle on-demand with useFHEDecrypt
 * - Encrypts inputs and writes increment/decrement
 *
 * Pass your FHEVM instance and a simple key-value storage for the decryption signature.
 * That's it. Everything else is handled for you.
 */
const useFHECounterWagmi = (parameters) => {
    const { instance, initialMockChains } = parameters;
    const { storage: fhevmDecryptionSignatureStorage } = (0, _fhevm_sdk_1.useInMemoryStorage)();
    // Wagmi + ethers interop
    const { chainId, accounts, isConnected, ethersReadonlyProvider, ethersSigner } = (0, useWagmiEthers_1.useWagmiEthers)(initialMockChains);
    // Resolve deployed contract info once we know the chain
    const allowedChainId = typeof chainId === "number" ? chainId : undefined;
    const { data: fheCounter } = (0, helper_1.useDeployedContractInfo)({ contractName: "FHECounter", chainId: allowedChainId });
    // Simple status string for UX messages
    const [message, setMessage] = (0, react_1.useState)("");
    const isRefreshing = false; // derived from wagmi below
    const [isProcessing, setIsProcessing] = (0, react_1.useState)(false);
    // -------------
    // Helpers
    // -------------
    const hasContract = Boolean(fheCounter?.address && fheCounter?.abi);
    const hasProvider = Boolean(ethersReadonlyProvider);
    const hasSigner = Boolean(ethersSigner);
    const getContract = (mode) => {
        if (!hasContract)
            return undefined;
        const providerOrSigner = mode === "read" ? ethersReadonlyProvider : ethersSigner;
        if (!providerOrSigner)
            return undefined;
        return new ethers_1.ethers.Contract(fheCounter.address, fheCounter.abi, providerOrSigner);
    };
    // Read count handle via wagmi
    const readResult = (0, wagmi_1.useReadContract)({
        address: (hasContract ? fheCounter.address : undefined),
        abi: (hasContract ? fheCounter.abi : undefined),
        functionName: "getCount",
        query: {
            enabled: Boolean(hasContract && hasProvider),
            refetchOnWindowFocus: false,
        },
    });
    const countHandle = (0, react_1.useMemo)(() => readResult.data ?? undefined, [readResult.data]);
    const canGetCount = Boolean(hasContract && hasProvider && !readResult.isFetching);
    const refreshCountHandle = (0, react_1.useCallback)(async () => {
        const res = await readResult.refetch();
        if (res.error)
            setMessage("FHECounter.getCount() failed: " + res.error.message);
    }, [readResult]);
    // derive isRefreshing from wagmi
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _derivedIsRefreshing = readResult.isFetching;
    // Wagmi handles initial fetch via `enabled`
    // Decrypt (reuse existing decrypt hook for simplicity)
    const requests = (0, react_1.useMemo)(() => {
        if (!hasContract || !countHandle || countHandle === ethers_1.ethers.ZeroHash)
            return undefined;
        return [{ handle: countHandle, contractAddress: fheCounter.address }];
    }, [hasContract, fheCounter?.address, countHandle]);
    const { canDecrypt, decrypt, isDecrypting, message: decMsg, results, } = (0, _fhevm_sdk_1.useFHEDecrypt)({
        instance,
        ethersSigner: ethersSigner,
        fhevmDecryptionSignatureStorage,
        chainId,
        requests,
    });
    (0, react_1.useEffect)(() => {
        if (decMsg)
            setMessage(decMsg);
    }, [decMsg]);
    const clearCount = (0, react_1.useMemo)(() => {
        if (!countHandle)
            return undefined;
        if (countHandle === ethers_1.ethers.ZeroHash)
            return { handle: countHandle, clear: BigInt(0) };
        const clear = results[countHandle];
        if (typeof clear === "undefined")
            return undefined;
        return { handle: countHandle, clear };
    }, [countHandle, results]);
    const isDecrypted = Boolean(countHandle && clearCount?.handle === countHandle);
    const decryptCountHandle = decrypt;
    // Mutations (increment/decrement)
    const { encryptWith } = (0, _fhevm_sdk_1.useFHEEncryption)({ instance, ethersSigner: ethersSigner, contractAddress: fheCounter?.address });
    const canUpdateCounter = (0, react_1.useMemo)(() => Boolean(hasContract && instance && hasSigner && !isProcessing), [hasContract, instance, hasSigner, isProcessing]);
    const getEncryptionMethodFor = (functionName) => {
        const functionAbi = fheCounter?.abi.find(item => item.type === "function" && item.name === functionName);
        if (!functionAbi)
            return { method: undefined, error: `Function ABI not found for ${functionName}` };
        if (!functionAbi.inputs || functionAbi.inputs.length === 0)
            return { method: undefined, error: `No inputs found for ${functionName}` };
        const firstInput = functionAbi.inputs[0];
        return { method: (0, _fhevm_sdk_1.getEncryptionMethod)(firstInput.internalType), error: undefined };
    };
    const updateCounter = (0, react_1.useCallback)(async (value) => {
        if (isProcessing || !canUpdateCounter || value === 0)
            return;
        const op = value > 0 ? "increment" : "decrement";
        const valueAbs = Math.abs(value);
        setIsProcessing(true);
        setMessage(`Starting ${op}(${valueAbs})...`);
        try {
            const { method, error } = getEncryptionMethodFor(op);
            if (!method)
                return setMessage(error ?? "Encryption method not found");
            setMessage(`Encrypting with ${method}...`);
            const enc = await encryptWith(builder => {
                builder[method](valueAbs);
            });
            if (!enc)
                return setMessage("Encryption failed");
            const writeContract = getContract("write");
            if (!writeContract)
                return setMessage("Contract info or signer not available");
            const params = (0, _fhevm_sdk_1.buildParamsFromAbi)(enc, [...fheCounter.abi], op);
            const tx = await (op === "increment" ? writeContract.increment(...params) : writeContract.decrement(...params));
            setMessage("Waiting for transaction...");
            await tx.wait();
            setMessage(`${op}(${valueAbs}) completed!`);
            refreshCountHandle();
        }
        catch (e) {
            setMessage(`${op} failed: ${e instanceof Error ? e.message : String(e)}`);
        }
        finally {
            setIsProcessing(false);
        }
    }, [isProcessing, canUpdateCounter, encryptWith, getContract, refreshCountHandle, fheCounter?.abi]);
    return {
        contractAddress: fheCounter?.address,
        canDecrypt,
        canGetCount,
        canUpdateCounter,
        updateCounter,
        decryptCountHandle,
        refreshCountHandle,
        isDecrypted,
        message,
        clear: clearCount?.clear,
        handle: countHandle,
        isDecrypting,
        isRefreshing,
        isProcessing,
        // Wagmi-specific values
        chainId,
        accounts,
        isConnected,
        ethersSigner,
    };
};
exports.useFHECounterWagmi = useFHECounterWagmi;
