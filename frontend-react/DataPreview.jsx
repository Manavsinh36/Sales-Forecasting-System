import React, { useState, useEffect } from 'react';
import './DataPreview.css';

const DataPreview = ({ file }) => {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file) {
      previewFile(file);
    }
  }, [file]);

  const previewFile = (file) => {
    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const dataRows = lines.slice(1, 11).filter(line => line.trim()); // First 10 rows
      
      const parsedData = dataRows.map(row => {
        const values = row.split(',');
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index]?.trim() || '';
        });
        return obj;
      });
      
      setPreviewData({
        headers,
        data: parsedData,
        totalRows: lines.length - 1,
        columns: headers.length
      });
      
      setLoading(false);
    };
    
    reader.readAsText(file);
  };

  const getDataType = (column, data) => {
    const sampleValues = data.slice(0, 5).map(row => row[column]).filter(v => v);
    if (sampleValues.length === 0) return 'unknown';
    
    const isNumeric = sampleValues.every(v => !isNaN(parseFloat(v)) && isFinite(v));
    if (isNumeric) return 'numeric';
    
    const isDate = sampleValues.every(v => !isNaN(Date.parse(v)));
    if (isDate) return 'date';
    
    return 'text';
  };

  const getColumnStats = (column, data) => {
    const type = getDataType(column, data);
    if (type === 'numeric') {
      const values = data.map(row => parseFloat(row[column])).filter(v => !isNaN(v));
      if (values.length === 0) return null;
      
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = sum / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      
      return {
        type: 'numeric',
        avg: avg.toFixed(2),
        min: min.toFixed(2),
        max: max.toFixed(2),
        count: values.length
      };
    } else if (type === 'text') {
      const unique = [...new Set(data.map(row => row[column]).filter(v => v))];
      return {
        type: 'text',
        unique: unique.length,
        sample: unique.slice(0, 3)
      };
    }
    
    return { type };
  };

  if (!previewData) return null;

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h3>Real-time Data Preview</h3>
        <div className="preview-stats">
          <span className="stat-badge">
            📊 {previewData.totalRows} rows
          </span>
          <span className="stat-badge">
            📋 {previewData.columns} columns
          </span>
          <span className="stat-badge">
            📁 {file.name}
          </span>
        </div>
      </div>
      
      {loading ? (
        <div className="preview-loading">
          <div className="spinner"></div>
          <p>Loading preview...</p>
        </div>
      ) : (
        <>
          <div className="preview-table-wrapper">
            <table className="preview-table">
              <thead>
                <tr>
                  {previewData.headers.map((header, idx) => (
                    <th key={idx}>
                      {header}
                      <span className={`data-type ${getDataType(header, previewData.data)}`}>
                        {getDataType(header, previewData.data)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.data.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {previewData.headers.map((header, colIdx) => (
                      <td key={colIdx}>
                        {row[header] || <span className="empty-value">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {previewData.data.length < previewData.totalRows && (
            <div className="preview-note">
              Showing first {previewData.data.length} of {previewData.totalRows} rows
            </div>
          )}
          
          <div className="column-stats">
            <h4>Column Analysis</h4>
            <div className="stats-grid">
              {previewData.headers.map((header, idx) => {
                const stats = getColumnStats(header, previewData.data);
                if (!stats) return null;
                
                return (
                  <div key={idx} className="stat-card">
                    <div className="stat-header">
                      <strong>{header}</strong>
                      <span className={`stat-type ${stats.type}`}>{stats.type}</span>
                    </div>
                    {stats.type === 'numeric' && (
                      <div className="stat-details">
                        <div>Avg: {stats.avg}</div>
                        <div>Min: {stats.min}</div>
                        <div>Max: {stats.max}</div>
                      </div>
                    )}
                    {stats.type === 'text' && (
                      <div className="stat-details">
                        <div>Unique values: {stats.unique}</div>
                        <div>Sample: {stats.sample.join(', ')}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataPreview;