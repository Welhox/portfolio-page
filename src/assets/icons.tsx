import linkedinLight from "./icons/linkedin_light.png";
import linkedinDark from "./icons/linkedin_dark.png";
import githubLight from "./icons/github_light.png";
import githubDark from "./icons/github_dark.png";
import resumeLight from "./icons/resume_light.png";
import resumeDark from "./icons/resume_dark.png";
import modeDark from "./icons/mode_black.png";
import modeLight from "./icons/mode_white.png";
import resumeNew from "./icons/resume.png";
import modeMoon from "./icons/moon.png";

export const icons = {
  linkedin: {
    light: linkedinLight,
    dark: linkedinDark,
  },
  github: {
    light: githubLight,
    dark: githubDark,
  },
  resume: {
    light: resumeLight,
    dark: resumeDark,
    new: resumeNew,
  },
  mode: {
    light: modeLight,
    dark: modeDark,
    moon: modeMoon,
  },
} as const;
