import { useEffect, useRef, useState } from "react";
import { profile, toneClass, tones, rv, rise, ExtLink, Header, MockShot, Contact } from "./shared";
import WebDesignPage from "./WebDesignPage";
import ProjectDetail from "./ProjectDetail";
import UIUXPage from "./UIUXPage";


/* A string is plain text, { b } is bold, { t, href } is a link. */
const aboutParagraphs = [
  [
    "Hey, I’m a ",
    { b: "Computer Science grad" },
    " exploring my first career journey in ",
    { b: "Web Development, Frontend Development, and UI/UX Design" },
    ". 🎨💻 I love bringing ideas to life through code and design, creating digital experiences that feel ",
    { b: "intuitive, functional, and enjoyable to use" },
    ". I’m always excited to try new creative things, learn along the way, and collaborate with people who inspire me. Someday, I hope to grow into a ",
    { b: "Product Designer abroad" },
    ". Outside of work, I’m an introvert who still loves meeting new people, a big fan of sweet treats, and a girl dreaming of seeing a BTS concert, with a travel wishlist that includes Japan and Vietnam. 💜",
  ],
];

const stack = [
  { n: "Figma", a: "Fg", logo: "/logo/figma.png" },
  { n: "Framer", a: "Fr", logo: "/logo/framer.png" },
  // { n: "Motion graphics", a: "Mo", logo: "" },
  { n: "Capcut", a: "Cc", logo: "/logo/capcut.png" },
  { n: "Canva", a: "Cn", logo: "/logo/canva.png" },
  { n: "Blender", a: "3D", logo: "/logo/blender.png" },
  { n: "HTML", a: "Ht", logo: "/logo/html.png" },
  { n: "CSS", a: "Cs", logo: "/logo/css.png" },
  { n: "Phyton", a: "Py", logo: "/logo/phyton.png" },
  { n: "React.js", a: "Re", logo: "/logo/react.png" },
  { n: "Tailwind CSS", a: "Tw", logo: "/logo/tailwind.png" },
  { n: "Firebase", a: "Fb", logo: "/logo/firebase.png" },
  { n: "Supabase", a: "Sb", logo: "/logo/supabase.png" },
  { n: "Notion", a: "Na", logo: "/logo/notion.png" },
  { n: "Trello", a: "Tre", logo: "/logo/trello.png" },
  { n: "Coda", a: "Co", logo: "/logo/coda.png" },
];

const experience = [
  { mark: "IC", logo: "/asset/imilkom.png", tone: "sky", title: "IT CAMP — IMILKOM USU", role: "UI/UX Design Mentor", when: "Mar – May 2026" },
  { mark: "SE", logo: "/asset/satu.png", tone: "butter", title: "SatuEdu Foundation", role: "UI/UX Design Staff", when: "Feb 2025 – Jan 2026" },
  { mark: "KTM", logo: "/asset/bpn.png", tone: "mint", title: "Kantor Pertanahan Kota Medan", role: "IT Staff Intern", when: "Mar – May 2025" },
];

const caseStudies = [
  { name: "UI/UX Design", desc: "Designing meaningful digital experiences through user research, thoughtful interfaces, and usability testing.", tone: "sky", href: "#uiux", shots: [] },
  // { name: "Graphic Design", desc: "Exploring visual identities, branding, and creative visuals that bring ideas to life.", tone: "butter", href: "#graphic-design", shots: [] },
  { name: "Web Design & Frontend", desc: "Bridging design and technology to build responsive, functional, and engaging websites.", tone: "mint", href: "#web-development", shots: [] },
  // { name: "Motion Graphics", desc: "Experimenting with movement, animation, and visual storytelling to make designs more expressive.", tone: "blush", href: "#motion-graphics", shots: [] },
];



function useScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let started = false;
    let io;
    const start = () => {
      if (started) return;
      started = true;
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target;
              el.classList.add("is-in");
              io.unobserve(el);
              setTimeout(() => el.classList.remove("reveal", "is-in"), 1500);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
      );
      const vh = window.innerHeight;
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top > vh * 0.92) {
          el.classList.add("reveal");
          io.observe(el);
        }
      });
    };
    const events = ["scroll", "wheel", "touchmove", "keydown"];
    events.forEach((ev) => window.addEventListener(ev, start, { passive: true }));
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, start));
      if (io) io.disconnect();
    };
  }, []);
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const attr = document.documentElement.getAttribute("data-theme");
      if (attr === "dark" || attr === "light") return attr;
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {}
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") document.documentElement.setAttribute("data-theme", saved);
    } catch (e) {}
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  };
  return [theme, toggle];
}


function SectionLabel({ id, children, aside }) {
  return (
    <div className="mb-[var(--title-gap)] flex flex-wrap items-center justify-between gap-4" {...rv()}>
      <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">{children}</h2>
      {aside}
    </div>
  );
}



/* All three hero photos share the same wide size */
function InlinePhoto({ photo, square = false, className = "", delay = 0 }) {
  return (
    <span
      role="img"
      aria-label={photo.alt}
      style={{ "--d": delay + "ms" }}
      className={
        (square ? "h-[1.2em] w-[1.2em] rounded-[0.18em] " : "h-[0.9em] w-[1.85em] rounded-[0.14em] ") + "pop-in inline-block overflow-hidden align-[-0.09em] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out hover:scale-[1.06] hover:-rotate-2 " +
        className
      }
    >
      {photo.src ? (
        <img src={photo.src} alt="" className="size-full object-cover" />
      ) : (
        <span className={"flex size-full items-end p-[0.1em] " + toneClass[photo.tone]}>
          <span className="rounded bg-white/55 px-1.5 text-[11px] font-medium leading-5 tracking-normal text-onpastel sm:text-xs">
            {photo.label}
          </span>
        </span>
      )}
    </span>
  );
}

function Hero() {
  const ph = profile.heroPhotos;
  return (
    <section id="top" className="gutter mx-auto max-w-5xl pb-[var(--section-gap)] pt-10 sm:pt-16 lg:pt-20">
      <p
        {...rise(0)}
        className="hero-rise inline-flex items-center gap-3 rounded-full bg-pastel-mint px-4 py-2 text-[13px] font-medium text-onpastel"
      >
        <span className="relative flex size-2.5" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-onpastel opacity-60" />
          <span className="relative inline-flex size-2.5 animate-pulse rounded-full bg-onpastel" />
        </span>
        {profile.status}
      </p>

      <h1
        {...rise(1)}
        className="hero-rise mt-6 text-[2.1rem] font-medium leading-[1.15] tracking-tight min-[400px]:text-[2.6rem] sm:mt-8 sm:text-6xl sm:leading-[1.1] lg:text-7xl"
      >
        <span className="mb-5 block text-[0.65em] font-normal leading-snug tracking-normal text-muted">
          Hiya <span className="wave" aria-hidden="true">👋</span> I’m Esther
          <span className="sr-only"> Gracia Claudya.</span>{" "}
          <InlinePhoto photo={ph.portrait} square className="rotate-3" delay={700} />
        </span>
        Exploring my journey in{" "}
        <span className="font-serif font-normal italic">development</span>{" "}
        <InlinePhoto photo={ph.desk} delay={850} /> and{" "}
        <span className="font-serif font-normal italic">creative things</span>{" "}
        <InlinePhoto photo={ph.work} delay={1000} />{" "}
        <span aria-hidden="true">✨</span>
      </h1>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="gutter mx-auto max-w-5xl scroll-mt-8 pb-[var(--section-gap)]">
      <SectionLabel id="about-title">About me</SectionLabel>
      <div className="space-y-6" {...rv()}>
        {aboutParagraphs.map((parts, i) => (
          <p key={i} className="text-base leading-relaxed text-muted sm:text-lg">
            {parts.map((part, j) =>
              typeof part === "string" ? (
                <span key={j}>{part}</span>
              ) : part.b ? (
                <strong key={j} className="font-semibold text-ink">{part.b}</strong>
              ) : (
                <ExtLink key={j} href={part.href} className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">
                  {part.t}
                </ExtLink>
              )
            )}
          </p>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  const [sel, setSel] = useState(-1);
  const rowRef = useRef(null);
  const timer = useRef(null);
  const input = useRef("");

  useEffect(() => {
    const onDown = (e) => {
      if (rowRef.current && !rowRef.current.contains(e.target)) setSel(-1);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setSel(-1);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer.current);
    };
  }, []);

  const aim = (i, e) => {
    if (e.pointerType === "touch") return;
    clearTimeout(timer.current);
    if (sel !== -1) setSel(i);
    else timer.current = setTimeout(() => setSel(i), 220);
  };
  const leaveRow = (e) => {
    if (e.pointerType === "touch") return;
    clearTimeout(timer.current);
    setSel(-1);
  };

  return (
    <section id="stack" aria-labelledby="stack-title" className="gutter mx-auto max-w-5xl scroll-mt-8 pb-[var(--section-gap)]">
      <SectionLabel id="stack-title">Stack</SectionLabel>
      <div ref={rowRef} {...rv()} onPointerLeave={leaveRow} onKeyDown={() => (input.current = "")}>
        <ul className="flex flex-wrap gap-3 sm:gap-4">
          {stack.map((it, i) => {
            const on = sel === i;
            const dim = sel !== -1 && !on;
            return (
              <li key={it.n} className="relative">
                <span
                  aria-hidden="true"
                  className={
                    "pointer-events-none absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2 whitespace-nowrap rounded-xl bg-ink px-4 py-2.5 font-mono text-sm text-bg shadow-lg transition-all duration-300 " +
                    (on ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-90 opacity-0")
                  }
                >
                  {it.n}
                  <span aria-hidden="true" className="absolute -top-1 left-1/2 -ml-1 size-2 rotate-45 bg-ink" />
                </span>
                <button
                  type="button"
                  aria-label={it.n}
                  onPointerEnter={(e) => aim(i, e)}
                  onPointerLeave={() => clearTimeout(timer.current)}
                  onPointerDown={(e) => (input.current = e.pointerType)}
                  onFocus={() => input.current === "" && setSel(i)}
                  onBlur={() => input.current === "" && setSel(-1)}
                  onClick={() => input.current === "touch" && setSel(on ? -1 : i)}
                  className={
                    "grid size-14 place-items-center overflow-hidden rounded-2xl text-lg font-bold text-onpastel transition-all duration-300 sm:size-[4.5rem] sm:text-xl " +
                    (it.logo ? "bg-chip " : toneClass[tones[i % tones.length]] + " ") +
                    (on ? "scale-110 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)]" : dim ? "scale-95 opacity-25" : "")
                  }
                >
                  {it.logo ? <img src={it.logo} alt="" className="size-full object-contain p-3" /> : it.a}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="gutter mx-auto max-w-5xl scroll-mt-8 pb-[var(--section-gap)]">
      <SectionLabel
        id="exp-title"
        aside={
          <ExtLink
            href="https://drive.google.com/file/d/1UHwAQR0DzsipULX2zvQ5jqe-oRKqRYWa/view?usp=sharing"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 text-sm font-medium uppercase tracking-[0.08em] transition-colors hover:border-ink hover:bg-surface"
          >
            Resume
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
          </ExtLink>
        }
      >
        Where I have been
      </SectionLabel>

      {/* one column on every screen size */}
      <ul className="grid grid-cols-1 gap-4">
        {experience.map((e, i) => (
          <li
            key={e.title}
            {...rv(i)}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] sm:flex-nowrap"
          >
            <span
              aria-hidden="true"
              className={
                "grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl text-lg font-bold text-onpastel sm:size-[4.5rem] sm:text-xl " +
                (e.logo ? "bg-chip" : toneClass[e.tone])
              }
            >
              {e.logo ? <img src={e.logo} alt="" className="size-full object-cover" /> : e.mark}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-medium leading-snug sm:text-lg">{e.title}</h3>
              <p className="text-sm text-muted sm:text-base">{e.role}</p>
            </div>
            <p className="w-full pl-[4.5rem] text-sm text-muted sm:w-auto sm:shrink-0 sm:self-center sm:pl-0 sm:text-base">
              {e.when}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}


const sheetClosed = ["left-[8%] w-[26%] -rotate-3", "left-[24%] w-[26%] rotate-1", "left-[42%] w-[36%] rotate-2"];
const sheetHover = [
  "group-hover:-translate-y-4 group-hover:-rotate-6",
  "group-hover:-translate-y-6",
  "group-hover:-translate-y-5 group-hover:rotate-3",
];
const sheetOpen = [
  "left-[3%] w-[30%] -rotate-6 -translate-y-16",
  "left-[34%] w-[30%] -rotate-1 -translate-y-[4.5rem]",
  "left-[66%] w-[31%] rotate-[5deg] -translate-y-16",
];

function Sheet({ src, variant, tone, open, i }) {
  return (
    <span
      aria-hidden="true"
      style={{ transitionDelay: open ? i * 70 + "ms" : "0ms" }}
      className={
        "absolute top-[4.25rem] h-40 origin-bottom overflow-hidden rounded-lg bg-white shadow-[0_8px_22px_-10px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] " +
        (open ? sheetOpen[i] : sheetClosed[i] + " " + sheetHover[i])
      }
    >
      {src ? <img src={src} alt="" className="size-full object-cover object-top" /> : <MockShot variant={variant} tone={tone} />}
    </span>
  );
}

function Folder({ c, i }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const timer = useRef(null);
  const input = useRef("");

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const enter = (e) => {
    if (e.pointerType === "touch") return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), 250);
  };
  const leave = (e) => {
    if (e.pointerType === "touch") return;
    clearTimeout(timer.current);
    setOpen(false);
  };

  return (
    <li {...rv(i % 2)}>
      <div
        ref={boxRef}
        className="group relative h-[20rem] sm:h-[22rem]"
        onPointerEnter={enter}
        onPointerLeave={leave}
        onKeyDown={() => (input.current = "")}
      >
        <span aria-hidden="true" className="absolute left-0 top-0 h-24 w-[46%] rounded-t-[2rem] bg-chip" />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[4.25rem] rounded-[2rem] rounded-tl-none bg-chip" />

        {[0, 1, 2].map((k) => (
          <Sheet
            key={k}
            i={k}
            open={open}
            src={c.shots && c.shots[k]}
            variant={(i + k) % 3}
            tone={k === 2 ? c.tone : tones[(i + k) % tones.length]}
          />
        ))}

        <span
          className={
            "absolute inset-x-0 bottom-0 top-[7.5rem] overflow-hidden rounded-[2rem] border border-line bg-glass shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] " +
            (open ? "translate-y-5 -rotate-[1.5deg]" : "group-hover:translate-y-1")
          }
        >
          <span
            aria-hidden="true"
            className={
              "absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-[62%] rounded-full opacity-60 blur-2xl transition-transform duration-700 " +
              toneClass[c.tone] + " " + (open ? "scale-125" : "group-hover:scale-125")
            }
          />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
            <span className="min-w-0">
              <span className="block text-lg font-medium tracking-tight sm:text-xl">{c.name}</span>
              <span className="block text-sm text-muted sm:text-base">{c.desc}</span>
            </span>
            <span
              aria-hidden="true"
              className={
                "shrink-0 text-2xl leading-none text-muted transition-all duration-500 " +
                (open ? "rotate-90 opacity-0" : "group-hover:text-ink")
              }
            >
              +
            </span>
          </span>
        </span>

        <span
          aria-hidden="true"
          className={
            "pointer-events-none absolute bottom-0 right-5 z-20 grid size-11 place-items-center rounded-full bg-ink text-lg text-bg transition-all duration-500 " +
            (open ? "translate-y-0 scale-100 opacity-100 delay-300" : "translate-y-2 scale-75 opacity-0")
          }
        >
          ↗
        </span>

        <ExtLink
          href={c.href}
          aria-label={"Open case study: " + c.name}
          onPointerDown={(e) => (input.current = e.pointerType)}
          onFocus={() => input.current === "" && setOpen(true)}
          onBlur={() => input.current === "" && setOpen(false)}
          onClick={(e) => {
            if (input.current === "touch" && !open) {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className="absolute inset-0 z-10 rounded-[2rem]"
        />
      </div>
    </li>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="gutter mx-auto max-w-5xl scroll-mt-8 pb-[var(--section-gap)]">
      <SectionLabel id="work-title">Selected work</SectionLabel>
      <p className="max-w-[52ch] text-base text-muted sm:text-lg" {...rv()}>
        Longer stories that show{" "}
        <span className="border-b-2 border-dashed border-muted text-ink">how I think</span> about design.
      </p>
      <ul className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {caseStudies.map((c, i) => (
          <Folder key={c.name} c={c} i={i} />
        ))}
      </ul>
    </section>
  );
}


function getRoute() {
  const h = window.location.hash.slice(1);
  if (h === "web-development") return { page: "web" };
  if (h === "uiux") return { page: "uiux" };
  if (h.startsWith("project-")) return { page: "project", slug: h.slice(8) };
  return { page: "home" };
}

export default function App() {
  const [theme, toggle] = useTheme();
  const [route, setRoute] = useState(getRoute);
  useScrollReveal();
  useEffect(() => {
    const on = () => setRoute(getRoute());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.page, route.slug]);
  return (
    <div style={{ "--section-gap": "1.5rem" }}>
      {route.page === "web" ? (
        <WebDesignPage theme={theme} onToggle={toggle} />
      ) : route.page === "uiux" ? (
        <UIUXPage theme={theme} onToggle={toggle} />
      ) : route.page === "project" ? (
        <ProjectDetail slug={route.slug} theme={theme} onToggle={toggle} />
      ) : (
        <>
          <Header theme={theme} onToggle={toggle} />
          <main>
            <Hero />
            <About />
            <Stack />
            <Experience />
            <Work />
          </main>
          <Contact />
        </>
      )}
    </div>
  );
}