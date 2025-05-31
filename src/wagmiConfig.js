// wagmiConfig.js (or similar)

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Qubapresale",
  projectId: "0dd59453d875b4143d6e9a39b015d758",
  chains: [mainnet],
});
