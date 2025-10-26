import { ResumePreview } from "./ResumePreview";

export function HeroSection() {
  return (
    <section className="pt-16 pb-12 sm:pb-20 bg-gray-50 dark:bg-[#1E1E1E] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh]">
          {/* Left column: Hero text and CTA */}
          <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-8 text-center lg:text-left">
            {/* Main headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight font-jetbrains-mono">
              AI-Powered Resume Analysis
            </h1>

            {/* Subtext paragraph */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-jetbrains-mono">
              Get instant ATS scores, keyword suggestions, and job matching insights. 
              Optimize your resume with intelligent AI analysis and land your dream job faster.
            </p>

            {/* CTA buttons */}
            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="/analyzer"
                className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-black dark:active:bg-white transition-colors text-center"
              >
                Analyze Resume
              </a>
              <a 
                href="/job-matching"
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
              >
                Job Matching
              </a>
            </div>

            {/* Stats */}
            <div className="pt-8 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">ATS Pass Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">50k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">Resumes Analyzed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">4.9/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right column: Resume preview mockup */}
          <ResumePreview />
        </div>
      </div>
    </section>
  );
}