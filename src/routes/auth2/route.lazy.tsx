import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth2')({
  component: AuthLayout,
})

function Navbar() {
  return (
    <header className="bg-white w-full shadow">
      <nav className="flex items-center justify-between gap-5 max-w-6xl px-5 w-full mx-auto h-[75px]">
        <Link to='/' className="flex items-center gap-2.5"
        >
          <img
            src="/logo.png"
            alt="AWES logo"
            className="shrink-0 max-w-full aspect-[3.45] w-[150px] sm:w-[170px] md:w-[207px]"
          />
        </Link>
      </nav>
    </header>
  )
}

function AuthLayout() {
  return (
    <main className='flex flex-col min-h-screen'>
      <Navbar />
      <section className="flex items-center grow bg-teal-800 w-full">
        <div className="lg:grow lg:w-1/2 bg-[#ede8d5] lg:rounded-e-3xl rounded-lg py-8 ">
          <div className="max-w-xl h-full w-full lg:ml-auto lg:pl-5 px-8 lg:px-0">
            <Outlet />
          </div>
        </div>
        <div className="hidden lg:flex items-center grow w-1/2">
          <div className="max-w-xl w-full mr-autop pr-5">
            <div className='flex justify-end w-full h-[370px]'>
              <img loading="lazy" src="/auth-illustration.png" alt="Auth Illustration" className="w-[454px] aspect-[1.23]" />
            </div>
          </div>
        </div>
      </section>
    </main >
  );
}
