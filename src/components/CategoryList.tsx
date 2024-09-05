import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Category } from './types';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';


interface CategoryListProps {
  categories: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
  newCategory: string;
  setNewCategory: (category: string) => void;
  handleAddCategory: () => void;
  handleDeleteCategory: (category: string) => void;
  categoryError: string | null;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  
  
  categories,
  selectedCategory,
  setSelectedCategory,
  newCategory,
  setNewCategory,
  handleAddCategory,
  handleDeleteCategory,
  categoryError,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };
  const theme = useSelector((state: RootState) => state.settings.theme);
  return (
    <div className="mt-4">
      <h3 className="text-xl">Select a Category:</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <button
               className={`group h-10 select-none rounded-[4px] px-4 leading-10 ${
                theme === 'dark'
                  ? selectedCategory === category
                    ? 'bg-teal-700 text-slate-200 shadow-[0_-1px_0_1px_#004d40_inset,0_0_0_1px_#00695c_inset,0_0.5px_0_1.5px_#004d40_inset] hover:bg-teal-800 active:bg-teal-900 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset]'
                    : 'bg-gray-700 text-slate-300 shadow-[0_-1px_0_1px_#3e3e3e_inset,0_0_0_1px_#2e2e2e_inset,0_0.5px_0_1.5px_#3e3e3e_inset] hover:bg-gray-800 active:bg-gray-900 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset]'
                  : selectedCategory === category
                  ? 'bg-teal-300 text-gray-900 shadow-[0_-1px_0_1px_#004d40_inset,0_0_0_1px_#00695c_inset,0_0.5px_0_1.5px_#004d40_inset] hover:bg-teal-400 active:bg-teal-500 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset]'
                  : 'bg-gray-200 text-gray-900 shadow-[0_-1px_0_1px_#d0d0d0_inset,0_0_0_1px_#c0c0c0_inset,0_0.5px_0_1.5px_#d0d0d0_inset] hover:bg-gray-300 active:bg-gray-400 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset]'
              }`}
              
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
            {typeof category === 'string' && ![
              'Programming Languages', 'Data Structures', 'Algorithms',
              'Database Systems', 'Web Development', 'Software Engineering',
              'Computer Networks', 'Operating Systems',
              'Computer Architecture', 'Cybersecurity'
            ].includes(category) && (
              <button
                onClick={() => handleDeleteCategory(category)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <input
          type="text"
          value={newCategory}
          placeholder="Add Custom Category"
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border px-2 bg-gray-200 py-1 rounded"
        />
        <button
  onClick={handleAddCategory}
  className={`rounded-[8px] 
    ${theme === 'dark' ? 
      'bg-[#5c5235] text-white hover:bg-[#7f734f] ' : 
      'bg-[#e4c6b5] text-neutral-950 hover:bg-[#b38d78] '}
    ml-6 px-3 py-1 text-md transition-colors`}
>
  Add Category
</button>


        {categoryError && <p className="text-red-500 mt-2">{categoryError}</p>}
        <p className={`text-sm mt-2 ${theme === 'dark' ? ' text-white' : ' text-gray-800'}`}>
          *Quiz Maker can make mistakes .Check important info
        </p>
      </div>
    </div>
  );
};
