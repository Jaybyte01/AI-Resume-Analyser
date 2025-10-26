import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { CheckCircle, XCircle, AlertTriangle, Download, Award, TrendingUp, MessageSquare } from 'lucide-react';

export function MockTestResults({ results, jobRole, questionsCount }) {
  const { 
    overallScore,
    categoryScores,
    feedback,
    detailedFeedback,
    strengths,
    improvements,
    recommendations,
    performanceMetrics
  } = results;

  // Data for charts
  const scoreData = categoryScores ? Object.entries(categoryScores).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value
  })) : [
    { name: 'Communication', score: overallScore * 0.9 },
    { name: 'Technical', score: overallScore * 1.1 },
    { name: 'Problem Solving', score: overallScore * 0.95 },
    { name: 'Leadership', score: overallScore * 0.85 }
  ];

  const radarData = scoreData.map(item => ({
    category: item.name,
    score: Math.min(item.score, 100)
  }));

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const getGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const saveResults = () => {
    const dataStr = JSON.stringify({ ...results, jobRole, questionsCount }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mock-interview-results-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            Interview Performance Report
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 font-jetbrains-mono">
            Role: {jobRole} • {questionsCount} Questions
          </p>
        </div>
        <button
          onClick={saveResults}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-jetbrains-mono"
        >
          <Download size={16} />
          <span>Save Report</span>
        </button>
      </div>

      {/* Overall Score */}
      <div className={`rounded-xl p-6 ${getScoreBg(overallScore)}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            Overall Performance
          </h3>
          <Award className={getScoreColor(overallScore)} size={24} />
        </div>
        <div className="flex items-center space-x-6">
          <div className={`text-4xl font-bold ${getScoreColor(overallScore)} font-jetbrains-mono`}>
            {overallScore}/100
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(overallScore)} font-jetbrains-mono`}>
            {getGrade(overallScore)}
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">
              {overallScore >= 80 
                ? 'Outstanding performance! You\'re well-prepared for this role.'
                : overallScore >= 60 
                ? 'Good performance with room for improvement.'
                : 'Needs significant improvement. Keep practicing!'}
            </p>
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {scoreData.map((category, index) => (
          <div key={index} className="bg-white dark:bg-[#262626] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                {category.name}
              </span>
              <TrendingUp className={getScoreColor(category.score)} size={16} />
            </div>
            <div className={`text-xl font-bold ${getScoreColor(category.score)} font-jetbrains-mono`}>
              {Math.round(category.score)}%
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${category.score >= 80 ? 'bg-green-500' : category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(category.score, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">Category Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scoreData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Bar dataKey="score" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">Skills Assessment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        {strengths && strengths.length > 0 && (
          <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              Key Strengths
            </h3>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-jetbrains-mono">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas for Improvement */}
        {improvements && improvements.length > 0 && (
          <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono flex items-center">
              <AlertTriangle className="text-yellow-500 mr-2" size={20} />
              Areas for Improvement
            </h3>
            <ul className="space-y-3">
              {improvements.map((improvement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-jetbrains-mono">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Detailed Feedback */}
      {detailedFeedback && detailedFeedback.length > 0 && (
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono flex items-center">
            <MessageSquare className="text-blue-500 mr-2" size={20} />
            Detailed Feedback by Question
          </h3>
          <div className="space-y-4">
            {detailedFeedback.map((feedback, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1 font-jetbrains-mono">
                  Question {index + 1}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                  {feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* General Feedback */}
      {feedback && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-4 font-jetbrains-mono">
            Overall Feedback
          </h3>
          <p className="text-blue-800 dark:text-blue-300 leading-relaxed font-jetbrains-mono">
            {feedback}
          </p>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && (
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-4 font-jetbrains-mono">
            Recommendations for Next Steps
          </h3>
          <div className="prose prose-purple dark:prose-invert max-w-none">
            <p className="text-purple-800 dark:text-purple-300 leading-relaxed font-jetbrains-mono whitespace-pre-line">
              {recommendations}
            </p>
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      {performanceMetrics && (
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(performanceMetrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                  {value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}