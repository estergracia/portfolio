/* Each card opens the case study PDF on Google Drive (href).
   img: cover image in /public. Add more case studies by copying one object. */
const CASE_STUDY_PDF =
  "https://drive.google.com/file/d/18Zy354M5Kj2D4QDhR_XvlEUXoQch96Yw/view?usp=sharing";

export const uiuxProjects = [
  {
    slug: "case-study-1",
    name: "Flo", // TODO: replace with the real project name
    type: "UI/UX Design",
    year: "2026", // TODO: confirm year
    tools: ["Figma", "User Research", "Prototyping"], // TODO: adjust to the tools you used
    tone: "sky",
    img: "/docu/flo.png",
    href: CASE_STUDY_PDF,
  },
];