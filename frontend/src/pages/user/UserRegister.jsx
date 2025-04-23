// import { useState } from 'react';
// import axios from 'axios';

// export default function UserRegister() {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/users/register', form);
//       setMessage('Successfully requested registration. Please wait for approval.');
//     } catch (err) {
//       setMessage('Registration failed. Try again later.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6">
//       <h2 className="text-2xl font-bold mb-4">User Registration</h2>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow p-4 rounded">
//         <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full mb-2 p-2 border rounded" />
//         <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full mb-2 p-2 border rounded" />
//         <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className="w-full mb-2 p-2 border rounded" />
//         <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required className="w-full mb-2 p-2 border rounded" />
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
//       </form>
//       {message && <p className="mt-4 text-center">{message}</p>}
//         <p className="mt-4 text-center">Already have an account? <a href="/user-login" className="text-blue-600">Login</a></p>
//     </div>
//   );
// }















import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserRegister() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: '' 
  });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users/register', form);
      setMessage('Successfully requested registration. Please wait for approval.');
    } catch (err) {
      setMessage('Registration failed. Try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+251 900 000 000"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition font-medium"
            >
              Register
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-center ${message.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/user-login" 
              className="text-yellow-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
