// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import UserMembershipStatus from './UserMembershipStatus';

// export default function UserDashboard() {
//   const [userData, setUserData] = useState({
//     name: '',
//     membershipStatus: '',
//     courseProgress: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const [profileRes, coursesRes] = await Promise.all([
//           axios.get('http://localhost:3000/users/profile', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get('http://localhost:3000/users/course-progress', {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//         ]);

//         setUserData({
//           name: profileRes.data.name || 'User',
//           membershipStatus: profileRes.data.membershipStatus || 'Pending',
//           courseProgress: coursesRes.data.map(course => ({
//             title: course.title,
//             progress: course.progressPercentage
//           }))
//         });
//       } catch (err) {
//         console.error('Error fetching user data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <div className="flex flex-col flex-grow">
//         <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <div className="flex-grow flex items-center justify-center">
//           <div>Loading dashboard...</div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <div className="flex flex-col flex-grow overflow-hidden">
//         <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
//         <main className="flex-grow overflow-auto p-6">
//           {/* Header */}
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold mb-2">Welcome, {userData.name} 👋</h1>
//             <p className="text-gray-700">
//               Membership Status:{" "}
//               <span className="font-semibold">{userData.membershipStatus}</span>
//             </p>
//           </div>

//           {/* Membership Status Card */}
//           <div className="mb-8">
//             <UserMembershipStatus />
//           </div>

//           {/* Course Progress Cards */}
//           {userData.courseProgress.length > 0 && (
//             <>
//               <h2 className="text-2xl font-semibold mb-4">Your Course Progress</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//                 {userData.courseProgress.map((course, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center"
//                   >
//                     <div className="w-24 h-24 mb-4">
//                       <CircularProgressbar
//                         value={course.progress}
//                         text={`${course.progress}%`}
//                         styles={buildStyles({
//                           pathColor: "#facc15",
//                           textColor: "#333",
//                           trailColor: "#e5e7eb",
//                         })}
//                       />
//                     </div>
//                     <h3 className="text-lg font-semibold text-center">
//                       {course.title}
//                     </h3>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }





















import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import UserMembershipStatus from './UserMembershipStatus';

export default function UserDashboard() {
  const [userData, setUserData] = useState({
    name: '',
    membershipStatus: '',
    courseProgress: []
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [profileRes, coursesRes] = await Promise.all([
          axios.get('http://localhost:3000/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:3000/users/course-progress', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUserData({
          name: profileRes.data.name || 'User',
          membershipStatus: profileRes.data.membershipStatus || 'Pending',
          courseProgress: coursesRes.data.map(course => ({
            title: course.title,
            progress: course.progressPercentage
          }))
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-grow">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-grow flex items-center justify-center">
          <div>Loading dashboard...</div>
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
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Welcome, {userData.name} 👋</h1>
            <p className="text-gray-700">
              Membership Status:{" "}
              <span className="font-semibold">{userData.membershipStatus}</span>
            </p>
          </div>

          {/* Membership Status Card */}
          <div className="mb-8">
            <UserMembershipStatus />
          </div>

          {/* Course Progress Cards */}
          {userData.courseProgress.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Your Course Progress</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {userData.courseProgress.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center"
                  >
                    <div className="w-24 h-24 mb-4">
                      <CircularProgressbar
                        value={course.progress}
                        text={`${course.progress}%`}
                        styles={buildStyles({
                          pathColor: "#facc15",
                          textColor: "#333",
                          trailColor: "#e5e7eb",
                        })}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center">
                      {course.title}
                    </h3>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}