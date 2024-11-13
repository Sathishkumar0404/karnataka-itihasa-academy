
'use client'

import { createContext, useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  BellIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import  logo from "../assets/KIA-logo.png";
import { NavLink, Outlet } from 'react-router-dom';


const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]



// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();


export default function SidebarLayout() {
  const [filter, setFilter] = useState(null)
  return (
    <AppContext.Provider value={{filter}}>
     
      <div>

        <div className="">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            {/* <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button> */}
            <div className="flex h-16 shrink-0 items-center">
              <NavLink
               to={'/karnataka-itihasa-academy'}
              >
              <img
                alt="Kannada itihasa academy"
                src={logo}
                className="h-8 w-auto"
              />
              </NavLink>
            </div>
            {/* Separator */}

            <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              {/* <div className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute pl-2 inset-y-0 left-0 h-full w-5 text-gray-400"
                />
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  onChange={(e)=>setFilter(e.target.value)}
                  placeholder="Search..."
                  className="block w-full border-0 py-0 my-2 pl-8 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </div> */}
             
            </div>
          </div>

          <main className="py-2">
            <div className="px-4 sm:px-6 lg:px-8"><Outlet /></div>
          </main>
        </div>
      </div>
    </AppContext.Provider>
  )
}
