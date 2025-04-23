// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [paymentFilter, setPaymentFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const navigate = useNavigate();
//   const [loadingStates, setLoadingStates] = useState({});

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       let url = 'http://localhost:3000/users/all';
//       const params = new URLSearchParams();
      
//       if (filter !== 'all') params.append('status', filter);
//       if (paymentFilter !== 'all') params.append('payment', paymentFilter);
//       if (searchQuery) params.append('search', searchQuery);
//       if (startDate && endDate) {
//         params.append('startDate', startDate);
//         params.append('endDate', endDate);
//       }
      
//       if (params.toString()) url += `?${params.toString()}`;
      
//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       setMessage('Failed to load users.');
//     }
//   };

//   const handleAction = async (id, action) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.patch(
//         `http://localhost:3000/users/${id}/${action}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage(`User ${action}d successfully.`);
//       fetchUsers();
//     } catch (err) {
//       setMessage(`Failed to ${action} user.`);
//     }
//   };




//   const togglePaymentStatus = async (userId, currentStatus) => {
//     setLoadingStates(prev => ({ ...prev, [userId]: true }));
//     try {
//       const token = localStorage.getItem('token');
//       await axios.patch(
//         `http://localhost:3000/users/${userId}/toggle-payment`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage(`Payment status updated to ${currentStatus ? 'Unpaid' : 'Paid'}`);
//       fetchUsers();
//     } catch (err) {
//       setMessage(`Failed to update payment status: ${err.response?.data?.message || err.message}`);
//     } finally {
//       setLoadingStates(prev => ({ ...prev, [userId]: false }));
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [filter, paymentFilter, searchQuery, startDate, endDate]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">User Management</h1>
      
//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div>
//           <label className="block mb-1">Status</label>
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="w-full p-2 border rounded"
//           >
//             <option value="all">All</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block mb-1">Payment</label>
//           <select
//             value={paymentFilter}
//             onChange={(e) => setPaymentFilter(e.target.value)}
//             className="w-full p-2 border rounded"
//           >
//             <option value="all">All</option>
//             <option value="paid">Paid</option>
//             <option value="unpaid">Unpaid</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block mb-1">Search</label>
//           <input
//             type="text"
//             placeholder="Name, email, phone"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
        
//         <div>
//           <button 
//             onClick={() => navigate('/user-payments')}
//             className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             View Payment Reports
//           </button>
//         </div>
//       </div>
      
//       {/* Date Range Filter */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div>
//           <label className="block mb-1">Start Date</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">End Date</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <button
//             onClick={() => {
//               setStartDate('');
//               setEndDate('');
//             }}
//             className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//           >
//             Clear Dates
//           </button>
//         </div>
//       </div>

//       {message && <p className="mb-4 text-blue-600">{message}</p>}

//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-2 px-4 border">Name</th>
//                 <th className="py-2 px-4 border">Email</th>
//                 <th className="py-2 px-4 border">Phone</th>
//                 <th className="py-2 px-4 border">Status</th>
//                 <th className="py-2 px-4 border">Payment</th>
//                 <th className="py-2 px-4 border">Days Left</th>
//                 <th className="py-2 px-4 border">Expires On</th>
//                 <th className="py-2 px-4 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{user.name}</td>
//                   <td className="py-2 px-4 border">{user.email}</td>
//                   <td className="py-2 px-4 border">{user.phone || '-'}</td>
//                   <td className="py-2 px-4 border">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       user.status === 'approved' ? 'bg-green-200 text-green-800' :
//                       user.status === 'rejected' ? 'bg-red-200 text-red-800' :
//                       'bg-yellow-200 text-yellow-800'
//                     }`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4 border">
//                     {user.hasPaid ? (
//                       <span className="text-green-600">Paid</span>
//                     ) : (
//                       <span className="text-red-600">Unpaid</span>
//                     )}
//                   </td>
//                   <td className="py-2 px-4 border">
//                     {user.daysLeft > 0 ? user.daysLeft : 'Expired'}
//                   </td>
//                   <td className="py-2 px-4 border">
//                     {user.membershipExpires ? new Date(user.membershipExpires).toLocaleDateString() : '-'}
//                   </td>
//                   <td className="py-2 px-4 border space-x-1">
//                     {user.status !== 'approved' && (
//                       <button
//                         onClick={() => handleAction(user._id, 'approve')}
//                         className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//                       >
//                         Approve
//                       </button>
//                     )}
//                     {user.status !== 'rejected' && (
//                       <button
//                         onClick={() => handleAction(user._id, 'reject')}
//                         className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
//                       >
//                         Reject
//                       </button>
//                     )}



//                     {user.status === 'approved' &&(
//                       <button
//                         onClick={() => togglePaymentStatus(user._id, user.hasPaid)}
//                         disabled={loadingStates[user._id]}
//                         className={`px-2 py-1 rounded text-sm ${
//                           user.hasPaid 
//                             ? 'bg-orange-600 hover:bg-orange-700 text-white'
//                             : 'bg-blue-600 hover:bg-blue-700 text-white'
//                         } ${loadingStates[user._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
//                       >
//                         {loadingStates[user._id] ? (
//                           <span className="inline-flex items-center">
//                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Processing...
//                           </span>
//                         ) : (
//                           user.hasPaid ? 'Mark Unpaid' : 'Mark Paid'
//                         )}
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
// }




import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTopbar from './AdminTopbar';
import AdminSidebar from './AdminSidebar';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = useState({});

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      let url = 'http://localhost:3000/users/all';
      const params = new URLSearchParams();
      
      if (filter !== 'all') params.append('status', filter);
      if (paymentFilter !== 'all') params.append('payment', paymentFilter);
      if (searchQuery) params.append('search', searchQuery);
      if (startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }
      
      if (params.toString()) url += `?${params.toString()}`;
      
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setMessage('Failed to load users.');
    }
  };

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3000/users/${id}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`User ${action}d successfully.`);
      fetchUsers();
    } catch (err) {
      setMessage(`Failed to ${action} user.`);
    }
  };

  const togglePaymentStatus = async (userId, currentStatus) => {
    setLoadingStates(prev => ({ ...prev, [userId]: true }));
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3000/users/${userId}/toggle-payment`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`Payment status updated to ${currentStatus ? 'Unpaid' : 'Paid'}`);
      fetchUsers();
    } catch (err) {
      setMessage(`Failed to update payment status: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoadingStates(prev => ({ ...prev, [userId]: false }));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter, paymentFilter, searchQuery, startDate, endDate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <AdminSidebar onClose={toggleSidebar} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Members</h1>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-lg shadow">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Payment</label>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="all">All</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Search</label>
                <input
                  type="text"
                  placeholder="Name, email, phone"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <div className="flex items-end">
                <button 
                  onClick={() => navigate('/user-payments')}
                  className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  Payment Reports
                </button>
              </div>
            </div>
            
            {/* Date Range Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg shadow">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Clear Dates
                </button>
              </div>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-md ${
                message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}

            {users.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-500">No users found matching your criteria.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.phone || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'approved' ? 'bg-green-100 text-green-800' :
                            user.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.hasPaid ? (
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Paid</span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Unpaid</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.daysLeft > 0 ? (
                            <span className="text-green-600">{user.daysLeft} days left</span>
                          ) : (
                            <span className="text-red-600">Expired</span>
                          )}
                          <div className="text-xs text-gray-400">
                            {user.membershipExpires ? new Date(user.membershipExpires).toLocaleDateString() : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {user.status !== 'approved' && (
                            <button
                              onClick={() => handleAction(user._id, 'approve')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                          )}
                          {user.status !== 'rejected' && (
                            <button
                              onClick={() => handleAction(user._id, 'reject')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          )}
                          {user.status === 'approved' && (
                            <button
                              onClick={() => togglePaymentStatus(user._id, user.hasPaid)}
                              disabled={loadingStates[user._id]}
                              className={`${
                                user.hasPaid 
                                  ? 'text-orange-600 hover:text-orange-900'
                                  : 'text-blue-600 hover:text-blue-900'
                              } ${loadingStates[user._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {loadingStates[user._id] ? 'Processing...' : (user.hasPaid ? 'Mark Unpaid' : 'Mark Paid')}
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
        </main>
      </div>
    </div>
  );
}