'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'

const TransitionPage = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div initial={{ opacity: 0, y: '100vh' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default TransitionPage
