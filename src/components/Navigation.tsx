import { icons } from "../assets/icons";

export const Navigation = ({ mobile = false }: { mobile?: boolean }) => {
  // const itemClass = mobile
    // ? "flex items-center gap-3 px-2 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
    // : "";

  return (
    <>
      <a href='https://linkedin.com/in/caslun' target="_blank" rel="noopener noreferrer">
        <img src={icons.linkedin.dark} alt="LinkedIn" className="w-6 h-6 dark:hidden hover:opacity-80 hover:scale-110" />
        <img src={icons.linkedin.light} alt="LinkedIn" className="w-6 h-6 hidden dark:block hover:opacity-80 hover:scale-110" />
        {mobile && <span></span>}
      </a>
      <a href='https://github.com/Welhox' target="_blank" rel="noopener noreferrer">
        <img src={icons.github.light} alt="GitHub" className="w-6 h-6 dark:hidden hover:opacity-80 hover:scale-110" />
        <img src={icons.github.dark} alt="GitHub" className="w-6 h-6 hidden dark:block hover:opacity-80 hover:scale-110" />
        {mobile && <span></span>}
      </a>
      <a href='/resume.pdf' target="_blank" rel="noopener noreferrer">
        <img src={icons.resume.new} alt="Resume" className="w-6 h-6 filter invert dark:invert-0 hover:opacity-80 hover:scale-110" />
        {mobile && <span></span>}
      </a>
      <button onClick={() => document.documentElement.classList.toggle('dark')}>
        <img src={icons.mode.moon} alt="Toggle Dark Mode" className="w-6 h-6 filter invert dark:invert-0 hover:opacity-80 hover:scale-110 hover:cursor-pointer" />
        {mobile && <span></span>}
      </button>
    </>
  );
};
