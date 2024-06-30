import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <section className="bg-brand w-full">
      <div className="flex gap-8 w-full max-w-6xl px-2 mx-auto py-6">
        <div className="flex flex-col w-3/12 mt-5">
          <Link to='/' className="flex items-center gap-2.5">
            <img
              src="/logo-footer.png"
              alt="Spect-AI logo"
              className="aspect-[3.45] w-[207px]" />
          </Link>
          <p className="mt-[32px] text-sm text-white">
            American Worldwide Educational Services is your trusted partner, guiding you from being a foreign graduate nurse to joining the U.S. healthcare profession and becoming a U.S. citizen.
          </p>
        </div>
        <div className="flex gap-5 mt-28 w-9/12 text-white justify-between">
          <div className="grid gap-5">
            <p className="text-sm">
              Subscribe to stay tuned for new and latest updates. Let's do it!
            </p>
            <form className="flex gap-3 items-center">
              <Label htmlFor="email" className="sr-only">Enter your email</Label>
              <Input
                id="email"
                type="email"
                aria-label="Enter your email"
                placeholder="Enter your email Address"
                className="rounded-xl shadow-lg h-12"
              />
              <Button size='lg' className='text-base font-bold bg-dark-marron h-12 rounded-lg'>Subscribe</Button>
            </form>
          </div>
          <div className="flex flex-col text-white gap-5">
            <h3 className="text-base font-medium leading-4">Follow us</h3>
            <div className="flex gap-2">
              <div className="rounded-full w-6 h-6 bg-white flex justify-between items-center">
                <Instagram className='text-black w-4 h-4 mx-auto stroke-[1.2px]' />
              </div>
              <div className="rounded-full w-6 h-6 bg-white flex justify-between items-center">
                <Facebook className='text-black w-4 h-4 mx-auto stroke-[1.2px]' />
              </div>
              <div className="rounded-full w-6 h-6 bg-white flex justify-between items-center">
                <Twitter className='text-black w-4 h-4 mx-auto stroke-[1.2px]' />
              </div>
            </div>
          </div>
          <div className="flex flex-col text-white gap-5">
            <h3 className="text-base font-medium leading-4">Call us</h3>
            <p className="text-sm">+1 800 854-36-80</p>
          </div>
        </div>
      </div>
      <div className='h-16 w-full' />
      <Separator />
      <div className="flex py-6 justify-between gap-5 text-sm text-white max-w-6xl px-2 w-full mx-auto">
        <div className="">©{new Date().getFullYear()} All Rights Reserved</div>
        <div className="flex gap-5 justify-between">
          <a className="hover:underline">Privacy Policy</a>
          <a className="hover:underline">Terms of Use</a>
          <a className="hover:underline">Sales and Refunds</a>
          <a className="hover:underline">Legal</a>
          <a className="hover:underline">Site Map</a>
        </div>
      </div>
    </section>
  )
}

