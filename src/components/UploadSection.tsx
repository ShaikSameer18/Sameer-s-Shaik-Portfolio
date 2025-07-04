import React, { useState, useRef } from 'react';
import { Upload, FileText, Clipboard, CheckCircle } from 'lucide-react';

interface UploadSectionProps {
  onSubmit: (content: string) => void;
}

export function UploadSection({ onSubmit }: UploadSectionProps) {
  const [content, setContent] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setContent(text);
      setActiveTab('paste');
    };
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Get Your Resume <span className="text-blue-600">Analyzed</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your resume and get instant feedback with actionable suggestions to improve your chances of landing your dream job.
        </p>
        
        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-2 text-emerald-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">ATS-Optimized</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Industry Standards</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Instant Results</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'upload'
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload File
            </button>
            <button
              onClick={() => setActiveTab('paste')}
              className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'paste'
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Clipboard className="w-4 h-4 inline mr-2" />
              Paste Text
            </button>
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'upload' ? (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors duration-200 ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop your resume here
              </h3>
              <p className="text-gray-600 mb-6">
                Supports .txt, .docx, .pdf files up to 10MB
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".txt,.doc,.docx,.pdf"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Paste your resume content below:
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Paste your resume text here..."
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {content.length} characters
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Analyze Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}