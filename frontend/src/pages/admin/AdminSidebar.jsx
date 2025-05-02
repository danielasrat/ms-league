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
    <aside className="w-64 h-screen bg-white border-r shadow-md flex flex-col justify-between fixed md:relative z-20">
      {/* Top section */}
      <div>
        <div className="px-6 py-5 text-2xl font-extrabold text-yellow-500 border-b flex justify-between items-center">
          <span>
            Admin<span className="text-black">Panel</span>
          </span>
          <button
            className="md:hidden text-2xl text-gray-600 hover:text-black transition"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 space-y-1 px-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-5 py-2 rounded-md text-base font-medium transition ${
                  isActive
                    ? "bg-yellow-100 text-yellow-700 font-semibold"
                    : "text-gray-700 hover:bg-yellow-50"
                }`
              }
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout button */}
      <div className="px-4 py-5 border-t">
        <button
          className="w-full bg-red-500 text-white py-2 rounded-2xl shadow-sm hover:bg-red-600 transition-colors duration-200 font-medium"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
