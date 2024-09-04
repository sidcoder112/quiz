import React from 'react';
import { Difficulty } from './types';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty | null;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  setSelectedDifficulty
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Select a Difficulty:</h3>
      <div className="flex gap-2">
        {['Easy', 'Medium', 'Hard'].map((difficulty) => {
          const isSelected = selectedDifficulty === difficulty;
          const buttonColor = isSelected
            ? difficulty === 'Easy'
              ? 'rounded-full bg-gradient-to-b from-green-400 from-50% to-green-500 to-50% px-3 text-green-50 hover:from-green-500 hover:to-green-600 active:from-green-600 active:to-green-700'
              : difficulty === 'Medium'
              ? 'rounded-full bg-gradient-to-b from-yellow-400 from-50% to-yellow-500 to-50% px-3 text-yellow-50 hover:from-yellow-500 hover:to-yellow-600 active:from-yellow-600 active:to-yellow-700'
              : 'rounded-full bg-gradient-to-b from-red-400 from-50% to-red-500 to-50% px-3 text-red-50 hover:from-red-500 hover:to-red-600 active:from-red-600 active:to-red-700'
            : 'bg-gray-200';
          const textColor = isSelected ? 'text-white' : 'text-gray-800';
          const hoverColor = isSelected ? buttonColor : 'bg-gray-300';
          
          return (
            <button
              key={difficulty}
              className={`group h-10 select-none rounded-md px-4 leading-10 ${buttonColor} ${textColor} shadow-md transition-colors duration-300 ease-in-out hover:${hoverColor} active:${hoverColor}`}
              onClick={() => setSelectedDifficulty(difficulty as Difficulty)}
            >
              {difficulty}
            </button>
          );
        })}
      </div>
    </div>
  );
};
