import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Calendar, 
  TrendingUp, 
  Building2,
  RefreshCw,
  Clock
} from 'lucide-react';
import StatCard from './components/StatCard';
import MerchantSelector from './components/MerchantSelector';
import SummaryChart from './components/SummaryChart';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { merchantAPI } from './services/api';
import { formatDate, getGreeting } from './lib/utils';

function App() {
  const [selectedMerchants, setSelectedMerchants] = useState([
    '000000000001',
    '000000000002',
    '000000000003'
  ]);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchSummary = async () => {
    if (selectedMerchants.length === 0) {
      setError({ message: 'Please select at least one merchant' });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await merchantAPI.getSummary(selectedMerchants);
      
      if (response.error_schema.error_code === 'D000') {
        setSummaryData(response.output_schema);
        setLastUpdated(new Date());
        setError(null);
      } else {
        throw new Error(response.error_schema.error_message.english);
      }
    } catch (err) {
      setError(err);
      console.error('Error fetching summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleRefresh = () => {
    fetchSummary();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-2"
              >
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text">
                    Merchant Dashboard
                  </h1>
                  <p className="text-sm text-slate-600 mt-1">
                    {getGreeting()}, Monitor your merchant performance
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              {lastUpdated && (
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-xl">
                  <Clock className="w-4 h-4" />
                  <span>Updated: {lastUpdated.toLocaleTimeString('id-ID')}</span>
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={loading}
                className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </motion.button>
            </motion.div>
          </div>
        </motion.header>

        {/* Merchant Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
            Selected Merchants
          </h2>
          <MerchantSelector
            selectedMerchants={selectedMerchants}
            onMerchantsChange={setSelectedMerchants}
          />
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRefresh}
            disabled={loading || selectedMerchants.length === 0}
            className="mt-4 w-full md:w-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">Load Summary</span>
          </motion.button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading && <LoadingState key="loading" />}
          
          {error && !loading && (
            <ErrorState key="error" error={error} onRetry={handleRefresh} />
          )}

          {summaryData && !loading && !error && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Today's Transactions"
                  amount={summaryData.today_total_amount}
                  icon={Wallet}
                  gradient="from-blue-500 to-cyan-600"
                  delay={0}
                />
                <StatCard
                  title="This Week"
                  amount={summaryData.weekly_total_amount}
                  icon={Calendar}
                  gradient="from-indigo-500 to-purple-600"
                  delay={0.1}
                />
                <StatCard
                  title="This Month"
                  amount={summaryData.monthly_total_amount}
                  icon={TrendingUp}
                  gradient="from-purple-500 to-pink-600"
                  delay={0.2}
                />
              </div>

              {/* Chart */}
              <SummaryChart data={summaryData} />

              {/* Info Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-panel p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      Summary Information
                    </h3>
                    <p className="text-sm text-slate-600">
                      Data for {selectedMerchants.length} merchant{selectedMerchants.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="px-4 py-2 bg-blue-50 rounded-xl">
                      <span className="text-slate-600">Current Date:</span>
                      <span className="ml-2 font-semibold text-blue-600">
                        {formatDate(summaryData.current_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-slate-500 py-8"
        >
          <p>Merchant Summary Dashboard © 2025 - Powered by Couchbase</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
