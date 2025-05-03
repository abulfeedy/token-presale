// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className='bg-[#948E99] text-white py-6'
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <p>© {new Date().getFullYear()} Quba Launch. All rights reserved.</p>
        <div className='mt-2 flex justify-center space-x-4'>
          <a href='#' className='text-pink-200 hover:text-white'>
            Docs
          </a>
          <a href='#' className='text-pink-200 hover:text-white'>
            Support
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
