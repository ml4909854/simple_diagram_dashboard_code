import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCw, Move, Maximize2 } from 'lucide-react';
import './DiagramViewer.css';

const DiagramViewer = ({ image, selectedComponent }) => {
  const [scale, setScale] = useState(1);

  if (!image) {
    return (
      <div className="diagram-viewer empty">
        <div className="empty-state">
          <Move size={48} />
          <p>Upload a diagram to start viewing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="diagram-viewer">
      <div className="viewer-toolbar">
        <button className="toolbar-btn" title="Zoom In">
          <ZoomIn size={18} />
        </button>
        <button className="toolbar-btn" title="Zoom Out">
          <ZoomOut size={18} />
        </button>
        <button className="toolbar-btn" title="Reset View">
          <RotateCw size={18} />
        </button>
        <button className="toolbar-btn" title="Fit to Screen">
          <Maximize2 size={18} />
        </button>
        <span className="zoom-level">{Math.round(scale * 100)}%</span>
      </div>

      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        wheel={{ step: 0.1 }}
        onTransformed={(ref) => setScale(ref.state.scale)}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="zoom-controls">
              <button onClick={() => zoomIn()} className="zoom-btn">
                <ZoomIn size={20} />
              </button>
              <button onClick={() => zoomOut()} className="zoom-btn">
                <ZoomOut size={20} />
              </button>
              <button onClick={() => resetTransform()} className="zoom-btn">
                <RotateCw size={20} />
              </button>
            </div>
            <TransformComponent wrapperClass="transform-wrapper" contentClass="transform-content">
              <div className="diagram-container">
                <img 
                  src={image} 
                  alt="Circuit diagram" 
                  className="diagram-image"
                  data-selected={selectedComponent ? 'true' : 'false'}
                />
                {selectedComponent && (
                  <div className="selection-overlay">
                    <div className="selection-marker">
                      <span>{selectedComponent.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default DiagramViewer;