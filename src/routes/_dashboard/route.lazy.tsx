import { createLazyFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useSignoutMutation } from "@/services/account/accountApiSlice";
import { clearAuth } from '@/features/auth/authSlice';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/_dashboard')({
  component: LayoutPage,
})

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [signoutApi, { isLoading }] = useSignoutMutation();
  const navigate = useNavigate();

  return (
    <header className="bg-white w-full shadow">
      <div className="flex items-center justify-between gap-5 px-5 w-full mx-auto h-[75px]">
        <Link to='/' className="flex items-center gap-2.5"
        >
          <img
            src="/logo.png"
            alt="AWES logo"
            className="shrink-0 max-w-full aspect-[3.45] w-[150px] sm:w-[170px] md:w-[207px]"
          />
        </Link>
        <div className="hidden sm:flex gap-8 items-center">
          {
            user && (
              <>
                <Button
                  variant='link'
                  className='underline underline-offset-1 text-[#4F46E5] font-normal hover:no-underline p-0 h-max'
                  onClick={() => {
                    signoutApi();
                    dispatch(clearAuth());
                    toast.success('You have been signed out');
                    navigate({ to: '/' });
                  }}
                  disabled={isLoading}
                >
                  Sign out
                </Button>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 uppercase">
                  {user.account.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </>
            )
          }
        </div>
        <Sheet>
          <SheetTrigger className="block sm:hidden">
            <Menu size={32} className="opacity-80" />
          </SheetTrigger>
          <SheetContent side='left'>
            <div className="flex flex-col gap-8">
              <Link to='/' className="flex items-center gap-2.5"
              >
                <img
                  src="/logo.png"
                  alt="AWES logo"
                  className="shrink-0 max-w-full aspect-[3.45] w-[150px] sm:w-[207px]"
                />
              </Link>
              {
                user && (
                  <Button
                    size='brand'
                    variant='link'
                    onClick={() => {
                      signoutApi();
                      dispatch(clearAuth());
                      toast.success('You have been signed out');
                      navigate({ to: '/' });
                    }}
                    disabled={isLoading}
                  >
                    Sign out
                  </Button>
                )
              }
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
};

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pt-7 pb-20 mx-auto w-full text-sm font-medium leading-6 bg-white border border-solid shadow-sm border-slate-300">
        <h2 className="self-start ml-5 text-xl font-bold leading-8 text-black max-md:ml-2.5">
          Adeel Akram
        </h2>
        <div className="shrink-0 mt-6 h-px border border-solid bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-30" />
        <nav className='ml-5'>
          <a
            href="#"
            className="flex gap-4 self-center px-4 py-2 mt-6 max-w-full text-white whitespace-nowrap bg-pink-900 rounded-lg border border-amber-300 border-solid w-[241px]"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5f92afbbcdc2b992033bc8c9a7cd255df25a7bdb2b9bc51af2f253d4a421405?apiKey=37e9b177900140c9be4212bdea99ec1b&"
              alt=""
              className="shrink-0 my-auto w-5 aspect-square"
            />
            <span>Homepage</span>
          </a>
          <a
            href="#"
            className="flex gap-4 self-center px-4 py-2 mt-1.5 max-w-full text-black rounded-xl w-[241px]"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b10b2928c20ad77ce70852e2b8454e812577be9aa2a0d6784d3335b983751081?apiKey=37e9b177900140c9be4212bdea99ec1b&"
              alt=""
              className="shrink-0 my-auto w-5 aspect-square"
            />
            <span>My application</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

function LayoutPage() {
  return (
    <div className="flex flex-col pt-2 bg-white">
      <Header />
      <main className="flex gap-0 self-center w-full max-md:flex-wrap max-md:max-w-full">
        <Sidebar />
        <section className="flex flex-col w-9/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center px-6 py-5 w-full bg-orange-100 max-md:px-5 max-md:max-w-full">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}