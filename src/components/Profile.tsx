import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const Profile: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth0();
  const theme = useSelector((state: RootState) => state.settings.theme);
  const navigate = useNavigate();

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

              const handleLogout = () => {
                logout({
                  logoutParams: { returnTo: window.location.origin },
                });
                navigate('/');
              };

              const handleGoHome = () => {
                navigate('/');
              };

              if (!isAuthenticated) {
                return (
                  <div className="text-center font-inter text-lg mt-10">
                    <p className="font text-gray-700">Please log in to view your profile.</p>
                  </div>
                );
              }

              return (
                <div className={`min-h-screen flex flex-col font-inter justify-center items-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
                   <div className={`flex flex-col items-center justify-center p-6 shadow-lg rounded-lg max-w-md w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>
                    <img
                      src={user?.picture}
                      alt={user?.name}
                      className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4 shadow-md"
                    />
                    <h2 className="text-2xl font-bold   mb-2">{user?.name}</h2>
                    <p className="text-lg   mb-4">{user?.email}</p>
                    <div className="flex gap-4">
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                      >
                        Logout
                      </button>
                      <button
                        onClick={handleGoHome}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                      >
                        Go Home
                      </button>
                    </div>
                  </div>
                </div>
                
                  
  );
};

export default Profile;
<div className="flex flex-col items-center justify-center p-6 shadow-lg rounded-lg max-w-md w-full"></div>