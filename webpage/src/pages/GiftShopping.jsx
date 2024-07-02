const items = [
  {
    id: 1,
    name: "Basic Tee",
    price: "£24.00 GBP",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 2,
    name: "Basic Tee",
    price: "£24.00 GBP",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 3,
    name: "Basic Tee",
    price: "£24.00 GBP",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 4,
    name: "Basic Tee",
    price: "£24.00 GBP",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
];

export default function GiftShopping() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Product Collection
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Showing <span> 4 </span> of 40
            </p>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <li key={item.id} className="relative">
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-64 w-full object-cover"
                  />

                  <div className="mt-4 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">{item.price}</p>
                  </div>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 text-center leading-8"
              >
                1
              </a>
            </li>

            <li className="block size-8 rounded border-black bg-black text-center leading-8 text-white">
              2
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 text-center leading-8"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block size-8 rounded border border-gray-100 text-center leading-8"
              >
                4
              </a>
            </li>

            <li>
              <a
                href="#"
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
