import React, { useState } from 'react';
import './DataQualityValidator.css';

const DataQualityValidator = ({ file, onValidationComplete }) => {
  const [validationStatus, setValidationStatus] = useState(null);
  const [validationProgress, setValidationProgress] = useState(0);

  const validateCSV = async (file) => {
    setValidationProgress(0);
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n');
        const headers = lines[0].toLowerCase().split(',');
        
        setValidationProgress(30);
        
        // Check required columns
        const requiredColumns = ['month', 'sales', 'ads', 'discount', 'season'];
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        setValidationProgress(60);
        
        // Check data quality
        let dataRows = lines.slice(1).filter(line => line.trim());
        let qualityIssues = [];
        
        // Check for empty values
        dataRows.forEach((row, index) => {
          const values = row.split(',');
          values.forEach((value, i) => {
            if (!value || value.trim() === '') {
              qualityIssues.push(`Row ${index + 2}: Empty value in column ${headers[i]}`);
            }
          });
        });
        
        setValidationProgress(80);
        
        // Check file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 10) {
          qualityIssues.push(`File too large: ${fileSizeMB.toFixed(2)}MB (max 10MB)`);
        }
        
        // Check data types
        const salesColumn = headers.indexOf('sales');
        if (salesColumn !== -1) {
          dataRows.forEach((row, index) => {
            const values = row.split(',');
            const salesValue = parseFloat(values[salesColumn]);
            if (isNaN(salesValue)) {
              qualityIssues.push(`Row ${index + 2}: Invalid sales value: ${values[salesColumn]}`);
            }
          });
        }
        
        setValidationProgress(100);
        
        const validation = {
          isValid: missingColumns.length === 0 && qualityIssues.length === 0,
          missingColumns,
          qualityIssues,
          rowCount: dataRows.length,
          columnCount: headers.length,
          fileSize: fileSizeMB.toFixed(2),
          columns: headers
        };
        
        setValidationStatus(validation);
        onValidationComplete(validation);
        resolve(validation);
      };
      
      reader.readAsText(file);
    });
  };

  const handleValidate = async () => {
    if (!file) return;
    await validateCSV(file);
  };

  return (
    <div className="validator-container">
      {!validationStatus && file && (
        <button className="validate-btn" onClick={handleValidate}>
          🔍 Validate Data Quality
        </button>
      )}
      
      {validationProgress > 0 && validationProgress < 100 && (
        <div className="validation-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${validationProgress}%` }}></div>
          </div>
          <p>Validating data... {validationProgress}%</p>
        </div>
      )}
      
      {validationStatus && (
        <div className={`validation-result ${validationStatus.isValid ? 'success' : 'error'}`}>
          <div className="validation-header">
            <span className="validation-icon">
              {validationStatus.isValid ? '✅' : '⚠️'}
            </span>
            <h4>Data Quality Report</h4>
          </div>
          
          <div className="validation-stats">
            <div className="stat">
              <span className="stat-label">Rows:</span>
              <span className="stat-value">{validationStatus.rowCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Columns:</span>
              <span className="stat-value">{validationStatus.columnCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">File Size:</span>
              <span className="stat-value">{validationStatus.fileSize} MB</span>
            </div>
          </div>
          
          {validationStatus.missingColumns.length > 0 && (
            <div className="warning-section">
              <strong>Missing Required Columns:</strong>
              <ul>
                {validationStatus.missingColumns.map(col => (
                  <li key={col}>• {col}</li>
                ))}
              </ul>
            </div>
          )}
          
          {validationStatus.qualityIssues.length > 0 && (
            <div className="warning-section">
              <strong>Quality Issues Found:</strong>
              <ul>
                {validationStatus.qualityIssues.slice(0, 5).map((issue, idx) => (
                  <li key={idx}>• {issue}</li>
                ))}
              </ul>
              {validationStatus.qualityIssues.length > 5 && (
                <p>...and {validationStatus.qualityIssues.length - 5} more issues</p>
              )}
            </div>
          )}
          
          {validationStatus.isValid && (
            <div className="success-message">
              ✓ All checks passed! Your data is ready for prediction.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataQualityValidator;