// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function UserCoursesPage() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [progress, setProgress] = useState({}); // Track user progress

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const [coursesRes, progressRes] = await Promise.all([
//           axios.get('http://localhost:3000/courses', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           // In a real app, you'd fetch user progress from your backend
//           Promise.resolve({ data: {} }) // Mock progress data
//         ]);
        
//         setCourses(coursesRes.data);
//         setProgress(progressRes.data);
//       } catch (err) {
//         console.error('Error fetching courses:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getProgressPercentage = (courseId) => {
//     // Mock progress - in a real app, this would come from your backend
//     return progress[courseId] || 0;
//   };

//   if (loading) return <div className="text-center py-8">Loading courses...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map(course => (
//           <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img 
//               src={course.image || 'https://via.placeholder.com/300x200'} 
//               alt={course.title}
//               className="w-full h-48 object-cover"
//             />
            
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-2">
//                 <h2 className="text-xl font-semibold">{course.title}</h2>
//                 {course.level && (
//                   <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                     {course.level}
//                   </span>
//                 )}
//               </div>
              
//               {course.category && (
//                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//                   {course.category}
//                 </span>
//               )}
              
//               {course.duration && (
//                 <p className="text-gray-600 mb-4">
//                   Duration: {course.duration} hours
//                 </p>
//               )}
              
//               <p className="text-gray-700 mb-4">
//                 {course.description || 'No description available'}
//               </p>
              
//               <div className="mb-4">
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div 
//                     className="bg-blue-600 h-2.5 rounded-full" 
//                     style={{ width: `${getProgressPercentage(course._id)}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {getProgressPercentage(course._id)}% completed
//                 </p>
//               </div>
              
//               <Link
//                 to={`/course-content/${course._id}`}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded inline-flex items-center justify-center"
//               >
//                 {getProgressPercentage(course._id) > 0 ? 'Continue Learning' : 'Start Learning'}
//                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }









import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function UserCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const coursesRes = await axios.get('http://localhost:3000/courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        let progressRes;
        try {
          progressRes = await axios.get('http://localhost:3000/users/course-progress', {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (progressError) {
          console.warn('Course progress endpoint not available. Using mock data.');
          // Simulate an empty object or fake progress
          progressRes = { data: {} };
        }
        
        setCourses(coursesRes.data);
        setProgress(progressRes.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProgressPercentage = (courseId) => {
    return progress[courseId]?.progress || 0;
  };

  const renderCourseCard = (course) => (
    <div
      key={course._id}
      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
    >
      {/* Thumbnail */}
      {course.image ? (
        <img
          src={course.image}
          alt={course.title}
          className="h-36 w-full object-cover mb-4 rounded"
        />
      ) : (
        <div className="h-36 bg-gray-200 rounded mb-4 flex items-center justify-center text-lg font-bold text-gray-600 text-center p-2">
          {course.title}
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {course.title}
      </h3>

      {course.category && (
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium text-black">Category: </span>
          {course.category}
        </p>
      )}

      {course.duration && (
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium text-black">Duration: </span>
          {course.duration}
        </p>
      )}

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${getProgressPercentage(course._id)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {getProgressPercentage(course._id)}% completed
        </p>
      </div>

      <Link
        to={`/course-content/${course._id}`}
        className={`mt-4 block w-full text-center px-4 py-2 rounded font-medium text-white ${
          getProgressPercentage(course._id) > 0
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {getProgressPercentage(course._id) > 0 ? "Continue Learning" : "Start Learning"}
      </Link>
    </div>
  );

  if (loading) return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-grow">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-grow flex items-center justify-center">
          <div>Loading courses...</div>
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
          <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => renderCourseCard(course))
            ) : (
              <p className="text-gray-600">No courses available at the moment.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}