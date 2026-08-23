"use client";
import React, { useState, useEffect } from 'react'; // Added useEffect
import { Check, X, Save, ArrowLeft, FileText, ShieldCheck, Banknote, Map } from 'lucide-react';

export default function VerifyApplication() {
  // 1. Default data (Suresh) in case the AI fails
  const [formData, setFormData] = useState({
    personal: { fullName: "Suresh Kumar", mobile: "9876543210", address: "Village Yadrami, Jewargi Taluka" },
    land: { surveyNumber: "124/A", area: "2.5 Hectares", village: "Yadrami", hobli: "Yadrami" },
    bank: { accountHolder: "Suresh Kumar", accountNumber: "XXXX-XXXX-5678", ifsc: "SBIN0001234", bankName: "State Bank of India" },
  });

  // 2. THE MAGIC: Read AI data from browser memory on load
  useEffect(() => {
    const aiData = localStorage.getItem('extractedFarmer');
    if (aiData) {
      try {
        const parsedData = JSON.parse(aiData);
        setFormData(parsedData);
        console.log("✅ AI Data loaded into form!");
      } catch (e) {
        console.error("Error parsing AI data", e);
      }
    }
  }, []);

  const handleSave = async () => {
    try {
      alert("Saving to database... please wait.");
      const response = await fetch('/api/save-farmer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("🎉 SUCCESS! Farmer saved to Supabase database!");
        localStorage.removeItem('extractedFarmer'); // Clear memory after saving
        window.location.href = '/'; 
      } else {
        const errData = await response.json();
        alert("❌ DATABASE ERROR: " + (errData.error || "Unknown error"));
      }
    } catch (error) {
      alert("❌ System error connecting to the server.");
    }
  };

  // ... (keep the rest of the return/JSX code the same as before)

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Left Side: Document Preview */}
      <div className="w-1/2 p-6 border-r bg-slate-200 flex flex-col">
        <button 
          onClick={() => window.location.href = '/ai-workspace'} 
          className="flex items-center text-slate-600 hover:text-slate-900 mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Workspace
        </button>
        <div className="bg-white h-full rounded-xl shadow-inner border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-10 text-center">
          <FileText className="w-20 h-20 text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">Document Preview Window</p>
          <p className="text-slate-400 text-xs mt-2">In the final version, the scanned Aadhaar/RTC will appear here.</p>
        </div>
      </div>

      {/* Right Side: AI-Populated Form */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Verify Farmer Details</h2>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Draft Mode</span>
        </div>

        <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <section>
            <div className="flex items-center mb-4 text-blue-600">
              <ShieldCheck className="w-5 h-5 mr-2" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Identity Details</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <InputField label="Farmer Full Name" value={formData.personal.fullName} />
              <InputField label="Mobile Number" value={formData.personal.mobile} />
              <InputField label="Address" value={formData.personal.address} />
            </div>
          </section>

          <section className="pt-6 border-t">
            <div className="flex items-center mb-4 text-green-600">
              <Map className="w-5 h-5 mr-2" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Land Record (RTC)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Survey Number" value={formData.land.surveyNumber} />
              <InputField label="Land Area" value={formData.land.area} />
              <InputField label="Village" value={formData.land.village} />
              <InputField label="Hobli" value={formData.land.hobli} />
            </div>
          </section>

          <section className="pt-6 border-t">
            <div className="flex items-center mb-4 text-purple-600">
              <Banknote className="w-5 h-5 mr-2" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Bank Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Account Number" value={formData.bank.accountNumber} />
              <InputField label="IFSC Code" value={formData.bank.ifsc} />
              <div className="col-span-2">
                <InputField label="Bank & Branch Name" value={formData.bank.bankName} />
              </div>
            </div>
          </section>

          <div className="flex space-x-4 pt-8 border-t mt-8">
            <button className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-red-100 transition">
              <X className="mr-2 w-4 h-4" /> Reject
            </button>
            <button 
              onClick={handleSave} 
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center hover:bg-green-700 shadow-lg transition"
            >
              <Save className="mr-2 w-4 h-4" /> Approve & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-slate-500 mb-1 font-medium">{label}</label>
      <input 
        className="border border-slate-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50" 
        value={value} 
        readOnly 
      />
    </div>
  );
}