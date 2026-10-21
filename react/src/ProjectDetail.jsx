import { webProjects, defaultSections } from "./Webprojects";
import { ProjectCard } from "./WebDesignPage";
import { Header, Contact, ExtLink, MockShot, rv, rise } from "./shared";

function Bar({ p }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <a
        href="#web-development"
        className="shrink-0 text-sm text-muted transition-colors hover:text-ink"
      >
        ← Back to Projects
      </a>
      <span
        aria-hidden="true"
        className="hidden h-0 flex-1 border-t-2 border-dotted border-line sm:block"
      />
      <span className="ml-auto flex shrink-0 gap-2">
        <ExtLink
          href={p.demo}
          className="rounded-lg bg-pastel-mint px-4 py-2 text-sm font-medium text-onpastel transition-all hover:-translate-y-0.5"
        >
          Live Demo
        </ExtLink>
        <ExtLink
          href={p.code}
          className="rounded-lg border border-line px-4 py-2 text-sm transition-colors hover:border-ink"
        >
          View Code ↗
        </ExtLink>
      </span>
    </div>
  );
}

function Meta({ items }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted sm:flex-nowrap sm:gap-x-4">
      {items.map((t, i) => (
        <span
          key={t}
          className={
            "flex items-center gap-4 " +
            (i < items.length - 1 ? "sm:flex-1" : "")
          }
        >
          <span className="whitespace-nowrap">{t}</span>
          {i < items.length - 1 && (
            <span
              aria-hidden="true"
              className="hidden h-0 flex-1 border-t-2 border-dotted border-line sm:block"
            />
          )}
        </span>
      ))}
    </div>
  );
}

function Laptop({ p }) {
  return (
    <div
      {...rv()}
      className="rounded-3xl border border-line bg-chip p-5 sm:p-12 lg:p-16"
    >
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-t-xl border-[6px] border-b-0 border-neutral-800 bg-white shadow-xl sm:border-[10px]">
          <div className="aspect-[16/10]">
            {p.img ? (
              <img
                src={p.img}
                alt={p.name}
                className="size-full object-cover object-top"
              />
            ) : (
              <MockShot variant={1} tone={p.tone} />
            )}
          </div>
        </div>
        <div className="-mx-[4%] h-2.5 rounded-b-2xl bg-neutral-700 sm:h-3.5" />
      </div>
    </div>
  );
}

export default function ProjectDetail({ slug, theme, onToggle }) {
  const p = webProjects.find((x) => x.slug === slug);
  if (!p) {
    return (
      <>
        <Header theme={theme} onToggle={onToggle} />
        <main className="gutter mx-auto max-w-5xl py-20">
          <p className="text-muted">Project not found.</p>
          <a
            href="#web-development"
            className="mt-4 inline-block underline underline-offset-4"
          >
            ← Back to Projects
          </a>
        </main>
        <Contact />
      </>
    );
  }
  const sections = p.sections || defaultSections;
  const others = webProjects.filter((x) => x.slug !== slug).slice(0, 2);
  return (
    <>
      <Header theme={theme} onToggle={onToggle} />
      <main className="gutter mx-auto max-w-5xl pb-[var(--section-gap)] pt-4 sm:pt-6">
        <Bar p={p} />
        <h1
          {...rise(0)}
          className="hero-rise mt-8 text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl"
        >
          {p.name}
        </h1>
        <Meta items={[p.client, p.duration, p.type]} />
        <div className="mt-8">
          <Laptop p={p} />
        </div>
        <p className="mt-10 text-base leading-relaxed text-muted sm:text-lg">
          {p.intro}
        </p>
        <div className="mt-10 space-y-9">
          {sections.map(([h, t]) => (
            <section key={h}>
              <h2 className="text-xl font-semibold tracking-tight">{h}</h2>
              <p className="mt-3 leading-relaxed text-muted">{t}</p>
            </section>
          ))}
        </div>
        <div className="mt-12">
          <Bar p={p} />
        </div>
        <h2 className="mt-16 text-2xl font-medium tracking-tight">
          Other Projects
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-10 md:grid-cols-2">
          {others.map((o, i) => (
            <ProjectCard key={o.slug} p={o} i={i} />
          ))}
        </ul>
        <div className="mt-12 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-0 flex-1 border-t-2 border-dotted border-line"
          />
          <a
            href="#web-development"
            className="rounded-lg border border-line px-4 py-2 text-sm transition-colors hover:border-ink"
          >
            View All Projects →
          </a>
        </div>
      </main>
      <Contact />
    </>
  );
}
