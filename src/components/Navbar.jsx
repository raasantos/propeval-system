import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, FileText, BarChart, User, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-16 bg-gray-800 text-gray-400 flex flex-col items-center py-6 h-screen fixed">
      <Link 
        to="/"
        className={`mb-6 p-2 rounded ${currentPath === '/' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
      >
        <LayoutDashboard className="h-5 w-5" />
      </Link>
      <Link 
        to="/new-proposal"
        className={`mb-6 p-2 rounded ${currentPath === '/new-proposal' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
      >
        <PlusCircle className="h-5 w-5" />
      </Link>
      <Link 
        to="/proposals"
        className={`mb-6 p-2 rounded ${currentPath === '/proposals' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
      >
        <FileText className="h-5 w-5" />
      </Link>
      <Link 
        to="/reports"
        className={`mb-6 p-2 rounded ${currentPath === '/reports' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
      >
        <BarChart className="h-5 w-5" />
      </Link>
      <Link 
        to="/admin"
        className={`mb-6 p-2 rounded ${currentPath === '/admin' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
      >
        <Settings className="h-5 w-5" />
      </Link>
      <div className="flex-grow"></div>
      <button className="p-2 rounded hover:bg-gray-700">
        <User className="h-5 w-5" />
      </button>
    </aside>
  );
};

export default Navbar;