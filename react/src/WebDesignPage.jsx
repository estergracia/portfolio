import { useState } from "react";
import { webProjects } from "./Webprojects";
import {
  Header,
  Contact,
  ExtLink,
  MockShot,
  rv,
  rise,
  toneClass,
} from "./shared";

export function ProjectCard({ p, i }) {
  return (
    <li {...rv(i % 2)}>
      <ExtLink href={"#project-" + p.slug} className="group block">
        <span
          className={
            "block aspect-[4/3] overflow-hidden rounded-2xl border border-line p-5 transition-transform duration-500 group-hover:-translate-y-1 sm:p-6 " +
            toneClass[p.tone]
          }
        >
          <span className="block size-full overflow-hidden rounded-lg bg-white shadow-[0_14px_30px_-16px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.03]">
            {p.img ? (
              <img
                src={p.img}
                alt=""
                className="size-full object-cover object-top"
              />
            ) : (
              <MockShot variant={i % 3} tone={p.tone} />
            )}
          </span>
        </span>
        <span className="mt-4 flex items-start justify-between gap-4">
          <span className="min-w-0">
            <span className="block text-lg font-medium tracking-tight sm:text-xl">
              {p.name}
            </span>
            <span className="mt-1 block text-sm text-muted">
              {p.type} · {p.year}
            </span>
            <span className="mt-3 flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bg"
          >
            ↗
          </span>
        </span>
      </ExtLink>
    </li>
  );
}

export default function WebDesignPage({ theme, onToggle }) {
  const [filter, setFilter] = useState("All");
  const list =
    filter === "All"
      ? webProjects
      : webProjects.filter((p) => p.type === filter);
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
          Web Design{" "}
          <span className="font-serif font-normal italic">& Frontend</span>
        </h1>
        <p
          {...rise(1)}
          className="hero-rise mt-5 text-base text-muted sm:text-lg"
        >
          Bridging design and technology to build responsive, functional, and engaging websites.
        </p>
        {/* <div
          {...rise(2)}
          className="hero-rise mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects"
        >
          {["All", "Web Design", "Frontend"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={
                "rounded-full border px-4 py-2 text-sm transition-colors " +
                (filter === f
                  ? "border-ink bg-ink text-bg"
                  : "border-line text-muted hover:border-ink hover:text-ink")
              }
            >
              {f}
            </button>
          ))}
        </div> */}
        <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {list.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </ul>
      </main>
      <Contact />
    </>
  );
}
