
import { useSelector } from 'react-redux';
import { RootState } from '../store'; 
import { Difficulty } from './types';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty | null;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  setSelectedDifficulty
}) => {
  const theme = useSelector((state: RootState) => state.settings.theme);

  const getButtonStyles = (difficulty: string) => {
    const isSelected = selectedDifficulty === difficulty;
    const baseClasses = 'h-10 select-none rounded-md px-4 leading-10 shadow-md transition-colors duration-300 ease-in-out';
    const textColor = isSelected ? 'text-white' : theme === 'dark' ? 'text-gray-200' : 'text-gray-800';

    let buttonColor = '';
    if (difficulty === 'Easy') {
      buttonColor = isSelected
        ? theme === 'dark'
          ? 'bg-gradient-to-b from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900'
          : 'bg-gradient-to-b from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 active:from-green-600 active:to-green-700'
        : theme === 'dark'
          ? 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800'
          : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400';
    } else if (difficulty === 'Medium') {
      buttonColor = isSelected
        ? theme === 'dark'
          ? 'bg-gradient-to-b from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 active:from-yellow-800 active:to-yellow-900'
          : 'bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 active:from-yellow-600 active:to-yellow-700'
        : theme === 'dark'
          ? 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800'
          : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400';
    } else if (difficulty === 'Hard') {
      buttonColor = isSelected
        ? theme === 'dark'
          ? 'bg-gradient-to-b from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900'
          : 'bg-gradient-to-b from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 active:from-red-600 active:to-red-700'
        : theme === 'dark'
          ? 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800'
          : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400';
    }

    return `${baseClasses} ${buttonColor} ${textColor}`;
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Select a Difficulty:</h3>
      <div className="flex gap-2">
        {['Easy', 'Medium', 'Hard'].map((difficulty) => (
          <button
            key={difficulty}
            className={getButtonStyles(difficulty)}
            onClick={() => setSelectedDifficulty(difficulty as Difficulty)}
          >
            {difficulty}
          </button>
        ))}
      </div>
    </div>
  );
};
