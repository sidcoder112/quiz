import {  useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface HistoryEntry {
  category: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  endTime: string;
}

const ViewHistoryPage: React.FC = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const history = useSelector((state: RootState) => state.quiz.history) as HistoryEntry[];
  const navigate = useNavigate();
  const { isLoading, user } = useAuth0();


  // sorting state
  const [sortKey, setSortKey] = useState<keyof HistoryEntry>('endTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (isLoading) {
    return (
      <div className={`min-h-screen  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
          <div className="flex items-center justify-center min-h-screen">
          <div className="w-36 h-36 border-8 border-dashed rounded-full border-t-lime-400 animate-spin"> </div>
                  </div>
                  </div>
                );
              }

  const handleGoHome = () => {
    navigate('/');
  };

  const getTimeAgo = (endTime: string) => {
    const endDate = new Date(endTime);
    const now = new Date();
    const secondsAgo = (now.getTime() - endDate.getTime()) / 1000;

    const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (secondsAgo < 60) return formatter.format(-Math.floor(secondsAgo), 'second');
    const minutesAgo = secondsAgo / 60;
    if (minutesAgo < 60) return formatter.format(-Math.floor(minutesAgo), 'minute');
    const hoursAgo = minutesAgo / 60;
    if (hoursAgo < 24) return formatter.format(-Math.floor(hoursAgo), 'hour');
    const daysAgo = hoursAgo / 24;
    if (daysAgo < 30) return formatter.format(-Math.floor(daysAgo), 'day');
    const monthsAgo = daysAgo / 30;
    if (monthsAgo < 12) return formatter.format(-Math.floor(monthsAgo), 'month');
    const yearsAgo = monthsAgo / 12;
    return formatter.format(-Math.floor(yearsAgo), 'year');
  };

  const sortedHistory = [...history].sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;
  
    if (sortKey === 'category' || sortKey === 'difficulty') {
      // Case-insensitive string comparison
      aValue = a[sortKey].toUpperCase();
      bValue = b[sortKey].toUpperCase();
    } else if (sortKey === 'endTime') {
      // Date comparison
      aValue = new Date(a.endTime);
      bValue = new Date(b.endTime);
    } else {
      // Numeric comparison (score and totalQuestions)
      aValue = a[sortKey];
      bValue = b[sortKey];
    }
  
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof HistoryEntry) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (key: keyof HistoryEntry) => {
    if (key !== sortKey) return <FaSort className="text-gray-500 cursor-pointer" onClick={() => handleSort(key)} />;
    return sortOrder === 'asc' ? <FaSortUp className="text-blue-500 cursor-pointer" onClick={() => handleSort(key)} /> : <FaSortDown className="text-blue-500 cursor-pointer" onClick={() => handleSort(key)} />;
  };

  return (
    <div className={`min-h-screen font-inter ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
      <div className="flex flex-col items-center font-inter justify-start min-h-screen pt-10 relative">
        {user && (
          <div
            className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <img
              src={user.picture || 'src/assets/default-picture.png'}
              alt={user.name || 'User'}
              className="w-10 h-10 rounded-full border-2 border-gray-500"
            />
            <span className={`text-lg ${theme === 'dark' ? ' text-white' : ' text-gray-700'}`}>{user.name}</span>
          </div>
        )}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center mb-4">
            <button
              onClick={handleGoHome}
              className={`absolute top-4 left-4 text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-700'} after:absolute mt-8 mr-6 after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 ${theme === 'dark' ? 'after:bg-white' : 'after:bg-neutral-800'} after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100`}
            >
              Home
            </button>
            <h2 className="text-2xl font-bold">Quiz History</h2>
          </div>
          {sortedHistory.length === 0 ? (
            <p>No history available.</p>
          ) : (
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('category')}>
                    <div className="flex items-center">
                      <span>Category</span>
                      {getSortIcon('category')}
                    </div>
                  </th>
                  <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('difficulty')}>
                    <div className="flex items-center">
                      <span>Difficulty</span>
                      {getSortIcon('difficulty')}
                    </div>
                  </th>
                  <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('score')}>
                    <div className="flex items-center">
                      <span>Score</span>
                      {getSortIcon('score')}
                    </div>
                  </th>
                  <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('totalQuestions')}>
                    <div className="flex items-center">
                      <span>Total Questions</span>
                      {getSortIcon('totalQuestions')}
                    </div>
                  </th>
                  <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('endTime')}>
                    <div className="flex items-center">
                      <span>Completed</span>
                      {getSortIcon('endTime')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedHistory.map((entry, index) => (
                  <tr key={index} className={`border-t ${theme === 'dark' ? 'border-slate-600 ' : 'border-slate-300'}`}>
                    <td className="px-4 py-2">{entry.category}</td>
                    <td className="px-4 py-2">{entry.difficulty}</td>
                    <td className="px-4 py-2">{entry.score}</td>
                    <td className="px-4 py-2">{entry.totalQuestions}</td>
                    <td className="px-4 py-2">{getTimeAgo(entry.endTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewHistoryPage;
