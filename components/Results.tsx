
import React from 'react';
import { TestResult } from '../types';
import Card from './Card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

interface ResultsProps {
  result: TestResult;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onReset }) => {
  const chartData = result.analysis.map(item => ({
    subject: item.name,
    A: item.score,
    fullMark: 100,
  }));

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-800">نتائجك التحليلية</h1>
          <p className="text-slate-500 mt-2 text-lg">نظرة عميقة على قدراتك المعرفية.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Results and Chart */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* IQ Score and Summary */}
                <div className="text-center md:text-right">
                  <h3 className="text-slate-500 font-bold">معدل الذكاء التقديري</h3>
                  <p className="text-7xl font-black text-sky-500 my-2">{result.estimatedIQ}</p>
                  <p className="text-slate-600 leading-relaxed">{result.summary}</p>
                </div>
                {/* Radar Chart */}
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'transparent' }} />
                      <Radar name="أداؤك" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Recommendations */}
          <Card>
            <h3 className="text-2xl font-bold mb-4 text-slate-800">توصيات مخصصة</h3>
            <ul className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-600">{rec}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Card className="mt-6">
            <h3 className="text-2xl font-bold mb-6 text-slate-800 text-center">تفصيل الأداء</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {result.analysis.map(item => (
                    <div key={item.name} className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
                        <h4 className="font-bold text-slate-700">{item.name}</h4>
                        <p className="text-3xl font-bold text-sky-600 my-1">{item.score}<span className="text-lg text-slate-400">/100</span></p>
                        <p className="text-sm text-slate-500">{item.comment}</p>
                    </div>
                ))}
            </div>
        </Card>

        <div className="text-center mt-8">
            <button
                onClick={onReset}
                className="px-8 py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-colors"
            >
                إجراء اختبار آخر
            </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
