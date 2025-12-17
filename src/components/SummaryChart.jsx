import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

export default function SummaryChart({ data }) {
  const chartData = [
    {
      name: 'Today',
      amount: parseInt(data.today_total_amount) || 0,
      color: '#3B82F6',
    },
    {
      name: 'Weekly',
      amount: parseInt(data.weekly_total_amount) || 0,
      color: '#6366F1',
    },
    {
      name: 'Monthly',
      amount: parseInt(data.monthly_total_amount) || 0,
      color: '#8B5CF6',
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-xl p-4 shadow-xl">
          <p className="text-sm font-medium text-slate-700 mb-1">{payload[0].payload.name}</p>
          <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
        Transaction Overview
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748B"
            style={{ fontSize: '14px', fontWeight: '500' }}
          />
          <YAxis
            stroke="#64748B"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
              return value;
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
          <Bar 
            dataKey="amount" 
            radius={[12, 12, 0, 0]}
            animationDuration={1000}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
