import React from 'react';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ResumeChecker Pro</h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Get professional resume analysis powered by AI. Improve your chances of landing your dream job with actionable feedback and industry-standard recommendations.
            </p>
            <div className="flex items-center text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 mx-1" />
              <span>for job seekers everywhere</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>ATS Optimization</li>
              <li>Section Analysis</li>
              <li>Keyword Suggestions</li>
              <li>Industry Standards</li>
              <li>Format Checking</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex space-x-3">
              <a href="#" className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2024 ResumeChecker Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}