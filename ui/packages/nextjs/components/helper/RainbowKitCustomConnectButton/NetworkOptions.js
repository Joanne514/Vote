"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkOptions = void 0;
const wagmi_1 = require("wagmi");
const solid_1 = require("@heroicons/react/24/solid");
const helper_1 = require("~~/utils/helper");
const allowedNetworks = (0, helper_1.getTargetNetworks)();
const NetworkOptions = ({ hidden = false }) => {
    const { switchChain } = (0, wagmi_1.useSwitchChain)();
    const { chain } = (0, wagmi_1.useAccount)();
    return (<>
      {allowedNetworks
            .filter(allowedNetwork => allowedNetwork.id !== chain?.id)
            .map(allowedNetwork => (<li key={allowedNetwork.id} className={hidden ? "hidden" : ""}>
            <button className="menu-item btn-sm rounded-xl! flex gap-3 py-3 whitespace-nowrap" type="button" onClick={() => {
                switchChain?.({ chainId: allowedNetwork.id });
            }}>
              <solid_1.ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0"/>
              <span>Switch to {allowedNetwork.name}</span>
            </button>
          </li>))}
    </>);
};
exports.NetworkOptions = NetworkOptions;
