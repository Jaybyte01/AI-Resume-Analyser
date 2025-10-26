import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Download, Target, Users } from 'lucide-react';

export function JobMatchResults({ results, resumeFileName }) {
  const { 
    matchPercentage, 
    missingKeywords, 
    matchedKeywords,
    skillGaps,
    recommendations,
    jobTitle,
    roleAlignment,
    experienceMatch
  } = results;

  // Data for charts
  const matchData = [
    { name: 'Match Score', value: matchPercentage, color: '#10B981' },
    { name: 'Experience', value: experienceMatch || 0, color: '#3B82F6' },
    { name: 'Role Fit', value: roleAlignment || 0, color: '#8B5CF6' },
  ];

  const radialData = [
    { name: 'Match', value: matchPercentage, fill: '#10B981' },
  ];

  const getMatchColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getMatchBg = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const saveResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-match-analysis-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            Job Match Analysis
          </h2>
          {jobTitle && (
            <p className="text-gray-600 dark:text-gray-400 mt-1 font-jetbrains-mono">
              Position: {jobTitle}
            </p>
          )}
          {resumeFileName && (
            <p className="text-gray-500 dark:text-gray-500 mt-1 text-sm font-jetbrains-mono">
              Resume: {resumeFileName}
            </p>
          )}
        </div>
        <button
          onClick={saveResults}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-jetbrains-mono"
        >
          <Download size={16} />
          <span>Save Report</span>
        </button>
      </div>

      {/* Overall Match Score */}
      <div className={`rounded-xl p-6 ${getMatchBg(matchPercentage)}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            Overall Match Score
          </h3>
          <Target className={getMatchColor(matchPercentage)} size={24} />
        </div>
        <div className={`text-4xl font-bold ${getMatchColor(matchPercentage)} font-jetbrains-mono mb-2`}>
          {matchPercentage}%
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">
          {matchPercentage >= 80 
            ? 'Excellent match! You\'re highly qualified for this position.' 
            : matchPercentage >= 60 
            ? 'Good match with room for improvement.' 
            : 'Significant gaps exist. Consider skill development.'}
        </p>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">Match Score</h4>
            <TrendingUp className={getMatchColor(matchPercentage)} size={20} />
          </div>
          <div className={`text-2xl font-bold ${getMatchColor(matchPercentage)} font-jetbrains-mono`}>
            {matchPercentage}%
          </div>
        </div>

        {experienceMatch !== undefined && (
          <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">Experience</h4>
              <Users className={getMatchColor(experienceMatch)} size={20} />
            </div>
            <div className={`text-2xl font-bold ${getMatchColor(experienceMatch)} font-jetbrains-mono`}>
              {experienceMatch}%
            </div>
          </div>
        )}

        {roleAlignment !== undefined && (
          <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">Role Fit</h4>
              <Target className={getMatchColor(roleAlignment)} size={20} />
            </div>
            <div className={`text-2xl font-bold ${getMatchColor(roleAlignment)} font-jetbrains-mono`}>
              {roleAlignment}%
            </div>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">Score Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={matchData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Bar dataKey="value" fill={(entry, index) => matchData[index]?.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radial Chart */}
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">Match Visualization</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart data={radialData} innerRadius="60%" outerRadius="90%">
              <RadialBar dataKey="value" cornerRadius={10} fill="#10B981" />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">{matchPercentage}%</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">Overall Match</p>
          </div>
        </div>
      </div>

      {/* Keywords Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matched Keywords */}
        {matchedKeywords && matchedKeywords.length > 0 && (
          <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              Matched Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchedKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full font-jetbrains-mono"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Keywords */}
        {missingKeywords && missingKeywords.length > 0 && (
          <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono flex items-center">
              <XCircle className="text-red-500 mr-2" size={20} />
              Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm rounded-full font-jetbrains-mono"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 font-jetbrains-mono">
              Consider adding these keywords to improve your match score.
            </p>
          </div>
        )}
      </div>

      {/* Skill Gaps */}
      {skillGaps && skillGaps.length > 0 && (
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono flex items-center">
            <AlertTriangle className="text-yellow-500 mr-2" size={20} />
            Skill Gaps to Address
          </h3>
          <ul className="space-y-3">
            {skillGaps.map((gap, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-gray-700 dark:text-gray-300 text-sm font-jetbrains-mono">{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-4 font-jetbrains-mono">
            AI Recommendations
          </h3>
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="text-blue-800 dark:text-blue-300 leading-relaxed font-jetbrains-mono whitespace-pre-line">
              {recommendations}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}