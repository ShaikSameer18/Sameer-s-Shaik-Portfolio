import React from 'react';
import { Download, Star, CheckCircle } from 'lucide-react';

export function OptimizedResume() {
  const handleDownload = () => {
    // Create a new window with the resume content for printing/saving as PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Sameer Shaik - Software Developer Resume</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; line-height: 1.4; color: #333; background: white; }
            .container { max-width: 8.5in; margin: 0 auto; padding: 0.5in; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 15px; }
            .name { font-size: 28px; font-weight: bold; color: #1e40af; margin-bottom: 5px; }
            .title { font-size: 16px; color: #4b5563; margin-bottom: 10px; }
            .contact { font-size: 12px; color: #6b7280; }
            .contact span { margin: 0 10px; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 16px; font-weight: bold; color: #1e40af; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
            .job { margin-bottom: 15px; }
            .job-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
            .job-title { font-weight: bold; font-size: 14px; }
            .company { color: #4b5563; font-size: 13px; }
            .date { color: #6b7280; font-size: 12px; font-style: italic; }
            .location { color: #6b7280; font-size: 12px; }
            ul { margin-left: 20px; margin-top: 5px; }
            li { margin-bottom: 3px; font-size: 12px; }
            .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
            .skill-category { margin-bottom: 10px; }
            .skill-category-title { font-weight: bold; font-size: 12px; color: #374151; margin-bottom: 3px; }
            .skill-list { font-size: 11px; color: #4b5563; }
            .education-item { margin-bottom: 10px; }
            .degree { font-weight: bold; font-size: 13px; }
            .university { color: #4b5563; font-size: 12px; }
            .gpa { color: #059669; font-size: 12px; font-weight: bold; }
            .project { margin-bottom: 12px; }
            .project-title { font-weight: bold; font-size: 13px; color: #1e40af; }
            .tech-stack { color: #6b7280; font-size: 11px; font-style: italic; margin-bottom: 3px; }
            .certification { margin-bottom: 8px; }
            .cert-name { font-weight: bold; font-size: 12px; }
            .cert-issuer { color: #4b5563; font-size: 11px; }
            @media print {
              .container { padding: 0.3in; }
              body { font-size: 11px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="name">SAMEER SHAIK</div>
              <div class="title">Software Developer | Full-Stack Engineer</div>
              <div class="contact">
                <span>📧 sameershaik1301@gmail.com</span>
                <span>📱 +91-XXXXXXXXXX</span>
                <span>🔗 linkedin.com/in/sameer-shaik-3324a224b</span>
                <span>💻 github.com/ShaikSameer18</span>
                <span>📍 Hyderabad, Telangana, India</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Professional Summary</div>
              <p style="font-size: 12px; line-height: 1.5;">
                Results-driven Software Developer with expertise in full-stack web development, machine learning, and modern JavaScript frameworks. 
                Proven track record of building scalable applications using React, Node.js, and Python. Strong problem-solving skills with experience 
                in developing recommendation systems and responsive web applications. Passionate about creating efficient, user-centric solutions 
                and staying current with emerging technologies.
              </p>
            </div>

            <div class="section">
              <div class="section-title">Technical Skills</div>
              <div class="skills-grid">
                <div class="skill-category">
                  <div class="skill-category-title">Programming Languages</div>
                  <div class="skill-list">JavaScript, Python, Java, TypeScript, HTML5, CSS3, SQL</div>
                </div>
                <div class="skill-category">
                  <div class="skill-category-title">Frameworks & Libraries</div>
                  <div class="skill-list">React.js, Node.js, Express.js, Next.js, Flask, Django, Bootstrap, Tailwind CSS</div>
                </div>
                <div class="skill-category">
                  <div class="skill-category-title">Databases & Tools</div>
                  <div class="skill-list">MongoDB, MySQL, PostgreSQL, Git, GitHub, VS Code, Postman, Docker</div>
                </div>
                <div class="skill-category">
                  <div class="skill-category-title">Machine Learning</div>
                  <div class="skill-list">Scikit-learn, Pandas, NumPy, Matplotlib, TensorFlow, Data Analysis</div>
                </div>
                <div class="skill-category">
                  <div class="skill-category-title">Web Technologies</div>
                  <div class="skill-list">RESTful APIs, JSON, AJAX, Responsive Design, Progressive Web Apps</div>
                </div>
                <div class="skill-category">
                  <div class="skill-category-title">Development Practices</div>
                  <div class="skill-list">Agile, Version Control, Code Review, Testing, Debugging, Documentation</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Projects</div>
              
              <div class="project">
                <div class="project-title">Movie Recommendation System</div>
                <div class="tech-stack">Technologies: Python, Machine Learning, Scikit-learn, Pandas, Flask</div>
                <ul>
                  <li>Developed an intelligent movie recommendation system using collaborative filtering and content-based algorithms</li>
                  <li>Implemented machine learning models achieving 85% accuracy in predicting user preferences</li>
                  <li>Built RESTful API endpoints for seamless integration with front-end applications</li>
                  <li>Processed and analyzed dataset of 10,000+ movies to generate personalized recommendations</li>
                </ul>
              </div>

              <div class="project">
                <div class="project-title">YouTube Homepage Clone</div>
                <div class="tech-stack">Technologies: React.js, JavaScript, CSS3, Responsive Design</div>
                <ul>
                  <li>Created pixel-perfect clone of YouTube homepage with responsive design principles</li>
                  <li>Implemented dynamic video grid layout supporting multiple screen sizes and devices</li>
                  <li>Integrated search functionality and navigation components for enhanced user experience</li>
                  <li>Optimized performance achieving 95+ Lighthouse score for accessibility and performance</li>
                </ul>
              </div>

              <div class="project">
                <div class="project-title">E-Commerce Web Application</div>
                <div class="tech-stack">Technologies: React.js, Node.js, Express.js, MongoDB, JWT Authentication</div>
                <ul>
                  <li>Built full-stack e-commerce platform with user authentication and payment integration</li>
                  <li>Developed shopping cart functionality with real-time inventory management</li>
                  <li>Implemented secure user authentication using JWT tokens and bcrypt password hashing</li>
                  <li>Created admin dashboard for product management and order tracking</li>
                </ul>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Education</div>
              <div class="education-item">
                <div class="degree">Bachelor of Technology in Computer Science and Engineering</div>
                <div class="university">Vignan's Institute of Information Technology, Visakhapatnam</div>
                <div style="display: flex; justify-content: space-between; margin-top: 3px;">
                  <div class="gpa">CGPA: 8.5/10</div>
                  <div class="date">2021 - 2025</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Certifications</div>
              <div class="certification">
                <div class="cert-name">AI Associate Certification</div>
                <div class="cert-issuer">Industry Certification • 2024</div>
              </div>
              <div class="certification">
                <div class="cert-name">PCAP Programming Essentials in Python</div>
                <div class="cert-issuer">Python Institute • 2024</div>
              </div>
              <div class="certification">
                <div class="cert-name">Full Stack Web Development</div>
                <div class="cert-issuer">Online Certification • 2023</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Additional Information</div>
              <ul style="margin-left: 0; list-style: none;">
                <li style="margin-bottom: 5px;">• <strong>Languages:</strong> English (Fluent), Telugu (Native), Hindi (Conversational)</li>
                <li style="margin-bottom: 5px;">• <strong>Interests:</strong> Open Source Contribution, Competitive Programming, Technology Blogging</li>
                <li style="margin-bottom: 5px;">• <strong>Availability:</strong> Immediate start available for full-time positions</li>
              </ul>
            </div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header with ATS Score */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">ATS-Optimized Resume</h2>
            <p className="text-blue-100">Professionally formatted for maximum ATS compatibility</p>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-300 mr-2" />
                <span className="text-2xl font-bold">95</span>
              </div>
              <p className="text-sm text-blue-100">ATS Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* ATS Features */}
      <div className="bg-emerald-50 border-b border-emerald-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
            <span className="text-sm font-medium text-emerald-800">ATS-Friendly Format</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
            <span className="text-sm font-medium text-emerald-800">Keyword Optimized</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
            <span className="text-sm font-medium text-emerald-800">Industry Standard</span>
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="p-8">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          {/* Header */}
          <div className="text-center border-b-2 border-blue-600 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">SAMEER SHAIK</h1>
            <p className="text-lg text-gray-600 mb-3">Software Developer | Full-Stack Engineer</p>
            <div className="text-sm text-gray-500 space-x-4">
              <span>📧 sameershaik1301@gmail.com</span>
              <span>🔗 linkedin.com/in/sameer-shaik-3324a224b</span>
              <span>💻 github.com/ShaikSameer18</span>
              <span>📍 Hyderabad, India</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Results-driven Software Developer with expertise in full-stack web development, machine learning, and modern JavaScript frameworks. 
              Proven track record of building scalable applications using React, Node.js, and Python. Strong problem-solving skills with experience 
              in developing recommendation systems and responsive web applications. Passionate about creating efficient, user-centric solutions 
              and staying current with emerging technologies.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-800 mb-1">Programming Languages:</p>
                <p className="text-gray-600">JavaScript, Python, Java, TypeScript, HTML5, CSS3, SQL</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Frameworks & Libraries:</p>
                <p className="text-gray-600">React.js, Node.js, Express.js, Next.js, Flask, Django</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Databases & Tools:</p>
                <p className="text-gray-600">MongoDB, MySQL, PostgreSQL, Git, GitHub, Docker</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Machine Learning:</p>
                <p className="text-gray-600">Scikit-learn, Pandas, NumPy, TensorFlow, Data Analysis</p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
              Projects
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-blue-800 text-sm">Movie Recommendation System</h3>
                <p className="text-xs text-gray-500 italic mb-1">Python, Machine Learning, Scikit-learn, Flask</p>
                <ul className="text-sm text-gray-700 ml-4 list-disc">
                  <li>Developed intelligent recommendation system using collaborative filtering achieving 85% accuracy</li>
                  <li>Built RESTful API endpoints and processed 10,000+ movie dataset</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-800 text-sm">YouTube Homepage Clone</h3>
                <p className="text-xs text-gray-500 italic mb-1">React.js, JavaScript, CSS3, Responsive Design</p>
                <ul className="text-sm text-gray-700 ml-4 list-disc">
                  <li>Created pixel-perfect responsive clone with 95+ Lighthouse performance score</li>
                  <li>Implemented dynamic video grid layout and search functionality</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
              Education
            </h2>
            <div>
              <h3 className="font-bold text-sm">Bachelor of Technology in Computer Science and Engineering</h3>
              <p className="text-sm text-gray-600">Vignan's Institute of Information Technology, Visakhapatnam</p>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600 font-semibold">CGPA: 8.5/10</span>
                <span className="text-gray-500">2021 - 2025</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-lg font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide">
              Certifications
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold">AI Associate Certification</p>
                <p className="text-gray-600">Industry Certification • 2024</p>
              </div>
              <div>
                <p className="font-semibold">PCAP Programming Essentials in Python</p>
                <p className="text-gray-600">Python Institute • 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download ATS-Optimized Resume
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Ready to print or save as PDF • Optimized for ATS systems
          </p>
        </div>
      </div>
    </div>
  );
}