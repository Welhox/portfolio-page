import { icons } from "../assets/icons";
import type { IconName } from "../assets/icons";

export const Navigation = () => {
  return (
    <>
      <a href='https://linkedin.com/in/caslun' target="_blank" rel="noopener noreferrer">
        <img src={icons.linkedin.dark} alt="LinkedIn" className="w-6 h-6 dark:hidden" />
        <img src={icons.linkedin.light} alt="LinkedIn" className="w-6 h-6 hidden dark:block" />
      </a>
      <a href='https://github.com/Welhox' target="_blank" rel="noopener noreferrer">
        <img src={icons.github.light} alt="GitHub" className="w-6 h-6 dark:hidden" />
        <img src={icons.github.dark} alt="GitHub" className="w-6 h-6 hidden dark:block" />
      </a>
      <a href='/resume.pdf' target="_blank" rel="noopener noreferrer">
        <img src={icons.resume.light} alt="Resume" className="w-6 h-6 dark:hidden" />
        <img src={icons.resume.dark} alt="Resume" className="w-6 h-6 hidden dark:block" />
      </a>
    </>
  );
};
