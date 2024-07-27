import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import LoginForm from '../features/auth/LoginForm';
import SignupForm from '../features/auth/SignupForm';

function Login({ close }) {
  const [signInUp, setSignInUp] = useState(true);

  function toggleForm() {
    setSignInUp(!signInUp);
  }

  return (
    <div className="flex h-[96.5vh] w-[70vw] items-center justify-center bg-white/50 ">
      <div className="hidden h-full rounded-xl bg-white md:block md:w-[60%]"></div>
      <div className="flex h-full w-full flex-col rounded-xl bg-white p-1 md:w-[40%]">
        <IoMdClose
          className="m-2 cursor-pointer self-end rounded-full text-5xl hover:bg-gray-200"
          onClick={close}
        />
        {signInUp && <LoginForm openSignUp={toggleForm} close={close} />}
        {!signInUp && <SignupForm openSignIn={toggleForm} close={close} />}
      </div>
    </div>
  );
}

export default Login;
