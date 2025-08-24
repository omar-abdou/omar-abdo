
import React from 'react';
import { AgeGroup } from '../types';
import Card from './Card';

interface AgeSelectionProps {
  onSelectAge: (ageGroup: AgeGroup) => void;
}

const AgeSelection: React.FC<AgeSelectionProps> = ({ onSelectAge }) => {
  const ageGroups = [AgeGroup.CHILD, AgeGroup.TEEN, AgeGroup.ADULT];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md text-center">
            <div className="mb-2 text-sky-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.375 3.375 0 0014 18.442V18.75a3.375 3.375 0 00-2.25 3.375c0 .995.626 1.813 1.5 2.125V21h-3v-.75c.874-.312 1.5-.93 1.5-1.875A3.375 3.375 0 009 18.75v-.308A3.375 3.375 0 006.548 17.547l-.548-.547a5 5 0 010-7.072l.547-.547A3.375 3.375 0 009 6.25V6a3.375 3.375 0 00-2.25-3.375c-.995-.626-1.813-1.5-2.125-1.5V3h3v.75c.874.312 1.5.93 1.5 1.875A3.375 3.375 0 0012 9.308v.308A3.375 3.375 0 0014.452 7.047l.548.547a5 5 0 017.072 0l-.547.547A3.375 3.375 0 0015 13.75v.308a3.375 3.375 0 002.25 3.375c.995.626 1.813 1.5 2.125 1.5V21h-3v-.75a3.375 3.375 0 00-1.5-2.625z" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">اختبار الذكاء (IQ) العلمي</h1>
            <p className="text-slate-500 mb-8">اختر فئتك العمرية لبدء اختبار مخصص لقدراتك.</p>
            <div className="space-y-4">
            {ageGroups.map((group) => (
                <button
                key={group}
                onClick={() => onSelectAge(group)}
                className="w-full py-4 px-6 bg-sky-500 text-white font-bold text-lg rounded-xl hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 transform hover:scale-105"
                >
                {group}
                </button>
            ))}
            </div>
      </Card>
    </div>
  );
};

export default AgeSelection;
