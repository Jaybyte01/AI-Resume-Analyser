'use client';

import { useState } from 'react';
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { MessageSquare, Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E]">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl mb-6">
              <MessageSquare className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-jetbrains-mono">
              Have questions about our AI Resume Analyzer? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-[#262626] rounded-xl p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                Send us a message
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors font-jetbrains-mono"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-jetbrains-mono">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-jetbrains-mono"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-jetbrains-mono">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-jetbrains-mono"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-jetbrains-mono">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-jetbrains-mono"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-jetbrains-mono"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-[#262626] rounded-xl p-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                  Get in touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">contact@resumeai.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">Office</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                        123 Innovation Drive<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#262626] rounded-xl p-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                  FAQ
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                      Is my resume data secure?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                      Yes! All data is processed locally in your browser and stored in localStorage. We don't send your resume to external servers.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                      What file formats are supported?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                      We support PDF and DOCX files up to 5MB in size.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 font-jetbrains-mono">
                      How accurate is the ATS scoring?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                      Our AI analyzes your resume based on common ATS criteria used by major companies, providing accurate insights for optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}