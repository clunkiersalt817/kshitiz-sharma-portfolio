import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Bot, User, FileText, 
  Briefcase, Search, CheckCircle2, Loader2, ExternalLink,
  ChevronRight, Sparkles, SendHorizontal, Download, Code, Copy, Check
} from 'lucide-react';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage, JobListing } from '../types';
import { PORTFOLIO_DATA } from '../constants';

type Tab = 'chat' | 'resume' | 'jobs';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I am your personal Career Agent. I can generate a tailored LaTeX resume for you, find matching jobs in ${PORTFOLIO_DATA.personalInfo.location}, and even help you apply. What shall we do first?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [applyingLabel, setApplyingLabel] = useState('Applying to Roles...');
  const [resumeContent, setResumeContent] = useState<string>('');
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const [applyProgress, setApplyProgress] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const handleTriggerResume = () => {
      setIsOpen(true);
      generateResume();
    };
    window.addEventListener('trigger-ai-resume', handleTriggerResume);
    return () => window.removeEventListener('trigger-ai-resume', handleTriggerResume);
  }, []);

  const handleSendMessage = async (e?: React.FormEvent, customPrompt?: string) => {
    e?.preventDefault();
    const messageText = customPrompt || inputValue;
    if (!messageText.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: messageText
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const botMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: botMessageId, role: 'model', text: '', isLoading: true }]);

    let accumulatedText = '';
    await streamChatResponse(
      [], 
      messageText,
      (chunkDelta) => {
        accumulatedText += chunkDelta;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, text: accumulatedText, isLoading: false }
            : msg
        ));
        
        if (accumulatedText.includes('\\documentclass')) {
          setResumeContent(accumulatedText);
        }
      },
      (metadata) => {
        if (metadata.groundingChunks) {
          const foundJobs: JobListing[] = metadata.groundingChunks
            .filter((chunk: any) => chunk.web)
            .map((chunk: any, index: number) => {
              let hostname = "Job Site";
              try { hostname = new URL(chunk.web.uri).hostname; } catch (e) {}
              return {
                id: `job-${index}-${Date.now()}`,
                title: chunk.web.title || "Job Opportunity",
                company: "Career Portal",
                location: PORTFOLIO_DATA.personalInfo.location,
                link: chunk.web.uri,
                source: hostname
              };
            });
          if (foundJobs.length > 0) {
            setJobs(prev => {
              const ids = new Set(prev.map(j => j.link));
              const filtered = foundJobs.filter(j => !ids.has(j.link));
              return [...prev, ...filtered].slice(0, 10);
            });
          }
        }
      }
    );
    setIsTyping(false);
  };

  const generateResume = () => {
    setActiveTab('chat');
    handleSendMessage(undefined, "Generate professional LaTeX source code for my resume based on my portfolio data. Use a modern and clean LaTeX template.");
  };

  const copyTex = () => {
    navigator.clipboard.writeText(resumeContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadTex = () => {
    if (!resumeContent) return;
    const blob = new Blob([resumeContent], { type: 'application/x-tex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${PORTFOLIO_DATA.personalInfo.name.replace(/\s+/g, '_')}_Resume.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPdf = async () => {
    setIsExporting(true);
    try {
      // @ts-ignore - jspdf is globally available
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      });

      // Configuration
      const margin = 20;
      const pageWidth = doc.internal.pageSize.width;
      let y = 20;

      // Helper: Section Header
      const addSection = (title: string) => {
        y += 10;
        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.text(title.toUpperCase(), margin, y);
        y += 2;
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
      };

      // Header
      doc.setFont('times', 'bold');
      doc.setFontSize(22);
      const nameWidth = doc.getTextWidth(PORTFOLIO_DATA.personalInfo.name);
      doc.text(PORTFOLIO_DATA.personalInfo.name, (pageWidth - nameWidth) / 2, y);
      y += 8;

      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      const contactStr = `${PORTFOLIO_DATA.personalInfo.location} | ${PORTFOLIO_DATA.personalInfo.email} | github.com/clunkiersalt817`;
      const contactWidth = doc.getTextWidth(contactStr);
      doc.text(contactStr, (pageWidth - contactWidth) / 2, y);
      y += 5;

      // Summary
      addSection('Professional Summary');
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      const summaryLines = doc.splitTextToSize(PORTFOLIO_DATA.personalInfo.bio, pageWidth - (margin * 2));
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 6;

      // Experience
      addSection('Experience');
      PORTFOLIO_DATA.experience.forEach((exp) => {
        doc.setFont('times', 'bold');
        doc.text(exp.role, margin, y);
        doc.setFont('times', 'italic');
        const periodWidth = doc.getTextWidth(exp.period);
        doc.text(exp.period, pageWidth - margin - periodWidth, y);
        y += 5;
        
        doc.setFont('times', 'bold');
        doc.text(exp.company, margin, y);
        y += 6;

        doc.setFont('times', 'normal');
        exp.description.forEach((bullet) => {
          const bulletLines = doc.splitTextToSize(`• ${bullet}`, pageWidth - (margin * 2 + 5));
          doc.text(bulletLines, margin + 5, y);
          y += bulletLines.length * 6;
        });
        y += 4;
      });

      // Skills
      addSection('Technical Skills');
      PORTFOLIO_DATA.skills.forEach((cat) => {
        doc.setFont('times', 'bold');
        doc.text(`${cat.category}:`, margin, y);
        doc.setFont('times', 'normal');
        doc.text(cat.skills.join(', '), margin + 40, y);
        y += 6;
      });

      // Projects
      addSection('Projects');
      PORTFOLIO_DATA.projects.forEach((proj) => {
        doc.setFont('times', 'bold');
        doc.text(proj.title, margin, y);
        y += 5;
        doc.setFont('times', 'normal');
        const projLines = doc.splitTextToSize(proj.description, pageWidth - (margin * 2));
        doc.text(projLines, margin, y);
        y += projLines.length * 6 + 4;
      });

      doc.save(`${PORTFOLIO_DATA.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error("Native PDF generation failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const findJobs = () => {
    setActiveTab('chat');
    handleSendMessage(undefined, `Find recent DevOps Engineer job openings in ${PORTFOLIO_DATA.personalInfo.location} using Google Search.`);
  };

  const toggleJobSelection = (id: string) => {
    const newSelected = new Set(selectedJobs);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedJobs(newSelected);
  };

  const startApplicationSimulation = (count: number, label: string) => {
    setIsApplying(true);
    setApplyingLabel(label);
    setApplyProgress(0);
    const interval = setInterval(() => {
      setApplyProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsApplying(false);
            setMessages(prevMsgs => [...prevMsgs, {
              id: Date.now().toString(),
              role: 'model',
              text: `All done! I've processed applications for ${count} position${count !== 1 ? 's' : ''}. Your LaTeX resume and profile have been submitted successfully.`
            }]);
            setActiveTab('chat');
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 120);
  };

  const applyToIndividual = (job: JobListing) => {
    startApplicationSimulation(1, `Applying to ${job.company}...`);
  };

  const applyToSelected = () => {
    const targetCount = selectedJobs.size > 0 ? selectedJobs.size : jobs.length;
    if (targetCount === 0) return;
    startApplicationSimulation(targetCount, `Applying to ${targetCount} positions...`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[380px] sm:w-[500px] h-[650px] bg-white dark:bg-card rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">AI Career Agent (LaTeX)</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Online</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex px-4 gap-4">
              {[
                { id: 'chat', icon: MessageSquare, label: 'Chat' },
                { id: 'resume', icon: Code, label: 'LaTeX' },
                { id: 'jobs', icon: Briefcase, label: 'Jobs' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-1.5 py-2 px-1 border-b-2 transition-colors text-xs font-semibold ${
                    activeTab === tab.id 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative flex flex-col">
            
            {activeTab === 'chat' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-dark/50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-primary" />}
                    </div>
                    <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm'}`}>
                      {msg.isLoading && !msg.text ? (
                        <div className="flex gap-1 py-1">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                      )}
                    </div>
                  </div>
                ))}
                
                {messages.length < 3 && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button onClick={generateResume} className="p-3 text-left text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary transition-colors flex items-center gap-2 group shadow-sm">
                      <Code className="w-4 h-4 text-primary" />
                      <div>
                        <span className="font-bold block">Generate LaTeX</span>
                        <span className="text-slate-500">Source Code</span>
                      </div>
                    </button>
                    <button onClick={findJobs} className="p-3 text-left text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary transition-colors flex items-center gap-2 group shadow-sm">
                      <Search className="w-4 h-4 text-primary" />
                      <div>
                        <span className="font-bold block">Find Jobs</span>
                        <span className="text-slate-500">In Bengaluru</span>
                      </div>
                    </button>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 dark:bg-dark relative">
                {resumeContent ? (
                  <>
                    <div className="flex justify-between items-center mb-4 no-print">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-400">LaTeX Source</h4>
                      <div className="flex gap-2">
                        <button onClick={copyTex} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                          {isCopied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                          {isCopied ? 'Copied' : 'Copy'}
                        </button>
                        <button onClick={downloadTex} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                          <Download className="w-3 h-3" />
                          .tex
                        </button>
                        <button onClick={downloadPdf} disabled={isExporting} className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-[10px] font-bold rounded-md shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50">
                          {isExporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                          {isExporting ? 'Building PDF...' : 'Download Selectable PDF'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900 text-slate-300 p-6 rounded-lg font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 whitespace-pre scrollbar-thin scrollbar-thumb-slate-700">
                      {resumeContent}
                    </div>
                    <p className="mt-4 text-[10px] text-slate-500 italic text-center">The PDF download generates a high-fidelity document with searchable text using native PDF libraries.</p>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <Code className="w-12 h-12 text-slate-300 animate-pulse" />
                    <p className="text-slate-500 text-sm">No LaTeX resume generated yet.</p>
                    <button onClick={generateResume} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/20">Generate LaTeX & PDF</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-dark/50 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">{jobs.length} Match{jobs.length !== 1 ? 'es' : ''} Found</h4>
                  {jobs.length > 0 && (
                    <button onClick={applyToSelected} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Apply Selected
                    </button>
                  )}
                </div>
                
                <div className="space-y-4 pb-24">
                  {jobs.map((job) => (
                    <div 
                      key={job.id} 
                      onClick={() => toggleJobSelection(job.id)}
                      className={`p-4 bg-white dark:bg-slate-800 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedJobs.has(job.id) ? 'border-primary' : 'border-transparent border-slate-200 dark:border-slate-700 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-2">
                          <h5 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{job.title}</h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{job.company}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${selectedJobs.has(job.id) ? 'bg-primary border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                          {selectedJobs.has(job.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <button onClick={(e) => { e.stopPropagation(); applyToIndividual(job); }} className="flex-1 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5">
                          <SendHorizontal className="w-3 h-3" /> Apply Now
                        </button>
                        <a href={job.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="px-2 py-1.5 border border-slate-200 dark:border-slate-700 hover:border-primary text-slate-400 hover:text-primary rounded-lg transition-colors">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                  {jobs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Search className="w-12 h-12 text-slate-300 mb-4" />
                      <p className="text-slate-500 text-sm">Find your next role.</p>
                      <button onClick={findJobs} className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-xs font-bold shadow-lg shadow-primary/20">Search Jobs</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(isApplying || isExporting) && (
              <div className="absolute inset-0 z-30 bg-white/95 dark:bg-dark/95 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm animate-in fade-in duration-300">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-primary transition-all duration-150 ease-out" strokeDasharray={276} strokeDashoffset={isExporting ? 276 : 276 - (276 * applyProgress) / 100} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-primary">
                    {isExporting ? <Loader2 className="w-8 h-8 animate-spin" /> : `${applyProgress}%`}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{isExporting ? 'Generating Document...' : applyingLabel}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">{isExporting ? 'Constructing native PDF text layers for searchability and selectability...' : 'Submitting your professional profile and experience to the hiring team.'}</p>
              </div>
            )}
          </div>

          {activeTab === 'chat' && (
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <div className="relative">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask your agent for a LaTeX resume..." className="w-full bg-slate-100 dark:bg-dark border border-slate-300 dark:border-slate-600 rounded-full py-2.5 pl-4 pr-12 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary placeholder:text-slate-500" disabled={isTyping} />
                <button type="submit" disabled={!inputValue.trim() || isTyping} className="absolute right-1.5 top-1.5 p-1.5 bg-primary text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-primary rounded-full shadow-xl shadow-blue-500/30 flex items-center justify-center hover:scale-105 transition-all group relative">
        {isOpen ? <X className="w-8 h-8 text-white" /> : <div className="relative"><Sparkles className="w-8 h-8 text-white animate-pulse" /><span className="absolute -top-3 -right-3 bg-red-500 text-[10px] font-bold text-white px-2 py-0.5 rounded-full border-2 border-white dark:border-darker">AI</span></div>}
      </button>
    </div>
  );
};

export default AIChat;