"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryApp = void 0;
const react_1 = require("react");
const _fhevm_sdk_1 = require("@fhevm-sdk");
const wagmi_1 = require("wagmi");
const RainbowKitCustomConnectButton_1 = require("~~/components/helper/RainbowKitCustomConnectButton");
const useSalaryAggregatorWagmi_1 = require("~~/hooks/salary/useSalaryAggregatorWagmi");
const SalaryApp = () => {
    const { isConnected, chain } = (0, wagmi_1.useAccount)();
    const chainId = chain?.id;
    const provider = (0, react_1.useMemo)(() => {
        if (typeof window === "undefined")
            return undefined;
        return window.ethereum;
    }, []);
    const initialMockChains = { 31337: "http://localhost:8545" };
    const { instance } = (0, _fhevm_sdk_1.useFhevm)({ provider, chainId, initialMockChains, enabled: true });
    const sa = (0, useSalaryAggregatorWagmi_1.useSalaryAggregatorWagmi)({ instance, initialMockChains });
    const [salary, setSalary] = (0, react_1.useState)("");
    if (!isConnected) {
        return (<div className="max-w-6xl mx-auto p-6 text-gray-900">
        <div className="flex items-center justify-center">
          <div className="bg-white bordershadow-xl p-8 text-center">
            <div className="mb-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-900/30 text-amber-400 text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Wallet not connected</h2>
            <p className="text-gray-700 mb-6">Connect your wallet to submit your salary privately.</p>
            <div className="flex items-center justify-center">
              <RainbowKitCustomConnectButton_1.RainbowKitCustomConnectButton />
            </div>
          </div>
        </div>
      </div>);
    }
    const onSubmit = async () => {
        const v = Number(salary);
        if (!Number.isFinite(v) || v <= 0)
            return;
        await sa.submitSalary(Math.floor(v));
        setSalary("");
    };
    return (<div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-900 w-full">
      <div className="text-center mb-8 text-black">
        <h1 className="text-3xl font-bold mb-2">Private Salary Comparison</h1>
        <p className="text-gray-600">Submit your salary privately. HR can decrypt only the aggregated result.</p>
      </div>

      <div className="bg-white shadow p-6">
        <h3 className="font-bold text-gray-900 text-lg mb-3">Submit Monthly Salary</h3>
        <div className="flex gap-3">
          <input className="input input-bordered w-full" type="number" placeholder="e.g. 8000" value={salary} onChange={e => setSalary(e.target.value)}/>
          <button className="btn bg-[#FFD208] text-black border-none" disabled={sa.isProcessing} onClick={onSubmit}>
            {sa.isProcessing ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-3">Stats</h3>
          <div className="flex justify-between py-2 border-b">
            <span>Participants</span>
            <span className="font-mono">{String(sa.count ?? 0n)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Encrypted Sum Handle</span>
            <span className="font-mono text-xs break-all">{sa.sumHandle || "-"}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Decrypted Sum (HR only)</span>
            <span className="font-mono">{typeof sa.decryptedSum === "bigint" ? String(sa.decryptedSum) : "-"}</span>
          </div>
        </div>

        <div className="bg-white shadow p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-3">HR Controls</h3>
          <div className="mb-2">HR Admin: <span className="font-mono">{sa.hrAdmin || "-"}</span></div>
          <div className="flex gap-3">
            <button className="btn btn-outline" disabled={!sa.isHr} onClick={sa.allowHrToDecryptSum}>
              Allow HR Decrypt Sum
            </button>
            <button className="btn" disabled={!sa.canDecrypt || sa.isDecrypting} onClick={sa.decrypt}>
              {sa.isDecrypting ? "Decrypting..." : "Decrypt Sum"}
            </button>
          </div>
          <div className="mt-4 p-3 bg-gray-50 border">
            <div className="flex justify-between">
              <span>Average (computed client-side)</span>
              <span className="font-mono">
                {typeof sa.average === "bigint" ? String(sa.average) : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {sa.message && (<div className="bg-white shadow p-6">
          <div className="text-gray-800">{sa.message}</div>
        </div>)}
    </div>);
};
exports.SalaryApp = SalaryApp;
