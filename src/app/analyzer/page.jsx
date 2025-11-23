'use client';

import { useState, useCallback } from 'react';
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { FileUpload } from "../../components/FileUpload/FileUpload";
import { AnalysisResults } from "../../components/AnalysisResults/AnalysisResults";
import { FileText, Loader } from "lucide-react";

export default function AnalyzerPage() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/analyzeResume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysis(result.analysis);

      // Save to localStorage
      const savedAnalyses = JSON.parse(localStorage.getItem('resumeAnalyses') || '[]');
      const newAnalysis = {
        id: Date.now(),
        fileName: file.name,
        date: new Date().toISOString(),
        result: result
      };
      savedAnalyses.unshift(newAnalysis);
      localStorage.setItem('resumeAnalyses', JSON.stringify(savedAnalyses.slice(0, 10))); // Keep only last 10

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to analyze resume');
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-xl mb-6">
              <FileText className="text-orange-600 dark:text-orange-400" size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
              Resume Analyzer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-jetbrains-mono">
              Upload your resume to get an instant AI-powered analysis with ATS scoring, 
              keyword optimization, and professional recommendations.
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
                  <Loader className="animate-spin mx-auto mb-4 text-blue-500" size={32} />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                    Analyzing Resume...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                    Our AI is analyzing your resume for ATS compatibility and optimization opportunities.
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Results */}
            <div>
              {analysis ? (
                <AnalysisResults analysis={analysis} />
              ) : (
                <div className="bg-white dark:bg-[#262626] rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="text-gray-400 dark:text-gray-500" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                    Upload a resume to start
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                    Your analysis results will appear here once you upload your resume.
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