import { NavLink } from "react-router-dom";

export const AboutConverter = () => {
  return(
   
       <main className=" dark:bg-gray-900 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 transition-colors duration-300">
  
  <div className="text-center mb-16">
    <p className="text-xl text-black dark:text-white max-w-3xl mx-auto">
      We are here to provide the fastest, most accurate, and simplest way to convert cryptocurrencies and fiat currencies, giving you confidence in every transaction.
    </p>
  </div>

  <section className="mb-16">
    <h2 className="text-3xl font-bold text-center mb-10 text-primary-500 dark:text-yellow-400">
      Why Choose CryptoConvert?
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="bg-yellow-300 dark:bg-yellow-600 p-6 rounded-2xl shadow-xl transition transform hover:scale-[1.02] duration-300 border border-gray-100 dark:border-gray-700">
        <div className="text-primary-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Real-Time Accuracy</h3>
        <p className="text-black dark:text-gray-200">
          We pull data from trusted global exchanges instantly. What you see is the current market rate, ensuring you never miss a beat.
        </p>
      </div>

      <div className="bg-yellow-300 dark:bg-yellow-600 p-6 rounded-2xl shadow-xl transition transform hover:scale-[1.02] duration-300 border border-gray-100 dark:border-gray-700">
        <div className="text-primary-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M17 12h1m-1.636 6.364l-.707-.707M3 12h1m1.636 6.364l.707-.707M6.364 5.636l.707-.707M12 20h.01M6.342 16.666L5 17l-.707-.707M12 14v4" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Simplicity First</h3>
        <p className="text-black dark:text-gray-200">
          No complex charts or confusing interfaces. Just a clean, straightforward tool that gets the job done quickly on any device.
        </p>
      </div>

      <div className="bg-yellow-300 dark:bg-yellow-600 p-6 rounded-2xl shadow-xl transition transform hover:scale-[1.02] duration-300 border border-gray-100 dark:border-gray-700">
        <div className="text-primary-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1m10-4h2m-6 1a4 4 0 00-4 4v1m10-4h2m-6-4a4 4 0 014 4v1a4 4 0 01-4 4v1a4 4 0 01-4 4m-8-2h2m-2-4h2m-2-4h2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Global Coverage</h3>
        <p className="text-black dark:text-gray-200">
          Convert between thousands of cryptocurrencies and all major fiat currencies across the globe, all in one place.
        </p>
      </div>

    </div>
  </section>

  <section className="text-center py-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-2xl transition-colors duration-300">
    <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">Ready to Convert?</h2>
    <p className="text-lg text-gray-700 dark:text-amber-200 mb-6">
      Start making smarter financial decisions in seconds.
    </p>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `px-4 rounded-xl bg-yellow-300 dark:bg-yellow-600 py-2 inline-block font-medium hover:text-white dark:hover:text-black transition-colors duration-200 ${
          isActive ? "text-yellow-600 dark:text-yellow-200" : "text-black dark:text-gray-200"
        }`
      }
    >
      Launch CrytpoConverter Now →
    </NavLink>
  </section>

</main>

  );
};
