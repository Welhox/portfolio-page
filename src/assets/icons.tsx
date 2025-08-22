import linkedinLight from "./icons/linkedin_light.png";
import linkedinDark from "./icons/linkedin_dark.png";
import githubLight from "./icons/github_light.png";
import githubDark from "./icons/github_dark.png";
import resumeLight from "./icons/resume_light.png";
import resumeDark from "./icons/resume_dark.png";

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
  },
} as const;

//This is for safer use of the icons, as wrongly spelled name would trigger a TypeScript error
export type IconName = keyof typeof icons;