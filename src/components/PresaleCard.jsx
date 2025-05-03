import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";

function PresaleCard({ presale }) {
  const navigate = useNavigate();
  const progress = (presale.tokensSold / presale.totalSupply) * 100;
  const statusColor = {
    Live: "bg-green-100 text-green-600",
    Upcoming: "bg-yellow-100 text-yellow-600",
    Ended: "bg-red-100 text-red-600",
  }[presale.status];

  return (
    <motion.div
      className='card cursor-pointer flex flex-col bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow duration-300'
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/presale/${presale.id}`)}
      role='button'
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/presale/${presale.id}`)
      }>
      {/* Header with Logo and Name */}
      <div className='flex justify-between'>
        <div className='flex items-center mb-4'>
          <img
            src={presale.image}
            alt={`${presale.name} logo`}
            className='w-12 h-12 rounded-full mr-3 object-cover'
          />
          <div>
            <h3 className='text-lg font-semibold text-gray-800 truncate'>
              {presale.name}
            </h3>
            <p className='text-sm text-gray-500'>{presale.symbol}</p>
          </div>
        </div>
        {/* Presale Type */}
        <p className='text-sm text-purple-900 font0medium'>
          {presale.presaleType}
        </p>
      </div>

      {/* Soft/Hard Cap */}
      <div className='flex flex-col text-gray-600 mb-5 mt-3'>
        <p className='text-sm'>Soft - Hard Cap</p>
        <span className='text-purple-800 font-medium'>
          {presale.softCap} - {presale.hardCap} ETH
        </span>
      </div>

      {/* Progress */}
      <div className='mb-4'>
        <div className='flex justify-between items-center text-gray-600 text-sm mb-1'>
          <p className=''>Progress</p>
          <span>{progress.toFixed(1)}%</span>
        </div>

        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-purple-900 h-2 rounded-full'
            style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
      </div>

      {/* Liquidity */}
      <div className='flex justify-between items-center text-gray-600 text-sm mb-1'>
        <p>Liquidity</p>
        <span>{presale.liquidityPercent}%</span>
      </div>

      {/* Countdown */}
      <div className='flex justify-between items-center text-gray-600 text-sm mb-2'>
        <p>Ends In</p>
        <CountdownTimer endTime={presale.endTime} />
      </div>

      {/* Status Label */}

      <span
        className={`inline-block ${statusColor} text-xs font-semibold px-3 py-1 rounded-full self-start`}>
        {presale.status}
      </span>
    </motion.div>
  );
}

export default PresaleCard;
