const Pages404 = () => {
  return (
    <main
      className="grid min-h-[100vh] place-items-center px-6
          py-24 sm:py-32 lg:px-8  error-page"
    >
      <div
        className="text-center  py-8 sm:px-24 sm:py-8 bg-teal-600/50 
              rounded-lg backdrop-blur"
      >
        <p className="sm:text-2xl font-semibold text-gray-100">404</p>
        <h1
          className="mt-4 text-3xl font-extrabold tracking-tight
                  text-gray-100 sm:text-6xl"
        >
          Page not found
        </h1>
        <p className="mt-6 sm:text-lg leading-7 text-gray-300 ">
          {/* Sorry, we couldn't find the page you're looking for. */}
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div
          className="mt-10 flex items-center justify-center
                  gap-x-1 sm:gap-x-6"
        >
          {/* <BackToHome onClick={() => router.push("/")} /> */}
          {/* <button
              onClick={() => navigate("/products")}
              className="rounded-md bg-teal-600 px-3.5 py-2.5 text-xs sm:text-lg
                      font-semibold text-white shadow-sm hover:bg-teal-500
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              <span>&larr;</span> Go back home
            </button> */}
          <a
            href="/"
            className="text-xs sm:text-lg font-semibold text-gray-100
                      rounded-md hover:bg-gray-100/20 hover:backdrop-blur
                      px-2 py-2.5 sm:px-3.5 "
          >
            Go back home <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Pages404;
