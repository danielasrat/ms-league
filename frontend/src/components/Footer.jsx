import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 sm:grid-cols-2 gap-10">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">
            MS<span className="text-black">League</span>
          </h2>
          <p className="mt-4 text-sm text-gray-600">
            Empowering students through learning, discussion, and collaboration.
            Join us to grow together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => navigate('/')} className="hover:underline">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/about')} className="hover:underline">
                About
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/user-events')} className="hover:underline">
                Events
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/user-tv-shows')} className="hover:underline">
                TV Programs
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/contact')} className="hover:underline">
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: msleague@ngo.org</li>
            <li>Phone: +251 912 345 678</li>
            <li className="flex gap-3 mt-2">
              <button className="hover:text-blue-500">Facebook</button>
              <button className="hover:text-pink-500">Instagram</button>
              <button className="hover:text-sky-600">Twitter</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        &copy; 2025 MS-League. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;