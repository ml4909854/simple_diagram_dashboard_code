import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, X, RefreshCw } from 'lucide-react';
import './UploadBox.css';

const UploadBox = ({ onImageUpload, currentImage, currentFileName }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        onImageUpload(e.target.result, file.name);
      };
      
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const handleRemoveImage = () => {
    onImageUpload(null, '');
  };

  return (
    <div className="upload-box-container">
      {!currentImage ? (
        <div 
          {...getRootProps()} 
          className={`dropzone ${isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload size={48} className="upload-icon" />
          <h3>Upload Circuit Diagram</h3>
          <p>Drag & drop or click to select</p>
          <p className="file-hint">PNG or JPG (max 5MB)</p>
        </div>
      ) : (
        <div className="image-preview">
          <div className="preview-header">
            <div className="file-info">
              <Image size={20} />
              <span className="file-name">{currentFileName}</span>
            </div>
            <div className="preview-actions">
              <button onClick={handleRemoveImage} className="btn-icon" title="Replace image">
                <RefreshCw size={18} />
              </button>
              <button onClick={handleRemoveImage} className="btn-icon" title="Remove image">
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="preview-image">
            <img src={currentImage} alt="Circuit diagram preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;