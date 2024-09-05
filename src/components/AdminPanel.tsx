


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const AdminPanel: React.FC = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const reviews = useSelector((state: RootState) => state.review.reviews);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.email !== 'sidharth.sl@netstratum.com')) {
      navigate('*');
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  const calculateAverageRating = () => {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length > 0 ? (totalRatings / reviews.length).toFixed(1) : '0.0';
  };

  
  const ratingCounts = Array(5).fill(0);
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  const chartData = {
    labels: ['1', '2', '3', '4', '5'], 
    datasets: [
      {
        label: 'Number of Reviews',
        data: ratingCounts,
        backgroundColor: 'rgba(240, 192, 7, 0.8)', 
        borderRadius: 10, 
        borderColour: 'rgba(200, 180, 7, 0.8)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y' as const, 
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', 
        },
        ticks: {
          color: theme === 'dark' ? '#fff' : '#333', 
          stepSize: 1, 
        },
        title: {
          display: true,
          text: 'Number of Reviews', 
          color: theme === 'dark' ? '#fff' : '#333',
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: false, 
        grid: {
          display: false, 
        },
        ticks: {
          color: theme === 'dark' ? '#fff' : '#333', 
          callback: function (_: unknown, index: number) {
            return chartData.labels[index]; 
          },
        },
        title: {
          display: true,
          text: 'Rating', 
          color: theme === 'dark' ? '#fff' : '#333',
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      title: {
        display: false, 
      },
      tooltip: {
        enabled: true, 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false, 
  };
  
  
  
  if (isLoading) {
    return (
      <div className={`min-h-screen  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
          <div className="flex items-center justify-center min-h-screen">
          <div className="w-36 h-36 border-8 border-dashed rounded-full border-t-lime-400 animate-spin">
          </div>
                  </div>
                  </div>
                );
              }

  return (
    <div className={`min-h-screen font-inter ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
      <div
        className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/profile')}
      >
        <img
          src={user?.picture || 'src/assets/default-picture.png'}
          alt={user?.name || 'User'}
          className="w-10 h-10 rounded-full border-2 border-gray-500"
        />
        <span className="text-lg">{user?.name}</span>
      </div>
      <div className="container mx-auto p-4">
        <h1 className={`text-3xl font-bold mt-14 mb-8 ${theme === 'dark' ? ' text-white' : ' text-gray-700'}`}>Admin Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className={` p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <h2 className="text-xl font-semibold mb-4">Average Rating</h2>
            <p className="text-lg  font-semibold">{calculateAverageRating()} / 5</p>
          </div>
          <div className={` p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <h2 className="text-xl font-semibold mb-4">Number of Reviews</h2>
            <p className="text-lg font-semibold">{reviews.length}</p>
          </div>
        </div>
        <div className="h-64 mb-6"> 
          <Bar data={chartData} options={chartOptions} />
        </div>
        <button
          onClick={() => navigate('/')}
          className={`absolute top-4 left-4 text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-700'} after:absolute mt-8 ml-3 text-2xl after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 ${theme === 'dark' ? 'after:bg-white' : 'after:bg-neutral-800'} after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100`}
 >
           Home
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;

