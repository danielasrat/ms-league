import { NavLink } from "react-router-dom";

const links = [
  { label: "Courses", to: "/courses" },
  { label: "TV Programs", to: "/tv-shows" },
  { label: "Events", to: "/events" },
  { label: "Members", to: "/manage-users" },
  { label: "Event Registration", to: "/manage-event-registration" },
];

const AdminSidebar = ({ onClose }) => {
  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex flex-col justify-between">
      <div>
        <div className="px-6 py-4 font-bold text-2xl text-yellow-500 border-b flex justify-between items-center">
          Admin<span className="text-black">Panel</span>
          <button className="md:hidden text-xl" onClick={onClose}>
            ✕
          </button>
        </div>
        <nav className="mt-4 space-y-1 px-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-yellow-50 ${
                  isActive ? "bg-yellow-100 font-semibold" : "text-gray-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-4 py-4 border-t">
        <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
