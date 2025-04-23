// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CreateCourse = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     level: '',
//     duration: '',
//     image: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:3000/courses', formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       navigate('/courses');
//     } catch (error) {
//       console.error('Failed to create course:', error);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
//       <form onSubmit={handleCreate} className="space-y-4">
//         {[
//           ['title', 'Title'],
//           ['description', 'Description', 'textarea'],
//           ['category', 'Category'],
//           ['level', 'Level'],
//           ['duration', 'Duration (in hours)', 'number'],
//           ['image', 'Image URL'],
//         ].map(([name, label, type = 'text']) => (
//           <div key={name}>
//             <label className="block mb-1 font-medium">{label}</label>
//             {type === 'textarea' ? (
//               <textarea
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//                 rows="3"
//               />
//             ) : (
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//               />
//             )}
//           </div>
//         ))}
//         <div className="flex justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Create
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/courses')}
//             className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateCourse;













import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTopbar from '../admin/AdminTopbar';
import AdminSidebar from '../admin/AdminSidebar';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    image: '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/courses', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/courses');
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <AdminSidebar onClose={toggleSidebar} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
            <form onSubmit={handleCreate} className="space-y-4">
              {[
                ['title', 'Title'],
                ['description', 'Description', 'textarea'],
                ['category', 'Category'],
                ['level', 'Level'],
                ['duration', 'Duration (in hours)', 'number'],
                ['image', 'Image URL'],
              ].map(([name, label, type = 'text']) => (
                <div key={name} className="space-y-1">
                  <label className="block font-medium text-gray-700">{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      rows="4"
                      required
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/courses')}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;