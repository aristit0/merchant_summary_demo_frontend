import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ErrorState({ error, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-8 text-center max-w-md mx-auto"
    >
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-slate-600 mb-6">
        {error?.message || 'Unable to fetch merchant data. Please try again.'}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="btn-primary inline-flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </motion.button>
    </motion.div>
  );
}
