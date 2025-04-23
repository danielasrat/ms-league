// // src/pages/events/Events.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   const fetchEvents = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:3000/events', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEvents(res.data);
//     } catch (error) {
//       console.error('Failed to fetch events:', error);
//     }
//   };

//   const deleteEvent = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3000/events/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchEvents();
//     } catch (error) {
//       console.error('Failed to delete event:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Events</h1>
//         <button
//           onClick={() => navigate('/events/create')}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Create New Event
//         </button>
//       </div>

//       <div className="grid gap-4">
//         {events.map((event) => (
//           <div
//             key={event._id}
//             className="p-4 border rounded flex justify-between items-center shadow"
//           >
//             <div>
//               <h2 className="text-lg font-semibold">{event.title}</h2>
//               <p className="text-sm text-gray-600">{event.description}</p>
//               <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
//               <img src={event.imageLink} alt={event.title} className="w-40 h-24 mt-2 object-cover rounded" />
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => navigate(`/events/edit/${event._id}`)}
//                 className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteEvent(event._id)}
//                 className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Events;













import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTopbar from '../admin/AdminTopbar';
import AdminSidebar from '../admin/AdminSidebar';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatus = (eventDate) => {
    const today = new Date();
    const date = new Date(eventDate);
    return date >= today ? 'Upcoming' : 'Past';
  };

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
              <h1 className="text-2xl font-bold">Manage Events</h1>
              <button
                onClick={() => navigate('/events/create')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
              >
                Create New Event
              </button>
            </div>

            <input
              type="text"
              placeholder="Search events..."
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md mb-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{event.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.imageLink && (
                          <img 
                            src={event.imageLink} 
                            alt={event.title} 
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getStatus(event.date) === 'Upcoming' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {getStatus(event.date)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => navigate(`/events/edit/${event._id}`)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEvent(event._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Events;