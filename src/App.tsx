import { Suspense,lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { AuthProvider } from './components/auth-context';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useEffect, useState } from 'react';
import SplashScreenWrapper from './pages/SplashScreen';



// ⚡ Pages en lazy load
const Programmes = lazy(() => import("./pages/Programmes"));
const Acceuil = lazy(() => import("./pages/Acceuil"));
const TVLive = lazy(() => import("./pages/Live"));
const Admin = lazy(() => import("./pages/Admin"));
const PresentationEglise = lazy(() => import("./pages/PresentationEglise"));
const ArticlesListePage = lazy(() => import("./pages/ArticlesListePage"));
const SingleArticlePage = lazy(() => import("./pages/SingleArticle"));
const ContactTV = lazy(() => import("./pages/ContactTV"));
const SingleProgrammePage = lazy(() => import("./pages/SingleProgrammePage"));
const NotFound = lazy(() => import("./pages/404"));



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
  <Header />
    <AnimatePresence mode='wait'>
    <Suspense fallback={<SplashScreenWrapper/>}>
      <Routes location={location} key={location.pathname}>
        <Route
          path='*'
          element={
            <motion.div 
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className='min-h-screen'
            >
            <NotFound/>
            </motion.div>
          }
        />
        <Route
          path="/"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className='min-h-screen'
            >
              <TVLive />
            </motion.div>
          }
        />
        <Route
          path="/Tvchaine"
          element={
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className='min-h-screen'
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
              className='min-h-screen'
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
              className='min-h-screen'
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
              className='min-h-screen'
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
              className='min-h-screen'
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
              className='min-h-screen'
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
              className='min-h-screen'
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
              className='min-h-screen'
            >
              <ProtectedRoute element={<Admin />} requiredRole='admin' />
            </motion.div>
          }
        />
      </Routes>
    </Suspense>
    </AnimatePresence>

    <Footer/>

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
