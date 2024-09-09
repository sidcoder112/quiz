import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGenerateQuestions } from './GeminiInReact';
import { Question } from './GeminiInReact'; 
import Timer from './Timer';
import { useAuth0 } from '@auth0/auth0-react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import Modal from './Modal'; 

const Quiz: React.FC = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { category = 'General', difficulty = 'Medium', numberOfQuestions = 10 } = location.state || {};
  const { responseJson, loading, error, fetchQuestions } = useGenerateQuestions(category, difficulty, numberOfQuestions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  

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
    handleAnswer(''); //time over
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
        <p className="text-lg font-semibold mb-4">{question.question}</p>
        <div className="flex flex-col gap-3 space-y-4 items-center">
          {question.type === 'multiple-choice' &&
            Object.entries(question.options || {}).map(([key, option]) => (
              <button
                key={key}
                className={`flex justify-center items-center min-w-[300px] md:min-w-[500px] lg:min-w-[800px] max-w-[1000px] md:max-w-[1500px] lg:max-w-[2000px] px-4 py-3 rounded-lg transition duration-300
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
                  ${theme === 'dark' ? 'bg-slate-600 text-white' : 'bg-gray-300 text-gray-800'} active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition
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

  const openModal = () => {
    setIsModalOpen(true);
  };

 
  const handleConfirmQuit = () => {
    navigate('/');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>

      <div className="flex justify-between items-center p-4">
        <button
          onClick={openModal}
          className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'} hover:text-red-600 transition duration-200 ease-in-out`}
        >
          Home
        </button>
        {isAuthenticated && (
          <div className="flex items-center space-x-2">
            <img
              src={user?.picture}
              alt="Profile"
              className="w-10 h-10 rounded-full pointer-events-none"
            />
            <span className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'} pointer-events-none`}>
              {user?.name}
            </span>
          </div>
        )}
      </div>


      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmQuit}
        theme={theme} 
      />

      <div className="flex flex-col justify-center items-center text-center">
        {loading && <div><div className={`min-h-screen  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
          <div className="flex items-center justify-center min-h-screen">
          <div className="w-36 h-36 border-8 border-dashed rounded-full border-t-lime-400 animate-spin">
           </div>

                  </div>
                  </div></div>}
        {error && <div>Error fetching quiz questions.</div>}
        {!loading && !error && currentQuestion && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Category: {category} | Difficulty: {difficulty}
            </h2>
            <div className="mb-8">
              <Timer duration={timerDuration} onTimeUp={handleTimeUp} key={currentQuestionIndex} keyProp={''} />
            </div>
            {renderQuestion(currentQuestion)}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
