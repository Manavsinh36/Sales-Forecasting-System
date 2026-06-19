import React, { useState, useEffect } from 'react';
import './ScenarioPlanning.css';

const ScenarioPlanning = ({ basePrediction, onApplyScenario }) => {
  const [scenarios, setScenarios] = useState([]);
  const [customScenario, setCustomScenario] = useState({
    adsMultiplier: 1.0,
    discountMultiplier: 1.0,
    seasonMultiplier: 1.0
  });
  const [selectedScenario, setSelectedScenario] = useState(null);

  useEffect(() => {
    // Generate default scenarios
    const defaultScenarios = [
      {
        id: 1,
        name: "Conservative",
        description: "Cautious growth approach",
        multipliers: { ads: 0.8, discount: 0.7, season: 0.9 },
        color: "#f59e0b"
      },
      {
        id: 2,
        name: "Moderate",
        description: "Balanced growth strategy",
        multipliers: { ads: 1.0, discount: 1.0, season: 1.0 },
        color: "#10b981"
      },
      {
        id: 3,
        name: "Aggressive",
        description: "High-risk high-reward approach",
        multipliers: { ads: 1.3, discount: 1.2, season: 1.1 },
        color: "#ef4444"
      }
    ];
    setScenarios(defaultScenarios);
  }, []);

  const calculateProjection = (multipliers) => {
    const avgMultiplier = (multipliers.ads + multipliers.discount + multipliers.season) / 3;
    const projectedValue = basePrediction * avgMultiplier;
    const variance = ((projectedValue - basePrediction) / basePrediction) * 100;
    
    return {
      value: projectedValue,
      variance: variance.toFixed(1)
    };
  };

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    const projection = calculateProjection(scenario.multipliers);
    setCustomScenario({
      adsMultiplier: scenario.multipliers.ads,
      discountMultiplier: scenario.multipliers.discount,
      seasonMultiplier: scenario.multipliers.season
    });
    
    if (onApplyScenario) {
      onApplyScenario({
        ...scenario,
        projection: projection.value,
        variance: projection.variance
      });
    }
  };

  const handleCustomScenario = () => {
    const multipliers = {
      ads: customScenario.adsMultiplier,
      discount: customScenario.discountMultiplier,
      season: customScenario.seasonMultiplier
    };
    const projection = calculateProjection(multipliers);
    
    const customScenarioData = {
      id: 'custom',
      name: 'Custom Strategy',
      description: 'Your custom business strategy',
      multipliers,
      projection: projection.value,
      variance: projection.variance
    };
    
    setSelectedScenario(customScenarioData);
    if (onApplyScenario) {
      onApplyScenario(customScenarioData);
    }
  };

  const getRiskLevel = (variance) => {
    const varNum = parseFloat(variance);
    if (varNum > 20) return { level: 'High Risk', color: '#ef4444' };
    if (varNum > 10) return { level: 'Moderate Risk', color: '#f59e0b' };
    if (varNum < -10) return { level: 'Low Risk', color: '#10b981' };
    return { level: 'Stable', color: '#3b82f6' };
  };

  return (
    <div className="scenario-container">
      <h3>Scenario Planning & What-If Analysis</h3>
      
      <div className="scenario-grid">
        {scenarios.map(scenario => {
          const projection = calculateProjection(scenario.multipliers);
          const risk = getRiskLevel(projection.variance);
          
          return (
            <div 
              key={scenario.id}
              className={`scenario-card ${selectedScenario?.id === scenario.id ? 'selected' : ''}`}
              onClick={() => handleScenarioSelect(scenario)}
              style={{ borderTopColor: scenario.color }}
            >
              <div className="scenario-header">
                <h4>{scenario.name}</h4>
                <span className="scenario-badge" style={{ background: scenario.color }}>
                  {scenario.name}
                </span>
              </div>
              <p className="scenario-description">{scenario.description}</p>
              
              <div className="scenario-metrics">
                <div className="metric">
                  <span className="metric-label">Projected Sales:</span>
                  <span className="metric-value">₹ {projection.value.toFixed(2)}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Variance:</span>
                  <span className={`metric-value ${projection.variance >= 0 ? 'positive' : 'negative'}`}>
                    {projection.variance >= 0 ? '+' : ''}{projection.variance}%
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Risk Level:</span>
                  <span className="metric-value" style={{ color: risk.color }}>
                    {risk.level}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="custom-scenario">
        <h4>Create Custom Scenario</h4>
        <div className="custom-controls">
          <div className="control-group">
            <label>Ads Budget Multiplier:</label>
            <input 
              type="range" 
              min="0.5" 
              max="1.5" 
              step="0.05"
              value={customScenario.adsMultiplier}
              onChange={(e) => setCustomScenario({
                ...customScenario,
                adsMultiplier: parseFloat(e.target.value)
              })}
            />
            <span>{customScenario.adsMultiplier.toFixed(2)}x</span>
          </div>
          
          <div className="control-group">
            <label>Discount Strategy Multiplier:</label>
            <input 
              type="range" 
              min="0.5" 
              max="1.5" 
              step="0.05"
              value={customScenario.discountMultiplier}
              onChange={(e) => setCustomScenario({
                ...customScenario,
                discountMultiplier: parseFloat(e.target.value)
              })}
            />
            <span>{customScenario.discountMultiplier.toFixed(2)}x</span>
          </div>
          
          <div className="control-group">
            <label>Seasonal Impact Multiplier:</label>
            <input 
              type="range" 
              min="0.5" 
              max="1.5" 
              step="0.05"
              value={customScenario.seasonMultiplier}
              onChange={(e) => setCustomScenario({
                ...customScenario,
                seasonMultiplier: parseFloat(e.target.value)
              })}
            />
            <span>{customScenario.seasonMultiplier.toFixed(2)}x</span>
          </div>
          
          <button className="apply-custom-btn" onClick={handleCustomScenario}>
            Apply Custom Strategy
          </button>
        </div>
      </div>
      
      {selectedScenario && (
        <div className="scenario-insight">
          <div className="insight-icon">💡</div>
          <div className="insight-content">
            <strong>Strategy Insight:</strong>
            <p>
              {selectedScenario.name} strategy would result in 
              <span className={selectedScenario.variance >= 0 ? 'positive' : 'negative'}>
                {selectedScenario.variance >= 0 ? '+' : ''}{selectedScenario.variance}%
              </span>
              change from baseline prediction.
              {selectedScenario.variance > 20 && " Consider the higher risk involved with this aggressive strategy."}
              {selectedScenario.variance < -10 && " This conservative approach provides stability but lower growth."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioPlanning;