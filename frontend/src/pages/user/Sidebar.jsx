// import { Link, useNavigate } from 'react-router-dom';

// export default function Sidebar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/user-login');
//   };

//   return (
//     <div className="w-64 bg-white shadow-md h-full flex flex-col justify-between">
//       <div className="p-6">
//         <h2 className="text-xl font-bold mb-6">User Panel</h2>
//         <nav className="space-y-4">
//           <Link to="/user-dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
//           <Link to="/user-courses" className="block text-gray-700 hover:text-blue-600">Courses</Link>
//           <Link to="/user-tv-shows" className="block text-gray-700 hover:text-blue-600">TV Programs</Link>
//           <Link to="/user-events" className="block text-gray-700 hover:text-blue-600">Events</Link>
//           <Link to="/forum" className="block text-gray-700 hover:text-blue-600">Forum Discussion</Link>
//           <Link to="/user-profile" className="block text-gray-700 hover:text-blue-600">Profile</Link>
//         </nav>
//       </div>
//       <div className="p-6 border-t">
//         <button onClick={handleLogout} className="text-red-600 hover:text-red-800">Logout</button>
//       </div>
//     </div>
//   );
// }















import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/user-login');
  };

  return (
    <aside className={`w-64 bg-white h-screen border-r shadow-sm flex flex-col justify-between fixed md:relative z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      {/* Top section */}
      <div>
        <div className="px-6 py-4 text-2xl font-bold text-yellow-500 pb-5 border-b flex justify-between items-center">
          <span>
            MS<span className="text-black">League</span>
          </span>
          <button className="md:hidden text-xl" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-4">
          <NavLink
            to="/user-dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-yellow-50 ${
                isActive ? "bg-yellow-100 font-semibold" : "text-gray-800"
              }`
            }
            onClick={onClose}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/user-courses"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-yellow-50 ${
                isActive ? "bg-yellow-100 font-semibold" : "text-gray-800"
              }`
            }
            onClick={onClose}
          >
            Courses
          </NavLink>

          <NavLink
            to="/user-tv-shows"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-yellow-50 ${
                isActive ? "bg-yellow-100 font-semibold" : "text-gray-800"
              }`
            }
            onClick={onClose}
          >
            TV Programs
          </NavLink>


          <NavLink
            to="/user-events"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-yellow-50 ${
                isActive ? "bg-yellow-100 font-semibold" : "text-gray-800"
              }`
            }
            onClick={onClose}
          >
            Events
          </NavLink>

          <NavLink
            to="/forum"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-yellow-50 ${
                isActive ? "bg-yellow-100 font-semibold" : "text-gray-800"
              }`
            }
            onClick={onClose}
          >
            Forum
          </NavLink>

          <NavLink
            to="/user-profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-yellow-50 ${
                isActive ? "bg-yellow-100 font-semibold" : "text-gray-800"
              }`
            }
            onClick={onClose}
          >
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Logout at bottom */}
      <div className="px-4 py-4 border-t">
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;