"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wagmiConfig = exports.enabledChains = void 0;
const wagmiConnectors_1 = require("./wagmiConnectors");
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const wagmi_1 = require("wagmi");
const scaffold_config_1 = __importDefault(require("~~/scaffold.config"));
const helper_1 = require("~~/utils/helper");
const { targetNetworks } = scaffold_config_1.default;
// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
exports.enabledChains = targetNetworks.find((network) => network.id === 1)
    ? targetNetworks
    : [...targetNetworks, chains_1.mainnet];
exports.wagmiConfig = (0, wagmi_1.createConfig)({
    chains: exports.enabledChains,
    connectors: (0, wagmiConnectors_1.wagmiConnectors)(),
    ssr: true,
    client: ({ chain }) => {
        let rpcFallbacks = [(0, viem_1.http)()];
        const rpcOverrideUrl = scaffold_config_1.default.rpcOverrides?.[chain.id];
        if (rpcOverrideUrl) {
            rpcFallbacks = [(0, viem_1.http)(rpcOverrideUrl), (0, viem_1.http)()];
        }
        else {
            const alchemyHttpUrl = (0, helper_1.getAlchemyHttpUrl)(chain.id);
            if (alchemyHttpUrl) {
                rpcFallbacks = [(0, viem_1.http)(alchemyHttpUrl), (0, viem_1.http)()];
            }
        }
        return (0, viem_1.createClient)({
            chain,
            transport: (0, viem_1.fallback)(rpcFallbacks),
            ...(chain.id !== chains_1.hardhat.id ? { pollingInterval: scaffold_config_1.default.pollingInterval } : {}),
        });
    },
});
