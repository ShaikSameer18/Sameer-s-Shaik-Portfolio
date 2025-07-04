import React from 'react';
import { Target, TrendingUp, Award } from 'lucide-react';
import type { ResumeAnalysis } from '../types';

interface ScoreCardProps {
  analysis: ResumeAnalysis;
}

export function ScoreCard({ analysis }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-100';
    if (score >= 60) return 'bg-amber-100';
    return 'bg-red-100';
  };

  const criticalIssues = analysis.suggestions.filter(s => s.type === 'critical').length;
  const importantIssues = analysis.suggestions.filter(s => s.type === 'important').length;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(analysis.overallScore)} mb-4`}>
            <span className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
              {analysis.overallScore}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Overall Score</h3>
          <p className="text-gray-600">
            {analysis.overallScore >= 80 ? 'Excellent resume!' : 
             analysis.overallScore >= 60 ? 'Good foundation, needs improvement' : 
             'Significant improvements needed'}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg mr-3">
              <Target className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{criticalIssues} Critical Issues</p>
              <p className="text-xs text-gray-500">Must fix these first</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg mr-3">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{importantIssues} Improvements</p>
              <p className="text-xs text-gray-500">Recommended changes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{analysis.keywords.length} Keywords</p>
              <p className="text-xs text-gray-500">Industry relevant terms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Scores */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Section Scores</h4>
        <div className="space-y-4">
          {Object.entries(analysis.sections).map(([key, section]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {key === 'format' ? 'Formatting' : key}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      section.score >= 80 ? 'bg-emerald-500' :
                      section.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${section.score}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getScoreColor(section.score)}`}>
                  {section.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}