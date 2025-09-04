import me from "../assets/Me.jpg";

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
          Hello there!
        </h2>
        <p className="mt-10 text-xl text-center rt-10">
          General k.. I mean hi! I’m Casimir “Casi” Lundberg, a former aviation
          professional who decided to follow a long-time passion for software
          development. After completing the 42 core curriculum at Hive Helsinki,
          I now build projects from low-level C/C++ to full-stack web
          applications with React, Fastify and Node.js. What motivates me is
          solving complex problems with precision and creating solutions people
          can rely on.
        </p>
      </div>
    </div>
  );
};
