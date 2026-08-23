"use client";
import React, { useState } from 'react';
import { Upload, FileCheck, FileSpreadsheet, FileText, Presentation, ArrowLeft } from 'lucide-react';

export default function AIWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async () => {
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Save the AI data to browser memory for the verify page
        localStorage.setItem('extractedFarmer', JSON.stringify(result.data));
        setShowActions(true);
      } else {
        alert("AI could not read the document. Please try a clearer image.");
      }
    } catch (error) {
      alert("System error connecting to AI.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-slate-50 min-h-screen font-sans">
      {/* Back Button */}
      <button 
        onClick={() => window.location.href = '/'} 
        className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-2 text-slate-900">🤖 AI Document Workspace</h1>
      <p className="text-slate-500 mb-8">Upload farmer documents or government circulars to let AI automate your office work.</p>

      {/* Step 1: Upload Zone */}
      {!showActions && (
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-green-500 transition-all cursor-pointer relative group">
          <input 
            type="file" 
            multiple 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={handleFileUpload}
          />
          <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4 group-hover:text-green-500 transition" />
          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            {files.length > 0 ? `${files.length} files selected` : "Drag & drop files here or click to upload"}
          </h2>
          <p className="text-slate-400 text-sm mb-6">Supports PDF, XLSX, JPG, PNG, DOCX</p>
          
          {files.length > 0 && (
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevents the file picker from opening again
                processFiles();
              }}
              className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg transition animate-bounce"
            >
              {isProcessing ? "AI is reading documents..." : "Analyze Documents"}
            </button>
          )}
        </div>
      )}

      {/* Step 2: AI Actions */}
      {showActions && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-8 flex items-center space-x-3">
            <FileCheck className="text-green-600" />
            <p className="text-green-800 font-medium">
              AI detected: <span className="font-bold">Aadhaar Card, RTC Pahani, and Bank Passbook.</span>
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">"What would you like to create from these files?"</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AIActionButton 
              icon={FileText} 
              title="Farmer Application" 
              desc="Auto-fill complete application form" 
              color="bg-blue-50" 
              onClick={() => window.location.href = '/verify'}
            />
            <AIActionButton 
              icon={FileSpreadsheet} 
              title="Excel MIS Workbook" 
              desc="Generate structured MIS reports" 
              color="bg-green-50" 
              onClick={() => window.location.href = '/api/reports/export-mis'}
            />
            <AIActionButton 
              icon={Presentation} 
              title="Office Presentation" 
              desc="Create a progress PPT for review" 
              color="bg-purple-50" 
              onClick={() => window.location.href = '/api/reports/export-ppt'}
            />
          </div>
          
          <button 
            onClick={() => setShowActions(false)} 
            className="mt-12 text-slate-500 underline block mx-auto text-sm hover:text-slate-800"
          >
            Upload different files
          </button>
        </div>
      )}
    </div>
  );
}

// THE FIXED BUTTON COMPONENT
function AIActionButton({ icon: Icon, title, desc, color, onClick }: any) {
  return (
    <button 
      onClick={onClick} // THIS IS THE WIRE THAT MAKES IT WORK
      className={`${color} p-6 rounded-2xl border border-slate-200 text-left hover:shadow-md transition group hover:-translate-y-1`}
    >
      <div className="bg-white p-3 rounded-lg w-fit shadow-sm mb-4 group-hover:scale-110 transition">
        <Icon className="w-6 h-6 text-slate-700" />
      </div>
      <h4 className="text-lg font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </button>
  );
}