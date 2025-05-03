import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PresalePage from "./pages/PresalePage";
import TokenCreation from "./pages/TokenCreation";
import Header from "./components/Header";
import Footer from "./components/Footer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CreatePresale from "./pages/PresaleCreation";

function App() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col font-inter'>
      <Header />
      <motion.main
        className='flex-grow container mt-5 sm:mt-0 mx-auto px-4 sm:px-6 lg:px-8 py-12'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/presale/:id' element={<PresalePage />} />
          <Route path='/create-token' element={<TokenCreation />} />
          <Route path='/create-presale' element={<CreatePresale />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

export default App;
