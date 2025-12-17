import React, { useState } from 'react';
import { X, Plus, Building2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatMerchantId, getMerchantGradient } from '../lib/utils';

const AVAILABLE_MERCHANTS = [
  '000000000001',
  '000000000002',
  '000000000003',
  '000000000004',
  '000000000005',
  '000000000006',
  '000000000007',
  '000000000008',
  '000000000009',
  '000000000010',
];

export default function MerchantSelector({ selectedMerchants, onMerchantsChange }) {
  const [showSelector, setShowSelector] = useState(false);

  const toggleMerchant = (mid) => {
    if (selectedMerchants.includes(mid)) {
      onMerchantsChange(selectedMerchants.filter(m => m !== mid));
    } else {
      onMerchantsChange([...selectedMerchants, mid]);
    }
  };

  const selectAll = () => {
    onMerchantsChange(AVAILABLE_MERCHANTS);
    setShowSelector(false);
  };

  const clearAll = () => {
    onMerchantsChange([]);
  };

  return (
    <div className="space-y-4">
      {/* Selected Merchants Display */}
      <div className="flex flex-wrap gap-2 items-center">
        <AnimatePresence mode="popLayout">
          {selectedMerchants.map((mid) => (
            <motion.div
              key={mid}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="merchant-chip"
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getMerchantGradient(mid)}`} />
              <span className="font-mono text-xs">{formatMerchantId(mid)}</span>
              <button
                onClick={() => toggleMerchant(mid)}
                className="p-0.5 hover:bg-red-100 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-slate-500 hover:text-red-600" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSelector(!showSelector)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-gradient-to-r from-blue-500 to-indigo-600 text-white
            shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Merchant</span>
        </motion.button>

        {selectedMerchants.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-slate-500 hover:text-red-600 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Merchant Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel p-6 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Select Merchants
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Select All
                </button>
                <button
                  onClick={() => setShowSelector(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Merchant Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {AVAILABLE_MERCHANTS.map((mid) => {
                const isSelected = selectedMerchants.includes(mid);
                return (
                  <motion.button
                    key={mid}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleMerchant(mid)}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all
                      ${isSelected 
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg' 
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                      }
                    `}
                  >
                    {/* Gradient indicator */}
                    <div className={`
                      absolute top-2 right-2 w-3 h-3 rounded-full 
                      bg-gradient-to-r ${getMerchantGradient(mid)}
                    `} />

                    {/* Checkmark */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 left-2 w-5 h-5 bg-blue-600 rounded-full
                          flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}

                    {/* Merchant ID */}
                    <div className="font-mono text-xs text-slate-700 text-center mt-2">
                      {formatMerchantId(mid)}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
