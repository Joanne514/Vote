"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DappWrapperWithProviders = exports.queryClient = void 0;
const react_1 = require("react");
const _fhevm_sdk_1 = require("@fhevm-sdk");
const rainbowkit_1 = require("@rainbow-me/rainbowkit");
const react_query_1 = require("@tanstack/react-query");
const next_nprogress_bar_1 = require("next-nprogress-bar");
const next_themes_1 = require("next-themes");
const react_hot_toast_1 = require("react-hot-toast");
const wagmi_1 = require("wagmi");
const Header_1 = require("~~/components/Header");
const helper_1 = require("~~/components/helper");
const wagmiConfig_1 = require("~~/services/web3/wagmiConfig");
exports.queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
const DappWrapperWithProviders = ({ children }) => {
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDarkMode = resolvedTheme === "dark";
    const [mounted, setMounted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setMounted(true);
    }, []);
    return (<wagmi_1.WagmiProvider config={wagmiConfig_1.wagmiConfig}>
      <react_query_1.QueryClientProvider client={exports.queryClient}>
        <rainbowkit_1.RainbowKitProvider avatar={helper_1.BlockieAvatar} theme={mounted ? (isDarkMode ? (0, rainbowkit_1.darkTheme)() : (0, rainbowkit_1.lightTheme)()) : (0, rainbowkit_1.lightTheme)()}>
          <next_nprogress_bar_1.AppProgressBar height="3px" color="#2299dd"/>
          <div className={`flex flex-col min-h-screen`}>
            <Header_1.Header />
            <main className="relative flex flex-col flex-1">
              <_fhevm_sdk_1.InMemoryStorageProvider>{children}</_fhevm_sdk_1.InMemoryStorageProvider>
            </main>
          </div>
          <react_hot_toast_1.Toaster />
        </rainbowkit_1.RainbowKitProvider>
      </react_query_1.QueryClientProvider>
    </wagmi_1.WagmiProvider>);
};
exports.DappWrapperWithProviders = DappWrapperWithProviders;
