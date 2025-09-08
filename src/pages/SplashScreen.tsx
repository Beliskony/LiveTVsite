import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import type { ReactNode } from "react";

type SplashScreenWrapperProps = {
  children?: ReactNode; // <-- optionnel maintenant
};

export default function SplashScreenWrapper({ children }: SplashScreenWrapperProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // simule le chargement des ressources (images, vidéos, etc.)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // tu peux ajuster le délai selon la taille de tes assets
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <img src="/logotvCouleur.png" className="h-60 w-64 animate-pulse" />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
