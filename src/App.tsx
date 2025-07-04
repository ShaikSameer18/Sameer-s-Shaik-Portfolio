import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { AnalysisResults } from './components/AnalysisResults';
import { ScoreCard } from './components/ScoreCard';
import { OptimizedResume } from './components/OptimizedResume';
import { Footer } from './components/Footer';
import { analyzeResume } from './utils/resumeAnalyzer';
import type { ResumeAnalysis } from './types';

function App() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showOptimizedResume, setShowOptimizedResume] = useState(false);

  const handleResumeSubmit = async (content: string) => {
    setIsAnalyzing(true);
    
    // Simulate analysis time for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = analyzeResume(content);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setAnalysis(null);
    setIsAnalyzing(false);
    setShowOptimizedResume(false);
  };

  const handleShowOptimizedResume = () => {
    setShowOptimizedResume(true);
  };

  if (showOptimizedResume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-6">
            <button
              onClick={() => setShowOptimizedResume(false)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              ← Back to Analysis
            </button>
          </div>
          <OptimizedResume />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {!analysis && !isAnalyzing ? (
          <UploadSection onSubmit={handleResumeSubmit} />
        ) : (
          <div className="space-y-8">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Analyzing Your Resume</h3>
                <p className="mt-2 text-gray-600">This may take a few moments...</p>
              </div>
            ) : analysis ? (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Resume Analysis Complete</h2>
                    <p className="text-gray-600 mt-1">Here's how your resume performs</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleShowOptimizedResume}
                      className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                    >
                      View Optimized Resume
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      Analyze Another Resume
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <ScoreCard analysis={analysis} />
                  </div>
                  <div className="lg:col-span-2">
                    <AnalysisResults analysis={analysis} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;