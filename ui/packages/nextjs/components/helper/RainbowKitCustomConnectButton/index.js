"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RainbowKitCustomConnectButton = void 0;
// @refresh reset
const Balance_1 = require("../Balance");
const AddressInfoDropdown_1 = require("./AddressInfoDropdown");
const WrongNetworkDropdown_1 = require("./WrongNetworkDropdown");
const rainbowkit_1 = require("@rainbow-me/rainbowkit");
const useTargetNetwork_1 = require("~~/hooks/helper/useTargetNetwork");
const helper_1 = require("~~/utils/helper");
/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
const RainbowKitCustomConnectButton = () => {
    const { targetNetwork } = (0, useTargetNetwork_1.useTargetNetwork)();
    return (<rainbowkit_1.ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
            const connected = mounted && account && chain;
            const blockExplorerAddressLink = account
                ? (0, helper_1.getBlockExplorerAddressLink)(targetNetwork, account.address)
                : undefined;
            return (<>
            {(() => {
                    if (!connected) {
                        return (<button className="btn btn-md rounded-none bg-[#FFD208] text-gray-900 cursor-pointer border-none" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>);
                    }
                    if (chain.unsupported || chain.id !== targetNetwork.id) {
                        return <WrongNetworkDropdown_1.WrongNetworkDropdown />;
                    }
                    return (<>
                  <div className="flex flex-col items-center mr-1 text-gray-900">
                    <Balance_1.Balance address={account.address} className="min-h-0 h-auto"/>
                    <span className="text-xs text-gray-900">{chain.name}</span>
                  </div>
                  <AddressInfoDropdown_1.AddressInfoDropdown address={account.address} displayName={account.displayName} ensAvatar={account.ensAvatar} blockExplorerAddressLink={blockExplorerAddressLink}/>
                </>);
                })()}
          </>);
        }}
    </rainbowkit_1.ConnectButton.Custom>);
};
exports.RainbowKitCustomConnectButton = RainbowKitCustomConnectButton;
