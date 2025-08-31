import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function SplashScreenWrapper({ children }: { children: React.ReactNode }) {
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
          <img src="/logotvRM.png" className="h-40 w-64 animate-pulse" />
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
