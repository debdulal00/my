import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Upload,
  Printer,
  FileText,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  FolderGit2,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setUploadedPdfUrl(url);
      setUploadedFileName(file.name);
    } else if (file) {
      alert('Please upload a valid PDF file format.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (uploadedPdfUrl) {
      const link = document.createElement('a');
      link.href = uploadedPdfUrl;
      link.download = uploadedFileName || 'Debdulal_Sahoo_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Generate dynamic downloadable ATS text/document representation
    const textContent = `
===================================================================
DEBDULAL SAHOO - CURRICULUM VITAE
AI/ML Developer | Generative AI Enthusiast | AI Product Builder
Location: Contai, West Bengal, India
Email: ${PORTFOLIO_DATA.personal.email}
GitHub: ${PORTFOLIO_DATA.socialLinks.github}
LinkedIn: ${PORTFOLIO_DATA.socialLinks.linkedin}
===================================================================

EDUCATION
---------
B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)
Brainware University | Expected Graduation: August 2027
Current CGPA: 8.6 / 10.0

Higher Secondary (10+2) - Science Stream
Baita MN High School | West Bengal Board

Secondary Education (10th)
Keutgeria Vidya Sagar High School | West Bengal Board

TECHNICAL SKILLS
----------------
- Programming Languages: Python, C++, SQL, TypeScript
- Machine Learning & Data: Scikit-learn, Pandas, NumPy, Data Analysis, Feature Engineering
- Generative AI & Agents: LangGraph, LangChain, RAG, Prompt Engineering, Multi-Agent Systems
- Development & Cloud: Streamlit, Node.js, Express.js, PostgreSQL, Firebase, Git, GitHub
- CS Fundamentals: Data Structures & Algorithms, OOP, DBMS, Problem Solving

INDEPENDENT PRODUCT DEVELOPMENT & PROJECTS
-----------------------------------------
1. ToolsVerse AI (https://toolsverseai.com/)
   Role: Founder / Independent Developer
   - Built a comprehensive online platform aggregating practical AI tools and productivity utilities.
   - Designed responsive architecture with React, TypeScript, and AI backend pipelines.

2. SivInd AI
   Role: Founder / Independent Developer
   - Developed an AI-powered customer support SaaS platform for automated business workflows.
   - Built with Node.js, Express.js, Firebase, Gemini API, and Razorpay subscriptions.

3. AI Travel Planner
   Role: AI Application Developer
   - Multi-agent AI architecture generating personalized itineraries based on budget and preferences.
   - Tech: Python, LangGraph, LangChain, Streamlit, PostgreSQL, Gemini API, Tavily, AviationStack.

4. SkinVision AI
   Role: Independent AI Product Developer (In Development)
   - Concept application for understanding visible skin concerns through image analysis and tracking.
   - Tech: Google AI Studio, Gemini API, Firebase.

5. IndoNest (https://indonest.online/)
   Role: Founder / Website Developer
   - Independent e-commerce brand and online storefront engineered for seamless customer shopping.

AVAILABILITY
------------
Open to AI/ML Internships, Research Roles & Global Remote Opportunities.
`.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Debdulal_Sahoo_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#08090D] border border-[#DCE3EF] dark:border-[rgba(148,163,184,0.22)] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCE3EF] dark:border-[rgba(148,163,184,0.18)] bg-slate-50 dark:bg-[#10131B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-[#141722] border border-[#DCE3EF] dark:border-[#262B38]">
              <FileText className="w-4 h-4 text-[#365FF5] dark:text-[#557CFF]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-white">
                Debdulal Sahoo · Curriculum Vitae
              </h3>
              <p className="text-[11px] text-[#64748B] dark:text-slate-400 font-mono">
                {uploadedFileName ? `Loaded: ${uploadedFileName}` : 'ATS Verified Layout · Updated 2026'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Upload PDF Replacement Trigger */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Upload your updated resume PDF"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#475569] dark:text-slate-300 bg-slate-100 dark:bg-[#141722] border border-[#DCE3EF] dark:border-[#262B38] hover:text-[#365FF5] dark:hover:text-[#557CFF] hover:border-[#365FF5] transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Replace PDF</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="application/pdf"
              className="hidden"
            />

            {/* Print / Save as PDF */}
            <button
              onClick={handlePrint}
              title="Print / Save PDF"
              className="p-2 rounded-lg text-[#475569] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#141722] transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              title="Download Resume"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#365FF5] dark:bg-[#557CFF] hover:opacity-95 flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close resume viewer"
              className="p-2 rounded-lg text-[#64748B] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#141722] transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: ATS Resume Document Presentation */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-100 dark:bg-[#08090D] text-left">
          {uploadedPdfUrl ? (
            <div className="w-full h-[650px] rounded-xl overflow-hidden border border-[#DCE3EF] dark:border-[#262B38]">
              <iframe
                src={uploadedPdfUrl}
                title="Uploaded PDF Resume"
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#10131B] border border-[#DCE3EF] dark:border-[#262B38] shadow-xl space-y-8 text-[#111827] dark:text-white print:bg-white print:text-black">
              {/* ATS Header */}
              <div className="border-b border-[#DCE3EF] dark:border-[#262B38] pb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 text-[#111827] dark:text-white">
                  DEBDULAL SAHOO
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-[#365FF5] dark:text-[#557CFF] mb-3">
                  AI/ML Developer · Generative AI Builder · Entrepreneur
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#64748B] dark:text-slate-400">
                  <span>Contai, West Bengal, India</span>
                  <span>·</span>
                  <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:underline">
                    {PORTFOLIO_DATA.personal.email}
                  </a>
                  <span>·</span>
                  <a
                    href={PORTFOLIO_DATA.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    github.com/debdulal00
                  </a>
                  <span>·</span>
                  <a
                    href={PORTFOLIO_DATA.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F8CFF] mb-3 font-mono border-b border-[#262B38]/50 pb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div>
                      <strong className="text-sm font-bold block">
                        B.Tech in Computer Science and Engineering (AI & ML)
                      </strong>
                      <span className="text-slate-400">Brainware University</span>
                    </div>
                    <div className="text-left sm:text-right text-slate-400 font-mono mt-1 sm:mt-0">
                      <span>Expected: August 2027</span>
                      <span className="block font-semibold text-emerald-400">CGPA: 8.6 / 10.0</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs text-slate-400">
                    <div>
                      <span className="font-semibold text-slate-300">Higher Secondary (Science Stream)</span>
                      <span className="block text-[11px]">Baita MN High School · WB Council</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F8CFF] mb-3 font-mono border-b border-[#262B38]/50 pb-1">
                  <Code2 className="w-4 h-4" />
                  <span>Technical Proficiencies</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <strong className="text-slate-300 block mb-1">Languages & Core:</strong>
                    <span className="text-slate-400">Python, C++, SQL, TypeScript, JavaScript, Algorithms & Data Structures</span>
                  </div>
                  <div>
                    <strong className="text-slate-300 block mb-1">Generative AI & Agent Systems:</strong>
                    <span className="text-slate-400">LangGraph, LangChain, RAG Pipelines, Multi-Agent Systems, Gemini API</span>
                  </div>
                  <div>
                    <strong className="text-slate-300 block mb-1">Machine Learning & Data:</strong>
                    <span className="text-slate-400">Scikit-learn, Pandas, NumPy, Feature Engineering, Model Evaluation</span>
                  </div>
                  <div>
                    <strong className="text-slate-300 block mb-1">Web, Databases & Tools:</strong>
                    <span className="text-slate-400">Streamlit, Node.js, Express.js, PostgreSQL, Firebase, Git, GitHub</span>
                  </div>
                </div>
              </div>

              {/* Flagship Projects */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F8CFF] mb-3 font-mono border-b border-[#262B38]/50 pb-1">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Key Project Highlights</span>
                </div>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex items-center justify-between font-bold text-sm mb-0.5">
                      <span>ToolsVerse AI (toolsverseai.com)</span>
                      <span className="font-mono text-slate-400 text-xs">Founder / Lead Dev</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Online platform bringing useful AI-powered tools and productivity solutions into a single accessible web suite with low latency.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-bold text-sm mb-0.5">
                      <span>SivInd AI</span>
                      <span className="font-mono text-slate-400 text-xs">Founder / Lead Dev</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      AI customer support SaaS for automated business interactions, multilingual support, knowledge-base retrieval, and Razorpay subscriptions.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-bold text-sm mb-0.5">
                      <span>AI Travel Planner</span>
                      <span className="font-mono text-slate-400 text-xs">AI Developer</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Multi-agent system using LangGraph & Gemini API orchestrating specialized agents for flight research, hotel scoring, and persistent itinerary generation.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-bold text-sm mb-0.5">
                      <span>IndoNest (indonest.online)</span>
                      <span className="font-mono text-slate-400 text-xs">Founder / Developer</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Independent e-commerce storefront showcasing digital product branding, order processing, and customer-focused checkout experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F8CFF] mb-3 font-mono border-b border-[#262B38]/50 pb-1">
                  <Briefcase className="w-4 h-4" />
                  <span>Development Track</span>
                </div>
                <div className="text-xs">
                  <div className="flex items-baseline justify-between font-bold mb-1">
                    <span>Independent AI & Software Product Development</span>
                    <span className="font-mono text-slate-400">2023 – Present</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Conceptualizing, designing, and launching digital products, web platforms, and LLM applications alongside academic coursework.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
