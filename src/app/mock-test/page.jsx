'use client';

import { useState } from 'react';
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { MockTestResults } from "../../components/MockTestResults/MockTestResults";
import { BarChart3, Loader, Send, RefreshCw } from "lucide-react";

export default function MockTestPage() {
  const [jobRole, setJobRole] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testStage, setTestStage] = useState('setup'); // setup, testing, results

  const generateQuestions = async () => {
    if (!jobRole.trim()) {
      setError('Please enter a job role');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generateQuestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobRole }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate questions: ${response.statusText}`);
      }

      const result = await response.json();
      setQuestions(result.questions);
      setAnswers(new Array(result.questions.length).fill(''));
      setCurrentQuestion(0);
      setTestStage('testing');

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = () => {
    if (!currentAnswer.trim()) {
      setError('Please provide an answer');
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;
    setAnswers(newAnswers);
    setCurrentAnswer('');
    setError(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = async (finalAnswers) => {
    setLoading(true);

    try {
      const response = await fetch('/api/evaluateAnswers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobRole,
          questions,
          answers: finalAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to evaluate answers: ${response.statusText}`);
      }

      const result = await response.json();
      setTestResults(result);
      setTestStage('results');

      // Save to localStorage
      const savedTests = JSON.parse(localStorage.getItem('mockTests') || '[]');
      const newTest = {
        id: Date.now(),
        jobRole,
        date: new Date().toISOString(),
        questionsCount: questions.length,
        result: result
      };
      savedTests.unshift(newTest);
      localStorage.setItem('mockTests', JSON.stringify(savedTests.slice(0, 10))); // Keep only last 10

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to evaluate answers');
    } finally {
      setLoading(false);
    }
  };

  const startNewTest = () => {
    setJobRole('');
    setQuestions([]);
    setAnswers([]);
    setCurrentAnswer('');
    setCurrentQuestion(0);
    setTestResults(null);
    setTestStage('setup');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E]">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-xl mb-6">
              <BarChart3 className="text-purple-600 dark:text-purple-400" size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
              Mock Interview Test
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-jetbrains-mono">
              Practice your interview skills with AI-generated questions tailored to your target job role. 
              Get feedback and improve your responses.
            </p>
          </div>

          {/* Main Content */}
          {testStage === 'setup' && (
            <div className="bg-white dark:bg-[#262626] rounded-xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                Set Up Your Mock Interview
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-jetbrains-mono">
                    Target Job Role
                  </label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g., Software Engineer, Product Manager, Data Scientist"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-jetbrains-mono"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-300 font-jetbrains-mono">{error}</p>
                  </div>
                )}

                <button
                  onClick={generateQuestions}
                  disabled={loading || !jobRole.trim()}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-jetbrains-mono flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      <span>Generating Questions...</span>
                    </>
                  ) : (
                    <>
                      <BarChart3 size={20} />
                      <span>Start Mock Interview</span>
                    </>
                  )}
                </button>

                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 font-jetbrains-mono">
                  <p>• We'll generate 5-7 interview questions specific to your role</p>
                  <p>• Answer each question thoughtfully</p>
                  <p>• Get AI feedback and scoring at the end</p>
                  <p>• All data is stored locally in your browser</p>
                </div>
              </div>
            </div>
          )}

          {testStage === 'testing' && (
            <div className="bg-white dark:bg-[#262626] rounded-xl p-8">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 font-jetbrains-mono">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                    Role: {jobRole}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
                  {questions[currentQuestion]}
                </h3>
                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-jetbrains-mono"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-700 dark:text-red-300 font-jetbrains-mono">{error}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-jetbrains-mono"
                >
                  Previous
                </button>

                <button
                  onClick={submitAnswer}
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-jetbrains-mono"
                >
                  <Send size={16} />
                  <span>{currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}</span>
                </button>
              </div>
            </div>
          )}

          {testStage === 'results' && testResults && (
            <>
              <MockTestResults 
                results={testResults} 
                jobRole={jobRole}
                questionsCount={questions.length}
              />
              
              <div className="mt-8 text-center">
                <button
                  onClick={startNewTest}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors font-jetbrains-mono"
                >
                  <RefreshCw size={20} />
                  <span>Start New Test</span>
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}