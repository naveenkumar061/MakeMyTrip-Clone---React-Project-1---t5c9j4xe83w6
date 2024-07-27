import { Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CopyRight from './CopyRight';
import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';
import SpinnerMini from '../../utils/SpinnerMini';

function SignupForm({ openSignIn, close }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { mutate, isCreating } = useSignup(close);

  function onSubmit(data) {
    mutate(data);
    reset();
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold">Sign Up</h1>
        </div>
      </div>
      <div>
        <div className="flex flex-col p-2">
          <form
            className="flex flex-col py-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-1 flex flex-col gap-4">
              <label htmlFor="name">Name</label>
              <input
                className="focus:shadow-[rgb(235,240,255) 0px 0px 0px 2px] w-full rounded border-2 border-[#dee0e1] p-2 outline-none transition-colors hover:border-[#2d69ff99] focus:border-[#2e69ff]"
                type="text"
                placeholder="Your name"
                id="name"
                {...register('name', {
                  required: 'Name is required',
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: 'Invalid Name; provide only letters',
                  },
                })}
              />
              {errors.name && (
                <div className="mt-1 text-[12px] text-red-500">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div className="mb-1 flex flex-col gap-4">
              <label className="font-bold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                placeholder="Your email"
                className="focus:shadow-[rgb(235,240,255) 0px 0px 0px 2px] w-full rounded border-2 border-[#dee0e1] p-2 outline-none transition-colors hover:border-[#2d69ff99] focus:border-[#2e69ff]"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <div className="mt-1 text-[12px] text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="mb-1 flex flex-col gap-4 dark:text-[rgb(213,214,214)]">
              <label className="font-bold" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                className="w-full rounded border-2 border-[#dee0e1] p-2 outline-none transition-colors hover:border-[#2d69ff99] focus:border-[#2e69ff] focus:shadow-[rgb(235,240,255)0px0px0px2px] dark:border-[#393839] dark:bg-[#181818] dark:text-[rgb(213,214,214)] dark:hover:border-[rgba(45,105,255,0.4)] dark:focus:border-[#2e69ff]"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <div className="mt-1 text-[12px] text-red-500">
                  {errors.password.message}
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              className="my-3 h-10 w-full rounded-md bg-[#2e69ff] px-5 font-medium text-[#fff] hover:bg-[rgb(26,90,255)] disabled:bg-blue-500 disabled:text-slate-300 disabled:opacity-40"
              disabled={!isValid || isCreating}
            >
              {isCreating ? <SpinnerMini /> : 'Signup'}
            </button>
          </form>
          <div className="flex gap-2">
            Already have an account
            <div
              className="transform cursor-pointer rounded bg-blue-500 p-1 text-lg text-white transition-transform hover:scale-110"
              onClick={openSignIn}
            >
              Sign In
            </div>
          </div>
        </div>
      </div>
      <CopyRight />
    </>
  );
}

export default SignupForm;
