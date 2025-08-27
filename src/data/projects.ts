
import type { Project } from "../types/Project.ts";

export const projects: Project[] = [
    {
        id: "transcendence",
        name: "Transcendence",
        description:
        "Full‑stack Pong platform: Fastify + Prisma/SQLite backend, React/TS frontend, Nginx reverse proxy, Docker Compose. Features JWT auth, MFA via OTP, tournaments, accessibility, i18n.",
        // image: "/assets/projects/transcendence.jpg",
        image: "/assets/me.jpg",
        repoUrl: "https://github.com/clundber/Transcendence", // update if different
        websiteUrl: undefined,
        tags: ["Fastify", "Prisma", "SQLite", "React", "TypeScript", "Docker", "Nginx"],
    },
    {
        id: "webserv",
        name: "Webserv",
        description:
        "HTTP/1.1 server in C++ with epoll, CGI support, config parsing, static file serving, and robust error handling.",
        image: "/assets/projects/webserv.jpg",
        repoUrl: "https://github.com/clundber/Webserv",
        tags: ["C++", "HTTP/1.1", "CGI", "epoll"],
    },
    {
        id: "minishell",
        name: "Minishell",
        description:
        "Bash‑style shell in C: parsing, pipes, redirections, built‑ins, environment handling, signals.",
        image: "/assets/projects/minishell.jpg",
        repoUrl: "https://github.com/clundber/Minishell",
        tags: ["C", "Shell", "Parsing"],
    },
    {
        id: "cube3d",
        name: "Cube3D",
        description:
        "Raycaster inspired by Wolfenstein 3D: textures, minimap, collision, sprites. Built with C and MLX.",
        image: "/assets/projects/cube3d.jpg",
        repoUrl: "https://github.com/clundber/Cub3D",
        tags: ["C", "Graphics", "Raycaster"],
    },
];