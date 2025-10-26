import { useState, useRef } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';

export function FileUpload({ onFileSelect, loading, error }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file.');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx,.doc"
          onChange={handleFileInput}
          disabled={loading}
        />

        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <File className="text-blue-500" size={24} />
              <span className="font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                {selectedFile.name}
              </span>
              {!loading && (
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
              File size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="text-gray-400" size={48} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                Upload your resume
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                Drag and drop your PDF or DOCX file here, or click to browse
              </p>
            </div>
            <button
              onClick={openFileDialog}
              disabled={loading}
              className="px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-jetbrains-mono"
            >
              Choose File
            </button>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-200 font-jetbrains-mono">
                Analysis Failed
              </h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1 font-jetbrains-mono">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* File Requirements */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 font-jetbrains-mono">
        <p>• Supported formats: PDF, DOCX</p>
        <p>• Maximum file size: 5MB</p>
        <p>• Your file is processed locally and securely</p>
      </div>
    </div>
  );
}