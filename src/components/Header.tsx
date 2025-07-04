import React from 'react';
import { FileText, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ResumeChecker Pro</h1>
              <p className="text-sm text-gray-600">AI-Powered Resume Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-emerald-600 font-medium">
            <Zap className="w-4 h-4" />
            <span>Instant Analysis</span>
          </div>
        </div>
      </div>
    </header>
  );
}