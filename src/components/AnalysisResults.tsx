import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import type { ResumeAnalysis } from '../types';

interface AnalysisResultsProps {
  analysis: ResumeAnalysis;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'sections'>('suggestions');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['contact']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'important': return <Info className="w-5 h-5 text-amber-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'needs-improvement': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'missing': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'suggestions'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Improvement Suggestions
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'sections'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Section Analysis
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'suggestions' ? (
          <div className="space-y-4">
            {analysis.suggestions.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Perfect Resume!</h3>
                <p className="text-gray-600">No suggestions needed - your resume looks great!</p>
              </div>
            ) : (
              analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    {getSuggestionIcon(suggestion.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          suggestion.type === 'critical' ? 'bg-red-100 text-red-700' :
                          suggestion.type === 'important' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {suggestion.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{suggestion.description}</p>
                      
                      {suggestion.before && suggestion.after && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <h5 className="text-sm font-medium text-red-700 mb-2">❌ Before</h5>
                            <div className="bg-red-50 border border-red-200 rounded p-3 text-sm">
                              {suggestion.before}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-emerald-700 mb-2">✅ After</h5>
                            <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-sm">
                              {suggestion.after}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(analysis.sections).map(([key, section]) => (
              <div key={key} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(section.status)}
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {key === 'format' ? 'Formatting & Structure' : key}
                      </h3>
                      <p className="text-sm text-gray-600">Score: {section.score}/100</p>
                    </div>
                  </div>
                  {expandedSections.has(key) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {expandedSections.has(key) && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="pt-4 space-y-4">
                      {section.feedback.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
                          <ul className="space-y-1">
                            {section.feedback.map((item, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {section.suggestions.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Suggestions</h4>
                          <ul className="space-y-1">
                            {section.suggestions.map((item, index) => (
                              <li key={index} className="text-sm text-blue-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}