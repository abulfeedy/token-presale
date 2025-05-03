import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import CountdownTimer from "../components/CountdownTimer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Mock token data
const mockTokens = [
  {
    id: "1",
    name: "Alpha Token",
    symbol: "ALPHA",
    price: 0.01,
    totalSupply: 1000000,
    softCap: 50,
    hardCap: 200,
    startTime: Math.floor(Date.now() / 1000) - 86400,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 3,
  },
  {
    id: "2",
    name: "Beta Token",
    symbol: "BETA",
    price: 0.02,
    totalSupply: 500000,
    softCap: 30,
    hardCap: 150,
    startTime: Math.floor(Date.now() / 1000) - 86400,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 5,
  },
  {
    id: "3",
    name: "Gamma Token",
    symbol: "GAMMA",
    price: 0.015,
    totalSupply: 750000,
    softCap: 40,
    hardCap: 180,
    startTime: Math.floor(Date.now() / 1000) - 86400,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 7,
  },
];

function TokenPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, connectWallet } = useContext(WalletContext);
  const [token, setToken] = useState(null);
  const [amount, setAmount] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  useEffect(() => {
    const foundToken = mockTokens.find((t) => t.id === id);
    if (foundToken) {
      setToken(foundToken);
    } else {
      navigate("/"); // Redirect to home if token not found
    }
  }, [id, navigate]);

  const handlePurchase = (e) => {
    e.preventDefault();
    if (!account) {
      setPurchaseStatus({
        type: "error",
        message: "Please connect your wallet.",
      });
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      setPurchaseStatus({
        type: "error",
        message: "Please enter a valid amount.",
      });
      return;
    }
    // Simulate purchase
    setPurchaseStatus({
      type: "success",
      message: `Successfully purchased ${amount} ${token.symbol}!`,
    });
    setAmount("");
    setTimeout(() => setPurchaseStatus(null), 3000);
  };

  if (!token) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>
        {token.name} Presale
      </h1>
      <div className='card'>
        <div className='space-y-4'>
          <p className='text-gray-600'>
            <span className='font-semibold'>Symbol:</span> {token.symbol}
          </p>
          <p className='text-gray-600'>
            <span className='font-semibold'>Price:</span> {token.price} ETH
          </p>
          <p className='text-gray-600'>
            <span className='font-semibold'>Total Supply:</span>{" "}
            {token.totalSupply.toLocaleString()} tokens
          </p>
          <p className='text-gray-600'>
            <span className='font-semibold'>Soft Cap:</span> {token.softCap} ETH
          </p>
          <p className='text-gray-600'>
            <span className='font-semibold'>Hard Cap:</span> {token.hardCap} ETH
          </p>
          <CountdownTimer endTime={token.endTime} />
        </div>
        {!account ? (
          <div className='mt-6'>
            <button onClick={connectWallet} className='btn-primary w-full'>
              Connect Wallet to Buy
            </button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className='mt-6'>
            <label
              htmlFor='amount'
              className='block text-gray-700 font-semibold mb-2'>
              Amount to Purchase
            </label>
            <div className='flex space-x-4'>
              <input
                type='number'
                id='amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Enter number of tokens'
                className='flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                min='0'
                step='1'
              />
              <button type='submit' className='btn-primary'>
                Buy Now
              </button>
            </div>
            {purchaseStatus && (
              <p
                className={`mt-4 text-sm ${
                  purchaseStatus.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                {purchaseStatus.message}
              </p>
            )}
          </form>
        )}
      </div>
    </motion.div>
  );
}

export default TokenPage;
