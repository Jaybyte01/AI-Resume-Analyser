export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-jetbrains-mono">ResumeAI</h3>
            <p className="text-gray-400 text-sm font-jetbrains-mono">
              AI-powered resume analysis and optimization for the modern job market.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-semibold font-jetbrains-mono">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/analyzer" className="hover:text-white transition-colors font-jetbrains-mono">Resume Analyzer</a></li>
              <li><a href="/job-matching" className="hover:text-white transition-colors font-jetbrains-mono">Job Matching</a></li>
              <li><a href="/ats-checker" className="hover:text-white transition-colors font-jetbrains-mono">ATS Checker</a></li>
              <li><a href="/mock-test" className="hover:text-white transition-colors font-jetbrains-mono">Mock Interview</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold font-jetbrains-mono">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors font-jetbrains-mono">About</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors font-jetbrains-mono">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-jetbrains-mono">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-jetbrains-mono">Terms</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold font-jetbrains-mono">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors font-jetbrains-mono">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-jetbrains-mono">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-jetbrains-mono">Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-jetbrains-mono">Tips</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm font-jetbrains-mono">
            © 2025 ATSify AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}