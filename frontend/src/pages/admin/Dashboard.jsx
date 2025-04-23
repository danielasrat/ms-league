// import { useNavigate } from 'react-router-dom';

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white shadow rounded-xl p-4 text-center">
//           <button onClick={() => navigate('/courses')} className="text-lg font-semibold">Manage Courses</button>
//         </div>
//         <div className="bg-white shadow rounded-xl p-4 text-center">
//           <button onClick={() => navigate('/events')} className="text-lg font-semibold">Manage Events</button>
//         </div>
//         <div className="bg-white shadow rounded-xl p-4 text-center">
//           <button onClick={() => navigate('/tv-shows')} className="text-lg font-semibold">Manage TV Shows</button>
//         </div>

//         <div className="bg-white shadow rounded-xl p-4 text-center">
//         <button onClick={() => navigate('/manage-users')} className="text-lg font-semibold">Manage User Registration</button>
//       </div>


//       <div className="bg-white shadow rounded-xl p-4 text-center">
//         <button onClick={() => navigate('/manage-event-registration')} className="text-lg font-semibold">Manage event Registration</button>
//       </div>

//       </div>
//     </div>
//   );
// }
















import { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import AdminSidebar from './AdminSidebar';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Only show on mobile if sidebarOpen is true */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <AdminSidebar onClose={toggleSidebar} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        
        {/* Empty Content Area */}
        <main className="flex-1 overflow-y-auto">
          {/* This area is intentionally left empty */}
        </main>
      </div>
    </div>
  );
}