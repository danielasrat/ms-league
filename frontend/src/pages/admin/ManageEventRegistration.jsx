// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function ManageEventRegistration() {
//   const [registrations, setRegistrations] = useState({
//     past: [],
//     happening: [],
//     upcoming: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchRegistrations = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:3000/event-registrations/categorized', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setRegistrations(res.data);
//       } catch (err) {
//         setMessage('Failed to load registrations');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRegistrations();
//   }, []);

//   const handleStatusChange = async (id, status) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.patch(
//         `http://localhost:3000/event-registrations/${id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage('Registration updated successfully');
//       // Refresh data
//       const res = await axios.get('http://localhost:3000/event-registrations/categorized', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setRegistrations(res.data);
//     } catch (err) {
//       setMessage('Failed to update registration');
//     }
//   };

//   const renderRegistrations = (category) => (
//     <div key={category} className="mb-8">
//       <h2 className="text-xl font-semibold mb-4 capitalize">{category} Events</h2>
//       {registrations[category].length === 0 ? (
//         <p>No registrations found</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-2 px-4 border">User</th>
//                 <th className="py-2 px-4 border">Email</th>
//                 <th className="py-2 px-4 border">Phone</th>
//                 <th className="py-2 px-4 border">Event</th>
//                 <th className="py-2 px-4 border">Date</th>
//                 <th className="py-2 px-4 border">Status</th>
//                 <th className="py-2 px-4 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {registrations[category].map(reg => (
//                 <tr key={reg._id} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{reg.user.name}</td>
//                   <td className="py-2 px-4 border">{reg.user.email}</td>
//                   <td className="py-2 px-4 border">{reg.user.phone || '-'}</td>
//                   <td className="py-2 px-4 border">{reg.event.title}</td>
//                   <td className="py-2 px-4 border">
//                     {new Date(reg.event.date).toLocaleDateString()}
//                   </td>
//                   <td className="py-2 px-4 border">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       reg.status === 'approved' ? 'bg-green-200 text-green-800' :
//                       reg.status === 'rejected' ? 'bg-red-200 text-red-800' :
//                       'bg-yellow-200 text-yellow-800'
//                     }`}>
//                       {reg.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4 border space-x-2">
//                     {reg.status !== 'approved' && (
//                       <button
//                         onClick={() => handleStatusChange(reg._id, 'approved')}
//                         className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//                       >
//                         Approve
//                       </button>
//                     )}
//                     {reg.status !== 'rejected' && (
//                       <button
//                         onClick={() => handleStatusChange(reg._id, 'rejected')}
//                         className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
//                       >
//                         Reject
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Manage Event Registrations</h1>
      
//       {message && <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">{message}</div>}

//       {['past', 'happening', 'upcoming'].map(renderRegistrations)}
//     </div>
//   );
// }























import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminTopbar from './AdminTopbar';
import AdminSidebar from './AdminSidebar';

export default function ManageEventRegistration() {
  const [registrations, setRegistrations] = useState({
    past: [],
    happening: [],
    upcoming: []
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/event-registrations/categorized', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRegistrations(res.data);
      } catch (err) {
        setMessage('Failed to load registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3000/event-registrations/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Registration updated successfully');
      // Refresh data
      const res = await axios.get('http://localhost:3000/event-registrations/categorized', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(res.data);
    } catch (err) {
      setMessage('Failed to update registration');
    }
  };

  const renderRegistrations = (category) => (
    <div key={category} className="mb-8">
      <h2 className="text-xl font-semibold mb-4 capitalize">{category} Events</h2>
      {registrations[category].length === 0 ? (
        <p className="text-gray-500">No registrations found</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrations[category].map(reg => (
                <tr key={reg._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{reg.user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{reg.user.email}</div>
                    <div className="text-sm text-gray-500">{reg.user.phone || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{reg.event.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(reg.event.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      reg.status === 'approved' ? 'bg-green-100 text-green-800' :
                      reg.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {reg.status !== 'approved' && (
                      <button
                        onClick={() => handleStatusChange(reg._id, 'approved')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                    )}
                    {reg.status !== 'rejected' && (
                      <button
                        onClick={() => handleStatusChange(reg._id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  if (loading) return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <AdminSidebar onClose={toggleSidebar} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <div className="text-gray-500">Loading registrations...</div>
        </main>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <AdminSidebar onClose={toggleSidebar} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Event Registrations</h1>
            
            {message && (
              <div className={`mb-4 p-3 rounded-md ${
                message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}

            {['past', 'happening', 'upcoming'].map(renderRegistrations)}
          </div>
        </main>
      </div>
    </div>
  );
}