import me from '../assets/Me.jpg';

export const Bio = () => {
    return (
<div className="flex flex-col md:flex-row md:items-start items-center gap-8">
  <img
    src={me}
    alt="Picture of me"
    className="rounded-md shadow-lg object-cover
               w-72 md:w-80 lg:w-96 h-auto shrink-0 mt-20"
  />

  <div className="flex-1">
    <h2 className="text-5xl font-semibold mb-4 md:mt-40 text-center">
      Hello, and welcome to my awesome homepage!
    </h2>
    <p className="mt-10 text-xl text-center rt-10">
      I am a software developer with a background in Aviation. I am located in Espoo, Finland and have a passion
      for backend development and cyber security. Here is also some more information. Like bla bla bla.
    </p>
  </div>
</div>

    )
}