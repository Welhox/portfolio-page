import React from 'react';
// import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
function App() {

  return (
    <>
    <div className="bg-background min-h-screen flex flex-col">
  <Header />
  <div  className="space-y-8 flex-grow">
    <section className="text-center">
      <h2 className="text-4xl font-semibold mb-4 sm:text-xl" > Welcome</h2>
      <p> This is the  main content of the website </p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-4 text-center"> Projects</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100 hover:shadow-lg"> Feature 1 </div>
        <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 2 </div>
        <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 3 </div>
        <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 1 </div>
        <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 2 </div>
        <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 3 </div>
        <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 1 </div>
        <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 2 </div>
        <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 3 </div>
      </div>
    </section>
    </div>
  <div className="bg-teal-500 text-center text-sm text-teal-100 mt-4"> &copy; 2025 My Website. ALl rights reserved </div>

</div>
  </>
  )
}

export default App


// function App() {

//   return (
//     <>
//     <div className="bg-background min-h-screen max-w-4xl mx-auto flex flex-col">
//   <div className="bg-teal-500 px-6 py-4 text-primary flex justify-between mb-8">
//     <h1 className="text-xl font-bold"> MyWebsite</h1>
//     <nav className="flex gap-4">
//       <a href='#'>Home</a>
//       <a href='#'>Blog</a>
//       <a href='#'>Contact</a>
//       <button onClick={() => document.documentElement.classList.toggle('dark')}>Toggle Dark Mode</button>
//     </nav>
//   </div>
//   <div  className="space-y-8 flex-grow">
//     <section className="text-center">
//       <h2 className="text-4xl font-semibold mb-4 sm:text-xl" > Welcome</h2>
//       <p> This is the  main content of the website </p>
//     </section>
//     <section>
//       <h2 className="text-xl font-semibold mb-4 text-center"> Features</h2>
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
//         <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100 hover:shadow-lg"> Feature 1 </div>
//         <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 2 </div>
//         <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 3 </div>
//         <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 1 </div>
//         <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 2 </div>
//         <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 3 </div>
//         <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 1 </div>
//         <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 2 </div>
//         <div className="bg-teal-400 p-4 rounded hover:bg-teal-400/80 hover:text-teal-100"> Feature 3 </div>
//       </div>
//     </section>
//     </div>
//   <div className="bg-teal-500 text-center text-sm text-teal-100 mt-4"> &copy; 2025 My Website. ALl rights reserved </div>

// </div>
//     </>
//   )
// }

// export default App
