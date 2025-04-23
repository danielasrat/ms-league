// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function UserPayments() {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [filter, setFilter] = useState('all');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:3000/users/all', {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { payment: filter === 'all' ? undefined : filter === 'paid' }
//         });
        
//         // Filter users who have payment information
//         const paidUsers = res.data.filter(user => user.hasPaid);
//         setPayments(paidUsers);
//       } catch (err) {
//         setError('Failed to load payment data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, [filter]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Payment Reports</h1>
//         <button 
//           onClick={() => navigate('/manage-users')}
//           className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//         >
//           Back to Users
//         </button>
//       </div>

//       <div className="mb-6">
//         <label className="block mb-1">Filter:</label>
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="w-full md:w-1/4 p-2 border rounded"
//         >
//           <option value="all">All Payments</option>
//           <option value="paid">Paid Members</option>
//           <option value="active">Active Members</option>
//           <option value="expired">Expired Members</option>
//         </select>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border">Name</th>
//               <th className="py-2 px-4 border">Email</th>
//               <th className="py-2 px-4 border">Payment Date</th>
//               <th className="py-2 px-4 border">Expiry Date</th>
//               <th className="py-2 px-4 border">Days Left</th>
//               <th className="py-2 px-4 border">Payment Method</th>
//               <th className="py-2 px-4 border">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="py-4 text-center">No payment records found</td>
//               </tr>
//             ) : (
//               payments.map(user => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{user.name}</td>
//                   <td className="py-2 px-4 border">{user.email}</td>
//                   <td className="py-2 px-4 border">
//                     {user.paymentDate ? new Date(user.paymentDate).toLocaleDateString() : '-'}
//                   </td>
//                   <td className="py-2 px-4 border">
//                     {user.membershipExpires ? new Date(user.membershipExpires).toLocaleDateString() : '-'}
//                   </td>
//                   <td className="py-2 px-4 border">
//                     {user.daysLeft > 0 ? user.daysLeft : 'Expired'}
//                   </td>
//                   <td className="py-2 px-4 border">{user.paymentMethod || '-'}</td>
//                   <td className="py-2 px-4 border">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       user.daysLeft > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
//                     }`}>
//                       {user.daysLeft > 0 ? 'Active' : 'Expired'}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


















import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTopbar from './AdminTopbar';
import AdminSidebar from './AdminSidebar';

export default function UserPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/users/all', {
          headers: { Authorization: `Bearer ${token}` },
          params: { payment: filter === 'all' ? undefined : filter === 'paid' }
        });
        
        // Filter users who have payment information
        const paidUsers = res.data.filter(user => user.hasPaid);
        setPayments(paidUsers);
      } catch (err) {
        setError('Failed to load payment data');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [filter]);

  if (loading) return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <AdminSidebar onClose={toggleSidebar} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <div className="text-gray-500">Loading payment reports...</div>
        </main>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <AdminSidebar onClose={toggleSidebar} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <div className="text-red-500">{error}</div>
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Payment Reports</h1>
              <button 
                onClick={() => navigate('/manage-users')}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Back to Users
              </button>
            </div>

            <div className="mb-6 bg-white p-4 rounded-lg shadow">
              <label className="block mb-2 text-sm font-medium text-gray-700">Filter</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid Members</option>
                <option value="active">Active Members</option>
                <option value="expired">Expired Members</option>
              </select>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No payment records found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    payments.map(user => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {user.paymentDate ? new Date(user.paymentDate).toLocaleDateString() : 'No date'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.paymentMethod || 'No method specified'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.membershipExpires ? new Date(user.membershipExpires).toLocaleDateString() : 'No expiry'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.daysLeft > 0 ? `${user.daysLeft} days left` : 'Expired'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.daysLeft > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.daysLeft > 0 ? 'Active' : 'Expired'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}