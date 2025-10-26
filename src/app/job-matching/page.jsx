'use client';

import { useState, useCallback } from 'react';
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { FileUpload } from "../../components/FileUpload/FileUpload";
import { JobMatchResults } from "../../components/JobMatchResults/JobMatchResults";
import { Target, Loader, FileText, Briefcase } from "lucide-react";

export default function JobMatchingPage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [matchResults, setMatchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResumeUpload = useCallback((file) => {
    setResumeFile(file);
    setError(null);
  }, []);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const analyzeMatch = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError('Please upload a resume and enter a job description');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', resumeFile);
      formData.append('jobDescription', jobDescription);

      const response = await fetch('/api/matchJob', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Job matching failed: ${response.statusText}`);
      }

      const result = await response.json();
      setMatchResults(result);

      // Save to localStorage
      const savedMatches = JSON.parse(localStorage.getItem('jobMatches') || '[]');
      const newMatch = {
        id: Date.now(),
        fileName: resumeFile.name,
        jobTitle: result.jobTitle || 'Job Matching Analysis',
        date: new Date().toISOString(),
        result: result
      };
      savedMatches.unshift(newMatch);
      localStorage.setItem('jobMatches', JSON.stringify(savedMatches.slice(0, 10))); // Keep only last 10

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to analyze job match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E]">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl mb-6">
              <Target className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
              Job Matching
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-jetbrains-mono">
              Compare your resume against specific job descriptions to see how well you match 
              and get targeted recommendations for improvement.
            </p>
          </div>

          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Resume Upload */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="text-gray-600 dark:text-gray-400" size={20} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                  Upload Resume
                </h2>
              </div>
              <FileUpload 
                onFileSelect={handleResumeUpload}
                loading={loading}
                error={null}
              />
            </div>

            {/* Job Description Input */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="text-gray-600 dark:text-gray-400" size={20} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                  Job Description
                </h2>
              </div>
              <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
                <textarea
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                  placeholder="Paste the job description here..."
                  className="w-full h-64 p-4 border border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-jetbrains-mono text-sm"
                  disabled={loading}
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                    {jobDescription.length} characters
                  </span>
                  <button
                    onClick={analyzeMatch}
                    disabled={loading || !resumeFile || !jobDescription.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-jetbrains-mono"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Match'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-700 dark:text-red-300 font-jetbrains-mono">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mb-8 bg-white dark:bg-[#262626] rounded-xl p-8 text-center">
              <Loader className="animate-spin mx-auto mb-4 text-blue-500" size={32} />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                Analyzing Job Match...
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                Our AI is comparing your resume against the job requirements to find the best matches and gaps.
              </p>
            </div>
          )}

          {/* Results Section */}
          {matchResults && (
            <JobMatchResults 
              results={matchResults} 
              resumeFileName={resumeFile?.name}
            />
          )}

          {/* Empty State */}
          {!matchResults && !loading && (
            <div className="bg-white dark:bg-[#262626] rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-gray-400 dark:text-gray-500" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                Ready to analyze job match
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-jetbrains-mono">
                Upload your resume and paste a job description to see how well you match.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}