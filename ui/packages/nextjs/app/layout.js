"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
require("@rainbow-me/rainbowkit/styles.css");
const DappWrapperWithProviders_1 = require("~~/components/DappWrapperWithProviders");
const ThemeProvider_1 = require("~~/components/ThemeProvider");
require("~~/styles/globals.css");
const getMetadata_1 = require("~~/utils/helper/getMetadata");
// Import polyfill for indexedDB in SSR
require("~~/utils/polyfill-indexeddb");
exports.metadata = (0, getMetadata_1.getMetadata)({
    title: "Anonymous Voting System",
    description: "Privacy-preserving anonymous voting using FHEVM",
});
const DappWrapper = ({ children }) => {
    return (<html suppressHydrationWarning data-theme="corporate">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=telegraf@400,500,700&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <ThemeProvider_1.ThemeProvider enableSystem>
          <DappWrapperWithProviders_1.DappWrapperWithProviders>{children}</DappWrapperWithProviders_1.DappWrapperWithProviders>
        </ThemeProvider_1.ThemeProvider>
      </body>
    </html>);
};
exports.default = DappWrapper;
