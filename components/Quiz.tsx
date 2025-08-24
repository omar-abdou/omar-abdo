
import React, { useState, useMemo } from 'react';
import { Question, UserAnswer } from '../types';
import Card from './Card';

interface QuizProps {
  questions: Question[];
  onSubmit: (answers: UserAnswer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = useMemo(() => ((currentQuestionIndex) / questions.length) * 100, [currentQuestionIndex, questions.length]);

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionIndex: selectedOption,
    };
    const updatedAnswers = [...answers.filter(a => a.questionId !== newAnswer.questionId), newAnswer];
    setAnswers(updatedAnswers);

    setSelectedOption(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
       onSubmit(updatedAnswers);
    }
  };
  
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100">
      <Card className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-1 text-sm font-medium text-slate-600">
            <span>السؤال {currentQuestionIndex + 1} من {questions.length}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 leading-relaxed">{currentQuestion.questionText}</h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`p-4 border-2 rounded-lg text-lg text-right w-full transition-all duration-200 ${
                selectedOption === index
                  ? 'bg-sky-500 border-sky-500 text-white shadow-md'
                  : 'bg-white border-slate-300 hover:border-sky-400 hover:bg-sky-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="px-10 py-3 bg-sky-500 text-white font-bold text-lg rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-sky-600 transition-colors"
          >
            {isLastQuestion ? 'إنهاء الاختبار' : 'التالي'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Quiz;
