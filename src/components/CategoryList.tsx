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
                selectedCategory === category
                  ? 'bg-teal-800 text-slate-200 shadow-[0_-1px_0_1px_#004d40_inset,0_0_0_1px_#00695c_inset,0_0.5px_0_1.5px_#004d40_inset] hover:bg-teal-800 active:bg-teal-900 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset]'
                  : 'bg-gray-500 text-slate-200 shadow-[0_-1px_0_1px_#d0d0d0_inset,0_0_0_1px_#c0c0c0_inset,0_0.5px_0_1.5px_#d0d0d0_inset] hover:bg-gray-600 active:bg-gray-800 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset]'
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
  className="cursor-pointer rounded-[8px] bg-slate-300 ml-6 px-3 py-1 text-md text-neutral-950 transition-colors hover:bg-slate-400 active:bg-slate-500"
>
  Add Category
</button>


        {categoryError && <p className="text-red-500 mt-2">{categoryError}</p>}
        <p className={`text-sm mt-2 ${theme === 'dark' ? ' text-white' : ' text-gray-800'}`}>
          Disclaimer: Please be cautious when adding custom categories. The system might not handle custom inputs perfectly, so ensure your custom category is accurate and relevant.
        </p>
      </div>
    </div>
  );
};
