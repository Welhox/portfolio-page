import me from "../assets/Me.jpg";
import { TechBadges } from "./TechBadges";

export const Bio = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center items-center gap-8">
      <img
        src={me}
        alt="Picture of me"
        className="rounded-md shadow-lg object-cover
               w-72 md:w-80 lg:w-96 h-auto shrink-0 md:mt-0 mt-20"
      />
      <div className="flex-1">
        <h2 className="text-5xl font-semibold mb-2 md:mt-20 text-center">
          Hej/Terve/Hello!
        </h2>
        <p className="text-sm text-gray-500 mb-4 text-center font-mono">
          01001000 01100101 01101100 01101100 01101111
        </p>
        <p className="mt-10 text-xl text-left">
          I am Casimir "Casi" Lundberg, a full-stack developer who brings precision and problem-solving from aviation to code. After years in the industry, I followed a long-time passion and made the leap into software development.
        <br /><br />
          I went through the 42 core curriculum at Hive Helsinki (2023–2025), where I built everything from scratch: memory allocators, shell implementations, and web servers. That foundation in C and C++ taught me how software actually works under the hood and gave me the confidence to pick up any new technology a project demands.
        <br /><br />
          These days I work with TypeScript, React, Node.js, Fastify, Python, and C/C++. I enjoy diving into complex problems, whether that's optimizing performance, debugging tricky issues, or building features from the ground up. There's nothing quite like the satisfaction of finally tracking down that elusive bug or solving a problem you've been wrestling with for hours.
        <br /><br />
          Want to know more? Meet Donna, my Python-powered AI assistant and one of my featured projects below. She's not just a chatbot; she has live access to my GitHub repositories through the API and comprehensive knowledge of my background and skills. Ask her about specific projects, dive into my code, or get details about my experience. This feline AI companion is available 24/7 via the chat icon at the bottom right. 🐾 Or feel free to explore my work below and reach out directly.
        </p>
        <TechBadges />
      </div>
    </div>
  );
};
