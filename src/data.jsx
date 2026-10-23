export const SkillIcons = {
  Python: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true">
      <path fill="#3776AB" d="M11.9 1.3c-1.6 0-2.9.2-4 .5-2.2.6-2.6 1.9-2.6 4.2v2.4h5.3v.8H3.6c-2.3 0-4.3 1.4-4.9 4-.7 3 .1 4.9 3 5.6h1.9v-2.9c0-2.6 2.2-4.9 4.9-4.9h5.3c1.7 0 3-1.4 3-3V6c0-1.6-1.4-3-3-3-1.2-.1-2.2-.2-2.9-.2zM9 4.1c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .5-1 1-1z" />
      <path fill="#FFD43B" d="M12.1 22.7c1.6 0 2.9-.2 4-.5 2.2-.6 2.6-1.9 2.6-4.2v-2.4h-5.3v-.8h6.9c2.3 0 4.3-1.4 4.9-4 .7-3-.1-4.9-3-5.6h-1.9v2.9c0 2.6-2.2 4.9-4.9 4.9H9.9c-1.7 0-3 1.4-3 3V18c0 1.6 1.4 3 3 3 1.2.1 2.2.2 2.2.2zM15 19.9c-.5 0-1-.4-1-1s.5-1 1-1 1 .4 1 1-.5 1-1 1z" />
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
      <text x="18.5" y="19" textAnchor="end" fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif" fill="#1a1a1a">JS</text>
    </svg>
  ),
  Selenium: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#43B02A" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif" fill="#fff">Se</text>
    </svg>
  ),
  PyTest: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true">
      <rect x="3" y="3" width="18" height="2.6" rx="1" fill="#696969" />
      <rect x="3.5" y="7.5" width="3.6" height="7" rx="0.8" fill="#009FE3" />
      <rect x="8.1" y="7.5" width="3.6" height="10" rx="0.8" fill="#C7D302" />
      <rect x="12.3" y="7.5" width="3.6" height="12" rx="0.8" fill="#F07E16" />
      <rect x="16.9" y="7.5" width="3.6" height="13.5" rx="0.8" fill="#DF2815" />
    </svg>
  ),
  Cypress: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <text x="12" y="15.4" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif" fill="currentColor">cy</text>
    </svg>
  ),
  Playwright: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true">
      <path fill="#2EAD33" d="M3 7.5c3-1.6 6.4-2.2 9.5-1.6l-1.4 10.4c-.4 2.8-3.2 4.3-5.6 3C3.2 18.2 2 15.3 2.2 12.6L3 7.5z" />
      <path fill="#D65348" d="M12.5 5.9c3.1-.6 6.3 0 8.9 1.4l.6 5c.3 2.7-.9 5.6-3.3 6.8-2.4 1.3-5.2-.2-5.6-3L12.5 5.9z" />
      <circle cx="6.6" cy="11.4" r="1" fill="#fff" />
      <circle cx="17.4" cy="11.2" r="1" fill="#fff" />
    </svg>
  ),
  Postman: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#FF6C37" />
      <path fill="#fff" d="M16.9 6.4l-6.8 6.8 1.4 1.4 6.8-6.8a1 1 0 0 0-1.4-1.4zM9.4 13.9l-2.9.8 1.7 1.7.8-.8.4-1.7zm2.5 1.1l-1.9 1.9 3.4.6-1.5-2.5z" />
    </svg>
  ),
  JMeter: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true">
      <path fill="#D22128" d="M19.6 2.6c-5.4.6-10.3 4.6-12.4 10L5.6 17l-2 4.4 1.1.5 1.9-4.2 4.6-1.3c4.6-1.9 8.2-6.7 8.4-13.8z" />
      <path fill="#fff" opacity="0.65" d="M8.7 15.2l6.6-8.7.5.4-6.6 8.7z" />
    </svg>
  ),
  Jira: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true">
      <path fill="#2684FF" d="M21.6 11.3L12.7 2.4 12 1.7 5.3 8.4l-3 3a.9.9 0 0 0 0 1.3l6.1 6.1L12 22.3l6.7-6.7.1-.1 2.8-2.8a.9.9 0 0 0 0-1.4zM12 14.9L9.1 12 12 9.1l2.9 2.9-2.9 2.9z" />
    </svg>
  ),
  SQL: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="#00758F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Checklist: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3.5" width="14" height="18" rx="2" />
      <path d="M9 3.5h6v2.5H9z" />
      <path d="M8.5 11l1.5 1.5 3-3M8.5 16.5l1.5 1.5 3-3M15 11.5h1M15 17h1" />
    </svg>
  ),
  Document: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z" />
      <path d="M14 2.5V8h5.5M8.5 13h7M8.5 17h5" />
    </svg>
  ),
  Bug: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7.5" width="10" height="13" rx="5" />
      <path d="M9.5 7.5V6a2.5 2.5 0 0 1 5 0v1.5M12 11v9.5M3.5 12.5H7M17 12.5h3.5M4.5 7.5L7.5 9.5M19.5 7.5l-3 2M4.5 18.5l3-2M19.5 18.5l-3-2" />
    </svg>
  ),
  Regression: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11a8 8 0 0 0-14.5-4.6L4 8" />
      <path d="M4 3.5V8h4.5" />
      <path d="M4 13a8 8 0 0 0 14.5 4.6L20 16" />
      <path d="M20 20.5V16h-4.5" />
    </svg>
  ),
  Explore: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5l5 5" />
      <path d="M8 10.5l1.8 1.8 3.2-3.3" />
    </svg>
  ),
  Browser: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8.5h19" />
      <circle cx="5.5" cy="6.3" r="0.4" fill="currentColor" />
      <circle cx="7.5" cy="6.3" r="0.4" fill="currentColor" />
      <path d="M9 14.5l2 2 4-4" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.3A6.5 6.5 0 0 1 21.5 20" />
    </svg>
  ),
  Layers: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  ),
  Api: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
      <path d="M13.5 4l-3 16" />
    </svg>
  ),
  DevTools: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.5 17.2a1.8 1.8 0 0 0 2.6 2.6l5.8-5.8a4 4 0 0 0 5.1-5.4l-2.5 2.5-2.1-.5-.5-2.1 2.8-2.2z" />
    </svg>
  ),
}

export const SKILLS_STATS = [
  { icon: 'code', value: '4', label: 'Automation Frameworks' },
  { icon: 'cube', value: '50+', label: 'Testing Types' },
  { icon: 'db', value: 'UI · API', label: '+ Performance Testing' },
  { icon: 'git', value: 'STLC', label: 'End-to-End Ownership' },
]

export const SKILL_GROUPS = [
  {
    icon: 'Checklist',
    title: 'Manual & Functional Testing',
    desc: 'Turning requirements into clear, traceable test coverage — and finding what scripts miss.',
    items: [
      { name: 'Test Case Design', icon: 'Checklist' },
      { name: 'Test Plans & Strategy', icon: 'Document' },
      { name: 'Bug Reporting', icon: 'Bug' },
      { name: 'Regression & Smoke', icon: 'Regression' },
      { name: 'Exploratory Testing', icon: 'Explore' },
      { name: 'Cross-Browser Testing', icon: 'Browser' },
      { name: 'UAT Support', icon: 'Users' },
    ],
  },
  {
    icon: 'Layers',
    title: 'Test Automation',
    desc: 'Stable, maintainable UI suites that run the full regression with one command.',
    items: [
      { name: 'Selenium WebDriver', icon: 'Selenium' },
      { name: 'PyTest', icon: 'PyTest' },
      { name: 'Cypress', icon: 'Cypress' },
      { name: 'Playwright', icon: 'Playwright' },
      { name: 'Page Object Model', icon: 'Layers' },
      { name: 'Python', icon: 'Python' },
      { name: 'JavaScript', icon: 'JavaScript' },
    ],
  },
  {
    icon: 'Api',
    title: 'API & Performance Testing',
    desc: 'Validating the layer under the UI, and how it holds up under real load.',
    items: [
      { name: 'Postman', icon: 'Postman' },
      { name: 'REST API Testing', icon: 'Api' },
      { name: 'JMeter', icon: 'JMeter' },
      { name: 'Load & Stress Testing', icon: 'Users' },
      { name: 'SQL / Database Testing', icon: 'SQL' },
    ],
  },
  {
    icon: 'DevTools',
    title: 'Tools & Workflow',
    desc: 'Working inside the dev workflow, so quality is part of every sprint — not a last step.',
    items: [
      { name: 'Jira', icon: 'Jira' },
      { name: 'Git & GitHub', icon: 'GitHub' },
      { name: 'Chrome DevTools', icon: 'DevTools' },
      { name: 'Test Documentation', icon: 'Document' },
    ],
  },
]

export const PROJECTS = [
  {
    icon: '🧪',
    category: 'UI AUTOMATION',
    title: 'Selenium E2E Automation Framework',
    description: 'A Selenium + PyTest framework built on the Page Object Model that runs a web app’s full regression suite with one command.',
    problem: 'Regression testing of core user flows — login, forms and multi-step journeys — was repeated by hand every release, which was slow and let bugs slip through under deadline pressure.',
    solution: 'Built a Selenium WebDriver + PyTest framework using the Page Object Model, data-driven test cases and explicit waits, with screenshots on failure and HTML reports so any team member can run and read the full regression.',
    tools: 'Selenium WebDriver, Python, PyTest, Page Object Model, pytest-html',
    githubLink: 'https://github.com/Sunainayaseen',
    demoLink: '',
    year: '2026',
    scope: 'Regression Automation',
    type: 'Framework',
  },
  {
    icon: '🔌',
    category: 'API TESTING',
    title: 'REST API Test Suite',
    description: 'Postman collections that validate status codes, response schemas and edge cases across a REST API.',
    problem: 'Backend endpoints were only checked indirectly through the UI, so broken validation, wrong status codes and inconsistent responses reached the frontend before anyone noticed.',
    solution: 'Designed Postman collections with environments, chained requests and test scripts that assert status codes, response bodies and JSON schemas — covering negative cases like invalid input, missing fields and boundary values.',
    tools: 'Postman, JavaScript, REST APIs, JSON Schema',
    githubLink: 'https://github.com/Sunainayaseen',
    demoLink: '',
    year: '2025',
    scope: 'API Validation',
    type: 'Test Suite',
  },
  {
    icon: '🎭',
    category: 'E2E · CROSS-BROWSER',
    title: 'Cypress & Playwright E2E Suite',
    description: 'End-to-end specs for a React app — Cypress for fast feedback, Playwright for Chromium, Firefox and WebKit.',
    problem: 'A React single-page app behaved differently across browsers, and manual spot-checks kept missing UI regressions outside Chrome.',
    solution: 'Wrote E2E specs in Cypress for fast in-development feedback and in Playwright for cross-browser runs on Chromium, Firefox and WebKit — with network stubbing, reusable fixtures, and traces and videos captured on failure.',
    tools: 'Cypress, Playwright, JavaScript, React',
    githubLink: 'https://github.com/Sunainayaseen',
    demoLink: '',
    year: '2026',
    scope: 'Cross-Browser E2E',
    type: 'Test Suite',
  },
  {
    icon: '📈',
    category: 'PERFORMANCE',
    title: 'Load & Performance Testing with JMeter',
    description: 'JMeter test plans that measure response time, throughput and error rate under concurrent users.',
    problem: 'There was no data on how the application behaved with many concurrent users, so performance problems would only have surfaced after launch.',
    solution: 'Built JMeter test plans with thread groups, ramp-up periods, CSV-driven test data and assertions; analysed response times, throughput and error rates, and cross-checked slow endpoints with SQL queries to pinpoint bottlenecks.',
    tools: 'Apache JMeter, SQL, REST APIs',
    githubLink: 'https://github.com/Sunainayaseen',
    demoLink: '',
    year: '2025',
    scope: 'Load & Stress',
    type: 'Performance',
  },
]

export const TOOLKIT_CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'automation', label: 'UI Automation' },
  { id: 'api', label: 'API & Performance' },
  { id: 'code', label: 'Languages & Data' },
  { id: 'workflow', label: 'Workflow' },
]

export const TECH_STACK_ICONS = [
  { name: 'Selenium', icon: 'Selenium', category: 'automation', use: 'Cross-browser UI regression' },
  { name: 'PyTest', icon: 'PyTest', category: 'automation', use: 'Fixtures & test runner' },
  { name: 'Cypress', icon: 'Cypress', category: 'automation', use: 'Fast end-to-end flows' },
  { name: 'Playwright', icon: 'Playwright', category: 'automation', use: 'Chromium · Firefox · WebKit' },
  { name: 'Postman', icon: 'Postman', category: 'api', use: 'REST API validation' },
  { name: 'JMeter', icon: 'JMeter', category: 'api', use: 'Load & stress testing' },
  { name: 'Python', icon: 'Python', category: 'code', use: 'Automation scripting' },
  { name: 'JavaScript', icon: 'JavaScript', category: 'code', use: 'Cypress & Playwright specs' },
  { name: 'SQL', icon: 'SQL', category: 'code', use: 'Database & data checks' },
  { name: 'Jira', icon: 'Jira', category: 'workflow', use: 'Defect tracking' },
  { name: 'GitHub', icon: 'GitHub', category: 'workflow', use: 'Version control for test suites' },
  { name: 'DevTools', icon: 'DevTools', category: 'workflow', use: 'Network & console debugging' },
]

export const EXPERTISE_INTRO = [
  "I'm an SQA Engineer at Softerio Solutions, focused on making sure web applications ship stable, secure and easy to use — through careful manual testing and automation that scales.",
  "My approach blends requirement-driven test design, UI automation with Selenium, Cypress and Playwright, API validation with Postman and load testing with JMeter, so bugs are caught early and every release is one the team can trust.",
]

export const CertIcon = () => (
  <svg viewBox="0 0 24 24" className="cert-icon-svg" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 3h10v14l-5 3-5-3V3z" />
    <path d="M7 7h10M7 11h7" />
    <circle cx="12" cy="14" r="2.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 12.5v2.5l1.2 1" />
  </svg>
)

export const ContactIcons = {
  Email: () => (
    <svg viewBox="0 0 24 24" className="contact-icon-svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" className="contact-icon-svg" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" className="contact-icon-svg" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" className="contact-icon-svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 24 24" className="contact-icon-svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
}

export const CERTIFICATIONS = [
  { name: 'Full Stack Web Development with React & Node.js', provider: 'Ideoversity Institute' },
  { name: 'Building AI Agents & LLM Applications', provider: 'Python · LangChain · Udemy' },
  { name: 'Prompt Engineering & Generative AI', provider: 'Online Specialization' },
  { name: 'Full Stack Software Development & Blockchain Technology Seminar', provider: 'ZAI Systems (SMC-Pvt) Ltd, Lahore' },
]

export const ABOUT_STATS = [
  { value: '10+', label: 'Projects Tested' },
  { value: '15+', label: 'Tools & Technologies' },
  { value: '4', label: 'Automation Frameworks' },
  { value: 'E2E', label: 'UI · API · Performance' },
]

export const ABOUT_INFO = [
  { label: 'Current Role', value: 'SQA Engineer · Softerio Solutions' },
  { label: 'Location', value: 'Lahore, Pakistan' },
  { label: 'Availability', value: 'Open to remote work worldwide' },
  { label: 'Email', value: 'sunainayaseen561@gmail.com', href: 'mailto:sunainayaseen561@gmail.com' },
]

export const ABOUT_STRENGTHS = [
  'Test planning & test case design',
  'UI & API test automation',
  'Clear, reproducible bug reports',
  'Performance & load testing',
  'Sharp attention to detail',
]

export const ABOUT_JOURNEY = "My journey started with Python and a habit of asking \"what happens if…?\". Building full-stack projects — including project-based web work at remotebirdy.com — showed me how easily bugs slip through when testing is an afterthought, and that pulled me toward quality assurance. A 3-month SQA internship at 9D Technologies gave me my first hands-on experience testing inside a professional team. Today, as an SQA Engineer at Softerio Solutions, I design test cases from requirements, automate regression with Selenium, Cypress and Playwright, validate APIs with Postman and load-test with JMeter — so every release is one the team can trust."

export const ABOUT_EDUCATION = [
  { degree: 'Bachelor of Computer Science', school: 'University of Education', period: '2022 – 2026' },
  { degree: 'Intermediate of Computer Science', school: 'BISE Lahore Board', period: '2020 – 2022' },
  { degree: 'Matriculation of Computer Science', school: 'BISE Lahore Board', period: '2019 – 2020' },
]

export const ABOUT_GOALS = [
  'Build automation suites teams actually trust — stable, fast and easy to maintain.',
  'Grow into a QA Lead / SDET role, owning test strategy end to end.',
  'Keep learning: CI-integrated testing, contract testing, and testing AI-powered applications.',
]

export const ABOUT_BEYOND = [
  { icon: '🧪', title: 'Manual & Exploratory', desc: 'Requirement analysis, test scenarios and exploratory sessions that catch what scripts miss.' },
  { icon: '🤖', title: 'Test Automation', desc: 'Selenium, PyTest, Cypress and Playwright suites built on clean, maintainable patterns.' },
  { icon: '🔌', title: 'API Testing', desc: 'Postman collections that verify status codes, payloads, schemas and negative cases.' },
  { icon: '📈', title: 'Performance Testing', desc: 'JMeter load and stress tests that reveal bottlenecks before real users do.' },
]

export const EXPERIENCE = [
  {
    role: 'SQA Engineer',
    company: 'Softerio Solutions',
    location: 'Lahore, Pakistan',
    period: '2025 – Present',
    type: 'Full-time',
    current: true,
    focus: 'Manual & Automation Testing',
    points: [
      'Writing test plans, scenarios and test cases from requirements and user stories',
      'Executing functional, smoke, regression and cross-browser testing on web applications',
      'Automating UI tests with Selenium (Python + PyTest), Cypress and Playwright',
      'Testing REST APIs with Postman and running load tests with JMeter',
      'Logging, tracking and re-verifying defects in Jira alongside developers',
    ],
    tools: ['Selenium', 'PyTest', 'Cypress', 'Playwright', 'Postman', 'JMeter', 'Jira'],
  },
  {
    role: 'SQA Intern',
    company: '9D Technologies',
    location: 'Pakistan',
    period: '3 Months',
    type: 'Internship',
    focus: 'Software Quality Assurance',
    points: [
      'Completed a 3-month QA internship working inside a live product team',
      'Wrote and executed test cases for web application features and reported defects with clear repro steps',
      'Performed functional, UI and regression testing before releases',
      'Learned the full STLC and defect life cycle in a professional workflow',
    ],
    tools: ['Manual Testing', 'Test Cases', 'Bug Reporting', 'Regression'],
  },
  {
    role: 'Web Developer',
    company: 'remotebirdy.com',
    href: 'https://remotebirdy.com/',
    location: 'Remote',
    period: 'Project-based',
    type: 'Freelance',
    focus: 'Full-Stack Development',
    points: [
      'Full-stack feature development, API integration and documentation',
      'A developer’s view of how bugs are introduced — which now shapes how I test',
    ],
    tools: ['React', 'Flask', 'REST APIs'],
  },
]

export const PROCESS_STEPS = [
  { title: 'Analyze', desc: 'Review requirements and acceptance criteria, clarify gaps, and identify risk areas.' },
  { title: 'Plan & Design', desc: 'Define the test strategy, write test cases and prepare test data with full traceability.' },
  { title: 'Execute & Report', desc: 'Run manual and automated tests and log clear, reproducible defects in Jira.' },
  { title: 'Regress & Sign Off', desc: 'Re-test fixes, run the automated regression suite and confirm release readiness.' },
]

export const HERO_TAGLINES = [
  'SQA Engineer | QA Automation Engineer',
  'Manual & Automation Testing',
  'Selenium · PyTest · Cypress · Playwright',
  'API Testing with Postman',
  'Performance Testing with JMeter',
  'Quality, Release After Release',
]

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const FOOTER_SPECIALIZATIONS = ['Manual Testing', 'Test Automation', 'Selenium & PyTest', 'Cypress & Playwright', 'API Testing', 'Performance Testing', 'Bug Tracking', 'STLC']
