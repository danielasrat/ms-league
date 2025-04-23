// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const TvShows = () => {
//   const [tvShows, setTvShows] = useState([]);
//   const navigate = useNavigate();

//   const fetchTvShows = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:3000/tv-shows', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTvShows(res.data);
//     } catch (error) {
//       console.error('Failed to fetch TV shows:', error);
//     }
//   };

//   const deleteTvShow = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3000/tv-shows/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTvShows();
//     } catch (error) {
//       console.error('Failed to delete TV show:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTvShows();
//   }, []);

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">TV Shows</h1>
//         <button
//           onClick={() => navigate('/tv-shows/create')}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add New Show
//         </button>
//       </div>

//       <div className="grid gap-4">
//         {tvShows.map((show) => (
//           <div
//             key={show._id}
//             className="p-4 border rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
//           >
//             <div className="mb-4 sm:mb-0">
//   {show.videoLink.includes("youtube.com/watch?v=") ? (
//     <iframe
//       width="100%"
//       height="200"
//       src={show.videoLink.replace("watch?v=", "embed/")}
//       title={show.title}
//       allowFullScreen
//       className="rounded mb-2"
//     ></iframe>
//   ) : (
//     <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded mb-2">
//       <p className="text-red-500">Invalid or missing YouTube link</p>
//     </div>
//   )}

//   <h2 className="text-lg font-semibold">{show.title}</h2>
//   <p>{show.description}</p>
//   <p className="text-sm text-gray-500 mt-1">
//     Likes: {show.likes} | Comments: {show.comments?.length}
//   </p>
// </div>

//             <div className="space-x-2">
//               <button
//                 onClick={() => navigate(`/tv-shows/edit/${show._id}`)}
//                 className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteTvShow(show._id)}
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

// export default TvShows;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTopbar from '../admin/AdminTopbar';
import AdminSidebar from '../admin/AdminSidebar';

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchTvShows = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/tv-shows', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTvShows(res.data);
    } catch (error) {
      console.error('Failed to fetch TV shows:', error);
    }
  };

  const deleteTvShow = async (id) => {
    if (!window.confirm('Are you sure you want to delete this TV show?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/tv-shows/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTvShows();
    } catch (error) {
      console.error('Failed to delete TV show:', error);
    }
  };

  useEffect(() => {
    fetchTvShows();
  }, []);

  const filteredShows = tvShows.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-2xl font-bold">Manage TV Programs</h1>
              <button
                onClick={() => navigate('/tv-shows/create')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
              >
                Add New Program
              </button>
            </div>

            <input
              type="text"
              placeholder="Search programs..."
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md mb-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShows.map((show) => (
                <div
                  key={show._id}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border"
                >
                  {show.videoLink && show.videoLink.includes("youtube.com") ? (
                    <iframe
                      src={show.videoLink.replace("watch?v=", "embed/")}
                      title={show.title}
                      allowFullScreen
                      className="w-full h-48 rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-3">
                      <p className="text-red-500">Invalid video link</p>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{show.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {show.description}
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/tv-shows/edit/${show._id}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View / Edit
                    </button>
                    <button 
                      onClick={() => deleteTvShow(show._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TvShows;