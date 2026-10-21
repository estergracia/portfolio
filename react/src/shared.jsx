import { useRef, useState } from "react";

export const profile = {
  name: "Esther Gracia Claudya",
  status: "Available to work",
  heroPhotos: {
    portrait: { src: "/asset/photo.jpg", alt: "Portrait of Esther", label: "you", tone: "butter" },
    desk: { src: "/asset/desk.png", alt: "My desk and design setup", label: "desk setup", tone: "sky" },
    work: { src: "/asset/work.png", alt: "Me presenting a project", label: "at work", tone: "mint" },
  },
  email: "esterstdio@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/estherclaudya/" },
    { label: "Medium", href: "https://medium.com" },
    { label: "Github", href: "https://github.com/estergracia" },
  ],
};

export const toneClass = { sky: "bg-pastel-sky", mint: "bg-pastel-mint", butter: "bg-pastel-butter", blush: "bg-pastel-blush" };

export const tones = ["sky", "mint", "butter", "blush"];

export const rv = (i = 0) => ({ "data-reveal": "", style: { "--d": i * 90 + "ms" } });

export const rise = (i = 0) => ({ style: { "--d": 120 + i * 110 + "ms" } });

export function ExtLink({ href, children, className = "", ...rest }) {
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={className} {...rest}>
      {children}
    </a>
  );
}

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface transition-colors hover:border-ink"
    >
      <span className="transition-transform duration-500 group-hover:rotate-[30deg]">
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </span>
    </button>
  );
}

export function Header({ theme, onToggle }) {
  return (
    <header className="gutter mx-auto flex max-w-5xl items-center justify-between gap-4 py-4 sm:py-6">
      <nav aria-label="Main" className="flex min-w-0 items-center text-sm sm:text-[15px]">
        <a href="#top" className="flex min-w-0 items-center gap-2 font-semibold">
          <span className="size-5 shrink-0 rounded bg-pastel-sky" aria-hidden="true" />
          <span className="truncate">{profile.name}</span>
        </a>
      </nav>
      <ThemeToggle theme={theme} onToggle={onToggle} />
    </header>
  );
}

export function MockShot({ variant, tone }) {
  const dot = "size-1.5 rounded-full bg-black/15";
  if (variant === 1) {
    return (
      <span className="flex size-full flex-col gap-2 p-2.5">
        <span className="flex items-center gap-1"><span className={dot} /><span className={dot} /><span className={dot} /></span>
        <span className="grid flex-1 grid-cols-3 gap-1.5">
          {["sky", "mint", "butter", "blush", tone, "sky"].map((t, k) => (
            <span key={k} className={"rounded " + toneClass[t]} />
          ))}
        </span>
      </span>
    );
  }
  if (variant === 2) {
    return (
      <span className="flex size-full flex-col gap-2 bg-neutral-900 p-2.5">
        <span className={"h-3 w-1/3 rounded " + toneClass[tone]} />
        <span className="h-1.5 w-4/5 rounded bg-white/25" />
        <span className="h-1.5 w-3/5 rounded bg-white/15" />
        <span className="mt-auto h-10 rounded-md bg-white/10" />
      </span>
    );
  }
  return (
    <span className="flex size-full flex-col gap-2 p-2.5">
      <span className="flex items-center gap-1"><span className={dot} /><span className={dot} /><span className={dot} /></span>
      <span className={"h-12 rounded-md " + toneClass[tone]} />
      <span className="h-1.5 w-3/4 rounded bg-black/10" />
      <span className="h-1.5 w-1/2 rounded bg-black/10" />
      <span className="mt-auto grid grid-cols-3 gap-1.5">
        <span className="h-8 rounded bg-black/10" />
        <span className="h-8 rounded bg-black/10" />
        <span className="h-8 rounded bg-black/10" />
      </span>
    </span>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const emailRef = useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const range = document.createRange();
      range.selectNodeContents(emailRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t-2 border-dashed border-line">
      <div className="gutter mx-auto max-w-5xl pb-10 pt-[var(--section-gap)]">
        <div {...rv()}>
          <h2 id="contact-title" className="font-serif text-4xl leading-none tracking-tight sm:text-6xl">
            Let's make something <em className="font-normal italic">useful</em>
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span ref={emailRef} className="break-all text-2xl font-medium tracking-tight sm:text-4xl">
              {profile.email}
            </span>
            <button
              type="button"
              onClick={copy}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:opacity-85"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <ExtLink href={s.href} className="underline underline-offset-4 transition-colors hover:text-muted">
                  {s.label} ↗
                </ExtLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} {profile.name}.</p>
          <a
            href="#top"
            aria-label="Back to top"
            className="grid size-11 place-items-center rounded-full border border-line text-ink transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-surface"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5m0 0l-6 6m6-6l6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
