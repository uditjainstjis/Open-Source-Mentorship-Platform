// // page.js
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import MainContent from "./components/MainContent";

// export default function Home() {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar is fixed */}
//       <Sidebar pathname="/" /> 
//       <div className="flex flex-col flex-1">
//         <Navbar />
//         <main className="flex-1 overflow-y-auto">
//           {/* MainContent now pulls suggested data */}
//           <MainContent />
//         </main>
//       </div>
//     </div>
//   );
// }

import Hero from "./components/Hero";
import Navbar from "./components/Navbar0";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    </>
    
  );
}
