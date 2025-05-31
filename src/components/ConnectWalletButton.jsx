// src/components/ConnectWalletButton.jsx
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const ConnectWalletButton = ({ label = "Connect Wallet", style = {} }) => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const [showDialog, setShowDialog] = React.useState(false);

  const handleClick = () => {
    if (isConnected) {
      setShowDialog(true); // Show confirmation dialog
    } else {
      openConnectModal();
    }
  };

  const handleConfirmDisconnect = () => {
    disconnect();
    setShowDialog(false);
  };

  const shortenAddress = (addr) => addr.slice(0, 6) + "..." + addr.slice(-4);

  return (
    <>
      <button onClick={handleClick} style={style}>
        {isConnected ? `${shortenAddress(address)}` : label}
      </button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect Wallet</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to disconnect your wallet?</p>
          <DialogFooter>
            <Button variant='outline' onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button className='bg-primary' onClick={handleConfirmDisconnect}>
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConnectWalletButton;
