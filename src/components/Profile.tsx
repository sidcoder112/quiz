
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import LoginButton from './LoginButton';

const Profile: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth0();
  const theme = useSelector((state: RootState) => state.settings.theme);
  const navigate = useNavigate();

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
                    <div className="mt-6 flex justify-center gap-4">
                      <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2  text-black rounded-lg hover:text-red-800"
                      >
                        Home
                      </button>
                      <LoginButton />
                    </div>
                  </div>
                );
              }

              return (
                <div className={`min-h-screen flex flex-col font-inter justify-center items-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
                   <div className={`flex flex-col items-center justify-center p-6 shadow-lg rounded-lg max-w-md w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>
                    <img
                      src={user?.picture}
                      alt={user?.name}
                      className="w-32 h-32 rounded-full border-4 border-slate-600 mb-4 shadow-md"
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