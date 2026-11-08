import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header, Footer } from './components/Layout';
import { ScrollProgress, ScrollReveals } from './components/ScrollEffects';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Drinks from './pages/Drinks';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Journal from './pages/Journal';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { Login, Signup, Account } from './pages/Auth';

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(3px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(2px)' }
};

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return <>
    <ScrollProgress />
    <ScrollReveals />
    <Header onCart={() => setCartOpen(true)} />
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/drinks/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
    <Footer />
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </>;
}
