import React, { useState } from 'react';
import './ExportReports.css';

const ExportReports = ({ prediction, insight, recommendation, businessType, chartData }) => {
  const [exporting, setExporting] = useState(false);

  const exportAsJSON = () => {
    setExporting(true);
    
    const reportData = {
      generatedAt: new Date().toISOString(),
      businessType: businessType,
      prediction: {
        value: prediction?.value,
        growth: prediction?.growth,
        currency: 'INR'
      },
      insights: {
        aiInsight: insight,
        recommendation: recommendation
      },
      metadata: {
        version: '1.0',
        timestamp: new Date().toLocaleString()
      }
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], 
                          { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setExporting(false);
  };

  const exportAsCSV = () => {
    setExporting(true);
    
    const headers = ['Metric', 'Value', 'Timestamp'];
    const rows = [
      ['Predicted Sales', `₹ ${prediction?.value?.toFixed(2)}`, new Date().toLocaleString()],
      ['Growth Percentage', `${prediction?.growth}%`, new Date().toLocaleString()],
      ['AI Insight', insight, new Date().toLocaleString()],
      ['Recommendation', recommendation, new Date().toLocaleString()],
      ['Business Type', businessType, new Date().toLocaleString()]
    ];
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_data_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setExporting(false);
  };

  const exportAsPDF = () => {
    setExporting(true);
    // Note: In production, you'd use a library like jsPDF or html2canvas
    // This is a simplified version that opens print dialog
    window.print();
    setExporting(false);
  };

  const shareReport = async () => {
    const shareData = {
      title: 'Sales Prediction Report',
      text: `Predicted sales: ₹${prediction?.value?.toFixed(2)} with ${prediction?.growth}% growth`,
      url: window.location.href
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.text);
      alert('Report summary copied to clipboard!');
    }
  };

  if (!prediction) return null;

  return (
    <div className="export-container">
      <h3>Export & Share Reports</h3>
      <div className="export-buttons">
        <button className="export-btn json" onClick={exportAsJSON} disabled={exporting}>
          📄 Export as JSON
        </button>
        <button className="export-btn csv" onClick={exportAsCSV} disabled={exporting}>
          📊 Export as CSV
        </button>
        <button className="export-btn pdf" onClick={exportAsPDF} disabled={exporting}>
          📑 Export as PDF
        </button>
        <button className="export-btn share" onClick={shareReport} disabled={exporting}>
          🔗 Share Report
        </button>
      </div>
      
      <div className="report-preview">
        <h4>Report Preview</h4>
        <div className="preview-content">
          <div className="preview-item">
            <strong>Prediction:</strong> ₹ {prediction?.value?.toFixed(2)}
          </div>
          <div className="preview-item">
            <strong>Growth:</strong> {prediction?.growth}%
          </div>
          <div className="preview-item">
            <strong>Insight:</strong> {insight}
          </div>
          <div className="preview-item">
            <strong>Recommendation:</strong> {recommendation}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;