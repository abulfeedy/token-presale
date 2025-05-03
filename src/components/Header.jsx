import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { WalletContext } from "../contexts/WalletContext";
import { FiBox, FiMenu, FiX } from "react-icons/fi";
import { SiWalletconnect } from "react-icons/si";
import metamask from "../assets/images/metamask.svg"; // Placeholder for Phantom or other wallets
import phantom from "../assets/images/Phantom.svg"; // Placeholder for Phantom or other wallets
import walletconnect from "../assets/images/walletconnect.png"; // Placeholder for Phantom or other wallets
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Header() {
  const { account, connectWallet } = useContext(WalletContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleWalletSelect = (walletType) => {
    // Placeholder for wallet connection logic
    connectWallet(walletType); // Pass the selected wallet type to the connectWallet function
    setIsWalletModalOpen(false);
  };

  const wallets = [
    { name: "MetaMask", icon: metamask, type: "metamask" },
    {
      name: "WalletConnect",
      icon: walletconnect,
      type: "walletconnect",
    },
    { name: "Phantom", icon: phantom, type: "phantom" },
  ];

  return (
    <motion.header
      className='bg-[#2E1437] text-white shadow-md fixed top-0 left-0 w-full z-50'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
        {/* Logo */}
        <h1 className='text-lg sm:text-xl font-bold tracking-tight'>
          <NavLink to='/' className='flex items-center space-x-2'>
            <FiBox size={30} color='white' />
            <span>Quba Launch</span>
          </NavLink>
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className='md:hidden text-white focus:outline-none'
          onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-[#2E1437] md:bg-transparent p-4 md:p-0 z-40`}>
          <div className='flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold"
                  : "text-pink-100 hover:text-white"
              }
              onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink
              to='/create-presale'
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold"
                  : "text-red-100 hover:text-white"
              }
              onClick={() => setIsMenuOpen(false)}>
              Create presale
            </NavLink>
            <NavLink
              to='/create-token'
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold"
                  : "text-red-100 hover:text-white"
              }
              onClick={() => setIsMenuOpen(false)}>
              Create token
            </NavLink>
          </div>

          {/* Connect Wallet Button */}
          <div className='mt-4 md:mt-0 md:ml-4'>
            {account ? (
              <span className='text-sm sm:text-[15px] px-4 py-2 bg-gray-700 rounded-md'>
                {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </span>
            ) : (
              <Dialog
                open={isWalletModalOpen}
                onOpenChange={setIsWalletModalOpen}>
                <DialogTrigger asChild>
                  <Button className='btn-primary text-sm sm:text-[15px]'>
                    Connect Wallet
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Select a Wallet</DialogTitle>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    {wallets.map((wallet) => (
                      <Button
                        key={wallet.type}
                        variant='outline'
                        className='flex items-center justify-between space-x-3 py-3'
                        onClick={() => handleWalletSelect(wallet.type)}>
                        <img
                          src={wallet.icon}
                          alt={`${wallet.type} logo`}
                          className='w-6 h-6 rounded-lg'
                        />
                        <span>{wallet.name}</span>
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;
