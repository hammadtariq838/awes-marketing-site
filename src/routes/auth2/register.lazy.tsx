import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth2/register')({
  component: RegisterPage,
})


function InputField({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <>
      <label htmlFor={label.toLowerCase()} className="block mb-1">
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase()}
        className="w-full h-[42px] bg-white rounded-md border border-gray-300 border-solid shadow-sm"
        aria-label={label}
      />
    </>
  );
}

function SignUpForm() {
  return (
    <form className="flex flex-col px-10 py-7 max-w-full bg-white rounded-xl shadow leading-[150%] w-[505px] max-md:px-5">
      <InputField label="Name" />
      <div className="mt-6">
        <InputField label="Email address" type="email" />
      </div>
      <div className="mt-6">
        <InputField label="Password" type="password" />
      </div>
      <button
        type="submit"
        className="justify-center items-center px-4 py-2.5 mt-6 text-sm font-medium leading-5 text-white bg-pink-900 rounded-md shadow-sm max-md:px-5"
      >
        Sign up
      </button>
      <p className="self-center mt-6 text-sm leading-5 text-right">
        <span className="text-slate-950">Already have an account? </span>
        <a href="#" className="text-indigo-600">
          Sign in
        </a>
      </p>
    </form>
  );
}

function RegisterPage() {
  return (
    <div className='flex flex-col justify-center gap-8 max-w-[505px] h-full'>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-extrabold leading-10 text-cyan-700">
          Sign Up
        </h1>
        <p className="leading-[143%] text-slate-950 text-opacity-60">
          Please enter relevant details for sign up
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}

