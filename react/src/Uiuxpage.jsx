import { uiuxProjects } from "./Uiuxprojects";
import { ProjectCard } from "./WebDesignPage";
import { Header, Contact, rise } from "./shared";

export default function UIUXPage({ theme, onToggle }) {
  return (
    <>
      <Header theme={theme} onToggle={onToggle} />
      <main className="gutter mx-auto max-w-5xl pb-[var(--section-gap)] pt-6 sm:pt-10">
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          ← Back to portfolio
        </a>
        <h1
          {...rise(0)}
          className="hero-rise mt-8 text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
        >
          UI/UX <span className="font-serif font-normal italic">Design</span>
        </h1>
        <p
          {...rise(1)}
          className="hero-rise mt-5 text-base text-muted sm:text-lg"
        >
          Designing meaningful digital experiences through user research,
          thoughtful interfaces, and usability testing.
        </p>
        <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {uiuxProjects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} i={i} />
          ))}
        </ul>
      </main>
      <Contact />
    </>
  );
}