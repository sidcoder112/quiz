import { RootState } from "@/store";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import Spline from '@splinetool/react-spline';
import quizlogo from '../assets/quizlogo.png'
import defpic from '../assets/default-picture.png'

const HomePage: React.FC = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const navigate = useNavigate();
  const { isAuthenticated, user ,isLoading } = useAuth0();
  const sceneUrl =
    theme === 'dark'
      ? 'https://prod.spline.design/8hFOIGik5aD4qG0S/scene.splinecode'
      : 'https://prod.spline.design/GZF8uKFSdRkqPL4F/scene.splinecode';
  // const handleAdmin = ()=>{
  //   // if(user?.email==='sidharth.sl@netstratum.com'){
  //   //   navigate('/admin-panel')
  //   // }
  //   navigate('/admin-panel')
  // }
  const isAdmin = user?.email === 'sidharth.sl@netstratum.com';
  if (isLoading) {
    return (
      <div className={`min-h-screen  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-100 text-gray-700'}`}>
            <div className="flex items-center justify-center min-h-screen ">
            
            <div
              className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] 
              z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] 
              before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] 
              before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 
              after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] 
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
        <div className='relative'>
        <div className="flex flex-col items-center absolute z-10 font-inter justify-center min-h-screen w-full pointer-events-none">
          {isAuthenticated && (
            <>
              <div
                className="absolute top-4 right-4 pointer-events-auto flex items-center gap-2 cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                    <img
                      src={user?.picture ||defpic} 
                      alt={user?.name || 'User'}
                      className="w-10 h-10 rounded-full border-2 border-gray-500 ]"
                    />
                
                <span className="text-lg dark:text-white text-gray-700">{user?.name}</span>
                
              </div>
              <button
      className="absolute top-4 left-4 px-4 py-2 pointer-events-auto bg-orange-800 text-white font-inter rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:bg-orange-900 active:bg-orange-700 transition-colors duration-300"
      onClick={() => navigate('/history')}
    >
      View History
    </button>

            </>
          )}

          <div className="text-center p-6">
          <img src={quizlogo} alt="Quiz Game" className="w-full h-auto" />
            <p className="text-lg dark:text-white text-gray-700 mb-8">
              Test your knowledge with our fun and challenging quizzes!
            </p>
            <div className="flex justify-center gap-4 ">
              {isAuthenticated ? (
                <button
                  className="group h-10 select-none  pointer-events-auto rounded-[4px] bg-orange-600 px-4 leading-10 text-zinc-50 shadow-[0_-1px_0_1px_#7c2d12_inset,0_0_0_1px_#c2410c_inset,0_0.5px_0_1.5px_#fb923c_inset] hover:bg-orange-700 active:bg-orange-800 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset] "
                  onClick={() => navigate('/setup')}
                >
                  Play as {user?.name}
                </button>
              ) : (
                <>
                  <button
                  className="group h-10 select-none rounded-[4px] pointer-events-auto  bg-orange-600 px-4 leading-10 text-zinc-50 shadow-[0_-1px_0_1px_#7c2d12_inset,0_0_0_1px_#c2410c_inset,0_0.5px_0_1.5px_#fb923c_inset] hover:bg-orange-700 active:bg-orange-800 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset] "
                    onClick={() => navigate('/setup')}
                  >
                    Play as Guest
                  </button>
                  <div className='pointer-events-auto'>
                  <LoginButton />
                  </div>
                </>
              )}
            </div>
          </div>

          <button
      className="absolute bottom-6 right-6 h-10 select-none rounded-lg pointer-events-auto  bg-gray-600 px-4 leading-10 text-white shadow-[0_-1px_0_1px_#4b5563_inset,0_0_0_1px_#6b7280_inset,0_0.5px_0_1.5px_#d1d5db_inset] hover:bg-gray-700 active:bg-gray-800 active:shadow-[inset_-1px_0_1px_0_rgba(0,0,0,0.2),inset_1px_0_1px_0_rgba(0,0,0,0.2),inset_0px_0.125rem_0px_0_rgba(0,0,0,0.2)] transition-colors duration-300"
      onClick={() => navigate('/settings')}
    >
      <span className="block group-active:translate-y-1">Settings</span>
    </button>


          {isAdmin && (
          <button
          className="group absolute bottom-6 left-6 h-10 select-none rounded-[4px] pointer-events-auto  bg-red-600 px-4 leading-10 text-white shadow-[0_-1px_0_1px_#7f1d1d_inset,0_0_0_1px_#b91c1c_inset,0_0.5px_0_1.5px_#ef4444_inset] hover:bg-red-700 active:bg-red-800 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset] transition-colors duration-300"
          onClick={() => navigate('/admin-panel')}
        >
          <span className="block group-active:translate-y-1">Admin Panel</span>
        </button>
        
          )}
          
        </div>
        <div className='z-0 relative h-screen'>
        <Spline scene={sceneUrl} />
        </div>
        </div>
  );
};

export default HomePage; 