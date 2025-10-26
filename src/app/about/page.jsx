import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Info, Target, Users, Zap, Shield, Heart } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Target,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your resume for ATS compatibility, keyword optimization, and industry best practices."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data never leaves your browser. All processing happens locally, ensuring complete privacy and security of your personal information."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive analysis results in seconds, not days. Our streamlined process delivers actionable insights immediately."
    },
    {
      icon: Users,
      title: "Expert Insights",
      description: "Built by career experts and recruiters, our tool provides insights based on real-world hiring practices and ATS requirements."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Resumes Analyzed" },
    { number: "95%", label: "ATS Pass Rate" },
    { number: "4.9/5", label: "User Rating" },
    { number: "500+", label: "Companies Supported" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      description: "Former Google recruiter with 10+ years in talent acquisition and AI development.",
      avatar: "SC"
    },
    {
      name: "Marcus Johnson",
      role: "CTO & Co-founder",
      description: "AI researcher and former Microsoft engineer specializing in natural language processing.",
      avatar: "MJ"
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Product",
      description: "Career coach and UX expert focused on creating tools that empower job seekers.",
      avatar: "ER"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E]">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-[#121212]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl mb-8">
              <Info className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
              Empowering Job Seekers with AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-jetbrains-mono">
              ResumeAI was created to democratize access to professional resume optimization. 
              We believe everyone deserves a chance to showcase their best self to potential employers.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-24 bg-gray-50 dark:bg-[#1E1E1E]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full mb-6">
                  Our Mission
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                  Making resume optimization accessible to everyone
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-jetbrains-mono">
                  The job market is more competitive than ever, and many qualified candidates are filtered out 
                  by Applicant Tracking Systems before their resumes even reach human eyes. We're here to change that.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-jetbrains-mono">
                  Our AI-powered platform provides instant, expert-level analysis that was previously available 
                  only to those who could afford expensive career coaching services.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#262626] rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                  Why We Built This
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Heart className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-700 dark:text-gray-300 font-jetbrains-mono">
                      <strong>Accessibility:</strong> Professional resume help shouldn't cost hundreds of dollars
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-700 dark:text-gray-300 font-jetbrains-mono">
                      <strong>Privacy:</strong> Your personal information should never be stored or shared
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-700 dark:text-gray-300 font-jetbrains-mono">
                      <strong>Speed:</strong> You shouldn't wait days for feedback on your resume
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-[#121212]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                How We're Different
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-jetbrains-mono">
                Our platform combines cutting-edge AI technology with insights from industry experts 
                to deliver unparalleled resume optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-8">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-6 flex items-center justify-center">
                      <IconComponent className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-jetbrains-mono">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-24 bg-gray-900 dark:bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-6 font-jetbrains-mono">
                Trusted by Job Seekers Worldwide
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto font-jetbrains-mono">
                Our platform has helped thousands of professionals land their dream jobs.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2 font-jetbrains-mono">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-jetbrains-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-24 bg-gray-50 dark:bg-[#1E1E1E]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-jetbrains-mono">
                We're a passionate team of technologists, recruiters, and career experts 
                dedicated to helping you succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white dark:bg-[#262626] rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-lg font-jetbrains-mono">
                      {member.avatar}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4 font-jetbrains-mono">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-jetbrains-mono">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-[#121212]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
              Ready to optimize your resume?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-jetbrains-mono">
              Join thousands of job seekers who have improved their interview chances with our AI-powered analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/analyzer"
                className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center font-jetbrains-mono"
              >
                Analyze Your Resume
              </a>
              <a 
                href="/contact"
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center font-jetbrains-mono"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}