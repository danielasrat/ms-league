// import { useState } from 'react';
// import { loginAdmin } from '../../services/api';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginAdmin({ email, password });
//       localStorage.setItem('token', res.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
//                className="w-full p-2 mb-4 border rounded" required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
//                className="w-full p-2 mb-4 border rounded" required />
//         <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Login</button>
//       </form>
//       <p className="mt-4 text-center">Don't have an account? <a href="/register" className="text-blue-600">Register</a></p>
//     </div>
//   );
// }






import { useState } from 'react';
import { loginAdmin } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin({ email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between items-center text-sm mt-4">
          <Link
            to="/forgot-password"
            className="text-yellow-600 hover:underline"
          >
            Forgot Password?
          </Link>
          <span>
            No account?{' '}
            <Link to="/register" className="text-yellow-600 hover:underline">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}