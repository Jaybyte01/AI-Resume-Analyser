import { FileText, Target, CheckCircle, BarChart3, Zap, Shield } from "lucide-react";

const features = [
  {
    title: "Resume Analyzer",
    desc: "AI-powered analysis with ATS scoring and keyword optimization",
    icon: FileText,
    href: "/analyzer"
  },
  {
    title: "Job Matching",
    desc: "Compare your resume against job descriptions for perfect alignment",
    icon: Target,
    href: "/job-matching"
  },
  {
    title: "ATS Checker",
    desc: "Ensure your resume passes applicant tracking systems",
    icon: CheckCircle,
    href: "/ats-checker"
  },
  {
    title: "Mock Interview",
    desc: "Practice with AI-generated questions tailored to your target role",
    icon: BarChart3,
    href: "/mock-test"
  },
  {
    title: "Instant Analysis",
    desc: "Get results in seconds with our advanced AI technology",
    icon: Zap,
    href: "#"
  },
  {
    title: "Privacy First",
    desc: "All data stored locally in your browser - completely secure",
    icon: Shield,
    href: "#"
  },
];

export function FeatureSection() {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-3 py-1 bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full mb-6 sm:mb-8">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight font-jetbrains-mono mb-6">
            Everything you need to optimize your resume
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-jetbrains-mono max-w-3xl mx-auto">
            Our comprehensive AI-powered platform provides all the tools you need to create, 
            analyze, and optimize your resume for maximum impact in today's competitive job market.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-6 sm:p-8 hover:shadow-lg dark:hover:ring-1 dark:hover:ring-gray-600 transition-all duration-300 group cursor-pointer"
                onClick={() => feature.href !== '#' && (window.location.href = feature.href)}
              >
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-orange-100 dark:bg-orange-900 rounded-lg mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="text-orange-600 dark:text-orange-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 font-jetbrains-mono">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-jetbrains-mono">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}