export function ResumePreview() {
  return (
    <div className="relative lg:pl-8 flex justify-center lg:justify-end">
      <div className="bg-white dark:bg-[#262626] rounded-2xl shadow-2xl dark:shadow-none dark:ring-1 dark:ring-gray-700 p-6 sm:p-8 w-full max-w-sm">
        {/* Resume analysis header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            Resume Analysis
          </h3>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        {/* Analysis results */}
        <div className="space-y-4 sm:space-y-6">
          {/* ATS Score */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">ATS Score</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="w-14 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">87/100</span>
            </div>
          </div>

          {/* Skill Match */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">Skill Match</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">75%</span>
            </div>
          </div>

          {/* Missing Keywords */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">Missing Keywords</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded font-jetbrains-mono">Python</span>
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded font-jetbrains-mono">AWS</span>
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded font-jetbrains-mono">Agile</span>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2 font-jetbrains-mono">AI Suggestion</h4>
            <p className="text-xs text-blue-800 dark:text-blue-300 font-jetbrains-mono">
              Add quantifiable achievements with metrics to demonstrate impact.
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 sm:mt-8">
          <button className="w-full py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-jetbrains-mono">
            Get Full Analysis
          </button>
        </div>
      </div>
    </div>
  );
}