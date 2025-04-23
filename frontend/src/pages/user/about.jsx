// const About = () => {
//     const team = [
//       { name: "John", role: "President", img: "https://via.placeholder.com/150" },
//       {
//         name: "Doe",
//         role: "Vice President",
//         img: "https://via.placeholder.com/150",
//       },
//       {
//         name: "Temp",
//         role: "Media Coordinator",
//         img: "https://via.placeholder.com/150",
//       },
//     ];
  
//     return (
//       <div className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
//         {/* Header */}
//         <h1 className="text-4xl font-bold mb-6 text-center">About MS-League</h1>
  
//         {/* Mission & Vision */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
//           <p className="text-gray-700 mb-4">
//             To empower students through education, discussion, and collaboration.
//           </p>
  
//           <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
//           <p className="text-gray-700">
//             A future where every student has access to knowledge, opportunity, and
//             a voice in their community.
//           </p>
//         </section>
  
//         {/* History (Optional) */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
//           <p className="text-gray-700">
//             MS-League was founded in 2023 by a group of passionate student leaders
//             who wanted to build a collaborative space for growth, learning, and
//             creativity. Since then, it has grown into a thriving community of
//             youth changemakers.
//           </p>
//         </section>
  
//         {/* Team Section */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-6 text-center">
//             Our Leadership
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {team.map((person, idx) => (
//               <div
//                 key={idx}
//                 className="text-center bg-gray-50 p-4 rounded-lg shadow"
//               >
//                 <img
//                   src={person.img}
//                   alt={person.name}
//                   className="w-24 h-24 mx-auto rounded-full mb-4"
//                 />
//                 <h3 className="text-lg font-semibold">{person.name}</h3>
//                 <p className="text-sm text-gray-600">{person.role}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     );
//   };
  
//   export default About;
  















  import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const About = () => {
  const team = [
    { name: "John", role: "President", img: "https://via.placeholder.com/150" },
    { name: "Doe", role: "Vice President", img: "https://via.placeholder.com/150" },
    { name: "Temp", role: "Media Coordinator", img: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow px-6 md:px-12 py-16 max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6 text-center">About MS-League</h1>

         {/* Mission & Vision */}
         <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            To empower students through education, discussion, and collaboration.
          </p>
  
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-700">
            A future where every student has access to knowledge, opportunity, and
            a voice in their community.
          </p>
        </section>
  
        {/* History (Optional) */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            MS-League was founded in 2023 by a group of passionate student leaders
            who wanted to build a collaborative space for growth, learning, and
            creativity. Since then, it has grown into a thriving community of
            youth changemakers.
          </p>
        </section>
  
        {/* Team Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Our Leadership
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((person, idx) => (
              <div
                key={idx}
                className="text-center bg-gray-50 p-4 rounded-lg shadow"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="text-sm text-gray-600">{person.role}</p>
              </div>
            ))}
          </div>
        </section>
        
      </div>
      <Footer />
    </div>
  );
};

export default About;