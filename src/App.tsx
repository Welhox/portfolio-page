import React from 'react';
import { Header } from './components/Header';
import me from './assets/Me.jpg';
import { projects } from './data/projects';
import { ProjectsGrid } from './components/ProjectMain';

function App() {

  return (
  <>
  <Header />
  <main className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
    <div className="bg-background min-h-screen flex flex-col">
  <div  className="space-y-8 flex-grow grid sm:grid-cols-1 md:grid-cols-2 gap-40">
    <section className="text-center">
      <div>
        <img src={me} alt="Picture of me" className="w-90 h-120 mt-20 ml-20 mb-10" />
      </div>
      <div>
      <h2 className="text-4xl font-semibold mb-4 sm:text-xl" > Welcome</h2>
      <p> This is the  main content of the website </p>
      </div>
    </section>
  </div>
  <div>
    <section className="mt-10">
      <h2 className="px-6 md:px-20 text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
      Projects
      </h2>
      <div className="mt-6">
        <ProjectsGrid items={projects} />
      </div>
    </section>
    </div>

</div>
  </main>
  <div className="bg-primary text-center text-sm text-secondary mt-4"> &copy; 2025 My Website. ALl rights reserved </div>
  </>
  )
}

export default App