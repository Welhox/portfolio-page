import { FaPython, FaReact, FaNodeJs, FaDocker, FaLinux, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiFastify, SiPrisma, SiSqlite, SiNginx, SiMake, SiTailwindcss } from "react-icons/si";
import { CgCPlusPlus } from "react-icons/cg";
import { VscCode } from "react-icons/vsc"; // placeholder for C

export const TechBadges = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-6 text-4xl text-primary">
      <VscCode title="C" />
      <CgCPlusPlus title="C++" />
      <FaPython title="Python" />
      <SiTypescript title="TypeScript" />
      <FaReact title="React" />
      <FaNodeJs title="Node.js" />
      <SiFastify title="Fastify" />
      <FaDocker title="Docker" />
      <FaLinux title="Linux" />
      <FaGitAlt title="Git" />
      <SiMake title="Makefile" />
      <SiNginx title="Nginx" />
      <SiPrisma title="Prisma" />
      <SiSqlite title="SQLite" />
      <SiTailwindcss title="TailwindCSS" />
    </div>
  );
};
