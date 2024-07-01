import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/login')({
  component: LoginScreen,
})

function InputField({ label, type = "text" }: { label: string; type?: string }) {
  const id = label.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-base text-slate-950 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        className="w-full h-[42px] bg-white rounded-md border border-gray-300 border-solid shadow-sm"
      />
    </div>
  );
}

function LoginScreen() {
  return (
    <div className='flex flex-col justify-center gap-8 max-w-[448px] h-full'>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-extrabold leading-10 text-cyan-700">
          Welcome back
        </h1>
        <p className="leading-[143%] text-slate-950 text-opacity-60">
          Please enter your login details
        </p>
      </div>
      <form className="flex flex-col px-10 py-7 max-w-full bg-white rounded-xl shadow leading-[150%] w-[505px] max-md:px-5">
        <InputField label="Email address" type="email" />
        <InputField label="Password" type="password" />
        <div className="flex gap-5 justify-between w-full leading-[143%]">
          <label className="flex gap-2 text-slate-950">
            <input type="checkbox" className="shrink-0 my-auto w-4 h-4 bg-white rounded border border-gray-300 border-solid" />
            Remember me
          </label>
          <a href="#" className="text-right text-indigo-600">Forgot your password?</a>
        </div>
        <button className="justify-center items-center px-4 py-2.5 mt-6 font-medium text-white bg-pink-900 rounded-md shadow-sm leading-[143%] max-md:px-5">
          Sign in
        </button>
        <p className="self-center mt-6 leading-5 text-right">
          <span className="text-slate-950">Don't have account?</span>{" "}
          <a href="#" className="text-indigo-600">Sign up</a>
        </p>
      </form>
    </div>
  );
}
