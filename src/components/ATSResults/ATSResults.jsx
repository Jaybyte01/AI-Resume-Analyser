import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, XCircle, AlertTriangle, Download, Shield, Eye, FileText } from 'lucide-react';

export function ATSResults({ results }) {
  const { 
    atsScore, 
    overallRating,
    strengths, 
    weaknesses, 
    formatting,
    keywords,
    sections,
    recommendations,
    passabilityScore
  } = results;

  // Data for charts
  const scoreData = [
    { name: 'ATS Score', value: atsScore, color: '#10B981' },
    { name: 'Formatting', value: formatting?.score || 0, color: '#3B82F6' },
    { name: 'Keywords', value: keywords?.score || 0, color: '#8B5CF6' },
    { name: 'Structure', value: sections?.score || 0, color: '#F59E0B' },
  ];

  const passData = [
    { name: 'Pass Rate', value: passabilityScore || atsScore, color: '#10B981' },
    { name: 'Risk', value: 100 - (passabilityScore || atsScore), color: '#EF4444' },
  ];

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

  const getRatingIcon = (score) => {
    if (score >= 80) return <CheckCircle className="text-green-500" size={20} />;
    if (score >= 60) return <AlertTriangle className="text-yellow-500" size={20} />;
    return <XCircle className="text-red-500" size={20} />;
  };

  const saveResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ats-check-report-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
          ATS Compatibility Report
        </h2>
        <button
          onClick={saveResults}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-jetbrains-mono"
        >
          <Download size={16} />
          <span>Save Report</span>
        </button>
      </div>

      {/* Overall Score */}
      <div className={`rounded-xl p-6 ${getScoreBg(atsScore)}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            ATS Compatibility Score
          </h3>
          <Shield className={getScoreColor(atsScore)} size={24} />
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <div className={`text-4xl font-bold ${getScoreColor(atsScore)} font-jetbrains-mono`}>
            {atsScore}/100
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              {getRatingIcon(atsScore)}
              <span className="font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                {overallRating || (atsScore >= 80 ? 'Excellent' : atsScore >= 60 ? 'Good' : 'Needs Improvement')}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
              {atsScore >= 80 
                ? 'Your resume is highly compatible with ATS systems'
                : atsScore >= 60 
                ? 'Your resume should pass most ATS systems with minor improvements'
                : 'Your resume may be rejected by ATS systems - significant improvements needed'}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#262626] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 font-jetbrains-mono">Formatting</span>
            <FileText className={getScoreColor(formatting?.score || 0)} size={16} />
          </div>
          <div className={`text-xl font-bold ${getScoreColor(formatting?.score || 0)} font-jetbrains-mono`}>
            {formatting?.score || 0}%
          </div>
        </div>

        <div className="bg-white dark:bg-[#262626] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 font-jetbrains-mono">Keywords</span>
            <Eye className={getScoreColor(keywords?.score || 0)} size={16} />
          </div>
          <div className={`text-xl font-bold ${getScoreColor(keywords?.score || 0)} font-jetbrains-mono`}>
            {keywords?.score || 0}%
          </div>
        </div>

        <div className="bg-white dark:bg-[#262626] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 font-jetbrains-mono">Structure</span>
            <Shield className={getScoreColor(sections?.score || 0)} size={16} />
          </div>
          <div className={`text-xl font-bold ${getScoreColor(sections?.score || 0)} font-jetbrains-mono`}>
            {sections?.score || 0}%
          </div>
        </div>

        <div className="bg-white dark:bg-[#262626] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 font-jetbrains-mono">Pass Rate</span>
            <CheckCircle className={getScoreColor(passabilityScore || atsScore)} size={16} />
          </div>
          <div className={`text-xl font-bold ${getScoreColor(passabilityScore || atsScore)} font-jetbrains-mono`}>
            {passabilityScore || atsScore}%
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={scoreData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Bar dataKey="value" fill={(entry, index) => scoreData[index]?.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">Pass Probability</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={passData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
              >
                {passData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
              {passabilityScore || atsScore}%
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">Likely to Pass</p>
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        {strengths && strengths.length > 0 && (
          <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              ATS Strengths
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

        {/* Weaknesses */}
        {weaknesses && weaknesses.length > 0 && (
          <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono flex items-center">
              <XCircle className="text-red-500 mr-2" size={20} />
              Areas to Improve
            </h3>
            <ul className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-jetbrains-mono">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Detailed Analysis */}
      {(formatting || keywords || sections) && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">Detailed Analysis</h3>
          
          {/* Formatting */}
          {formatting && (
            <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 font-jetbrains-mono flex items-center">
                <FileText className="mr-2" size={18} />
                Formatting Analysis ({formatting.score}%)
              </h4>
              {formatting.issues && formatting.issues.length > 0 && (
                <ul className="space-y-2">
                  {formatting.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                      • {issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Keywords */}
          {keywords && (
            <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 font-jetbrains-mono flex items-center">
                <Eye className="mr-2" size={18} />
                Keyword Analysis ({keywords.score}%)
              </h4>
              {keywords.analysis && (
                <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">{keywords.analysis}</p>
              )}
            </div>
          )}

          {/* Sections */}
          {sections && (
            <div className="bg-white dark:bg-[#262626] rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 font-jetbrains-mono flex items-center">
                <Shield className="mr-2" size={18} />
                Structure Analysis ({sections.score}%)
              </h4>
              {sections.analysis && (
                <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">{sections.analysis}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Recommendations */}
      {recommendations && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-4 font-jetbrains-mono">
            ATS Optimization Recommendations
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