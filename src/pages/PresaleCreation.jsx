import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

// Import network logos (adjust paths based on your project structure)
import bnbChainLogo from "../assets/images/bnb.svg";
import ethChainLogo from "../assets/images/ethereum.svg";
import arbitrumLogo from "../assets/images/arbitrum.svg";
import polygonLogo from "../assets/images/polygon.svg";
import avalancheLogo from "../assets/images/avalanche.svg";
import cronosLogo from "../assets/images/cronos.svg";
import basedLogo from "../assets/images/based.svg";
import coreLogo from "../assets/images/core.svg";
import DogecoinLogo from "../assets/images/Dogecoin.svg";
import solanaLogo from "../assets/images/solana.svg";
import tonLogo from "../assets/images/toncoin.svg";
import suiLogo from "../assets/images/sui.svg";
import tronLogo from "../assets/images/tron.svg";

export default function CreatePresale() {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const networks = [
    { value: "bsc", label: "BNB Chain", logo: bnbChainLogo },
    { value: "eth", label: "Ethereum", logo: ethChainLogo },
    { value: "arbitrum", label: "Arbitrum", logo: arbitrumLogo },
    { value: "polygon", label: "Polygon", logo: polygonLogo },
    { value: "avax", label: "AVAX", logo: avalancheLogo },
    { value: "cronos", label: "Cronos", logo: cronosLogo },
    { value: "base", label: "Base", logo: basedLogo },
    { value: "core", label: "Core", logo: coreLogo },
    { value: "dogechain", label: "Dogechain", logo: DogecoinLogo },

    { value: "solana", label: "Solana", logo: solanaLogo },
    { value: "tron", label: "Ton", logo: tronLogo },
    { value: "ton", label: "The Open Network (TON)", logo: tonLogo },
    { value: "sui", label: "Sui", logo: suiLogo },
  ];

  const connectWallet = async () => {
    // Placeholder for wallet connection logic
    try {
      // Example: Connect using MetaMask (Ethereum-compatible)
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsWalletConnected(true);
        alert("Wallet connected successfully!");
      } else {
        alert("Please install a wallet like MetaMask to proceed.");
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <div className='max-w-5xl mt-10 mx-auto p-4'>
      <h2 className='text-xl font-semibold mb-4'>Create Presale</h2>

      <div className='bg-white rounded-lg shadow-md p-6'>
        <h3 className='text-lg font-medium mb-4'>Chain</h3>

        {/* EVM Chain Section */}
        <div className='mb-6'>
          <Label className='text-sm font-medium text-gray-700 mb-5 block'>
            EVM chain
          </Label>
          <RadioGroup
            value={selectedNetwork}
            onValueChange={setSelectedNetwork}
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {networks
              .filter(
                (network) =>
                  network.value !== "solana" &&
                  network.value !== "eclipse" &&
                  network.value !== "ton" &&
                  network.value !== "sui"
              )
              .map((network) => (
                <div
                  key={network.value}
                  className='flex items-center space-x-2 sm:ml-8 p-5'>
                  <RadioGroupItem
                    value={network.value}
                    id={network.value}
                    className='peer'
                  />
                  <Label
                    htmlFor={network.value}
                    className='flex items-center space-x-2 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed'>
                    <img
                      src={network.logo}
                      alt={`${network.label} logo`}
                      className='w-6 h-6'
                    />
                    <span>{network.label}</span>
                  </Label>
                </div>
              ))}
          </RadioGroup>
        </div>

        {/* Non-EVM Chain Section */}
        <div className='mb-6'>
          <RadioGroup
            value={selectedNetwork}
            onValueChange={setSelectedNetwork}
            className='flex flex-col gap-5 py-3'>
            {networks
              .filter(
                (network) =>
                  network.value === "solana" ||
                  network.value === "eclipse" ||
                  network.value === "ton" ||
                  network.value === "sui"
              )
              .map((network) => (
                <div
                  key={network.value}
                  className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value={network.value}
                    id={network.value}
                    className='peer'
                  />
                  <Label
                    htmlFor={network.value}
                    className='flex items-center space-x-2 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed'>
                    <img
                      src={network.logo}
                      alt={`${network.label} logo`}
                      className='w-6 h-6'
                    />
                    <span>{network.label}</span>
                  </Label>
                </div>
              ))}
          </RadioGroup>
        </div>

        {/* Wallet Connection Prompt */}
        {!isWalletConnected && (
          <p className='text-red-500 text-sm mt-4'>
            You need to connect wallet first.
          </p>
        )}
      </div>

      {/* Connect Wallet Button (Optional, depending on your UI) */}
      {!isWalletConnected && (
        <Button onClick={connectWallet} className='mt-4'>
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
