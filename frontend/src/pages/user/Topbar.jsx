// import { Bell, UserCircle } from 'lucide-react'; // optional icons

// export default function Topbar() {
//   return (
//     <div className="flex justify-end items-center bg-white shadow px-6 py-4">
//       <button className="mr-4 relative">
//         <Bell className="h-6 w-6 text-gray-600" />
//         <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
//       </button>
//       <button className="flex items-center space-x-2">
//         <UserCircle className="h-8 w-8 text-gray-600" />
//         {/* Optionally, display user name */}
//         {/* <span className="hidden md:block font-medium">John Doe</span> */}
//       </button>
//     </div>
//   );
// }














import { useState, useEffect } from "react";  // Add useEffect to the import
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Add axios import for API calls

const Topbar = ({ onToggleSidebar }) => {
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({ name: '', image: '' });

  useEffect(() => {
    // Fetch user data and notifications
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [userRes, notifRes] = await Promise.all([
          axios.get('http://localhost:3000/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:3000/users/notifications', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUser({
          name: userRes.data.name,
          image: userRes.data.profileImage
        });
        setNotifications(notifRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "?";

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center relative">
      {/* ☰ Hamburger for mobile only */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden text-2xl text-gray-600"
      >
        ☰
      </button>

      <div className="flex items-center gap-4 ml-auto">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="text-gray-600 hover:text-black text-xl"
          >
            🔔
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
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
                    {n.message}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No notifications.</p>
              )}
            </div>
          )}
        </div>

        {/* Profile Avatar → Click to go to /profile */}
        <button
          onClick={() => navigate("/user-profile")}
          className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-white font-semibold focus:outline-none"
        >
          {user.image ? (
            <img
              src={user.image}
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitial(user.name)
          )}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
