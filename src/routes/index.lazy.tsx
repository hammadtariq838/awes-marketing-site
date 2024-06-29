import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: LandingPage,
})

const ServiceCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="flex flex-col grow px-7 py-6 w-full bg-white rounded-xl shadow leading-[150%] text-slate-950 text-opacity-60 max-md:pl-5 max-md:mt-7 max-md:max-w-full">
    <img loading="lazy" src={icon} alt={`${title} icon`} className="w-16 aspect-square" />
    <h3 className="mt-4 text-xl font-bold text-cyan-700 max-md:max-w-full">{title}</h3>
    <p className="mt-4 text-sm leading-5 max-md:max-w-full">{description}</p>
    <div className="flex gap-5 self-start mt-7 text-base font-semibold">
      <span>See more</span>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4544bdb6916986d3c346c6fdaa7ff03420db2977c24cc841751e10f86da23422?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="" className="shrink-0 aspect-[1.92] w-[31px]" />
    </div>
  </div>
);

const ProcessStep = ({ title, description, image }: { image: string, title: string, description: string }) => (
  <section className="self-center px-8 py-6 mt-20 w-full rounded-3xl border border-red-400 border-solid max-w-[1148px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col w-[66%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow mt-2 max-md:mt-10 max-md:max-w-full">
          <h3 className="text-3xl font-extrabold leading-10 text-sky-600 max-md:max-w-full">{title}</h3>
          <p className="mt-6 text-sm leading-5 text-slate-950 text-opacity-60 max-md:max-w-full">{description}</p>
          <button className="justify-center self-start px-4 py-2.5 mt-24 text-base font-bold leading-6 text-center text-white bg-pink-900 rounded-lg max-md:mt-10">
            Apply now
          </button>
        </div>
      </div>
      <div className="flex flex-col ml-5 w-[34%] max-md:ml-0 max-md:w-full">
        <img loading="lazy" src={image} alt={`Illustration for ${title}`} className="grow w-full aspect-[1.41] max-md:mt-10" />
      </div>
    </div>
  </section>
);

function LandingPage() {
  const services = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a8a6b2ec222c3290761487fa2129a69318c5dd12ddf45277e3fd5cd2e11f440?apiKey=37e9b177900140c9be4212bdea99ec1b&",
      title: "Study and pass TOEFL iBT",
      description: "Your dream career as a U.S. healthcare professional kicks off with proficiency in the English language. AWES provides you with the study resources to master and excel in English, helping you apply for and take the TOEFL iBT, the necessary first step towards immigration."
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5257c9e7edd456d9b5e3130ab4bf3d3f77fb7d52d301df4728fb602fa9b36f91?apiKey=37e9b177900140c9be4212bdea99ec1b&",
      title: "Study and pass CGFNS Certificate program",
      description: "AWES helps you prepare for the CGFNS Certification Program, which is compulsory for foreign graduate nurses who wish to join the U.S. healthcare system."
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/df15074eafa5bbe749b4074bed48b730434c4ccc2fa5cdc26e9ab8e09b34e755?apiKey=37e9b177900140c9be4212bdea99ec1b&",
      title: "Study and pass NCLEX",
      description: "To obtain a license and practice as a registered nurse, all graduate nurses must pass the NCLEX-RN exam to ensure their skills and experience meet the requirements of U.S. medical facilities. AWES provides comprehensive support at every step of this critical exam."
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c20f9d19166cf47a5f8b7d76d6ea5901ae5ac155fb00f7e11b350fc6e2766114?apiKey=37e9b177900140c9be4212bdea99ec1b&",
      title: "Get state RN license for 42 states",
      description: "AWES helps you obtain the compact state nursing license (eNLC), making you eligible to practice nursing in 42 states. We provide resources and guidance to secure your license."
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3e25587b41669619521b2c48a7bd70e77afdfaea14a30d913faca0777565c003?apiKey=37e9b177900140c9be4212bdea99ec1b&",
      title: "Get your green card",
      description: "From visa screening to relocation logistics, Team AWES has you covered. We handle all your immigration paperwork and submit it to a U.S. immigration attorney, saving you the hassle. Welcome to your dream life in the U.S."
    }
  ];

  const processSteps = [
    {
      title: "Easy Document Submission",
      description: "Sign up and upload your initial documents. This helps us evaluate if you meet the prerequisites for joining the U.S. healthcare system.",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0e4aaf2c51664b1376b0ebdb9c3cc032a611028c6742ad9d736ba15bc8c91754?apiKey=37e9b177900140c9be4212bdea99ec1b&"
    },
    {
      title: "Simplified Application Process",
      description: "AWES offers full immigration services for foreign graduates. We've transformed a long, hectic process into a guided, multi-step journey so you can focus on your preparations while we handle the logistics.",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca640080191e8d5a9b8774e3526bbbd9b76e694fc59454522a81b9b18c0a2ca2?apiKey=37e9b177900140c9be4212bdea99ec1b&"
    },
    {
      title: "Feedback-Assisted Application Progress",
      description: "We provide regular feedback and assistance on your document submissions and exam preparations, handling the logistics so you can focus on turning your dreams into reality. We value communication and our dedicated team is always ready to assist you.",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/320be43547b38ec59a13270bb3e57c644c0eca304a0234c4b1ba353245b65854?apiKey=37e9b177900140c9be4212bdea99ec1b&"
    }
  ];

  return (
    <div className="flex flex-col bg-amber-50">
      <header className="flex flex-col w-full bg-teal-800 max-md:max-w-full">
        <div className="flex justify-center items-center px-16 py-2 w-full text-base leading-6 text-center bg-white text-slate-950 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-w-[1147px] max-md:flex-wrap max-md:max-w-full">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/962c3672384f410dce420ce84879556d39eca103a76a1d393c3cbc34ff3a0da1?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="Company logo" className="shrink-0 max-w-full aspect-[3.45] w-[207px]" />
            <nav className="flex gap-5 justify-between my-auto">
              <a href="#" className="justify-center self-start px-1.5 py-1.5 mt-2.5 whitespace-nowrap rounded-md border-2 border-teal-800 border-solid">Home</a>
              <a href="#" className="my-auto">Services</a>
              <a href="#" className="my-auto">About us</a>
              <button className="justify-center px-6 py-2.5 font-bold text-white bg-pink-900 rounded-lg max-md:px-5">Apply now</button>
            </nav>
          </div>
        </div>
        <div className="self-center mt-20 w-full max-w-[1293px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex z-10 flex-col px-5 mt-11 text-white max-md:mt-10 max-md:max-w-full">
                <h1 className="text-5xl font-extrabold tracking-wide leading-[56px] max-md:max-w-full">
                  Your one-stop platform for starting your nursing career in the U.S.
                </h1>
                <p className="mt-14 text-sm leading-5 max-md:mt-10 max-md:max-w-full">
                  Are you a foreign graduate nurse looking to join the U.S. healthcare system? You are in the right spot. We help talented nursing professionals transform their credentials into a U.S. license, secure their dream job, and obtain green cards for themselves and their families.
                </p>
                <button className="justify-center self-start px-4 py-2.5 mt-9 text-base font-bold leading-6 text-center text-white bg-pink-900 rounded-lg">
                  Apply now
                </button>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ceceee3eee58b160d9608402d8e7739ac0ae11358d11b2ef93546c3308d42efa?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="Nursing professional" className="grow w-full aspect-[1.45] max-md:max-w-full" />
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center px-16 pt-20 w-full bg-stone-50 max-md:px-5 max-md:max-w-full">
        <section className="flex z-10 flex-col items-center mt-6 w-full max-w-[1081px] max-md:max-w-full">
          <h2 className="text-5xl font-extrabold tracking-wide text-cyan-700 leading-[55.86px] max-md:max-w-full">
            Services we specialise in
          </h2>
          <p className="mt-7 text-sm leading-5 text-center text-slate-950 text-opacity-80 w-[864px] max-md:max-w-full">
            American Worldwide Educational Services is your trusted partner, guiding you from being a foreign graduate nurse to joining the U.S. healthcare profession and becoming a U.S. citizen. We're with you every step of the way.
          </p>
          <div className="self-stretch mt-20 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              {services.slice(0, 2).map((service, index) => (
                <div key={index} className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
          <div className="self-stretch mt-6 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              {services.slice(2, 4).map((service, index) => (
                <div key={index} className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col px-6 py-6 mt-6 max-w-full bg-white rounded-xl shadow text-slate-950 text-opacity-60 w-[527px] max-md:pl-5">
            <ServiceCard {...services[4]} />
          </div>
          <h2 className="mt-24 text-5xl font-extrabold tracking-wide text-sky-600 leading-[55.86px] max-md:mt-10 max-md:max-w-full">
            See how we work with you
          </h2>
        </section>
        {processSteps.map((step, index) => (
          <ProcessStep key={index} {...step} />
        ))}
        <section className="flex flex-col justify-end px-5 pt-12 mt-32 w-full bg-stone-50 max-md:mt-10 max-md:max-w-full">
          <h2 className="self-center text-5xl font-extrabold tracking-wide text-sky-600 leading-[55.86px] max-md:max-w-full">
            Discover what our clients are saying
          </h2>
          <div className="flex flex-col px-16 py-20 mt-11 w-full text-sm text-center bg-slate-200 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <p className="self-center mt-4 leading-5 text-slate-950 w-[768px] max-md:max-w-full">
              My immigration from the Philippines to the United States was only made possible by AWES. They started the process from the very beginning. They helped me get all the papers and passed all the required exams until I got a great job. They were here for me the entire time, every step of the way.
            </p>
            <div className="flex justify-center items-center px-16 mt-8 leading-[143%] max-md:px-5 max-md:max-w-full">
              <div className="flex gap-4">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/71245349242ce7f2ae388a335bd7964c15a496bee062494ee9926e8826676439?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="Kassandra L." className="shrink-0 w-10 aspect-square" />
                <div className="flex gap-1 my-auto">
                  <div className="font-bold text-gray-900">Kassandra L.</div>
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9d28f86eb99223c050822337c2f57e5db4ebd6c6c79f2dde0fc8cd84b3d511c?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="" className="shrink-0 w-5 aspect-square" />
                  <div className="text-gray-500">US Healthcare professional</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex justify-center items-center px-16 py-20 w-full text-center bg-white max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col px-20 py-16 w-full rounded-3xl max-w-[1146px] max-md:px-5 max-md:max-w-full">
            <h2 className="mr-3.5 ml-3 text-3xl font-extrabold leading-10 text-white max-md:mr-2.5 max-md:max-w-full">
              Are you ready to join the U.S. healthcare system with help from AWES professionals?
            </h2>
            <button className="justify-center self-center px-4 py-2.5 mt-8 text-base font-bold leading-6 text-white bg-pink-900 rounded-lg">
              Contact us today
            </button>
          </div>
        </section>
      </main>
      <footer className="flex flex-col items-center pt-11 pb-7 w-full bg-teal-800 max-md:max-w-full">
        <div className="w-full max-w-[1117px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-5 text-sm leading-5 text-white max-md:mt-10">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/05ba908527a97182e1477bbd6f91d86454668ba81cb62008e8e5e9b4f115e7a8?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="Company logo" className="aspect-[3.45] w-[207px]" />
                <p className="mt-11 max-md:mt-10">
                  American Worldwide Educational Services is your trusted partner, guiding you from being a foreign graduate nurse to joining the U.S. healthcare profession and becoming a U.S. citizen.{" "}
                </p>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
              <div className="flex gap-5 mt-28 max-md:flex-wrap max-md:mt-10">
                <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                  <div className="flex gap-5 text-white max-md:flex-wrap max-md:max-w-full">
                    <p className="flex-auto text-sm leading-5 max-md:max-w-full">
                      Subscribe to stay tuned for new and latest updates. Let's do it!
                    </p>
                    <p className="text-base font-medium leading-6">Follow us</p>
                  </div>
                  <div className="flex gap-2 self-end px-5 mt-3.5">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2798a8e477ff83a1f5d516dcc9a6e6c79f1e764ffe07b89c30b72ec65b8819df?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="Facebook" className="shrink-0 w-6 aspect-square" />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/321396f3344b7950cffce5bfbe136e4b8c19b4cef208115bab67f1523d10d5a0?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="Twitter" className="shrink-0 w-6 aspect-square" />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f500beee144d5c73abf0445aedbc71d5e46f3efbb62433a28d0765c25fd0012?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="Instagram" className="shrink-0 w-6 aspect-square" />
                  </div>
                  <form className="flex gap-3 mt-1 max-md:flex-wrap max-md:max-w-full">
                    <label htmlFor="emailSubscribe" className="sr-only">Enter your email Address</label>
                    <input
                      type="email"
                      id="emailSubscribe"
                      className="flex-1 justify-center items-start px-2.5 py-4 text-xs leading-5 text-slate-950 text-opacity-30 bg-white rounded-xl shadow-lg max-md:pr-5 max-md:max-w-full"
                      placeholder="Enter your email Address"
                    />
                    <button type="submit" className="justify-center px-4 py-2.5 text-base font-bold leading-6 text-center text-white whitespace-nowrap bg-pink-900 rounded-lg">
                      Subscribe
                    </button>
                  </form>
                </div>
                <div className="flex flex-col self-start px-5">
                  <p className="text-base font-medium leading-6 text-white">Call us</p>
                  <p className="mt-5 text-sm leading-5 text-white">+1 800 854-36-80</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch mt-28 w-full bg-white border border-white border-solid min-h-[1px] max-md:mt-10 max-md:max-w-full" />
        <div className="flex gap-5 px-5 mt-8 w-full text-sm leading-5 text-white max-w-[1157px] max-md:flex-wrap max-md:max-w-full">
          <p className="flex-auto my-auto">© 2021 All Rights Reserved</p>
          <nav className="flex gap-5 justify-between max-md:flex-wrap">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sales and Refunds</a>
            <a href="#">Legal</a>
            <a href="#">Site Map</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;