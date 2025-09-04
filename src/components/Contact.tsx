
export const Contact = () => {
  return (
    <section>
        <h2 className="flex items-center gap-4 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          <span className="flex-1 h-px bg-slate-300"></span>
          <span className="px-4">Contact</span>
          <span className="flex-1 h-px bg-slate-300"></span>
        </h2>
        <div className="flex items-center justify-center gap-8 mb-4">
            <img src="/icons/email.png" alt="email"
                className="w-10 h-10 md:w-20 md:h-20 filter dark:invert hover:opacity-80 hover:scale-110" />
            <a href="mailto:casimir.lundberg@gmail.com"
                className="text-primary2 md:text-4xl text-lg hover:scale-110 transform transition-transform inline-block">casimir.lundberg@gmail.com</a>
        </div>
        <div className="flex items-center justify-center gap-8 mb-4">
            <img src="/icons/linkedin_light.png" alt="linkedin"
                className="w-10 h-10 md:w-20 md:h-20 filter dark:invert hover:opacity-80 hover:scale-110" />
            <a href="https://linkedin.com/in/caslun" target="_blank" rel="noopener noreferrer"
                className="text-primary2 md:text-4xl text-lg hover:scale-110 transform transition-transform inline-block">
                linkedin.com/in/caslun&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
        </div>
    </section>
  );
};