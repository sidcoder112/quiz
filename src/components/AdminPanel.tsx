


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
            <div
              className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] 
              z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] 
              before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] 
              before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square 
              after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] 
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
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
