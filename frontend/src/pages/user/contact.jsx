// const Contact = () => {
//     return (
//       <div className="px-6 md:px-12 py-16 max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold mb-10 text-center text-blue-600">Contact Us</h1>
  
//         {/* Form */}
//         <form className="grid gap-6 bg-white p-8 rounded-lg shadow-lg">
//           <input
//             type="text"
//             placeholder="Your Name"
//             className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <textarea
//             rows="4"
//             placeholder="Your Message"
//             className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//           <button
//             type="submit"
//             className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition duration-300"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     );
//   };
  
//   export default Contact;
  












  import Navbar from '../../components/Navbar';
  import Footer from '../../components/Footer';
  
  const Contact = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="w-full px-6 md:px-12 py-16 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center text-blue-600">Contact Us</h1>
          
            
        {/* Form */}
        <form className="grid gap-6 bg-white p-8 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
          
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Contact;