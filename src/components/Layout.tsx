import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MoonIcon } from "./ui/icons/MoonIcon";
import { SunIcon } from "./ui/icons/SunIcon";
import { ThemeContext } from "../Context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConverterProvider } from "../Context/ConverterContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const queryClient = new QueryClient();

export const Layout = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ConverterProvider>
          <div className="w-full min-h-screen bg-yellow-50 dark:bg-gray-900 items-center justify-center">
            {/* HEADER */}
            <header className="w-full mx-auto sticky top-0 bg-white dark:bg-black z-20 flex justify-between items-center shadow-xl dark:shadow-white dark:shadow-sm">
              <img
                className="p-6"
                src="/assets/logo.png"
                width={200}
                height={200}
                alt=""
              />

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-4 rounded-md gap-x-2 font-medium hover:text-yellow-600 flex flex-row items-center ${
                      isActive
                        ? "text-yellow-600 hover:text-yellow-600/50"
                        : "text-black dark:text-white"
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
                        : "text-black dark:text-white"
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
                        : "text-black dark:text-white"
                    }`
                  }
                >
                  About
                </NavLink>

                <button
                  onClick={toggleTheme}
                  className="p-2 ml-4 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200 rounded-full"
                >
                  {theme === "light" ? <MoonIcon /> : <SunIcon />}
                </button>
              </nav>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setOpen(true)}
                className="md:hidden p-4 text-black dark:text-white"
              >
                <Bars3Icon className="w-7 h-7" />
              </button>
            </header>

            {/* MOBILE SIDE DRAWER */}
            <div
              className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-black shadow-xl z-50 transform transition-transform duration-300 ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="p-4 text-black dark:text-white"
              >
                <XMarkIcon className="w-7 h-7" />
              </button>

              <nav className="flex flex-col space-y-6 p-6">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-black dark:text-white hover:text-yellow-600"
                >
                  Home
                </NavLink>

                <NavLink
                  to="/History-page"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-black dark:text-white hover:text-yellow-600"
                >
                  History
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-black dark:text-white hover:text-yellow-600"
                >
                  About
                </NavLink>

                <button
                  onClick={() => {
                    toggleTheme();
                    setOpen(false);
                  }}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 rounded-full"
                >
                  {theme === "light" ? <MoonIcon /> : <SunIcon />}
                </button>
              </nav>
            </div>

            {/* PAGE CONTENT */}
            <div className="max-w-5xl mx-auto min-h-[calc(100vh-200px)]">
              <Outlet />
            </div>

            {/* FOOTER */}
            <footer className="w-full dark:bg-black max-w-5xl mx-auto text-center py-4 mt-0 border-t border-t-yellow-200 dark:border-white">
              <p className="text-sm text-yellow-500 dark:text-white">
                &copy; {new Date().getFullYear()} CryptoConverter App. Made With
                Love By AMIO.
              </p>
            </footer>
          </div>
        </ConverterProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
};

// import { useEffect, useState} from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { MoonIcon } from "./ui/icons/MoonIcon";
// import { SunIcon } from "./ui/icons/SunIcon";
// import { ThemeContext } from "../Context/ThemeContext";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {ConverterProvider} from "../Context/ConverterContext"

// const queryClient = new QueryClient();

// export const Layout = () => {

//   const [theme, setTheme] = useState<"light" | "dark">("light");

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);

//     document.documentElement.classList.toggle("dark");
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") as "light" | "dark";
//     if (savedTheme) {
//       setTheme(savedTheme);
//       if (savedTheme === "dark") {
//         document.documentElement.classList.add("dark");
//       }
//     }
//   }, []);

//   return (
//     <QueryClientProvider client={queryClient}>

//     <ThemeContext.Provider value={{ theme, toggleTheme }}>

//        <ConverterProvider>
//       <div className="w-full min-h-screen bg-yellow-50 dark:bg-gray-900 items-center justify-center ">
//         <header className="w-full mx-auto sticky top-0 bg-white dark:bg-black z-20 flex justify-between items-center shadow-xl  dark:shadow-white dark:shadow-sm">
//           <img className="p-6" src="/assets/logo.png" width={200} height={200} alt="" />
//           <nav className="flex items-center space-x-4">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `px-4 rounded-md gap-x-2 font-medium hover:text-yellow-600 flex flex-row items-center ${
//                   isActive
//                     ? "text-yellow-600 hover:text-yellow-600/50"
//                     : "text-black dark:text-white"
//                 }`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/History-page"
//               className={({ isActive }) =>
//                 `px-4 rounded-md inline-block font-medium hover:text-yellow-600 ${
//                   isActive
//                     ? "text-yellow-600 hover:text-yellow-600/50"
//                     : "text-black dark:text-white "
//                 }`
//               }
//             >
//               History
//             </NavLink>
//             <NavLink
//               to="/about"
//               className={({ isActive }) =>
//                 `px-4 rounded-md inline-block font-medium hover:text-yellow-600 ${
//                   isActive
//                     ? "text-yellow-600 hover:text-yellow-600/50"
//                     : "text-black dark:text-white"
//                 }`
//               }
//             >
//               About
//             </NavLink>
//               <button onClick={toggleTheme} className="p-2 ml-4 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200 rounded-full">
//                 {theme === 'light' ? (<MoonIcon/>) : (<SunIcon/>)}
//               </button>

//             <div />
//           </nav>
//         </header>

//         <div className="max-w-5xl mx-auto min-h-[calc(100vh-200px)] ">
//           <Outlet />
//         </div>

//         {/*  */}
//         <footer className="w-full dark:bg-black max-w-5xl mx-auto text-center py-4 mt-0 border-t border-t-yellow-200 dark:border-white">
//           <p className="text-sm text-yellow-500 dark:text-white">
//             &copy; {new Date().getFullYear()} CryptoConverter App. Made With Love By AMIO.
//           </p>
//         </footer>
//       </div>
//       </ConverterProvider>
//       </ThemeContext.Provider>
//       </QueryClientProvider>

//   );
// };
