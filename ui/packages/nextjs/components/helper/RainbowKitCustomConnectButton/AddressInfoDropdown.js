"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInfoDropdown = void 0;
const react_1 = require("react");
const NetworkOptions_1 = require("./NetworkOptions");
const viem_1 = require("viem");
const wagmi_1 = require("wagmi");
const solid_1 = require("@heroicons/react/20/solid");
const outline_1 = require("@heroicons/react/24/outline");
const helper_1 = require("~~/components/helper");
const helper_2 = require("~~/hooks/helper");
const helper_3 = require("~~/utils/helper");
const allowedNetworks = (0, helper_3.getTargetNetworks)();
const AddressInfoDropdown = ({ address, ensAvatar, displayName }) => {
    const { disconnect } = (0, wagmi_1.useDisconnect)();
    const checkSumAddress = (0, viem_1.getAddress)(address);
    const [selectingNetwork, setSelectingNetwork] = (0, react_1.useState)(false);
    const dropdownRef = (0, react_1.useRef)(null);
    const closeDropdown = () => {
        setSelectingNetwork(false);
        dropdownRef.current?.removeAttribute("open");
    };
    (0, helper_2.useOutsideClick)(dropdownRef, closeDropdown);
    return (<>
      <details ref={dropdownRef} className="dropdown dropdown-end leading-3">
        <summary className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 h-auto!">
          <helper_1.BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar}/>
          <span className="ml-2 mr-1">{displayName}</span>
          <outline_1.ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0"/>
        </summary>
        <ul className="dropdown-content menu z-2 p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1">
          <NetworkOptions_1.NetworkOptions hidden={!selectingNetwork}/>
          {allowedNetworks.length > 1 ? (<li className={selectingNetwork ? "hidden" : ""}>
              <button className="h-8 btn-sm rounded-xl! flex gap-3 py-3" type="button" onClick={() => {
                setSelectingNetwork(true);
            }}>
                <outline_1.ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0"/> <span>Switch Network</span>
              </button>
            </li>) : null}
          <li className={selectingNetwork ? "hidden" : ""}>
            <button className="menu-item text-error h-8 btn-sm rounded-xl! flex gap-3 py-3" type="button" onClick={() => disconnect()}>
              <solid_1.ArrowLeftIcon className="h-6 w-4 ml-2 sm:ml-0"/> <span>Disconnect</span>
            </button>
          </li>
        </ul>
      </details>
    </>);
};
exports.AddressInfoDropdown = AddressInfoDropdown;
