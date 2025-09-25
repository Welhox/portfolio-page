import me from "../assets/Me.jpg";
import { TechBadges } from "./TechBadges";

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
        <h2 className="text-5xl font-semibold mb-4 md:mt-20 text-center">
          Hej/Terve/Hello!
        </h2>
        <p className="mt-10 text-xl text-left rt-10">
          I am Casimir “Casi” Lundberg, an aviation professional who decided to follow a long-time passion for software development. Aviation has taught me precision, responsibility, and teamwork, but these days my focus is all about code.
        <br /><br />
          To make the switch, I went through the 42 core curriculum at Hive Helsinki (2023–2025), where I built a solid foundation in C and C++ with hands-on projects. That low-level training gave me a strong programming mindset and the confidence to pick up new tools quickly.
        <br /><br />
          Right now I am working mostly with TypeScript, React, Node.js, Fastify and Python. I love tackling tricky problems, building full-stack applications, and learning whatever new tech a project throws at me.
        <br /><br />
          Please feel free to have a discussion with my trusted AI companion, Donna (created in Python), by clicking the chat icon at the bottom right corner. She can answer questions about my background, skills, and projects. 🐾  
        </p>
        <TechBadges />
      </div>
    </div>
  );
};
