// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// export default function CourseContentPage() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [modules, setModules] = useState([]); // Would come from backend in real app
//   const [currentModule, setCurrentModule] = useState(0);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`http://localhost:3000/courses/${id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCourse(res.data);
        
//         // Mock modules - in a real app, this would come from your backend
//         setModules([
//           { id: 1, title: 'Introduction', duration: '15 min', completed: true },
//           { id: 2, title: 'Getting Started', duration: '30 min', completed: true },
//           { id: 3, title: 'Advanced Concepts', duration: '45 min', completed: false },
//           { id: 4, title: 'Final Project', duration: '60 min', completed: false },
//         ]);
//       } catch (err) {
//         console.error('Error fetching course:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [id]);

//   if (loading) return <div className="text-center py-8">Loading course...</div>;
//   if (!course) return <div className="text-center py-8">Course not found</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Sidebar with modules */}
//         <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
//           <ul className="space-y-2">
//             {modules.map((module, index) => (
//               <li 
//                 key={module.id}
//                 className={`p-3 rounded-lg cursor-pointer ${currentModule === index ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
//                 onClick={() => setCurrentModule(index)}
//               >
//                 <div className="flex justify-between items-center">
//                   <span className={`font-medium ${module.completed ? 'text-green-600' : ''}`}>
//                     {module.title}
//                   </span>
//                   {module.completed && (
//                     <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">{module.duration}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
        
//         {/* Main content area */}
//         <div className="md:w-3/4">
//           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//             <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
//             <p className="text-gray-700 mb-6">{course.description}</p>
            
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <h3 className="text-lg font-semibold mb-2">{modules[currentModule]?.title}</h3>
//               <p className="text-gray-700">
//                 This is where the actual course content would be displayed for "{modules[currentModule]?.title}".
//                 In a real application, this would include videos, text content, quizzes, etc.
//               </p>
//             </div>
//           </div>
          
//           <div className="flex justify-between">
//             {currentModule > 0 && (
//               <button
//                 onClick={() => setCurrentModule(currentModule - 1)}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
//               >
//                 Previous
//               </button>
//             )}
            
//             {currentModule < modules.length - 1 ? (
//               <button
//                 onClick={() => setCurrentModule(currentModule + 1)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
//               >
//                 Next Module
//               </button>
//             ) : (
//               <button
//                 className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
//               >
//                 Complete Course
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }














import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function CourseContentPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        const courseRes = await axios.get(`http://localhost:3000/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourse(courseRes.data);
  
        // MOCK MODULE DATA since API is not ready
        setModules([
          {
            _id: 'mod1',
            title: 'Introduction',
            duration: '15',
            completed: true,
            videoUrl: '',
            content: 'Welcome to the course! Let’s start with an overview.',
            materials: ['Intro.pdf', 'Syllabus.docx'],
          },
          {
            _id: 'mod2',
            title: 'Getting Started',
            duration: '30',
            completed: true,
            videoUrl: '',
            content: 'Here’s how you can set up your environment.',
            materials: ['SetupGuide.pdf'],
          },
          {
            _id: 'mod3',
            title: 'Advanced Concepts',
            duration: '45',
            completed: false,
            videoUrl: '',
            content: 'Time to dive deeper into the subject.',
            materials: [],
          },
          {
            _id: 'mod4',
            title: 'Final Project',
            duration: '60',
            completed: false,
            videoUrl: '',
            content: 'Your capstone project instructions.',
            materials: ['ProjectBrief.pdf'],
          },
        ]);
      } catch (err) {
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourse();
  }, [id]);
  

  if (loading) return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-grow">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-grow flex items-center justify-center">
          <div>Loading course...</div>
        </div>
      </div>
    </div>
  );

  if (!course) return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-grow">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-grow flex items-center justify-center">
          <div>Course not found</div>
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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with modules */}
            <div className="lg:w-1/4 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
              <ul className="space-y-2">
                {modules.map((module, index) => (
                  <li 
                    key={module._id}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      currentModule === index 
                        ? 'bg-yellow-100 border-l-4 border-yellow-500' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentModule(index)}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${
                        module.completed ? 'text-green-600' : 'text-gray-800'
                      }`}>
                        {module.title}
                      </span>
                      {module.completed && (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{module.duration} min</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Main content area */}
            <div className="lg:w-3/4">
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-700 mb-6">{course.description}</p>
                
                {modules[currentModule]?.videoUrl ? (
                  <div className="mb-6">
                    <iframe
                      src={modules[currentModule].videoUrl}
                      className="w-full h-96 rounded-lg"
                      title="Course Video"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="bg-gray-100 p-8 rounded-lg mb-6 flex items-center justify-center">
                    <p className="text-gray-500">No video content for this module</p>
                  </div>
                )}

                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">
                    {modules[currentModule]?.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {modules[currentModule]?.content || 'No content available for this module.'}
                  </p>
                  
                  {modules[currentModule]?.materials?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Materials</h4>
                      <ul className="list-disc pl-5">
                        {modules[currentModule].materials.map((material, i) => (
                          <li key={i} className="mb-1">
                            <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {material.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between">
                {currentModule > 0 && (
                  <button
                    onClick={() => setCurrentModule(currentModule - 1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg"
                  >
                    Previous
                  </button>
                )}
                
                {currentModule < modules.length - 1 ? (
                  <button
                    onClick={() => setCurrentModule(currentModule + 1)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg ml-auto"
                  >
                    Next Module
                  </button>
                ) : (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg ml-auto"
                  >
                    Complete Course
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}