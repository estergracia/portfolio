/* Each card opens the case study PDF on Google Drive (href).
   img: cover image in /public. Add more case studies by copying one object. */
const CASE_STUDY_PDF =
  "https://www.figma.com/design/Q9GRExI4WVCqmYI6VE24qK/final?node-id=2002-1464&t=4WFPYJcCozo5YJiB-1";

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