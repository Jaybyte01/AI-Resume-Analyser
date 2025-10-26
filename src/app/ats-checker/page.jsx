'use client';

import { useState, useCallback } from 'react';
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { FileUpload } from "../../components/FileUpload/FileUpload";
import { ATSResults } from "../../components/ATSResults/ATSResults";
import { CheckCircle, Loader } from "lucide-react";

export default function ATSCheckerPage() {
  const [atsResults, setATSResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/atsCheck', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`ATS check failed: ${response.statusText}`);
      }

      const result = await response.json();
      setATSResults(result);

      // Save to localStorage
      const savedChecks = JSON.parse(localStorage.getItem('atsChecks') || '[]');
      const newCheck = {
        id: Date.now(),
        fileName: file.name,
        date: new Date().toISOString(),
        result: result
      };
      savedChecks.unshift(newCheck);
      localStorage.setItem('atsChecks', JSON.stringify(savedChecks.slice(0, 10))); // Keep only last 10

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to check ATS compatibility');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E]">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-xl mb-6">
              <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
              ATS Checker
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-jetbrains-mono">
              Ensure your resume passes Applicant Tracking Systems with our comprehensive 
              ATS compatibility analysis and formatting recommendations.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: File Upload */}
            <div className="space-y-6">
              <FileUpload 
                onFileSelect={handleFileUpload}
                loading={loading}
                error={error}
              />
              
              {/* Loading State */}
              {loading && (
                <div className="bg-white dark:bg-[#262626] rounded-xl p-8 text-center">
                  <Loader className="animate-spin mx-auto mb-4 text-green-500" size={32} />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                    Checking ATS Compatibility...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                    Our AI is analyzing your resume structure, formatting, and keywords for ATS systems.
                  </p>
                </div>
              )}

              {/* ATS Tips */}
              <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
                  ATS Best Practices
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="font-jetbrains-mono">Use standard section headers (Experience, Education, Skills)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="font-jetbrains-mono">Include relevant keywords from job descriptions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="font-jetbrains-mono">Use simple, clean formatting without graphics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="font-jetbrains-mono">Avoid complex layouts and multiple columns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="font-jetbrains-mono">Include quantifiable achievements and metrics</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Results */}
            <div>
              {atsResults ? (
                <ATSResults results={atsResults} />
              ) : (
                <div className="bg-white dark:bg-[#262626] rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-gray-400 dark:text-gray-500" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                    Upload a resume to check ATS compatibility
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                    Your ATS compatibility report will appear here once you upload your resume.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}