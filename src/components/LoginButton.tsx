
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="group h-10 select-none rounded-[4px] bg-[#5072A7] px-4 leading-10 text-zinc-50 shadow-[0_-1px_0_1px_#305c8c_inset,0_0_0_1px_#2e5c7f_inset,0_0.5px_0_1.5px_#6a8bbf_inset] hover:bg-[#3f5e7b] active:bg-[#2d4a60] active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.2)_inset]"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
