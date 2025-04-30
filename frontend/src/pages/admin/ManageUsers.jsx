// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminTopbar from "./AdminTopbar";
// import AdminSidebar from "./AdminSidebar";

// export default function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [paymentFilter, setPaymentFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [loadingStates, setLoadingStates] = useState({});
//   const [receiptModalOpen, setReceiptModalOpen] = useState(false);
//   const [currentReceipt, setCurrentReceipt] = useState("");
//   const navigate = useNavigate();

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       let url = "http://localhost:3000/users/all";
//       const params = new URLSearchParams();

//       if (filter !== "all") params.append("status", filter);
//       if (paymentFilter !== "all") params.append("payment", paymentFilter);
//       if (searchQuery) params.append("search", searchQuery);
//       if (startDate && endDate) {
//         params.append("startDate", startDate);
//         params.append("endDate", endDate);
//       }

//       if (params.toString()) url += `?${params.toString()}`;

//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       setMessage("Failed to load users.");
//     }
//   };

//   const handleAction = async (id, action) => {
//     try {
//       const token = localStorage.getItem("token");
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
//     setLoadingStates((prev) => ({ ...prev, [userId]: true }));
//     try {
//       const token = localStorage.getItem("token");
//       await axios.patch(
//         `http://localhost:3000/users/${userId}/toggle-payment`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage(
//         `Payment status updated to ${currentStatus ? "Unpaid" : "Paid"}`
//       );
//       fetchUsers();
//     } catch (err) {
//       setMessage(
//         `Failed to update payment status: ${
//           err.response?.data?.message || err.message
//         }`
//       );
//     } finally {
//       setLoadingStates((prev) => ({ ...prev, [userId]: false }));
//     }
//   };

//   const viewPaymentReceipt = async (userId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:3000/payment/${userId}/payment-receipt`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const imageUrl = URL.createObjectURL(response.data);
//       setCurrentReceipt(imageUrl);
//       setSelectedUser(userId);
//       setReceiptModalOpen(true);
//     } catch (err) {
//       setMessage(
//         "Failed to load payment receipt. The user may not have uploaded one yet."
//       );
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [filter, paymentFilter, searchQuery, startDate, endDate]);

//   useEffect(() => {
//     return () => {
//       if (currentReceipt) {
//         URL.revokeObjectURL(currentReceipt);
//       }
//     };
//   }, [currentReceipt]);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
//         <AdminSidebar onClose={toggleSidebar} />
//       </div>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <AdminTopbar onToggleSidebar={toggleSidebar} />

//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-2xl font-bold mb-6">Manage Members</h1>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-lg shadow">
//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Status
//                 </label>
//                 <select
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
//                 >
//                   <option value="all">All</option>
//                   <option value="pending">Pending</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Payment
//                 </label>
//                 <select
//                   value={paymentFilter}
//                   onChange={(e) => setPaymentFilter(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
//                 >
//                   <option value="all">All</option>
//                   <option value="paid">Paid</option>
//                   <option value="unpaid">Unpaid</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Search
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Name, email, phone"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
//                 />
//               </div>

//               <div className="flex items-end">
//                 <button
//                   onClick={() => navigate("/user-payments")}
//                   className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
//                 >
//                   Payment Reports
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg shadow">
//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
//                 />
//               </div>
//               <div className="flex items-end">
//                 <button
//                   onClick={() => {
//                     setStartDate("");
//                     setEndDate("");
//                   }}
//                   className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
//                 >
//                   Clear Dates
//                 </button>
//               </div>
//             </div>

//             {message && (
//               <div
//                 className={`mb-4 p-3 rounded-md ${
//                   message.includes("success")
//                     ? "bg-green-100 text-green-800"
//                     : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {message}
//               </div>
//             )}

//             {users.length === 0 ? (
//               <div className="bg-white p-8 rounded-lg shadow text-center">
//                 <p className="text-gray-500">
//                   No users found matching your criteria.
//                 </p>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Email
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Payment
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Membership
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {users.map((user) => (
//                       <tr key={user._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="font-medium text-gray-900">
//                             {user.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {user.phone || "-"}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {user.email}
//                         </td>

//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs ${
//                               user.status === "approved"
//                                 ? "bg-green-100 text-green-800"
//                                 : user.status === "rejected"
//                                 ? "bg-red-100 text-red-800"
//                                 : "bg-yellow-100 text-yellow-800"
//                             }`}
//                           >
//                             {user.status}
//                           </span>
//                         </td>

//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {user.hasPaid ? (
//                             <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
//                               Paid
//                             </span>
//                           ) : (
//                             <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
//                               Unpaid
//                             </span>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {user.daysLeft > 0 ? (
//                             <span className="text-green-600">
//                               {user.daysLeft} days left
//                             </span>
//                           ) : (
//                             <span className="text-red-600">Expired</span>
//                           )}
//                           <div className="text-xs text-gray-400">
//                             {user.membershipExpires
//                               ? new Date(
//                                   user.membershipExpires
//                                 ).toLocaleDateString()
//                               : "-"}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                           {user.status !== "approved" && (
//                             <button
//                               onClick={() => handleAction(user._id, "approve")}
//                               className="text-green-600 hover:text-green-900"
//                             >
//                               Approve
//                             </button>
//                           )}
//                           {user.status !== "rejected" && (
//                             <button
//                               onClick={() => handleAction(user._id, "reject")}
//                               className="text-red-600 hover:text-red-900"
//                             >
//                               Reject
//                             </button>
//                           )}
//                           {user.status === "approved" && (
//                             <button
//                               onClick={() =>
//                                 togglePaymentStatus(user._id, user.hasPaid)
//                               }
//                               disabled={loadingStates[user._id]}
//                               className={`${
//                                 user.hasPaid
//                                   ? "text-orange-600 hover:text-orange-900"
//                                   : "text-blue-600 hover:text-blue-900"
//                               } ${
//                                 loadingStates[user._id]
//                                   ? "opacity-50 cursor-not-allowed"
//                                   : ""
//                               }`}
//                             >
//                               {loadingStates[user._id]
//                                 ? "Processing..."
//                                 : user.hasPaid
//                                 ? "Mark Unpaid"
//                                 : "Mark Paid"}
//                             </button>
//                           )}
//                           <button
//                             onClick={() => viewPaymentReceipt(user._id)}
//                             className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
//                           >
//                             View Receipt
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";
import AdminSidebar from "./AdminSidebar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState("");
  const [loadingReceipt, setLoadingReceipt] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = "http://localhost:3000/users/all";
      const params = new URLSearchParams();

      if (filter !== "all") params.append("status", filter);
      if (paymentFilter !== "all") params.append("payment", paymentFilter);
      if (searchQuery) params.append("search", searchQuery);
      if (startDate && endDate) {
        params.append("startDate", startDate);
        params.append("endDate", endDate);
      }

      if (params.toString()) url += `?${params.toString()}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setMessage("Failed to load users.");
    }
  };

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
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
    setLoadingStates((prev) => ({ ...prev, [userId]: true }));
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/users/${userId}/toggle-payment`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(
        `Payment status updated to ${currentStatus ? "Unpaid" : "Paid"}`
      );
      fetchUsers();
    } catch (err) {
      setMessage(
        `Failed to update payment status: ${
          err.response?.data?.message || err.message
        }`
      );
    } finally {
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // const viewPaymentReceipt = async (userId) => {
  //   try {
  //     setLoadingReceipt(true);
  //     setReceiptModalOpen(true);
  //     setCurrentReceipt("");
  //     setMessage("");

  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       `http://localhost:3000/payment/receipt/${userId}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         responseType: "blob",
  //       }
  //     );

  //     const imageUrl = URL.createObjectURL(response.data);
  //     setCurrentReceipt(imageUrl);
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || "Failed to load receipt");
  //     setCurrentReceipt("");
  //   } finally {
  //     setLoadingReceipt(false);
  //   }
  // };

  const viewPaymentReceipt = async (userId) => {
    try {
      setLoadingReceipt(true);
      setReceiptModalOpen(true);
      setCurrentReceipt("");
      setMessage("");

      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/payment/receipt/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache", // Prevent caching issues
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load receipt");
      }

      // Get the blob data
      const blob = await response.blob();

      // Create object URL
      const imageUrl = URL.createObjectURL(blob);
      setCurrentReceipt(imageUrl);
    } catch (error) {
      setMessage(error.message);
      setCurrentReceipt("");
    } finally {
      setLoadingReceipt(false);
    }
  };

  const closeReceiptModal = () => {
    setReceiptModalOpen(false);
    if (currentReceipt) {
      URL.revokeObjectURL(currentReceipt);
      setCurrentReceipt("");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter, paymentFilter, searchQuery, startDate, endDate]);

  useEffect(() => {
    return () => {
      if (currentReceipt) {
        URL.revokeObjectURL(currentReceipt);
      }
    };
  }, [currentReceipt]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
        <AdminSidebar onClose={toggleSidebar} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar onToggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Members</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-lg shadow">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Status
                </label>
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment
                </label>
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Search
                </label>
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
                  onClick={() => navigate("/user-payments")}
                  className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  Payment Reports
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg shadow">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  End Date
                </label>
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
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Clear Dates
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  message.includes("success") || !message.includes("Failed")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            {users.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-500">
                  No users found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Membership
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.phone || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : user.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.hasPaid ? (
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              Paid
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                              Unpaid
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.daysLeft > 0 ? (
                            <span className="text-green-600">
                              {user.daysLeft} days left
                            </span>
                          ) : (
                            <span className="text-red-600">Expired</span>
                          )}
                          <div className="text-xs text-gray-400">
                            {user.membershipExpires
                              ? new Date(
                                  user.membershipExpires
                                ).toLocaleDateString()
                              : "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {user.status !== "approved" && (
                            <button
                              onClick={() => handleAction(user._id, "approve")}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                          )}
                          {user.status !== "rejected" && (
                            <button
                              onClick={() => handleAction(user._id, "reject")}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          )}
                          {user.status === "approved" && (
                            <button
                              onClick={() =>
                                togglePaymentStatus(user._id, user.hasPaid)
                              }
                              disabled={loadingStates[user._id]}
                              className={`${
                                user.hasPaid
                                  ? "text-orange-600 hover:text-orange-900"
                                  : "text-blue-600 hover:text-blue-900"
                              } ${
                                loadingStates[user._id]
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              {loadingStates[user._id]
                                ? "Processing..."
                                : user.hasPaid
                                ? "Mark Unpaid"
                                : "Mark Paid"}
                            </button>
                          )}
                          <button
                            onClick={() => viewPaymentReceipt(user._id)}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                          >
                            View Receipt
                          </button>
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

      {receiptModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Payment Receipt</h2>
              <button
                onClick={closeReceiptModal}
                className="text-gray-500 hover:text-gray-700"
              >
                {/* Close icon */}
              </button>
            </div>

            <div className="flex justify-center items-center min-h-[300px]">
              {loadingReceipt ? (
                <div className="text-gray-500">Loading receipt...</div>
              ) : currentReceipt ? (
                <img
                  src={currentReceipt}
                  alt="Payment Receipt"
                  className="max-w-full max-h-[70vh] object-contain"
                  onError={() => {
                    setMessage("Could not display the receipt image");
                    setCurrentReceipt("");
                  }}
                />
              ) : (
                <div className="text-gray-500">
                  {message || "No receipt available"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
