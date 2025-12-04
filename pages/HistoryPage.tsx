import { NavLink } from "react-router-dom";


export const HistoryPage = () => {
  return(
<>
<div className=" dark:bg-gray-900  flex flex-col min-h-screen w-full p-8 sm:p-12 lg:p-16">
    <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-end space-y-6">
        
        {/* Main Title */}
        <p className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white border-b border-primary-500/30 pb-3 mb-4">
            The Genesis of CryptoConvert
        </p>

       
        <p className="text-xl text-black dark:text-white  leading-relaxed font-medium">
            Every application tells a story, and the history of CryptoConvert is fundamentally a tale of learning, growth, and the pursuit of clean code. The app wasn't born out of a startup meeting; it was built as a personal quest by its creator, <span className="font-bold text-primary-500 dark:text-primary-400">Amio</span>.
        </p>

      
        <p className="text-lg text-gray-600  dark:text-white  leading-relaxed bg-yellow-50 dark:bg-yellow-600  p-6 rounded-xl shadow-inner border border-gray-200 ">
            This project’s primary mission was to serve as a high-stakes, real-world crucible for mastering three essential modern technologies:<b>React</b> (for component-based architecture), <b>TypeScript</b> (for robust type safety and predictability), and <b>Tailwind CSS</b>(for clean, utility-first design). Each feature, from the dynamic conversion logic to the intuitive user experience, was a chapter in Amio's learning log, resulting in a functional, well-designed application that proves the power and elegance of the modern web stack.
        </p>

    </div>
    
 
    <div className="w-full mt-12 pt-6 text-center text-sm text-gray-400 ">
     <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 rounded-xl bg-yellow-300 py-2 dark:bg-yellow-600 inline-block font-medium hover:text-white dark:hover:text-black ${
                  isActive
                    ? "text-yellow-600 hover:text-yellow-600/50"
                    : "text-black dark:text-white "
                }`
              }
            > Launch CrytpoConverter Now →</NavLink>
    </div>
</div>


 </>
  );
};
