// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function MemecoinTable({ memecoins }) {
  return (
    <motion.div
      className='overflow-x-auto bg-white rounded-2xl shadow-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <table className='w-full text-left text-sm text-gray-800'>
        <thead>
          <tr>
            <th className='py-4 px-6 font-semibold rounded-tl-2xl'>Name</th>
            <th className='py-4 px-6 font-semibold'>Symbol</th>
            <th className='py-4 px-6 font-semibold'>Market Cap</th>
            <th className='py-4 px-6 font-semibold rounded-tr-2xl'>
              Multiplier
            </th>
          </tr>
        </thead>
        <tbody>
          {memecoins.map((coin, index) => (
            <motion.tr
              key={coin.symbol}
              className='border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}>
              <td className='py-4 px-6'>
                <div className='flex items-center gap-3'>
                  <img
                    src={coin.image}
                    alt={`${coin.name} logo`}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                  <span className='font-medium truncate'>{coin.name}</span>
                </div>
              </td>
              <td className='py-4 px-6'>{coin.symbol}</td>
              <td className='py-4 px-6'>
                ${(coin.marketCap / 1000000).toFixed(1)}M
              </td>
              <td className='py-4 px-6'>
                <span className='inline-block bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full'>
                  {coin.multiplier}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default MemecoinTable;
