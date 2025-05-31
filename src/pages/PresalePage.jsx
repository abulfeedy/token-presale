import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CountdownTimer from "../components/CountdownTimer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ConnectWalletButton from "../components/ConnectWalletButton";

// Mock presale data
const mockPresales = [
  {
    id: "1",
    name: "MoonCoin",
    symbol: "MOON",
    price: 0.001,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 7,
    image: "https://placehold.co/100x100/ff69b4/ffffff/png?text=MOON",
    banner:
      "https://placehold.co/1200x400/ff69b4/ffffff/png?text=MoonCoin+Banner",
    description:
      "MoonCoin aims to revolutionize space finance by enabling tokenized investments in lunar projects. Our mission is to democratize access to space-based financial opportunities, with a secure and scalable ERC20 token. Join us to fund the next frontier of human exploration.",
    presaleType: "Public",
    softCap: 50,
    hardCap: 200,
    tokensSold: 250000,
    totalSupply: 1000000,
    liquidityPercent: 51,
    lockupTime: "12 months",
    status: "Live",
    socials: {
      website: "https://mooncoin.example.com",
      twitter: "https://twitter.com/mooncoin",
      telegram: "https://t.me/mooncoin",
    },
  },
  {
    id: "2",
    name: "StarToken",
    symbol: "STAR",
    price: 0.002,
    endTime: Math.floor(Date.now() / 1000) + 86400 * 14,
    image: "https://placehold.co/100x100/8b5cf6/ffffff/png?text=STAR",
    banner:
      "https://placehold.co/1200x400/8b5cf6/ffffff/png?text=StarToken+Banner",
    description:
      "StarToken empowers interstellar DeFi with secure, scalable solutions for cosmic investors. Built on Ethereum, StarToken offers low fees, high-speed transactions, and a community-driven governance model to ensure long-term success.",
    presaleType: "Private",
    softCap: 30,
    hardCap: 150,
    tokensSold: 100000,
    totalSupply: 500000,
    liquidityPercent: 60,
    lockupTime: "6 months",
    status: "Upcoming",
    socials: {
      website: "https://startoken.example.com",
      twitter: "https://twitter.com/startoken",
      telegram: "https://t.me/startoken",
    },
  },
  {
    id: "3",
    name: "RocketCoin",
    symbol: "ROCK",
    price: 0.0015,
    endTime: Math.floor(Date.now() / 1000) - 86400,
    image: "https://placehold.co/100x100/10b981/ffffff/png?text=ROCK",
    banner:
      "https://placehold.co/1200x400/10b981/ffffff/png?text=RocketCoin+Banner",
    description:
      "RocketCoin fuels the future of DeFi with high-speed transactions and community-driven governance. Our vision is to create a decentralized ecosystem where users can trade, stake, and govern with ease.",
    presaleType: "Fair Launch",
    softCap: 40,
    hardCap: 180,
    tokensSold: 150000,
    totalSupply: 750000,
    liquidityPercent: 55,
    lockupTime: "9 months",
    status: "Ended",
    socials: {
      website: "https://rocketcoin.example.com",
      twitter: "https://twitter.com/rocketcoin",
      telegram: "https://t.me/rocketcoin",
    },
  },
];

function PresalePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presale, setPresale] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const foundPresale = mockPresales.find((p) => p.id === id);
    if (foundPresale) {
      setPresale(foundPresale);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handlePurchase = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (amount > presale.totalSupply - presale.tokensSold) {
      toast.error("Amount exceeds available tokens.");
      return;
    }

    toast.info("Processing purchase...");
    setTimeout(() => {
      toast.success(`Successfully purchased ${amount} ${presale.symbol}!`);
      setPresale((prev) => ({
        ...prev,
        tokensSold: prev.tokensSold + Number(amount),
      }));
      setAmount("");
    }, 2000);
  };

  if (!presale) return null;

  const progress = (presale.tokensSold / presale.totalSupply) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='py-8 mt-5'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Banner */}
          <img
            src={presale.banner}
            alt={`${presale.name} banner`}
            className='w-full h-64 object-cover rounded-2xl'
          />

          {/* Token Header */}
          <div className='flex items-center gap-4'>
            <img
              src={presale.image}
              alt={`${presale.name} logo`}
              className='w-16 h-16 rounded-full object-cover'
            />
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>
                {presale.name}
              </h1>
              <p className='text-gray-600'>{presale.symbol}</p>
            </div>
          </div>

          {/* Socials */}
          <div className='flex gap-4'>
            {presale.socials.website && (
              <a
                href={presale.socials.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 hover:text-pink-600'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' />
                </svg>
              </a>
            )}
            {presale.socials.twitter && (
              <a
                href={presale.socials.twitter}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 hover:text-pink-600'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'>
                  <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
                </svg>
              </a>
            )}
            {presale.socials.telegram && (
              <a
                href={presale.socials.telegram}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 hover:text-pink-600'>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.88 8.86c-.14.66-.54.82-.92.45l-2.86-2.1-.96 3.03c-.11.34-.62.34-.76 0l-.54-3.6-5.2-4.76c-.4-.36-.08-.9.46-.6l6.56 2.54 2.86-8.96c.18-.54.9-.24.74.34z' />
                </svg>
              </a>
            )}
          </div>

          {/* Narrative */}
          <div className='card'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              About {presale.name}
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              {presale.description}
            </p>
          </div>

          {/* Token Info */}
          <div className='card'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Token Details
            </h2>
            <div className='gap-4 text-sm divide-y divide-gray-100'>
              <div className='flex justify-between items-center py-2'>
                <p className='text-gray-600'>Symbol</p> <p>{presale.symbol}</p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <p className='text-gray-600'>Price</p>
                <p>{presale.price} ETH</p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <p className='text-gray-600'>Total Supply</p>
                <p>{presale.totalSupply.toLocaleString()}</p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <p className='text-gray-600'>Tokens Sold</p>
                <p>{presale.tokensSold.toLocaleString()}</p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <p className='text-gray-600'>Soft Cap</p>
                <p>{presale.softCap}</p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <p className='text-gray-600'>Hard Cap</p>
                <p>{presale.hardCap}</p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <p className='text-gray-600'>Liquidity</p>
                <p>{presale.liquidityPercent}%</p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <p className='text-gray-600'>Lockup Time</p>
                <p>{presale.lockupTime}</p>
              </div>
              <div className='flex justify-between items-center py-4'>
                <p className='text-gray-600'>Type</p>
                <p>{presale.presaleType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='lg:col-span-1'>
          <div className='card sticky top-4 space-y-6'>
            {/* Status and Countdown */}
            <div className='text-center'>
              <span
                className={`inline-block ${
                  {
                    Live: "bg-green-100 text-green-600",
                    Upcoming: "bg-yellow-100 text-yellow-600",
                    Ended: "bg-red-100 text-red-600",
                  }[presale.status]
                } text-white text-sm font-semibold px-3 py-1 rounded-full mb-4`}>
                {presale.status}
              </span>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                Presale Ends In
              </h3>
              <div className='text-2xl font-bold text-purple-800'>
                <CountdownTimer endTime={presale.endTime} />
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className='flex justify-between items-center text-gray-600 text-sm mb-1'>
                <p>Progress</p>
                <span>{progress.toFixed(1)}%</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-3'>
                <div
                  className='bg-purple-900 h-3 rounded-full'
                  style={{ width: `${Math.min(progress, 100)}%` }}></div>
              </div>
              <p className='text-sm text-gray-600 mt-2'>
                {presale.tokensSold.toLocaleString()} /{" "}
                {presale.totalSupply.toLocaleString()} tokens
              </p>
            </div>

            {/* Buy Input */}
            {presale.status === "Live" && (
              <form onSubmit={handlePurchase} className='space-y-4'>
                <div>
                  <label
                    htmlFor='amount'
                    className='block text-gray-700 font-semibold mb-2'>
                    Amount to Purchase
                  </label>
                  <input
                    type='text'
                    id='amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder='Enter number of tokens'
                    className='input'
                    min='0'
                    step='1'
                  />
                </div>
              </form>
            )}

            {/* Connect Wallet */}
            <button className='btn-primary w-full py-3'>
              <ConnectWalletButton />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PresalePage;
