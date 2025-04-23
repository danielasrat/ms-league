// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   const fetchCourses = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:3000/courses', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCourses(res.data);
//     } catch (error) {
//       console.error('Failed to fetch courses:', error);
//     }
//   };

//   const deleteCourse = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3000/courses/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCourses(); // Refresh list
//     } catch (error) {
//       console.error('Failed to delete course:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Courses</h1>
//         <button
//           onClick={() => navigate('/courses/create')}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Create New Course
//         </button>
//       </div>

//       <div className="grid gap-4">
//         {courses.map((course) => (
//           <div
//             key={course._id}
//             className="p-4 border rounded flex flex-col justify-between items-start shadow"
//           >
//             <div>
//               <h2 className="text-lg font-semibold">{course.title}</h2>
//               <p className="text-gray-700">{course.description}</p>
//               <div className="mt-2 text-sm text-gray-600">
//                 <p><strong>Category:</strong> {course.category}</p>
//                 <p><strong>Level:</strong> {course.level}</p>
//                 <p><strong>Duration:</strong> {course.duration} hours</p>
//                 {course.image && <img src={course.image} alt={course.title} className="w-32 h-32 object-cover mt-2" />}
//               </div>
//             </div>
//             <div className="mt-4 space-x-2">
//               <button
//                 onClick={() => navigate(`/courses/edit/${course._id}`)}
//                 className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteCourse(course._id)}
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

// export default Courses;

























import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTopbar from '../admin/AdminTopbar';
import AdminSidebar from '../admin/AdminSidebar';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-2xl font-bold">Manage Courses</h1>
              <button
                onClick={() => navigate('/courses/create')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
              >
                Create New Course
              </button>
            </div>

            <input
              type="text"
              placeholder="Search courses..."
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md mb-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border"
                >
                  {course.image && (
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {course.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {course.level} • {course.duration} hours
                  </p>

                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/courses/edit/${course._id}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View / Edit
                    </button>
                    <button 
                      onClick={() => deleteCourse(course._id)}
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

export default Courses;