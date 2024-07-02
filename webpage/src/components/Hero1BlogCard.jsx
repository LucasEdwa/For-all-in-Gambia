export default function Hero1BlogCard() {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        className="h-26 w-full object-cover"
      />

      <div className="p-4 sm:p-6">
        <a href="#">
          <h3 className="text-lg font-medium text-gray-900">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
        </a>

        <p className="">
          <span>Boraba</span> is a vibrant community located in the central part
          of the Gambia, within the Central River Region. The community, with an
          estimated population of about 1500 people, showcases{" "}
          <span>
            a rich cultural diversity, where different tribes coexist
            harmoniously
          </span>
          . Agriculture and vegetable production are the primary sources of
          livelihood for the residents, enabling them to sustain their basic
          needs. However, the community faces numerous challenges that hinder
          the enjoyment of life's essential aspects.
        </p>

        <a
          href="#"
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        >
          Find out more
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </a>
      </div>
    </article>
  );
}
