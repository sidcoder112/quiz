import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGenerateQuestions } from './GeminiInReact';
import { Question } from './GeminiInReact'; 
import Timer from './Timer';
import { useAuth0 } from '@auth0/auth0-react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const Quiz: React.FC = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { category = 'General', difficulty = 'Medium', numberOfQuestions = 10 } = location.state || {};
  const { responseJson, loading, error, fetchQuestions } = useGenerateQuestions(category, difficulty, numberOfQuestions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const startTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (responseJson?.questions && responseJson.questions.length > 0) {
      startTimeRef.current = new Date();
    }
  }, [responseJson]);

  const handleAnswer = useCallback((answer: string) => {
    const currentQuestion = responseJson?.questions?.[currentQuestionIndex];
    if (currentQuestion) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: answer,
      }));

      if (currentQuestion.answer === answer) {
        setScore((prevScore) => prevScore + 1);
      }

      if (currentQuestionIndex < (responseJson?.questions.length || 0) - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setEndTime(new Date());
        setQuizFinished(true);
      }
    }
  }, [currentQuestionIndex, responseJson]);

  useEffect(() => {
    if (quizFinished) {
      navigate('/results', {
        state: {
          questions: responseJson?.questions,
          userAnswers,
          score,
          totalQuestions: numberOfQuestions,
          category,
          difficulty,
          startTime: startTimeRef.current?.toISOString(),
          endTime: endTime?.toISOString(),
        },
      });
    }
  }, [quizFinished, responseJson, userAnswers, score, numberOfQuestions, navigate, category, difficulty, endTime, user]);

  const handleTimeUp = useCallback(() => {
    handleAnswer(''); //time up
  }, [handleAnswer]);

  const timerDuration = useMemo(() => {
    return difficulty === 'Easy' ? 30 : difficulty === 'Medium' ? 20 : 10;
  }, [difficulty]);

  const currentQuestion = useMemo(() => {
    return responseJson?.questions?.[currentQuestionIndex];
  }, [responseJson, currentQuestionIndex]);

  const renderQuestion = (question?: Question) => {
    if (!question) return null;

    return (
      
        <div className="font-inter shadow-md rounded-lg p-6 text-center mb-6">
          <p className="text-lg  font-semibold  mb-4">{question.question}</p>
          <div className="flex flex-col gap-3 space-y-4 items-center">
            {question.type === 'multiple-choice' &&
              Object.entries(question.options || {}).map(([key, option]) => (
                <button
                  key={key}
                  className={`flex justify-center items-center min-w-[1500px] max-w-[2500px] px-4 py-3 rounded-lg transition duration-300 
                    ${theme === 'dark' ? 'bg-slate-600 text-white' : 'bg-gray-300 text-gray-800'} active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition
                `}
                  style={{ wordBreak: 'break-word', textAlign: 'left' }}
                  onClick={() => handleAnswer(key)}
                >
                  {option}
                </button>
              ))}
            {question.type === 'true-false' && (
              <>
                <button
                  className={`flex justify-center items-center min-w-[150px] max-w-[300px] px-4 py-3 rounded-lg transition duration-300 
                     ${theme === 'dark' ? 'bg-slate-600 text-white' : 'bg-gray-300 text-gray-800'} active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition
                 `}
                  style={{ wordBreak: 'break-word', textAlign: 'left' }}
                  onClick={() => handleAnswer('True')}
                >
                  True
                </button>
                <button
                  className={`flex justify-center items-center min-w-[150px] max-w-[300px] px-4 py-3 rounded-lg transition duration-300 
                     ${theme === 'dark' ? 'bg-slate-600 text-white' : 'bg-gray-300 text-gray-800'}0 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition
                  `}
                  style={{ wordBreak: 'break-word', textAlign: 'left' }}
                  onClick={() => handleAnswer('False')}
                >
                  False
                </button>
              </>
            )}
          </div>
        </div>
    );
    
    
  };

  return (
    <div className={` min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
      <button
        onClick={() => navigate('/')}
        className={`absolute top-4 left-4 text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-700'} after:absolute mt-8 ml-3 text-2xl after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 ${theme === 'dark' ? 'after:bg-white' : 'after:bg-neutral-800'} after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100`}
      >
        Home
      </button>

      {user && (
        <div className={`absolute top-4 right-4 flex items-center gap-2 cursor-pointer ${theme === 'dark' ? ' text-white' : ' text-gray-700'}`}
          onClick={() => navigate('/profile')}
        >
          <img
            src={user?.picture || 'src/assets/default-picture.png'}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-full border-2 border-gray-500"
          />
          <span className="text-lg ">{user?.name}</span>
        </div>
      )}

      {loading ? (
        <div className={`w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
        <div className="flex items-center justify-center min-h-screen ">
        
        <div
          className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] 
          z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] 
          before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] 
          before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 
          after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] 
          after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
        >
          <span
            className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] 
            bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
          >
          </span>
        </div>
        
              </div>
      </div>
      ) : error ? (
        <p className="text-center text-lg font-semibold text-red-500">{error}</p>
      ) : responseJson ? (
        <div className="quiz-container ">
          <div className="flex justify-center  items-center">
            <Timer
              duration={timerDuration}
              onTimeUp={handleTimeUp}
              key={currentQuestionIndex} // res timer
              keyProp={''}
            />
          </div>
          {renderQuestion(currentQuestion)}
          <div className={`mt-6 text-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
            <p className="text-gray-600">{`Question ${currentQuestionIndex + 1} of ${numberOfQuestions}`}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Quiz; 
