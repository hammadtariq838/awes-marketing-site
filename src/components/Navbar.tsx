import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";


export default function Navbar() {
  return (
    <header className="bg-white w-full shadow">
      <div className="flex items-center justify-between gap-5 max-w-6xl px-5 w-full mx-auto h-[75px]">
        <Link to='/' className="flex items-center gap-2.5"
        >
          <img
            src="/logo.png"
            alt="AWES logo"
            className="shrink-0 max-w-full aspect-[3.45] w-[150px] sm:w-[170px] md:w-[207px]"
          />
        </Link>
        <div className="hidden sm:flex gap-8">
          <nav className="flex gap-5 my-auto">
            <Link to='/' className='hover:text-dark-marron'>Home</Link>
            <Link to='/services' className='hover:text-dark-marron'>Services</Link>
            <Link to='/about-us' className='hover:text-dark-marron'>About us</Link>
          </nav>
          <Button
            size='brand'
            variant='brand'
          >
            Apply now
          </Button>
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
              <nav className="flex flex-col gap-5 my-auto">
                <Link to='/' className='hover:text-dark-marron'>Home</Link>
                <Link to='/services' className='hover:text-dark-marron'>Services</Link>
                <Link to='/about-us' className='hover:text-dark-marron'>About us</Link>
              </nav>
              <Button
                size='brand'
                variant='brand'
              >
                Apply now
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}