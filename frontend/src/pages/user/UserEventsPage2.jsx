// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function UserEventsPage() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:3000/events', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setEvents(res.data);
//       } catch (err) {
//         console.error('Error fetching events:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleRegister = async (eventId) => {
//     if (window.confirm('Are you sure you want to register for this event?')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.post('http://localhost:3000/event-registrations', 
//           { eventId },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         alert('Registration submitted! You will receive an email once approved.');
//       } catch (err) {
//         alert('Registration failed: ' + (err.response?.data?.message || err.message));
//       }
//     }
//   };

//   const getEventStatus = (eventDate) => {
//     const now = new Date();
//     const eventDateObj = new Date(eventDate);
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const eventDay = new Date(eventDateObj.getFullYear(), eventDateObj.getMonth(), eventDateObj.getDate());

//     if (eventDay < today) return 'ended';
//     if (eventDay > today) return 'upcoming';
//     return 'happening';
//   };

//   if (loading) return <div>Loading events...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map(event => {
//           const status = getEventStatus(event.date);
//           const statusColors = {
//             ended: 'bg-gray-100 text-gray-800',
//             happening: 'bg-green-100 text-green-800',
//             upcoming: 'bg-blue-100 text-blue-800'
//           };

//           return (
//             <div key={event._id} className="border rounded-lg overflow-hidden shadow-md">
//               <img src={event.imageLink} alt={event.title} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
//                 <p className="text-gray-600 mb-4">{event.description}</p>
                
//                 <div className="flex justify-between items-center mb-4">
//                   <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
//                     {status === 'ended' ? 'Event Ended' : 
//                      status === 'happening' ? 'Happening Today' : 
//                      new Date(event.date).toLocaleDateString()}
//                   </span>
//                 </div>

//                 {status === 'upcoming' && (
//                   <button
//                     onClick={() => handleRegister(event._id)}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//                   >
//                     Register Now
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }














import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserEventsPage2() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/events', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    if (!localStorage.getItem('token')) {
      navigate('/user-login');
      return;
    }

    if (window.confirm('Are you sure you want to register for this event?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/event-registrations', 
          { eventId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Registration submitted! You will receive an email once approved.');
      } catch (err) {
        alert('Registration failed: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const getEventStatus = (eventDate) => {
    const now = new Date();
    const eventDateObj = new Date(eventDate);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDay = new Date(eventDateObj.getFullYear(), eventDateObj.getMonth(), eventDateObj.getDate());

    if (eventDay < today) return 'ended';
    if (eventDay > today) return 'upcoming';
    return 'happening';
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">Loading events...</div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Events</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {events.map(event => {
            const status = getEventStatus(event.date);
            const isUpcoming = status === 'upcoming';
            const isHappening = status === 'happening';
            const isEnded = status === 'ended';

            return (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
              >
                {event.imageLink && (
                  <img 
                    src={event.imageLink} 
                    alt={event.title} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    📅 {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <button
                    onClick={() => isUpcoming ? handleRegister(event._id) : null}
                    className={`w-full px-4 py-2 rounded-md text-white font-medium ${
                      isUpcoming
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : isHappening
                        ? 'bg-green-500 cursor-default'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isUpcoming ? 'Register Now' : 
                     isHappening ? 'Happening Today' : 'Event Ended'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}