import React, { useState, useEffect } from 'react';
import './HistoricalComparison.css';

const HistoricalComparison = ({ salesData, months }) => {
  const [comparison, setComparison] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  useEffect(() => {
    if (salesData && salesData.length > 0) {
      calculateComparison();
    }
  }, [salesData, selectedPeriod]);

  const calculateComparison = () => {
    let periodMonths = 6;
    if (selectedPeriod === '3months') periodMonths = 3;
    if (selectedPeriod === '12months') periodMonths = 12;
    
    const currentPeriod = salesData.slice(-periodMonths);
    const previousPeriod = salesData.slice(-periodMonths * 2, -periodMonths);
    
    const currentAvg = currentPeriod.reduce((a, b) => a + b, 0) / currentPeriod.length;
    const previousAvg = previousPeriod.reduce((a, b) => a + b, 0) / previousPeriod.length;
    
    const growth = ((currentAvg - previousAvg) / previousAvg) * 100;
    const bestMonth = Math.max(...currentPeriod);
    const worstMonth = Math.min(...currentPeriod);
    
    setComparison({
      currentAvg: currentAvg.toFixed(2),
      previousAvg: previousAvg.toFixed(2),
      growth: growth.toFixed(1),
      bestMonth,
      worstMonth,
      trend: growth >= 0 ? 'up' : 'down'
    });
  };

  if (!comparison) return null;

  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h3>Historical Performance Analysis</h3>
        <select 
          className="period-select" 
          value={selectedPeriod} 
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="3months">Last 3 Months vs Previous</option>
          <option value="6months">Last 6 Months vs Previous</option>
          <option value="12months">Last 12 Months vs Previous</option>
        </select>
      </div>
      
      <div className="comparison-grid">
        <div className="comparison-card">
          <div className="comparison-icon">📊</div>
          <div className="comparison-content">
            <h4>Average Sales</h4>
            <div className="comparison-values">
              <div>
                <span className="label">Current Period:</span>
                <span className="value">₹ {parseFloat(comparison.currentAvg).toLocaleString()}</span>
              </div>
              <div>
                <span className="label">Previous Period:</span>
                <span className="value">₹ {parseFloat(comparison.previousAvg).toLocaleString()}</span>
              </div>
            </div>
            <div className={`growth-indicator ${comparison.trend}`}>
              {comparison.trend === 'up' ? '📈' : '📉'} {Math.abs(comparison.growth)}% {comparison.trend === 'up' ? 'increase' : 'decrease'}
            </div>
          </div>
        </div>
        
        <div className="comparison-card">
          <div className="comparison-icon">⭐</div>
          <div className="comparison-content">
            <h4>Best & Worst Performance</h4>
            <div className="comparison-values">
              <div>
                <span className="label">Best Month:</span>
                <span className="value positive">₹ {comparison.bestMonth.toLocaleString()}</span>
              </div>
              <div>
                <span className="label">Worst Month:</span>
                <span className="value negative">₹ {comparison.worstMonth.toLocaleString()}</span>
              </div>
            </div>
            <div className="insight">
              💡 Variance: ₹ {(comparison.bestMonth - comparison.worstMonth).toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="comparison-card">
          <div className="comparison-icon">🎯</div>
          <div className="comparison-content">
            <h4>Growth Opportunity</h4>
            <div className="comparison-values">
              <div>
                <span className="label">Target Achievement:</span>
                <span className="value">
                  {comparison.growth > 0 ? 'On Track 🎯' : 'Needs Improvement ⚠️'}
                </span>
              </div>
            </div>
            <div className="insight">
              {comparison.growth > 0 
                ? `Maintain ${comparison.growth}% growth momentum` 
                : `Focus on ${Math.abs(comparison.growth)}% improvement needed`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalComparison;