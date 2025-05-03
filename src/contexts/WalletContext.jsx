import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask!");
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned.");
      }

      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const network = await ethersProvider.getNetwork();
      setAccount(accounts[0]);
      setProvider(ethersProvider);
      setChainId(Number(network.chainId));
      toast.success("Wallet connected!");
    } catch (error) {
      toast.error(error.message || "Failed to connect wallet.");
      console.error("Wallet connection error:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0] || null);
        if (accounts[0]) {
          toast.info("Wallet account changed.");
        } else {
          toast.warn("Wallet disconnected.");
        }
      };

      const handleChainChanged = (chainId) => {
        setChainId(Number(chainId));
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ account, provider, chainId, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
