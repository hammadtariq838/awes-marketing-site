import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="bg-white w-full shadow">
      <div className="flex items-center justify-between gap-5 max-w-6xl px-2 w-full mx-auto h-[75px]">
        <Link to='/' className="flex items-center gap-2.5"
        >
          <img
            src="/logo.png"
            alt="AWES logo"
            className="shrink-0 max-w-full aspect-[3.45] w-[207px]"
          />
        </Link>
        <div className="flex gap-8">
          <nav className="flex gap-5 my-auto">
            <Link to='/' className='hover:text-dark-marron'>Home</Link>
            <Link to='/services' className='hover:text-dark-marron'>Services</Link>
            <Link to='/about-us' className='hover:text-dark-marron'>About us</Link>
          </nav>
          <Button
            size='lg'
            className='font-bold rounded-lg bg-dark-marron h-[50px] text-base px-6'
          >
            Apply now
          </Button>
        </div>
      </div>
    </header>
  )
}