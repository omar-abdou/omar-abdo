
import React, { useState, useCallback } from 'react';
import { AppState, AgeGroup, Question, UserAnswer, TestResult } from './types';
import AgeSelection from './components/AgeSelection';
import Quiz from './components/Quiz';
import Results from './components/Results';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import { generateIQTest, analyzeResults } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SELECT_AGE);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  // New state to preserve context for retries
  const [lastSelectedAge, setLastSelectedAge] = useState<AgeGroup | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[] | null>(null);

  const handleStartTest = useCallback(async (ageGroup: AgeGroup) => {
    setError(null);
    setLastSelectedAge(ageGroup);
    setIsLoading(true);
    setLoadingMessage('جاري تحضير اختبار مخصص لك...');
    try {
      const fetchedQuestions = await generateIQTest(ageGroup);
      setQuestions(fetchedQuestions);
      setAppState(AppState.TAKING_TEST);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      // Stay on SELECT_AGE state to show error and allow retry
    } finally {
      setIsLoading(false);
    }
  }, []);

  const performAnalysis = useCallback(async (answers: UserAnswer[]) => {
    setError(null);
    setIsLoading(true);
    setLoadingMessage('نقوم الآن بتحليل إجاباتك...');
    try {
        const result = await analyzeResults(questions, answers);
        setTestResult(result);
        setAppState(AppState.SHOWING_RESULTS);
    } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        setTestResult(null);
        setAppState(AppState.SHOWING_RESULTS); // Move to results page to show error
    } finally {
        setIsLoading(false);
    }
  }, [questions]);

  const handleFinishTest = useCallback(async (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    await performAnalysis(answers);
  }, [performAnalysis]);

  const resetApp = () => {
    setAppState(AppState.SELECT_AGE);
    setQuestions([]);
    setTestResult(null);
    setError(null);
    setIsLoading(false);
    setLastSelectedAge(null);
    setUserAnswers(null);
  };
  
  const handleRetry = () => {
    setError(null);
    if (appState === AppState.SELECT_AGE && lastSelectedAge) {
      // Retry test generation
      handleStartTest(lastSelectedAge);
    } else if (appState === AppState.SHOWING_RESULTS && userAnswers) {
      // Retry analysis
      performAnalysis(userAnswers);
    } else {
      // Fallback for any other unexpected error state
      resetApp();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner message={loadingMessage} /></div>;
    }
    
    if (error) {
      // Display error only in states where a retry action is meaningful
      if (appState === AppState.SELECT_AGE || appState === AppState.SHOWING_RESULTS) {
        return <div className="flex items-center justify-center min-h-screen"><ErrorDisplay message={error} onRetry={handleRetry} /></div>;
      }
    }
    
    switch (appState) {
      case AppState.SELECT_AGE:
        return <AgeSelection onSelectAge={handleStartTest} />;
      case AppState.TAKING_TEST:
        return <Quiz questions={questions} onSubmit={handleFinishTest} />;
      case AppState.SHOWING_RESULTS:
        // By the time we are here, loading is false and error is handled above.
        return testResult ? <Results result={testResult} onReset={resetApp} /> : null;
      default:
        return <AgeSelection onSelectAge={handleStartTest} />;
    }
  };

  return (
    <main className="font-sans">
      {renderContent()}
    </main>
  );
};

export default App;
