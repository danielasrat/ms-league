import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminTopbar = ({ onToggleSidebar }) => {
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    "New member registered ✅",
    "You received a message 📨",
    "New course submitted for review 📚",
  ];

  const admin = { name: "Admin", image: "" };
  const getInitial = (name) => name?.charAt(0).toUpperCase() || "?";

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center relative">
      <button
        onClick={onToggleSidebar}
        className="md:hidden text-2xl text-gray-600"
      >
        ☰
      </button>

      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="text-gray-600 hover:text-black text-xl"
          >
            🔔
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow z-10 p-3 text-sm">
              <h3 className="font-semibold mb-2">Notifications</h3>
              {notifications.length > 0 ? (
                notifications.map((n, idx) => (
                  <div
                    key={idx}
                    className="border-b border-gray-100 py-1 last:border-none"
                  >
                    {n}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No notifications.</p>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <button
          onClick={() => navigate("/admin/profile")}
          className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold"
        >
          {admin.image ? (
            <img
              src={admin.image}
              alt="Admin"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            getInitial(admin.name)
          )}
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
