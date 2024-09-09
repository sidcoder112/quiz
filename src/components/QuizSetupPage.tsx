import { useState, useEffect, useCallback } from 'react';
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
      setCategoryError("Login to use custom categories.");
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
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
        <div className="flex items-center justify-center min-h-screen">
        <div className="w-36 h-36 border-8 border-dashed rounded-full border-t-lime-400 animate-spin">
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-inter ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-neutral-100 text-gray-800'}`}>
      <div className="relative min-h-screen font-inter p-4 pt-16 md:p-6 lg:p-8">
        {isAuthenticated && user && (
          <div className="absolute top-4 right-4 flex items-center gap-2 " >
            <img src={user.picture || 'src/assets/default-picture.png'} alt={user.name || 'User'} className="w-10 h-10 rounded-full border-2 border-gray-500" />
            <span className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{user.name}</span>
          </div>
        )}
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-indigo-800 font-thin text-mb-4">Quiz Setup</h2>
        <div className="mb-4">
          <label className='text-lg md:text-xl font-thin' htmlFor="numberOfQuestions">Number of Questions (10 - 30):</label>
          <input
            type="number"
            id="numberOfQuestions"
            min="10"
            max="30"
            value={numberOfQuestions === "" ? "" : numberOfQuestions}
            onChange={handleNumberOfQuestionsChange}
            className="border px-3 py-1 rounded ml-2 bg-gray-300 text-gray-900 w-20"  
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
        <div className="mt-12 flex gap-2 justify-center">
          <button
            className={` ${theme === 'dark' ? 'text-white hover:text-[#ed3333]' : 'text-gray-900 hover:text-[#bf3131]'}`}
            onClick={handleGoHome}
          >
            Go Home
          </button>
          <button
             className={`px-6 py-2 rounded text-white font-semibold transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-[#1f2937] to-[#4b5563] hover:from-[#4b5563] hover:to-[#1f2937]'
                : 'bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0056b3] hover:to-[#007bff]'
            }`}
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSetupPage;
