// import { useNavigate } from 'react-router-dom';

// export default function Home() {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
//       <h1 className="text-4xl font-bold mb-4">Welcome to Our Organization</h1>
//       <p className="text-lg mb-6 text-center max-w-xl">We are a student association dedicated to ...</p>
//       <button
//         onClick={() => navigate('/user-register')}
//         className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
//       >
//         Become a Member
//       </button>
//     </div>
//   );
// }




























import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-yellow-100 to-yellow-200 px-6 md:px-12">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Empowering Students Through{" "}
            <span className="text-yellow-500">Learning & Engagement</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            MS-League is a student NGO that supports growth, collaboration, and
            educational empowerment.
          </p>
          <button
            onClick={() => navigate('/user-login')}
            className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
          >
            Join the Community
          </button>
        </div>
      </section>

      {/* Overview Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What is MS-League?
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              MS-League is a student-led NGO focused on educational empowerment,
              discussion forums, and engaging TV programs.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Profile management & learning platform</li>
              <li>TV content and competitions</li>
              <li>Forum-based student engagement</li>
              <li>Admin support and event updates</li>
            </ul>
          </div>
          <div className="w-full h-64 bg-yellow-100 rounded-xl flex items-center justify-center">
            <span className="text-yellow-600 text-4xl font-bold">📚</span>
          </div>
        </div>
      </section>

      {/* Highlighted Courses Section */}
      <HighlightedCoursesSection />
      
      {/* Featured TV Section */}
      <FeaturedTVSection />
      
      {/* Join Us Section */}
      <section className="py-16 bg-yellow-500 text-white text-center px-6 md:px-0">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Be Part of the Change?
          </h2>
          <p className="mb-6 text-lg">
            Join MS-League and connect with a community of like-minded students
            today!
          </p>
          <button
            onClick={() => navigate('/user-login')}
            className="bg-white text-yellow-500 font-semibold px-6 py-3 rounded-md hover:bg-yellow-100"
          >
            Become a Member
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Helper components defined in the same file
function HighlightedCoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/courses');
        setCourses(res.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="text-center py-8">Loading courses...</div>;

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Highlighted Courses
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600">{course.description || 'No description available'}</p>
              <button
                onClick={() => navigate('/user-login')}
                className="inline-block mt-4 text-yellow-600 hover:underline"
              >
                Explore Course →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedTVSection() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await axios.get('http://localhost:3000/tv-shows');
        setShows(res.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching TV shows:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  if (loading) return <div className="text-center py-8">Loading TV shows...</div>;

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured TV Programs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {shows.map((show) => (
            <div key={show._id} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{show.title}</h3>
              <p className="text-gray-600">{show.description || 'No description available'}</p>
              <button
                onClick={() => navigate('/user-login')}
                className="inline-block mt-4 text-yellow-600 hover:underline"
              >
                Watch Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}