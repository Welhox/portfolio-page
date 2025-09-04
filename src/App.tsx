// import React from 'react';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Bio } from "./components/Bio";
import { projects } from "./data/projects";
import { ProjectsGrid } from "./components/ProjectMain";
import { Contact } from "./components/Contact";

function App() {
  return (
    <div className="bg-background">
      <Header />
      <main className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className=" min-h-screen flex flex-col">
          <Bio />
          <ProjectsGrid items={projects} />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
