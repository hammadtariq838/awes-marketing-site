import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/dashboard')({
  component: DashboardPage,
})

const ApplicationStatus = () => {
  return (
    <div className="mt-10 max-w-full w-[654px]">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-5 justify-center px-5 py-9 text-xl font-bold rounded-lg border-2 border-solid border-slate-950 border-opacity-30 max-md:mt-5">
            <h3 className="leading-8 text-black">
              Application <br /> status:
            </h3>
            <p className="flex-auto my-auto text-teal-800 leading-[160%]">
              Not started
            </p>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-5 justify-center px-5 py-12 text-xl font-bold leading-8 rounded-lg border-2 border-solid border-slate-950 border-opacity-30 max-md:mt-5">
            <h3 className="flex-auto text-black">Accessibile steps:</h3>
            <p className="text-teal-800">Step 1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountHomepage = () => {
  return (
    <>
      <h1 className="self-stretch mr-7 text-xl font-bold leading-8 text-black max-md:mr-2.5 max-md:max-w-full">
        Account Homepage
      </h1>
      <p className="self-stretch mt-5 mr-7 text-sm leading-5 text-black max-md:mr-2.5 max-md:max-w-full">
        Welcome to the AWES application portal. You are just a few steps away
        from your dream career in the United States.
      </p>
      <div className="flex flex-col px-10 py-6 mt-14 max-w-full bg-teal-800 rounded-lg shadow-2xl w-[654px] max-md:px-5 max-md:mt-10">
        <h2 className="text-xl font-bold leading-8 text-white max-md:max-w-full">
          Start the application to access the complete functionality
        </h2>
        <div className="flex gap-4 self-center mt-7 text-sm font-medium leading-6">
          <button className="justify-center px-4 py-2 text-white rounded-md border border-white border-solid max-md:px-5">
            Read instructions
          </button>
          <button className="justify-center px-4 py-2 text-white bg-pink-900 rounded-md max-md:px-5">
            Start application
          </button>
        </div>
      </div>
    </>
  );
};

const Remarks = () => {
  return (
    <section className="flex flex-col pt-5 pb-20 mt-10 mb-3 max-w-full text-xl font-bold leading-8 text-black whitespace-nowrap bg-white rounded-xl border-2 border-solid border-slate-950 border-opacity-30 w-[654px]">
      <h2 className="self-start ml-5 max-md:ml-2.5">Remarks</h2>
      <div className="shrink-0 mt-5 mb-1.5 h-px border border-solid bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-30 max-md:max-w-full" />
    </section>
  );
};

function DashboardPage() {
  return (
    <div className="flex flex-col items-center pt-12 pr-20 pb-20 pl-10 rounded-xl bg-stone-50 max-md:px-5 max-md:max-w-full">
      <AccountHomepage />
      <ApplicationStatus />
      <Remarks />
    </div>
  );
}


