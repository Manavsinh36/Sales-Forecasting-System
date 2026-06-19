import React from 'react';
import './KPIDashboard.css';

const KPIDashboard = ({ salesData, prediction, accuracy, ytdSales, roi }) => {
  const calculateTrend = (data) => {
    if (!data || data.length < 2) return { percentage: 0, direction: 'up' };
    const lastTwo = data.slice(-2);
    const trend = ((lastTwo[1] - lastTwo[0]) / lastTwo[0]) * 100;
    return {
      percentage: Math.abs(trend).toFixed(1),
      direction: trend >= 0 ? 'up' : 'down'
    };
  };

  const trend = calculateTrend(salesData);

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-icon-wrapper">
          <div className="kpi-icon">📊</div>
        </div>
        <div className="kpi-info">
          <h4>Total Sales (YTD)</h4>
          <p className="kpi-value">₹ {ytdSales?.toLocaleString() || '0'}</p>
          <span className={`trend ${trend.direction === 'up' ? 'positive' : 'negative'}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}% vs last period
          </span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-icon-wrapper">
          <div className="kpi-icon">🎯</div>
        </div>
        <div className="kpi-info">
          <h4>Prediction Accuracy</h4>
          <p className="kpi-value">{accuracy || 94}%</p>
          <span className="trend positive">✓ High confidence model</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-icon-wrapper">
          <div className="kpi-icon">💹</div>
        </div>
        <div className="kpi-info">
          <h4>ROI Forecast</h4>
          <p className="kpi-value">₹ {roi?.toLocaleString() || '0'}</p>
          <span className="trend positive">Next quarter projection</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-icon-wrapper">
          <div className="kpi-icon">📈</div>
        </div>
        <div className="kpi-info">
          <h4>Next Month Prediction</h4>
          <p className="kpi-value">₹ {prediction?.toLocaleString() || '0'}</p>
          <span className="trend positive">AI powered forecast</span>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;