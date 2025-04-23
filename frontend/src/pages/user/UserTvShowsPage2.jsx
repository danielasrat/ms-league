import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserTvShowsPage2() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/tv-shows', {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
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

  if (loading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">Loading TV programs...</div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">TV Programs</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shows.map(show => (
            <div
              key={show._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md hover:ring-1 hover:ring-yellow-400 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {show.title}
              </h3>
              <p className="text-gray-600 mb-2">{show.description}</p>
              
              {/* Placeholder category - you can replace with actual category if available */}
              <span className="inline-block text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full mb-4">
                {show.category || 'General'}
              </span>
              
              {/* Placeholder for video link */}
              <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4">
                <span className="text-gray-400">Video Preview</span>
              </div>
              
              <a
                href={show.videoLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-yellow-600 hover:underline font-medium mt-2"
              >
                🎥 Watch Now
              </a>
              
              {/* Placeholder for like and comment counts */}
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>👍 {show.likes || 0} likes</span>
                <span>💬 {show.comments?.length || 0} comments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}