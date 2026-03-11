import React from 'react';
import { Circle, Zap, Cpu, Battery, Radio, Filter } from 'lucide-react';
import './ComponentList.css';

const ComponentList = ({ components, selectedComponent, onSelectComponent, loading }) => {
  const getComponentIcon = (type) => {
    switch(type) {
      case 'passive':
        return <Circle size={16} />;
      case 'active':
        return <Zap size={16} />;
      case 'power':
        return <Battery size={16} />;
      case 'integrated':
        return <Cpu size={16} />;
      case 'electromechanical':
        return <Radio size={16} />;
      default:
        return <Filter size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="component-list loading">
        <div className="loading-spinner"></div>
        <p>Loading components...</p>
      </div>
    );
  }

  return (
    <div className="component-list">
      <div className="list-header">
        <h3>Circuit Components</h3>
        <span className="component-count">{components.length} items</span>
      </div>
      
      <div className="components-grid">
        {components.map((component) => (
          <div
            key={component.id}
            className={`component-card ${selectedComponent?.id === component.id ? 'selected' : ''}`}
            onClick={() => onSelectComponent(component)}
          >
            <div className="component-icon">
              {getComponentIcon(component.type)}
            </div>
            <div className="component-info">
              <span className="component-name">{component.name}</span>
              <span className="component-symbol">{component.symbol}</span>
            </div>
            <div className="component-type">
              <span className={`type-badge ${component.type}`}>{component.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentList;