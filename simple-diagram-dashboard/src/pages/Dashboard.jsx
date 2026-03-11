import React, { useState, useEffect } from 'react';
import UploadBox from '../components/UploadBox/UploadBox';
import DiagramViewer from '../components/DiagramViewer/DiagramViewer';
import ComponentList from '../components/ComponentList/ComponentList';
import { fetchComponents } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentFileName, setCurrentFileName] = useState('');
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        const data = await fetchComponents();
        setComponents(data);
      } catch (error) {
        console.error('Error loading components:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComponents();
  }, []);

  const handleImageUpload = (imageData, fileName) => {
    setCurrentImage(imageData);
    setCurrentFileName(fileName);
  };

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Simple Diagram Dashboard</h1>
        <p>Upload and analyze circuit diagrams</p>
      </header>

      <main className="dashboard-main">
        <section className="upload-section">
          <UploadBox
            onImageUpload={handleImageUpload}
            currentImage={currentImage}
            currentFileName={currentFileName}
          />
        </section>

        <section className="content-section">
          <div className="diagram-section">
            <DiagramViewer 
              image={currentImage} 
              selectedComponent={selectedComponent}
            />
          </div>
          <div className="components-section">
            <ComponentList
              components={components}
              selectedComponent={selectedComponent}
              onSelectComponent={handleSelectComponent}
              loading={loading}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;