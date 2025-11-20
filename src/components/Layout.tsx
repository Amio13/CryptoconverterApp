import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
    
// dark and light mode 
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const rootElement = document.documentElement; // Targets the <html> element
    if (theme === 'dark') {
        rootElement.classList.add('dark');
    } else {
        rootElement.classList.remove('dark');
    }
}, [theme]);
const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
};

  return (

      <div className="w-full min-h-screen ">
        <header className="w-full max-w-5xl mx-auto sticky top-0 bg-white z-20 flex justify-between items-center shadow-xl">
          <img src="/src/assets/logo.png" width={100} height={100} alt="" />
          <nav className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 rounded-md gap-x-2 font-medium hover:text-yellow-600 flex flex-row items-center ${
                  isActive
                    ? "text-yellow-600 hover:text-yellow-600/50"
                    : "text-black "
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/History-page"
              className={({ isActive }) =>
                `px-4 rounded-md inline-block font-medium hover:text-yellow-600 ${
                  isActive
                    ? "text-yellow-600 hover:text-yellow-600/50"
                    : "text-black "
                }`
              }
            >
              History
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 rounded-md inline-block font-medium hover:text-yellow-600 ${
                  isActive
                    ? "text-yellow-600 hover:text-yellow-600/50"
                    : "text-black "
                }`
              }
            >
              About
            </NavLink>
              <button onClick={toggleTheme} className="p-2 ml-4 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200 rounded-full">
                {theme === 'light' ? (<svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
>
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="M4.93 4.93l1.41 1.41"></path>
    <path d="M17.66 17.66l1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="M6.34 17.66l-1.41 1.41"></path>
    <path d="M19.07 4.93l-1.41 1.41"></path>
</svg>
               ) : (<svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
</svg>)}
              
             </button>


            <div />
          </nav>
        </header>

        <div className="max-w-5xl mx-auto min-h-[calc(100vh-200px)] ">
          <Outlet />
        </div>

        {/*  */}
        <footer className="w-full max-w-5xl mx-auto text-center py-4 mt-8 border-t border-t-yellow-200">
          <p className="text-sm text-yellow-500">
            &copy; {new Date().getFullYear()} CryptoConverter App. Made With Love By AMIO.
          </p>
        </footer>
      </div>

  );
};
