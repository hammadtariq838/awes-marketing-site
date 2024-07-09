import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/application')({
  component: ApplicationForm,
})


function FileUpload({ label, required, info }) {
  const id = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="mt-6">
      <div className="flex gap-2 self-start text-sm font-medium leading-6">
        <label htmlFor={id} className={required ? "text-red-600" : "text-slate-900"}>
          {label}{required && <span className="text-red-600">*</span>}
        </label>
        {info && (
          <div className="justify-center py-1 whitespace-nowrap rounded-full border-2 border-solid border-slate-950 border-opacity-60 stroke-[1.5px] text-slate-950 text-opacity-60">
            i
          </div>
        )}
      </div>
      <input
        type="file"
        id={id}
        accept=".pdf,.jpg,.jpeg"
        required={required}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className="flex justify-center items-center px-4 py-2 mt-2.5 max-w-full text-sm font-medium leading-6 bg-white rounded-md border border-solid border-slate-300 text-slate-900 w-[423px] max-md:px-5 cursor-pointer"
      >
        Choose file
      </label>
      <p className="mt-3 text-sm leading-5 text-slate-500 max-md:mr-0.5 max-md:max-w-full">
        PDF, JPG, JPEG up to 5 MB
      </p>
    </div>
  );
}

function FormField({ label, type, required }) {
  const id = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col grow text-sm font-medium leading-6 text-red-600 max-md:mt-10">
      <label htmlFor={id}>
        {label}{required && <span className="text-red-600">*</span>}
      </label>
      {type === 'date' ? (
        <div className="flex gap-2.5 mt-4 whitespace-nowrap text-slate-400">
          <input type="text" id={`${id}-day`} placeholder="DD" className="flex-1 px-3 py-2 bg-white rounded-md border border-solid border-slate-300 max-md:pr-5" />
          <input type="text" id={`${id}-month`} placeholder="MM" className="flex-1 px-3 py-2 bg-white rounded-md border border-solid border-slate-300 max-md:pr-5" />
          <input type="text" id={`${id}-year`} placeholder="YYYY" className="flex-1 px-3 py-2 bg-white rounded-md border border-solid border-slate-300 max-md:pr-5" />
        </div>
      ) : type === 'tel' ? (
        <div className="flex gap-0 py-px mt-1.5 bg-white rounded-md border border-solid shadow-sm border-slate-300 leading-[143%] text-slate-400">
          <div className="flex gap-1 px-3.5 py-2.5 whitespace-nowrap bg-white rounded-md shadow-sm">
            <span>US</span>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce938422d4f23248733f09672c6c2b90d85553fabe33825aca387a0e2a2d3a40?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="" className="shrink-0 w-5 aspect-square" />
          </div>
          <input type="tel" id={id} placeholder="+1 (555) 987-6543" className="flex-1 px-3 py-2" />
        </div>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={label}
          required={required}
          className="justify-center items-start px-3 py-2 mt-1.5 whitespace-nowrap bg-white rounded-md border border-solid border-slate-300 leading-[143%] text-slate-400 max-md:pr-5"
        />
      )}
    </div>
  );
}

function FormSection({ title, fields }) {
  return (
    <section className="mt-6 max-md:mr-0.5 max-md:max-w-full">
      <h2 className="sr-only">{title}</h2>
      <div className="flex flex-wrap gap-5 max-md:flex-col max-md:gap-0">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full">
            <FormField {...field} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ApplicationForm() {
  const personalInfo = [
    { label: 'Name', type: 'text', required: true },
    { label: 'Phone Number', type: 'tel', required: true },
    { label: 'Date of birth', type: 'date', required: true },
    { label: 'Email', type: 'email', required: true },
  ];

  const emergencyContact = [
    { label: 'Emergency contact name', type: 'text', required: true },
    { label: 'Emergency contact email', type: 'email', required: true },
    { label: 'Emergency contact number', type: 'tel', required: true },
  ];

  const documents = [
    { label: 'National ID card', required: true },
    { label: 'Passport', required: false },
    { label: 'Nursing license', required: true },
    { label: 'Nursing degree', required: true },
    { label: 'High School Diploma', required: false, info: true },
    { label: 'High School Grades', required: false, info: true },
    { label: 'curriculum vitae (CV)', required: false },
  ];

  return (
    <div className="pt-12 pr-20 pb-20 pl-10 rounded-xl bg-stone-50 max-md:px-5 max-md:max-w-full">
      <h1 className="text-xl font-bold leading-8 text-black max-md:mr-0.5 max-md:max-w-full">
        Application Homepage
      </h1>
      <p className="mt-5 text-sm leading-5 text-black max-md:mr-2.5 max-md:max-w-full">
        Fill out the basic information and upload necessary documents and we will reach out to you for detailed guidance for
        next steps.
      </p>
      <div className="flex gap-5 justify-end px-14 py-2.5 mt-5 text-xl font-bold leading-8 text-white bg-teal-800 rounded-lg shadow-2xl max-md:flex-wrap max-md:px-5 max-md:mr-0.5 max-md:max-w-full">
        <div>Step 1:</div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc3af6181c7690c49d6775be05736f621f776d322972ba1a42c7b52897268369?apiKey=37e9b177900140c9be4212bdea99ec1b&" alt="" className="shrink-0 aspect-[0.96] w-[25px]" />
      </div>

      <FormSection title="Personal Information" fields={personalInfo} />
      <div className="shrink-0 mt-7 max-w-full h-px border border-solid bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-30 w-[773px] max-md:mr-0.5" />
      <FormSection title="Emergency Contact" fields={emergencyContact} />
      <div className="shrink-0 mt-7 max-w-full h-px border border-solid bg-slate-950 bg-opacity-30 border-slate-950 border-opacity-30 w-[773px] max-md:mr-0.5" />

      {documents.map((doc, index) => (
        <FileUpload key={index} {...doc} />
      ))}

      <div className="flex gap-4 self-end mt-8 max-w-full text-sm font-medium leading-6 whitespace-nowrap w-[368px] max-md:mr-0.5">
        <button type="button" className="justify-center px-4 py-2 text-black rounded-md border border-solid border-slate-950 border-opacity-30 max-md:px-5">
          Cancel
        </button>
        <button type="submit" className="justify-center items-center px-4 py-2 text-white bg-pink-900 rounded-md max-md:px-5">
          Save
        </button>
      </div>
    </div>
  );
}

