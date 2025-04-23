// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function UserTvShowsPage() {
//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchShows = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:3000/tv-shows', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setShows(res.data);
//       } catch (err) {
//         console.error('Error fetching TV shows:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchShows();
//   }, []);

//   const handleLike = async (showId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         `http://localhost:3000/tv-shows/${showId}/like`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // Optimistic update
//       setShows(shows.map(show => 
//         show._id === showId ? { ...show, likes: show.likes + 1 } : show
//       ));
//     } catch (err) {
//       console.error('Error liking show:', err);
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading TV shows...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">TV Programs</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {shows.map(show => (
//           <div key={show._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
//               <iframe
//                 src={show.videoLink}
//                 className="absolute top-0 left-0 w-full h-full"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 title={show.title}
//               ></iframe>
//             </div>
            
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-2">{show.title}</h2>
              
//               {show.description && (
//                 <p className="text-gray-700 mb-4">{show.description}</p>
//               )}
              
//               <div className="flex justify-between items-center">
//                 <button
//                   onClick={() => handleLike(show._id)}
//                   className="flex items-center text-gray-700 hover:text-red-500"
//                 >
//                   <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                   </svg>
//                   {show.likes || 0}
//                 </button>
                
//                 {show.comments?.length > 0 && (
//                   <span className="text-gray-600">
//                     {show.comments.length} comments
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }















import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function UserTvShowsPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/tv-shows', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setShows(res.data);
      } catch (err) {
        console.error('Error fetching TV shows:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const handleLike = async (showId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/tv-shows/${showId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Optimistic update
      setShows(shows.map(show => 
        show._id === showId ? { ...show, likes: (show.likes || 0) + 1 } : show
      ));
    } catch (err) {
      console.error('Error liking show:', err);
    }
  };

  // Extract unique categories from shows
  const categories = ["All", ...new Set(shows.map(show => show.category).filter(Boolean))];

  const filteredShows = activeCategory === "All" 
    ? shows 
    : shows.filter(show => show.category === activeCategory);

  if (loading) return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-grow">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-grow flex items-center justify-center">
          <div>Loading TV programs...</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-grow overflow-auto p-6">
          <h1 className="text-3xl font-bold mb-6">TV Programs</h1>

          {/* Filter buttons */}
          <div className="mb-6 flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border ${
                  activeCategory === cat
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-700 hover:bg-yellow-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredShows.length > 0 ? (
              filteredShows.map((show) => (
                <div
                  key={show._id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 p-4"
                >
                  <div className="relative pb-[40%]"> {/* 16:9 aspect ratio */}
                    <iframe
                      src={show.videoLink}
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={show.title}
                    ></iframe>
                  </div>

                  <h2 className="text-xl font-semibold mt-4">{show.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{show.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleLike(show._id)}
                      className="flex items-center text-gray-700 hover:text-red-500"
                    >
                      <svg 
                        className="w-5 h-5 mr-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        />
                      </svg>
                      {show.likes || 0} likes
                    </button>
                    
                    {show.comments?.length > 0 && (
                      <span className="text-gray-600">
                        {show.comments.length} comments
                      </span>
                    )}
                  </div>

                  {/* Comments section - would be expanded in a real implementation */}
                  <div className="mt-4">
                    <input
                      placeholder="Add a comment..."
                      className="w-full border px-3 py-2 text-sm rounded-md"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No TV programs found in this category.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}