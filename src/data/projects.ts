import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "WebPONG",
    name: "WebPONG",
    info: "Full‑stack Pong platform (Fastify/Prisma/SQLite + React/TS, JWT + OTP MFA)",
    image: "/project_pictures/pong.gif",
    repoUrl: "https://github.com/Welhox/WebPONG",
  },
  {
    id: "MiniBash",
    name: "MiniBash",
    info: "Bash‑style shell in C: pipes, redirects, built‑ins, signals",
    image: "/project_pictures/Minishell-demo.gif",
    repoUrl: "https://github.com/welhox/MiniBash",
  },
  {
    id: "webserv",
    name: "Webserv",
    info: "C++ HTTP/1.1 server with epoll and CGI support",
    image: "/project_pictures/webserv.png",
    repoUrl: "https://github.com/Welhox/Webserv",
  },
  {
    id: "cub3d",
    name: "Cub3D",
    info: "Wolfenstein‑style raycaster in C with textures and sprites",
    image: "/project_pictures/cub3d.gif",
    repoUrl: "https://github.com/Welhox/cub3d",
  },
  {
    id: "Philosophers",
    name: "Philosophers",
    info: "Dining philosophers problem in C with pthreads",
    image: "/project_pictures/philo.png",
    repoUrl: "https://github.com/welhox/philosophers",
  },
  {
    id: "Bespoke_C_library",
    name: "Bespoke C library",
    info: "Bespoke C library implementation",
    image: "/project_pictures/Bespoke_C.png",
    repoUrl: "https://github.com/welhox/Bespoke_c_library",
  },
];
