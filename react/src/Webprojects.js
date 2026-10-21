/* slug: used in the link (#project-<slug>). img: screenshot in /public, e.g. "/work/web1.png".
   sections: optional [heading, text] pairs per project; otherwise defaultSections is used. */
const base = { img: "", demo: "#", code: "#", client: "Personal Project", duration: "4 weeks" };

export const webProjects = [
  {
    ...base,
    slug: "financeflow",
    img: "/docu/financeflow.png",
    name: "FinanceFlow",
    type: "Academic Project",
    year: "2025",
    tools: ["React.js", "Tailwind CSS", "Firebase"],
    tone: "mint",
    demo: "https://finance-f1af9.web.app/",
    code: "https://github.com/nirmalaaa/Financial-Tracker",
    client: "Interactive Media Systems Course, Universitas Sumatera Utara",
    duration: "2-3 weeks",
    intro:
      "FinanceFlow is a gamification-based personal finance web app that turns expense tracking into a game. Daily streaks, levels, EXP, virtual coins, and daily quests keep users engaged, while interactive charts and AI-powered tips help them understand their spending habits. Built as a four-person team project for the Interactive Media Systems course.",
    sections: [
      ["Overview", "Most finance apps are passive: you log a transaction and nothing happens. FinanceFlow responds to every action in real time with progress bars, level-up animations, and small sound cues. The goal was to raise financial literacy and build a saving habit, especially for students and young users in Indonesia."],
      ["My Approach", "We started from five peer-reviewed papers on digital financial literacy and gamification, plus inspiration from Habitica and Play Money Magic. From there we defined a layered architecture, designed the user flow (Login, Onboarding, Dashboard, Transactions, Goals, Quests, Rewards, Level Up), and built the app as a team."],
      ["Vision and Innovation", "The idea is to make money management feel like playing a game. Streaks reward consistency, quests reward healthy habits, and EXP and coins give each financial action a visible payoff. Audio and animation feedback marks success or warnings."],
      ["Identifying Unique Challenges", "The system had to keep progress in sync across pages, calculate rewards and penalties correctly, and manage streaks reliably. It also needed to give useful insight without overwhelming new users with numbers."],
      ["Resolving Complex Problems", "We separated the system into four layers: User Interface, Application State, Business Logic (rewards, streaks, penalties), and Analytics & AI. Firebase handled authentication, Cloud Firestore data, and hosting. For automatic categorization, a TF-IDF and Logistic Regression pipeline predicts the category of a transaction (Food, Transport, Bills, and more) from its description."],
      ["User-Centric Design", "We ran user testing with 12 respondents (students, employees, and freelancers). They found the interface and dashboard attractive and easy to understand, and said the gamification motivated them to log more regularly. They asked for a clearer add-transaction flow, an onboarding tutorial, explanations for icons and analytics scores, and more actionable insights."],
      ["Detailed Pages and Features", "Income and expense tracking with categories, saving goals with visual progress, daily and weekly quests, a level and EXP system, a streak system, a finance dashboard with interactive line, bar, and pie charts, and AI-powered financial insights."],
      ["Accessibility and Optimization", "Built as a responsive single-page app with React Router and Vite for fast hot reload and builds. Reusable components keep the UI consistent, Firebase Hosting provides automatic SSL and a global CDN, and the Vibration API adds haptic feedback on supported devices."],
      ["Conclusion", "Testing showed good usability and confirmed that gamification increases engagement. Next steps are a stronger onboarding tutorial, clearer explanations of analytics, more actionable AI insights, and tighter attention to data privacy and account security, the main concerns raised by respondents."],
    ],
  },
  {
    ...base,
    slug: "belajar-nusantara",
    img: "/docu/belajarnusantara.png",
    name: "Belajar Nusantara",
    type: "Final Project (Skripsi)",
    year: "2026",
    tools: ["React", "NASA-TLX", "A/B/n Testing", "One-Way ANOVA", "Cognitive Load Theory"],
    tone: "sky",
    demo: "https://nusantara-nu.vercel.app",
    code: "https://github.com/estergracia/nusantara",
    client: "Bachelor's Thesis, Computer Science, Universitas Sumatera Utara",
    duration: "3-4 weeks",
    intro:
      "Belajar Nusantara is a web-based educational quiz game about Indonesian culture, built to study how interface complexity affects cognitive load and user experience. The same quiz content is delivered in three UI modes (simple, medium, complex) and compared using the NASA-TLX questionnaire with 33 university students.",
    sections: [
      ["Overview", "Interface design strongly affects how comfortable and mentally demanding an educational game feels, but it was unclear how different complexity levels change cognitive load in a quiz game. This thesis tests that question using Cognitive Load Theory, treating the UI as a source of extraneous cognitive load while keeping the quiz material identical."],
      ["My Approach", "I built the game in React and designed three UI modes with the same questions, number of questions, and base difficulty. The study is a between-subjects experiment (A/B/n testing), so each participant played only one mode. After playing, they filled in a Raw NASA-TLX questionnaire covering six dimensions: mental, physical, and temporal demand, performance, effort, and frustration."],
      ["Vision and Innovation", "Rather than assume that simpler is always better, the project asks whether extra visual elements can help instead of hurt. The complex mode turns the quiz into an auto-run adventure called Ekspedisi Nusantara, with gates per island, NPC dialogue, HP, XP, coins, streaks, and badges, to test gamification and narrative as cognitive scaffolding."],
      ["Identifying Unique Challenges", "Keeping intrinsic load constant across modes was essential, so content and difficulty had to be identical. The experiment also had to avoid carryover and learning effects, and the complex mode had to add game mechanics without breaking the quiz-based learning core."],
      ["Resolving Complex Problems", "Simple mode shows minimal elements with brief feedback. Medium mode adds a progress-bar timer, informative feedback that shows the correct answer, and audio cues. Complex mode uses a 2D runner with a HUD, guardian dialogue, five-question gate popups with reward and penalty rules, and a badge system. Assumptions were checked with Shapiro-Wilk and Levene tests before running One-Way ANOVA."],
      ["User-Centric Design", "The study uses 33 student participants, 11 per mode, and a Raw NASA-TLX form to reduce survey fatigue while keeping sensitivity. Mean total scores were 4.55 (simple), 4.30 (medium), and 4.05 (complex). Mental Demand was highest in the simple mode at 6.00."],
      ["Detailed Pages and Features", "Splash, Login and Register, Home, Categories, Learn, Quiz, and Achievements pages. The Quiz page controls the game phases (splash, playing, stageDone, final), the UI mode, questions, timer, feedback, and scoring, and the experiment data is saved for analysis."],
      ["Accessibility and Optimization", "The game runs in the browser without installation and works on laptops and smartphones. React's modular components keep the three modes manageable, page transitions and answer feedback stay quick, and the interface stays understandable without special training."],
      ["Conclusion", "The differences were not statistically significant (F = 0.9014, p = 0.4167), but the trend suggests a non-linear relationship: the overly minimal interface showed the highest workload, while the richer complex mode scored lowest, likely because narrative, feedback, and gamification acted as scaffolding. The takeaway is to design educational game interfaces that are information-rich but well structured. A larger and more diverse sample would strengthen future work."],
    ],
  },
];

export const defaultSections = [
  ["Overview", "Explain the context: the problem, the goal, your role, and the result this project aimed for."],
  ["My Approach", "Describe how you worked: research, wireframes, design system, then development."],
  ["Vision and Innovation", "Share the design direction, typography, color choices, and what makes it feel distinct."],
  ["Identifying Unique Challenges", "Name the main constraints or problems you found before you started."],
  ["Resolving Complex Problems", "Show how you solved them, with the decisions and trade-offs you made."],
  ["User-Centric Design", "Explain how real user needs and feedback shaped the interface."],
  ["Detailed Pages and Features", "List the key pages, components, and interactions you built."],
  ["Accessibility and Optimization", "Cover responsiveness, semantic markup, contrast, and performance work."],
  ["Conclusion", "Wrap up with the outcome, what you learned, and what you would improve next."],
];