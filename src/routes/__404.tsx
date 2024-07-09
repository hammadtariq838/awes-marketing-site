import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';


export const Route = createFileRoute('/__404')({
  component: PageNotFound,
})

export function PageNotFound() {
  return (
    <main className="bg-[#F9F2E0] min-h-screen flex items-center justify-center text-violet-600">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="font-semibold">404 ERROR</h2>
        <h1 className="text-5xl font-extrabold tracking-tighter leading-10 text-center text-gray-900 max-md:max-w-full max-md:text-4xl">
          Page not found.
        </h1>
        <p className="text-center text-gray-500 max-md:max-w-full">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link to="/">Go back home →</Link>
      </div>
    </main>
  );
}
