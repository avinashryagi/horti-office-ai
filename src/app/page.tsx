import React from 'react';
import { 
  Users, FileText, CheckCircle, Clock, 
  TrendingUp, Wallet, MapPin 
} from 'lucide-react';

const KPICard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">🌱 HORTI OFFICE AI</h1>
          <p className="text-slate-500">Department of Horticulture - Management Dashboard</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-md">
          + New Application
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard title="Total Farmers" value="1,284" icon={Users} color="bg-blue-500" />
        <KPICard title="Pending Apps" value="42" icon={Clock} color="bg-orange-500" />
        <KPICard title="Approved" value="1,120" icon={CheckCircle} color="bg-green-500" />
        <KPICard title="Total Schemes" value="12" icon={FileText} color="bg-purple-500" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Scheme Achievement Progress</h3>
            <TrendingUp className="text-slate-400" />
          </div>
          <div className="space-y-6">
            {[
              { name: 'Onion Cultivation', target: 500, achieved: 350, color: 'bg-green-500' },
              { name: 'Drip Irrigation', target: 200, achieved: 180, color: 'bg-blue-500' },
              { name: 'Polyhouse Setup', target: 100, achieved: 40, color: 'bg-orange-500' },
            ].map((scheme) => (
              <div key={scheme.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{scheme.name}</span>
                  <span className="text-sm text-slate-500">{scheme.achieved}/{scheme.target}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div 
                    className={`${scheme.color} h-2.5 rounded-full transition-all duration-1000`} 
                    style={{ width: `${(scheme.achieved / scheme.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
            <Wallet className="mr-2 text-slate-400" /> Financial Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Total Allocation</span>
              <span className="font-bold">₹ 4.5 Cr</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Total Expenditure</span>
              <span className="font-bold text-red-600">₹ 2.1 Cr</span>
            </div>
            <div className="flex justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-green-700 font-medium">Balance Available</span>
              <span className="font-bold text-green-700">₹ 2.4 Cr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}