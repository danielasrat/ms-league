// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProfileUpdate = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     password: '',
//   });
//   const [profileImage, setProfileImage] = useState(null);
//   const [currentImageUrl, setCurrentImageUrl] = useState('');
//   const [previewUrl, setPreviewUrl] = useState('');

//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:3000/users/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const { name, phone, profileImage } = res.data;
//         setFormData((prev) => ({
//           ...prev,
//           name,
//           phone,
//         }));
//         if (profileImage) {
//           setCurrentImageUrl(`http://localhost:3000/uploads/profile-images/${profileImage}`);
//         }
//       } catch (err) {
//         console.error('Failed to fetch profile', err);
//       }
//     };

//     fetchProfile();
//   }, []);


//   useEffect(() => {
//     return () => {
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [previewUrl]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(file);
//       setPreviewUrl(URL.createObjectURL(file)); // generate preview
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) data.append(key, value);
//     });
//     if (profileImage) data.append('profileImage', profileImage);

//     try {
//       const token = localStorage.getItem('token');
//       await axios.patch('http://localhost:3000/users/update-profile', data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('Profile updated successfully!');
//     } catch (error) {
//       console.error(error);
//       setMessage('Failed to update profile');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>

//       {(previewUrl || currentImageUrl) && (
//   <div className="flex justify-center mb-4">
//     <img
//       src={previewUrl || currentImageUrl}
//       alt="Profile Preview"
//       className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
//     />
//   </div>
// )}


//       {message && <p className="text-center text-sm text-blue-600 mb-4">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="New Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileUpdate;
















import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    password: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, email, phone, bio, profileImage } = res.data;
        setFormData((prev) => ({
          ...prev,
          name,
          email,
          phone,
          bio: bio || ''
        }));
        if (profileImage) {
          setCurrentImageUrl(`http://localhost:3000/uploads/profile-images/${profileImage}`);
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    if (profileImage) data.append('profileImage', profileImage);

    try {
      const token = localStorage.getItem('token');
      await axios.patch('http://localhost:3000/users/update-profile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Profile updated successfully!');
      // Update the displayed image if a new one was uploaded
      if (profileImage) {
        setCurrentImageUrl(previewUrl);
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-grow overflow-auto p-6">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            {/* Profile Picture */}
            <div className="mb-6 flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden mb-2">
                {(previewUrl || currentImageUrl) ? (
                  <img
                    src={previewUrl || currentImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center h-full text-gray-500 text-4xl">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm"
              />
            </div>

            {/* Profile Form */}
            <div className="space-y-4">
              {message && (
                <p className={`text-center p-2 rounded ${
                  message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {message}
                </p>
              )}
              
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border p-3 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-3 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                disabled
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border p-3 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Short bio..."
                className="w-full border p-3 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                rows="4"
              ></textarea>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password (leave blank to keep current)"
                className="w-full border p-3 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />

              <button 
                type="submit" 
                onClick={handleSubmit}
                className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition w-full"
              >
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileUpdate;