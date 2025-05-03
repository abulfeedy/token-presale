import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PresaleCard from "../components/PresaleCard";
import MemecoinTable from "../components/MemecoinTable";
import { WalletContext } from "../contexts/WalletContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ResponsiveSearchBar from "../components/Search";

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
      "MoonCoin aims to revolutionize space finance by enabling tokenized investments in lunar projects. Join us to fund the next frontier.",
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
      "StarToken empowers interstellar DeFi with secure, scalable solutions for cosmic investors.",
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
      "RocketCoin fuels the future of DeFi with high-speed transactions and community-driven governance.",
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

// Mock trending memecoins
const mockMemecoins = [
  {
    name: "DogeKing",
    symbol: "DKG",
    image: "https://placehold.co/100x100/ff69b4/ffffff/png?text=DKG",
    marketCap: 5000000,
    multiplier: "2.5x",
  },
  {
    name: "ShibaMoon",
    symbol: "SHM",
    image: "https://placehold.co/100x100/8b5cf6/ffffff/png?text=SHM",
    marketCap: 3000000,
    multiplier: "3x",
  },
  {
    name: "PepeCoin",
    symbol: "PPC",
    image: "https://placehold.co/100x100/10b981/ffffff/png?text=PPC",
    marketCap: 4000000,
    multiplier: "1.8x",
  },
  {
    name: "MemeLord",
    symbol: "MLD",
    image: "https://placehold.co/100x100/f59e0b/ffffff/png?text=MLD",
    marketCap: 6000000,
    multiplier: "4x",
  },
  {
    name: "CryptoCat",
    symbol: "CAT",
    image: "https://placehold.co/100x100/ef4444/ffffff/png?text=CAT",
    marketCap: 2000000,
    multiplier: "2x",
  },
  {
    name: "WoofToken",
    symbol: "WOF",
    image: "https://placehold.co/100x100/3b82f6/ffffff/png?text=WOF",
    marketCap: 7000000,
    multiplier: "5x",
  },
  {
    name: "HodlMeme",
    symbol: "HDM",
    image: "https://placehold.co/100x100/22c55e/ffffff/png?text=HDM",
    marketCap: 3500000,
    multiplier: "2.7x",
  },
  {
    name: "LadCoin",
    symbol: "LAD",
    image: "https://placehold.co/100x100/6b7280/ffffff/png?text=LAD",
    marketCap: 4500000,
    multiplier: "3.5x",
  },
  {
    name: "RugPull",
    symbol: "RGP",
    image: "https://placehold.co/100x100/d1d5db/ffffff/png?text=RGP",
    marketCap: 2500000,
    multiplier: "1.5x",
  },
  {
    name: "MemeStar",
    symbol: "MST",
    image: "https://placehold.co/100x100/facc15/ffffff/png?text=MST",
    marketCap: 8000000,
    multiplier: "4.2x",
  },
];

function Home() {
  const { connectWallet, account } = useContext(WalletContext);
  const navigate = useNavigate();
  const [presales, setPresales] = useState([]);
  const [memecoins, setMemecoins] = useState([]);

  useEffect(() => {
    setPresales(mockPresales);
    setMemecoins(mockMemecoins);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='space-y-16 mt-10'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-[#948E99] to-[#2E1437] text-white rounded-2xl py-16 px-8 text-center'>
        <motion.h1
          className='text-2xl sm:text-3xl font-bold mb-4'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}>
          Launch Your Dreams with Quba Launch
        </motion.h1>
        <motion.p
          className='sm:text-lg mb-8 max-w-2xl mx-auto'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}>
          Discover top presales, create tokens, and explore trending memecoins
          in one decentralized platform.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}>
          <ResponsiveSearchBar />
        </motion.div>

        <motion.div
          className='flex flex-col sm:flex-row justify-center gap-4'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}>
          <button
            className='btn-primary px-8 py-3 text-lg'
            onClick={() => navigate("/")}>
            Explore Presales
          </button>

          <button
            className='btn-secondary px-8 py-3 text-lg'
            onClick={connectWallet}
            disabled={account}>
            {account ? "Wallet Connected" : "Connect Wallet"}
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className='py-12'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
          Why Choose Quba Launch?
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              title: "Launch Tokens",
              description:
                "Create your own ERC20 tokens with ease and launch them to the world.",
              icon: "🚀",
            },
            {
              title: "Join Presales",
              description:
                "Invest in promising projects before they hit the market.",
              icon: "💰",
            },
            {
              title: "Track Memecoins",
              description:
                "Stay updated with the hottest trending memecoins and their growth.",
              icon: "📈",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className='card text-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}>
              <div className='text-4xl mb-4'>{feature.icon}</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                {feature.title}
              </h3>
              <p className='text-gray-600'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Presale Section */}
      <section className='py-12'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
          Active Presales
        </h2>
        <p className='text-gray-600 mb-8 text-center max-w-2xl mx-auto'>
          Discover and invest in upcoming tokens before they launch.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {presales.map((presale) => (
            <PresaleCard key={presale.id} presale={presale} />
          ))}
        </div>
      </section>

      {/* Trending Memecoins Section */}
      <section className='py-12'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
          Trending Memecoins
        </h2>
        <p className='text-gray-600 mb-8 text-center max-w-2xl mx-auto'>
          Explore the hottest memecoins and their market performance.
        </p>
        <MemecoinTable memecoins={memecoins} />
      </section>

      {/* CTA Section */}
      <section className='bg-gradient-to-r from-[#948E99] to-[#2E1437] text-white rounded-2xl py-16 px-8 text-center'>
        <motion.h2
          className='text-2xl sm:text-3xl font-bold mb-4'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}>
          Ready to Launch Your Token?
        </motion.h2>
        <motion.p
          className='sm:text-lg mb-8 max-w-xl mx-auto'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}>
          Start your DeFi journey with PinkLaunch. Create your token or invest
          in the next big project today.
        </motion.p>
        <motion.button
          className='btn-primary px-8 py-3 text-lg'
          onClick={() => navigate("/create-token")}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}>
          Create Token Now
        </motion.button>
      </section>
    </motion.div>
  );
}

export default Home;
