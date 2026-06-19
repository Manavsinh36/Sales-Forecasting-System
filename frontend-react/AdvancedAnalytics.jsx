import React from 'react';
import './AdvancedAnalytics.css';
import KPIDashboard from './KPIDashboard';
import DataQualityValidator from './DataQualityValidator';
import HistoricalComparison from './HistoricalComparison';
import ExportReports from './ExportReports';
import ScenarioPlanning from './ScenarioPlanning';
import DataPreview from './DataPreview';

const AdvancedAnalytics = ({ 
  file, 
  result, 
  salesData, 
  months, 
  insight, 
  recommendation, 
  businessType,
  chartData 
}) => {
  const calculateYTDSales = () => {
    if (!salesData || salesData.length === 0) return 0;
    return salesData.reduce((a, b) => a + b, 0);
  };

  const calculateROI = () => {
    if (!result || !salesData || salesData.length === 0) return 0;
    const avgSales = salesData.reduce((a, b) => a + b, 0) / salesData.length;
    return (result.value - avgSales) * 0.2;
  };

  return (
    <div className="advanced-analytics">
      <div className="analytics-header">
        <h2>🔬 Advanced Analytics Dashboard</h2>
        <p>Deep dive into your sales data with professional analytics tools</p>
      </div>

      <div className="analytics-content">
        {/* Data Preview Section */}
        {file && (
          <div className="analytics-section">
            <h3>📄 Data Preview</h3>
            <DataPreview file={file} />
          </div>
        )}

        {/* Data Quality Validator */}
        {file && (
          <div className="analytics-section">
            <h3>✅ Data Quality Check</h3>
            <DataQualityValidator file={file} onValidationComplete={() => {}} />
          </div>
        )}

        {/* KPI Dashboard */}
        {result && salesData && (
          <div className="analytics-section">
            <h3>📊 Key Performance Indicators</h3>
            <KPIDashboard 
              salesData={salesData}
              prediction={result.value}
              accuracy={94}
              ytdSales={calculateYTDSales()}
              roi={calculateROI()}
            />
          </div>
        )}

        {/* Historical Comparison */}
        {result && salesData && (
          <div className="analytics-section">
            <h3>📈 Historical Performance Analysis</h3>
            <HistoricalComparison salesData={salesData} months={months} />
          </div>
        )}

        {/* Scenario Planning */}
        {result && (
          <div className="analytics-section">
            <h3>🎯 What-If Scenario Planning</h3>
            <ScenarioPlanning 
              basePrediction={result.value}
              onApplyScenario={(scenario) => {
                console.log('Scenario applied:', scenario);
              }}
            />
          </div>
        )}

        {/* Export Reports */}
        {result && (
          <div className="analytics-section">
            <h3>📑 Export & Share Reports</h3>
            <ExportReports 
              prediction={result}
              insight={insight}
              recommendation={recommendation}
              businessType={businessType}
              chartData={chartData}
            />
          </div>
        )}

        {/* Analytics Tips */}
        <div className="analytics-tips">
          <h3>💡 Pro Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <h4>Data Quality First</h4>
              <p>Always validate your data quality before running predictions for best results</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📊</div>
              <h4>Compare Periods</h4>
              <p>Use historical comparison to understand seasonal patterns and trends</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🎲</div>
              <h4>Test Scenarios</h4>
              <p>Try different business scenarios to prepare for various market conditions</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📤</div>
              <h4>Export Reports</h4>
              <p>Share insights with your team using JSON or CSV exports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;