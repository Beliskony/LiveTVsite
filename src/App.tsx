import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Programmes } from './pages/Programmes';
import { Acceuil } from './pages/Acceuil';
import './App.css';
import { TVLive } from './pages/Live';
import Admin from './pages/Admin';
import { AuthProvider } from './components/auth-context';
import PresentationEglise from './pages/PresentationEglise';
import ArticlesListePage from './pages/ArticlesListePage';
import SingleArticlePage from './pages/SingleArticle';
import { ContactTV } from './pages/ContactTV';
import SingleProgrammePage from './pages/SingleProgrammePage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useEffect, useState } from 'react';
import { SplashScreenWrapper } from './pages/SplashScreen';


function AnimatedRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => {
      // petit délai pour fluidité
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === "complete") {
      // la page est déjà complètement chargée
      handleLoad();
    } else {
      // sinon on attend l'événement "load"
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Animation variants
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
  <>
  <SplashScreenWrapper>
  <Header />
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <TVLive />
            </motion.div>
          }
        />
        <Route
          path="/home"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Acceuil />
            </motion.div>
          }
        />
        <Route
          path="/programmes"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Programmes />
            </motion.div>
          }
        />
        <Route
          path="/programmes/:id"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <SingleProgrammePage />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ContactTV />
            </motion.div>
          }
        />
        <Route
          path="/egliseYeshoua/articles"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ArticlesListePage />
            </motion.div>
          }
        />
        <Route
          path="/egliseYeshoua/articles/:id"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <SingleArticlePage />
            </motion.div>
          }
        />
        <Route
          path="/egliseYeshoua/presentation"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <PresentationEglise />
            </motion.div>
          }
        />
        <Route
          path="/admin"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ProtectedRoute element={<Admin />} />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>

    <Footer/>
  </SplashScreenWrapper>
  </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}
