// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CreateTvShow = () => {
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     videoLink: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:3000/tv-shows', form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       navigate('/tv-shows');
//     } catch (error) {
//       console.error('Failed to create TV show:', error);
//     }
//   };

//   return (
//     <div className="p-8 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Create TV Show</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="videoLink"
//           placeholder="YouTube Video Link"
//           value={form.videoLink}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Create
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateTvShow;












import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminTopbar from '../admin/AdminTopbar';
import AdminSidebar from '../admin/AdminSidebar';

const CreateTvShow = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    videoLink: '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/tv-shows', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/tv-shows');
    } catch (error) {
      console.error('Failed to create TV show:', error);
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
            <h1 className="text-2xl font-bold mb-6">Create TV Program</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  rows="4"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block font-medium text-gray-700">YouTube Video Link</label>
                <input
                  type="text"
                  name="videoLink"
                  value={form.videoLink}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/tv-shows')}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition"
                >
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateTvShow;