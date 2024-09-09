import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToHistory } from '../slices/quizSlice';
import { useAuth0 } from '@auth0/auth0-react';
import StarRating from './StarRating';
import MarkCheck from './MarkCheck';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import defpic from '../assets/default-picture.png'
import { RootState } from '@/store';

interface Question {
  question: string;
  answer: string;
  options?: { [key: string]: string };
  type: 'multiple-choice' | 'true-false';
}

interface ResultsPageState {
  questions: Question[];
  userAnswers: { [index: number]: string };
  score: number;
  totalQuestions: number;
  category: string;
  difficulty: string;
  startTime: string; 
  endTime: string;  
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const theme = useSelector((state: RootState) => state.settings.theme);
  
  const {
    questions = [],
    userAnswers = {},
    score = 0,
    totalQuestions = 0,
    category = 'General',
    difficulty = 'Medium',
    startTime = new Date().toISOString(),
    endTime,
  } = location.state as ResultsPageState;


  const startDate = new Date(startTime);
  const endDate = endTime ? new Date(endTime) : null;

  const timeTaken = endDate ? (endDate.getTime() - startDate.getTime()) / 1000 : 0; 
  const minutes = Math.floor(timeTaken / 60);
  const seconds = Math.floor(timeTaken % 60);

  useEffect(() => {
    if (user) {
      dispatch(addToHistory({
        userId: user.sub!,
        category,
        difficulty,
        score,
        totalQuestions,
        startTime,
        endTime,
      }));
    }
  }, [user, dispatch, category, difficulty, score, totalQuestions, startTime, endTime]);

  return (
    <div className={`min-h-screen  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
        <div className="container font-inter mx-auto p-4 relative">
          {isAuthenticated && (
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <img
                src={user?.picture || defpic}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-lg font-semibold">{user?.name}</span>
            </div>
          )}

          <h1 className="text-3xl font-bold text-gradient-to-r from-rose-500 to-lime-500 mb-8">Quiz Results</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Category: {category}</h2>
            <h2 className="text-xl font-semibold">Difficulty: {difficulty}</h2>
            <h2 className="text-xl font-semibold">Start Time: {startDate.toLocaleTimeString()}</h2>
            <h2 className="text-xl font-semibold">End Time: {endDate ? endDate.toLocaleTimeString() : 'N/A'}</h2>
            <h2 className="text-xl font-semibold">Time Taken: {minutes}m {seconds}s</h2>
          </div>
          <p className="text-lg mb-4">
            You answered <strong>{score}</strong> out of <strong>{totalQuestions}</strong> questions correctly.
         </p>
          <MarkCheck mark={score} totalQuestions={totalQuestions} />
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.answer;

              return (
                <div
                  key={index}
                  className={`border p-4 rounded-lg shadow-sm ${
                    theme === 'dark'
                      ? isCorrect
                        ? 'bg-[#37923b68] text-white' 
                        : 'bg-[#ff000058] text-white'   
                      : isCorrect
                      ? 'bg-[#a6f59a] text-gray-800' 
                      : 'bg-[#f3b3b3] text-gray-800'   
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
                  {question.type === 'multiple-choice' && (
                    <ul>
                      {Object.entries(question.options || {}).map(([key, option]) => (
                        <li key={key} className="mb-2 flex items-center">
                          <span
                            className={`mr-2 ${
                              userAnswer === key ? (isCorrect ? 'text-green-600' : 'text-red-600') : 'text-gray-700'
                            }`}
                          >
                            {userAnswer === key && (
                              <>
                                {isCorrect ? (
                                  <FaCheckCircle className="text-green-600 w-4 h-4 mr-2" aria-label="Correct" />
                                ) : (
                                  <FaTimesCircle className="text-red-600 w-4 h-4 mr-2" aria-label="Incorrect" />
                                )}
                              </>
                            )}
                          </span>
                          <span
                            className={`${
                              !isCorrect && key === question.answer ? 'text-green-600' : ''
                            }`}
                          >
                            {option}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {question.type === 'true-false' && (
                    <p className="flex items-center">
                      {isCorrect ? (
                        <FaCheckCircle className="text-green-600 w-4 h-4 mr-2" aria-label="Correct" />
                      ) : (
                        <FaTimesCircle className="text-red-600 w-4 h-4 mr-2" aria-label="Incorrect" />
                      )}
                      <span
                        className={`${
                          !isCorrect && userAnswer === question.answer ? 'text-green-600' : ''
                        }`}
                      >
                        {userAnswer}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <StarRating />
          <button
            onClick={() => {
              navigate('/');
            }}
            className={`relative text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-700'} after:absolute mt-8 mb-3 mr-6 after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 ${theme === 'dark' ? 'after:bg-white' : 'after:bg-neutral-800'} after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100`}
          >
            Back to Home
          </button>
        </div>
      </div>  
  );
};

export default ResultsPage;

