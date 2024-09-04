import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; 
import { CategoryList } from './CategoryList';
import { DifficultySelector } from './DifficultySelector';
import { Category, Difficulty } from './types';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const QuizSetupPage: React.FC = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const { user, isLoading, isAuthenticated } = useAuth0(); 
  const [numberOfQuestions, setNumberOfQuestions] = useState<number | "">(10);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [categories, setCategories] = useState<Category[]>([
    'Programming Languages', 'Data Structures', 'Algorithms', 
    'Database Systems', 'Web Development', 'Software Engineering', 
    'Computer Networks', 'Operating Systems', 'Computer Architecture', 
    'Cybersecurity'
  ]);

  const [newCategory, setNewCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [numberError, setNumberError] = useState<string | null>(null);
  const [categoryValidationError, setCategoryValidationError] = useState<string | null>(null);
  const [difficultyValidationError, setDifficultyValidationError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.sub) {
      const storedCategories = localStorage.getItem(`custom_categories_${user.sub}`);
      if (storedCategories) {
        setCategories(prev => [...prev, ...JSON.parse(storedCategories)]);
      }
    }
  }, [user]);

  const handleNumberOfQuestionsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      const numberValue = value === "" ? "" : Number(value);
      setNumberOfQuestions(numberValue);

      if (typeof numberValue === 'number') {
        if (numberValue < 10 || numberValue > 30) {
          setNumberError("Number of questions must be between 10 and 30.");
        } else {
          setNumberError(null);
        }
      }
    }
  }, []);

  const handleStartQuiz = () => {
    let valid = true;

    if (!selectedCategory) {
      setCategoryValidationError("Please select a category.");
      valid = false;
    } else {
      setCategoryValidationError(null);
    }

    if (!selectedDifficulty) {
      setDifficultyValidationError("Please select a difficulty.");
      valid = false;
    } else {
      setDifficultyValidationError(null);
    }

    if (typeof numberOfQuestions !== 'number' || numberOfQuestions < 10 || numberOfQuestions > 30) {
      setNumberError("Number of questions must be between 10 and 30.");
      valid = false;
    } else {
      setNumberError(null);
    }

    if (valid) {
      const validNumberOfQuestions = typeof numberOfQuestions === 'number' ? numberOfQuestions : 10;
      navigate('/quiz', { state: { category: selectedCategory, difficulty: selectedDifficulty, numberOfQuestions: validNumberOfQuestions } });
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleAddCategory = () => {
    if (!user) {
      setCategoryError("User not authenticated.");
      return;
    }

    const trimmedCategory = newCategory.trim();
    if (trimmedCategory.length < 4 || trimmedCategory.length > 80) {
      setCategoryError("Category name must be between 4 and 80 characters.");
      return;
    }

    const existingCategories = localStorage.getItem(`custom_categories_${user.sub}`);
    const storedCategories = existingCategories ? JSON.parse(existingCategories) : [];

    if (storedCategories.length >= 5) {
      setCategoryError("You can only add a maximum of 5 custom categories.");
      return;
    }

    if (categories.includes(trimmedCategory)) {
      setCategoryError("This category already exists.");
      return;
    }

    const updatedCategories = [...storedCategories, trimmedCategory];
    setCategories(prev => [...prev, trimmedCategory]);
    setNewCategory("");
    setCategoryError(null);

    localStorage.setItem(`custom_categories_${user.sub}`, JSON.stringify(updatedCategories));
  };

  const handleDeleteCategory = (category: string) => {
    if (!user?.sub) return;

    const updatedCategories = categories.filter(cat => cat !== category);
    const customCategories = updatedCategories.filter(cat => ![
      'Programming Languages', 'Data Structures', 'Algorithms', 
      'Database Systems', 'Web Development', 'Software Engineering', 
      'Computer Networks', 'Operating Systems', 
      'Computer Architecture', 'Cybersecurity'
    ].includes(cat));

    setCategories(updatedCategories);
    localStorage.setItem(`custom_categories_${user.sub}`, JSON.stringify(customCategories));
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
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
    );
  }

  return (
    <div className={`min-h-screen font-inter ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-800'}`}>
        <div className="relative min-h-screen font-inter p-4 pt-16">
          {isAuthenticated && user && (
            <div
              className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <img
                src={user.picture || 'src/assets/default-picture.png'} 
                alt={user.name || 'User'}
                className="w-10 h-10 rounded-full border-2 border-gray-500"
              />
              <span className={`text-lg${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{user.name}</span>
            </div>
          )}
          <h2 className="text-4xl font-thin mb-4">Quiz Setup</h2>
          <div>
            <label className='text-xl font-thin' htmlFor="numberOfQuestions">Number of Questions (10 - 30):</label>
            <input
              type="number"
              id="numberOfQuestions"
              min="10"
              max="30"
              value={numberOfQuestions === "" ? "" : numberOfQuestions}
              onChange={handleNumberOfQuestionsChange}
              className="border px-4 py-1 rounded  ml-2 bg-gray-300 text-gray-900"
            />
            {numberError && <p className="text-red-500 mt-2">{numberError}</p>}
          </div>
          <CategoryList 
            categories={categories} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            newCategory={newCategory} 
            setNewCategory={setNewCategory} 
            handleAddCategory={handleAddCategory} 
            handleDeleteCategory={handleDeleteCategory} 
            categoryError={categoryError} 
          />
          {categoryValidationError && <p className="text-red-500 mt-2">{categoryValidationError}</p>}
          {difficultyValidationError && <p className="text-red-500 mt-2">{difficultyValidationError}</p>}
          <DifficultySelector 
            selectedDifficulty={selectedDifficulty} 
            setSelectedDifficulty={setSelectedDifficulty} 
          />
             <button
  onClick={handleGoHome}
  className={`relative text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-700'} after:absolute mt-8 mr-6 after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 ${theme === 'dark' ? 'after:bg-white' : 'after:bg-neutral-800'} after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100`}
>
  Go Home
</button>

          <button
            onClick={handleStartQuiz}
            className="px-[4.5px] py-2 font-inter text-lg z-30 bg-rose-400 rounded-md text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-rose-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af]"
            disabled={!selectedCategory || !selectedDifficulty || typeof numberOfQuestions !== 'number' || numberError !== null}
          >
            Start Quiz
          </button>
        </div>
      </div>  
  );
};

export default QuizSetupPage;
