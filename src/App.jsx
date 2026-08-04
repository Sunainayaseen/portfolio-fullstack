import { useState, useEffect } from 'react'
import { getProjects, addProject } from './api'
import './App.css'

const SkillIcons = {
  Python: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true">
      <path fill="#3776AB" d="M11.9 1.3c-1.6 0-2.9.2-4 .5-2.2.6-2.6 1.9-2.6 4.2v2.4h5.3v.8H3.6c-2.3 0-4.3 1.4-4.9 4-.7 3 .1 4.9 3 5.6h1.9v-2.9c0-2.6 2.2-4.9 4.9-4.9h5.3c1.7 0 3-1.4 3-3V6c0-1.6-1.4-3-3-3-1.2-.1-2.2-.2-2.9-.2zM9 4.1c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .5-1 1-1z" />
      <path fill="#FFD43B" d="M12.1 22.7c1.6 0 2.9-.2 4-.5 2.2-.6 2.6-1.9 2.6-4.2v-2.4h-5.3v-.8h6.9c2.3 0 4.3-1.4 4.9-4 .7-3-.1-4.9-3-5.6h-1.9v2.9c0 2.6-2.2 4.9-4.9 4.9H9.9c-1.7 0-3 1.4-3 3V18c0 1.6 1.4 3 3 3 1.2.1 2.2.2 2.2.2zM15 19.9c-.5 0-1-.4-1-1s.5-1 1-1 1 .4 1 1-.5 1-1 1z" />
    </svg>
  ),
  Claude: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="#D97757">
      <path d="M12 2l2.1 6.2L20 10l-5.9 1.8L12 18l-2.1-6.2L4 10l5.9-1.8L12 2z" />
    </svg>
  ),
  OpenAI: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="currentColor">
      <path d="M22.28 9.82a5.99 5.99 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.5-2.9A6 6 0 0 0 4.98 4.18a5.99 5.99 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.99 5.99 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.5 2.9A6 6 0 0 0 19.02 19.8a5.99 5.99 0 0 0 4-2.9 6.05 6.05 0 0 0-.74-7.08zM13.73 21.6a4.47 4.47 0 0 1-2.87-1.04l.14-.08 4.77-2.76a.78.78 0 0 0 .39-.68v-6.73l2.02 1.16a.07.07 0 0 1 .04.06v5.58a4.5 4.5 0 0 1-4.49 4.49zM3.7 17.55a4.47 4.47 0 0 1-.53-3.01l.14.08 4.77 2.76c.24.14.53.14.77 0l5.82-3.36v2.32a.08.08 0 0 1-.03.07l-4.83 2.78a4.5 4.5 0 0 1-6.11-1.64zM2.47 7.9a4.47 4.47 0 0 1 2.35-1.97v5.68c0 .28.15.53.39.67l5.82 3.36-2.02 1.17a.08.08 0 0 1-.07 0L3.9 13.98a4.5 4.5 0 0 1-1.43-6.08zm16.55 3.85-5.82-3.37 2.02-1.16a.08.08 0 0 1 .08 0l4.82 2.79a4.49 4.49 0 0 1-.69 8.1v-5.69a.78.78 0 0 0-.4-.67zm2.01-3.02-.15-.09-4.76-2.77a.78.78 0 0 0-.78 0l-5.81 3.36V6.9a.07.07 0 0 1 .03-.07l4.83-2.78a4.5 4.5 0 0 1 6.64 4.68zM9.4 12.85l-2.02-1.16a.08.08 0 0 1-.04-.06V6.05a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.77 2.76a.78.78 0 0 0-.39.68l-.02 6.73zm1.1-2.37 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5v-3z" />
    </svg>
  ),
  LangChain: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="#1C3C3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3.2" />
      <circle cx="16" cy="16" r="3.2" />
      <path d="M10.3 10.3l3.4 3.4" />
    </svg>
  ),
  LangGraph: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.7 7.5L11 16M16.3 7.5L13 16M8.2 6h7.6" />
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="#61DAFB" strokeWidth="1.4">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" stroke="none" />
    </svg>
  ),
  Node: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="#5FA04E">
      <path d="M12 1.5l9 5.2v10.6l-9 5.2-9-5.2V6.7l9-5.2z" opacity="0.15" />
      <path d="M12 3.2l7.3 4.2v8.4L12 20l-7.3-4.2V7.4L12 3.2z" fill="none" stroke="#5FA04E" strokeWidth="1.6" />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="#2496ED">
      <path d="M22.4 9.9c-.5-.35-1.6-.48-2.46-.3-.1-.86-.6-1.6-1.4-2.26l-.5-.35-.32.5c-.4.6-.6 1.44-.53 2.16.05.5.24 1.1.62 1.5-.3.16-.9.4-1.68.4H1.5l-.05.4c-.15 1.34.1 2.7.9 3.86 1 1.4 2.5 2.2 4.4 2.2 4.16 0 7.23-1.92 8.66-5.4.9.02 2.9-.1 3.9-1.94.06-.1.02-.2-.9-.77zM4.2 9.02h1.9V7.14H4.2v1.88zm2.5 0h1.9V7.14h-1.9v1.88zm2.5 0h1.9V7.14h-1.9v1.88zm-5 2.6h1.9V9.74H4.2v1.88zm2.5 0h1.9V9.74h-1.9v1.88zm2.5 0h1.9V9.74h-1.9v1.88zm2.5 0h1.9V9.74h-1.9v1.88zm-2.5-5.2h1.9V4.54h-1.9v1.88zm2.5 0h1.9V4.54h-1.9v1.88z" />
    </svg>
  ),
  MCP: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="9" width="6" height="6" rx="1" />
      <rect x="14" y="9" width="6" height="6" rx="1" />
      <path d="M10 12h4" />
    </svg>
  ),
  VectorDB: () => (
    <svg viewBox="0 0 24 24" className="skill-logo-svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
}

const SKILLS_STATS = [
  { icon: 'code', value: '3+', label: 'Languages Mastered' },
  { icon: 'cube', value: '10+', label: 'AI Frameworks' },
  { icon: 'db', value: '3+', label: 'Vector/DB Systems' },
  { icon: 'git', value: '3+', label: 'Years Experience' },
]

const SKILLS_DETAILED = [
  { name: 'Python', percent: 96, icon: 'Python' },
  { name: 'Claude API', percent: 95, icon: 'Claude' },
  { name: 'OpenAI API', percent: 90, icon: 'OpenAI' },
  { name: 'LangChain', percent: 88, icon: 'LangChain' },
  { name: 'LangGraph', percent: 85, icon: 'LangGraph' },
  { name: 'React', percent: 92, icon: 'React' },
  { name: 'Node.js', percent: 85, icon: 'Node' },
  { name: 'Docker', percent: 80, icon: 'Docker' },
  { name: 'MCP', percent: 82, icon: 'MCP' },
  { name: 'Vector Databases', percent: 86, icon: 'VectorDB' },
  { name: 'GitHub', percent: 90, icon: 'GitHub' },
  { name: 'RAG Pipelines', percent: 89, icon: 'VectorDB' },
]

const PROJECTS = [
  {
    icon: '🔍',
    category: 'AGENT',
    title: 'AutoResearch Agent',
    tag: 'Multi-Agent System',
    description: 'An autonomous research agent that scrapes, summarizes, and compiles reports — reducing manual research time by 80%.',
    tools: 'LangGraph, Claude API, Python, Vector DB, Puppeteer',
    link: 'https://github.com/Sunainayaseen',
    linkLabel: 'View Case Study',
    year: '2026',
    scope: 'Research Automation',
    type: 'Agent',
    caseStudy: {
      problem: 'Manual research for market analysis was taking clients 10+ hours per week, with inconsistent quality and missed sources.',
      solution: 'Built a multi-agent system using LangGraph + Claude API where one agent searches and scrapes sources, another verifies credibility, and a third compiles a structured report — all coordinated autonomously.',
      impact: [
        '80% reduction in research time',
        '3x more sources analyzed per report',
        'Fully autonomous — zero manual intervention needed',
      ],
    },
  },
  {
    icon: '💬',
    category: 'CHATBOT',
    title: 'SmartSupport AI',
    tag: 'RAG-Powered Chatbot',
    description: 'A customer support agent trained on company docs, resolving 70% of queries without human intervention.',
    tools: 'OpenAI API, Pinecone, LangChain, React',
    link: 'https://github.com/Sunainayaseen',
    linkLabel: 'View details',
    year: '2025',
    scope: 'Customer Support',
    type: 'Chatbot',
  },
  {
    icon: '🔗',
    category: 'AUTOMATION',
    title: 'TaskFlow Orchestrator',
    tag: 'API + Agent Automation',
    description: 'An agent that manages tasks across Slack, Notion, and Gmail autonomously based on natural language commands.',
    tools: 'MCP, Node.js, OpenAI API, REST APIs',
    link: 'https://github.com/Sunainayaseen',
    linkLabel: 'View details',
    year: '2026',
    scope: 'Workflow Automation',
    type: 'Agent',
  },
  {
    icon: '🎯',
    category: 'COMPUTER VISION',
    title: 'Real-Time Object Detection',
    tag: 'Computer Vision',
    description: 'Trained and deployed a custom YOLOv8 model for real-time object detection, served through a web interface with live bounding-box predictions.',
    tools: 'YOLOv8, PyTorch, Python, Flask, OpenCV',
    link: 'https://github.com/Sunainayaseen',
    linkLabel: 'View details',
    year: '2025',
    scope: 'Object Detection',
    type: 'ML Model',
  },
]

const TECH_STACK_PREVIEW = ['Claude API', 'LangChain', 'Python', 'Docker', 'React', 'LangGraph']

const CertIcon = () => (
  <svg viewBox="0 0 24 24" className="cert-icon-svg" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 3h10v14l-5 3-5-3V3z" />
    <path d="M7 7h10M7 11h7" />
    <circle cx="12" cy="14" r="2.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 12.5v2.5l1.2 1" />
  </svg>
)

const ContactIcons = {
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
}

const CERTIFICATIONS = [
  { name: 'Full Stack Web Development with React & Node.js', provider: 'Ideoversity Institute' },
  { name: 'Building AI Agents & LLM Applications', provider: 'Python · LangChain · Udemy' },
  { name: 'Prompt Engineering & Generative AI', provider: 'Online Specialization' },
  { name: 'Full Stack Software Development & Blockchain Technology Seminar', provider: 'ZAI Systems (SMC-Pvt) Ltd, Lahore' },
]

const ABOUT_STATS = [
  { value: '15+', label: 'Projects Delivered', icon: '🚀' },
  { value: '3+', label: 'Years in AI/Agentic Dev', icon: '🧠' },
  { value: '10+', label: 'Frameworks Mastered', icon: '⚙️' },
  { value: '5+', label: 'Countries Reached', icon: '🌍' },
]

const ABOUT_INFO = [
  { label: 'Current Role', value: 'AI Agentic Web Developer · Softerio Solutions' },
  { label: 'Location', value: 'Lahore, Pakistan' },
  { label: 'Availability', value: 'Open to remote work worldwide' },
  { label: 'Email', value: 'sunainayasee561@gmail.com', href: 'mailto:sunainayasee561@gmail.com' },
]

const ABOUT_JOURNEY = "My journey started with Python fundamentals and a love for solving problems with code. That curiosity pulled me toward AI agents and LLM tooling — systems that don't just respond, but reason, plan, and act. I cut my teeth on full-stack, project-based web work at remotebirdy.com, then moved into building autonomous agents full-time at Softerio Solutions, where I now design multi-agent workflows, wire up Claude and OpenAI APIs, and ship the React/Node.js interfaces that put those agents in front of real users."

const ABOUT_BEYOND = [
  { icon: '🤖', title: 'AI Agent Architecture', desc: 'Designing multi-step, autonomous agent workflows with tool/function calling.' },
  { icon: '🧩', title: 'LLM & RAG Systems', desc: 'Integrating Claude, OpenAI, and vector databases into production pipelines.' },
  { icon: '🔗', title: 'Automation & Integrations', desc: 'Connecting agents to real tools — APIs, MCP servers, and everyday workflows.' },
  { icon: '💻', title: 'Full-Stack Delivery', desc: 'Shipping the React/Node.js interfaces that put agents in front of users.' },
]

const PROCESS_STEPS = [
  {
    title: 'Discover',
    desc: 'Understand your workflow, pain points, and automation goals.',
  },
  {
    title: 'Design',
    desc: 'Architect the agent logic, tools, and data flow.',
  },
  {
    title: 'Build',
    desc: 'Develop, integrate APIs/LLMs, and test rigorously.',
  },
  {
    title: 'Deploy',
    desc: 'Launch, monitor, and optimize for real-world performance.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Sunaina built us an AI agent that automated our entire lead-qualification process. We saved 20+ hours a week.',
    name: 'Placeholder Client',
    role: 'Product Lead, AI Startup',
  },
  {
    quote: 'Incredible technical depth and communication. The agent worked exactly as promised — no hallucinations, no downtime.',
    name: 'Placeholder Collaborator',
    role: 'Engineering Manager',
  },
  {
    quote: 'Clear communicator, thinks about failure cases and evals — not just demos. Exactly what we needed for a production agent.',
    name: 'Placeholder Reviewer',
    role: 'Freelance Client',
  },
]

const HERO_TAGLINES = [
  'AI Agentic Web Developer',
  'Building Autonomous AI Agents',
  'LLMs · RAG · Full-Stack Web Apps',
  'From Prompt to Production',
  'Agents That Plan, Reason & Act',
  'React · Node.js · Python · LangChain',
]

// Dev me hamesha same-origin (Vite proxy) – mobile se bhi form chalega jab same WiFi par Network URL use karo
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000')

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [navOpen, setNavOpen] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formError, setFormError] = useState(false)
  const [formErrorMsg, setFormErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [projects, setProjects] = useState(PROJECTS)
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [expandedProject, setExpandedProject] = useState(null)
  const [heroTaglineIndex, setHeroTaglineIndex] = useState(0)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved !== null) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setHeroTaglineIndex((i) => (i + 1) % HERO_TAGLINES.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = height > 0 ? (winScroll / height) * 100 : 0
      const bar = document.getElementById('scroll-progress')
      if (bar) bar.style.width = `${progress}%`
      const sections = ['home', 'about', 'skills', 'projects', 'process', 'contact']
      const scrollPosition = window.scrollY + 150
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    )
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    } catch {}
  }, [darkMode])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      } catch {
        setProjects(PROJECTS)
      } finally {
        setProjectsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleAddProject = async () => {
    const title = prompt('Project title?')
    if (!title) return
    const description = prompt('Description?') || ''
    const imageUrl = prompt('Image URL? (optional)') || ''
    try {
      await addProject({ title, description, imageUrl })
      const data = await getProjects()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      alert(err.message || 'Could not add project')
    }
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleTheme = () => setDarkMode((d) => !d)

  const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

  const validateContactForm = (data) => {
    const errors = {}
    const name = data.name.trim()
    const email = data.email.trim()
    const message = data.message.trim()

    if (!name) errors.name = 'Name is required.'
    else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.'

    if (!email) errors.email = 'Email is required.'
    else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'

    if (data.subject && data.subject.trim().length > 150) errors.subject = 'Subject must be 150 characters or fewer.'

    if (!message) errors.message = 'Message is required.'
    else if (message.length < 10) errors.message = 'Message must be at least 10 characters.'
    else if (message.length > 5000) errors.message = 'Message must be 5000 characters or fewer.'

    return errors
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormError(false)
    setFormErrorMsg('')

    const errors = validateContactForm(formData)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setFormError(true)
      setFormErrorMsg('Please fix the highlighted fields below.')
      return
    }

    setFormSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Message from ${formData.name || 'Portfolio'}`,
          message: formData.message,
          website: formData.website, // honeypot – must stay empty
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setFormSubmitted(true)
        setFieldErrors({})
        setFormData({ name: '', email: '', subject: '', message: '', website: '' })
      } else if (res.status === 400 && data.errors) {
        setFieldErrors(data.errors)
        setFormError(true)
        setFormErrorMsg('Please fix the highlighted fields below.')
      } else {
        setFormError(true)
        setFormErrorMsg((data.errors && data.errors._global) || data.msg || `Server error ${res.status}`)
      }
    } catch (err) {
      setFormError(true)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const msg = isMobile
        ? 'Network error. Same WiFi par computer ka URL use karein (e.g. http://192.168.x.x:5173), ya backend ko live deploy karke .env me VITE_API_URL set karein.'
        : (err.message || 'Backend not reachable. Start Flask: cd portfolio-backend && python app.py')
      setFormErrorMsg(msg)
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''} ${darkMode ? 'dark' : 'light'}`}>
      <div className="scroll-progress" id="scroll-progress" />

      <nav className={`navbar ${navOpen ? 'nav-open' : ''}`}>
        <div className="nav-container">
          <button type="button" className="nav-logo" onClick={() => { scrollToSection('home'); setNavOpen(false); }} aria-label="Sunaina Yaseen - Home">
            <span className="nav-logo-avatar" aria-hidden="true">SY</span>
            <span className="nav-logo-text">
              <span className="nav-logo-first">Sunaina</span>
              <span className="nav-logo-last">Yaseen</span>
            </span>
          </button>
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setNavOpen((o) => !o)}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
          >
            <span className="nav-hamburger-bar" />
            <span className="nav-hamburger-bar" />
            <span className="nav-hamburger-bar" />
          </button>
          <ul className="nav-menu">
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('home'); setNavOpen(false); }}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('about'); setNavOpen(false); }}>About</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); setNavOpen(false); }}>Skills</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('projects'); setNavOpen(false); }}>Projects</a></li>
            <li><a href="#process" className={activeSection === 'process' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('process'); setNavOpen(false); }}>Process</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setNavOpen(false); }}>Contact</a></li>
            <li className="nav-menu-cta-item">
              <button type="button" className="nav-cta" onClick={() => { scrollToSection('contact'); setNavOpen(false); }}>
                Let&apos;s Build →
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="nav-cta nav-cta-desktop"
            onClick={() => scrollToSection('contact')}
          >
            Let&apos;s Build →
          </button>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            <span className="theme-toggle-inner" data-dark={darkMode}>
              <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
          </button>
        </div>
      </nav>

      <section id="home" className={`hero ${isLoaded ? 'hero-ready' : ''}`}>
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
        </div>
        <div className="hero-panel">
          <div className="hero-photo-bg" aria-hidden="true">
            <img src="/profile-photo.png" alt="" loading="eager" />
          </div>
          <div className="hero-container">
            <h1 className="hero-reveal hero-name">Sunaina Yaseen</h1>
            <div className="hero-reveal hero-title-wrap" aria-live="polite">
              <h2 className="hero-title hero-title-rotating" key={heroTaglineIndex}>
                {HERO_TAGLINES[heroTaglineIndex]}
              </h2>
            </div>
            <p className="hero-reveal hero-tagline">
              AI Agentic Developer crafting autonomous systems, LLM-powered tools, and smart web experiences that go beyond chatbots.
            </p>
            <div className="hero-reveal hero-buttons">
              <button type="button" className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                View Projects
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              </button>
              <button type="button" className="btn btn-outline" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </button>
            </div>
            <p className="hero-reveal hero-status">
              <span className="status-dot" aria-hidden="true" />
              Currently building at Softerio Solutions · Lahore, Pakistan
            </p>
            <a href="/resume.html" className="hero-reveal hero-resume-link" target="_blank" rel="noopener noreferrer">
              Download Resume ↓
            </a>
          </div>
        </div>

        <div className="hero-stats hero-reveal">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="techstack" className={`section techstack ${isVisible.techstack ? 'visible' : ''}`}>
        <div className="container techstack-container">
          <span className="techstack-eyebrow reveal-title" aria-hidden="true">&lt;/&gt;</span>
          <h2 className="section-title reveal-title">Tech Stack</h2>
          <p className="section-subtitle reveal-subtitle">A snapshot of the tools I reach for most.</p>
          <div className="techstack-pillbar reveal-card">
            <div className="techstack-pills">
              {TECH_STACK_PREVIEW.map((tool) => (
                <span key={tool} className="techstack-pill">{tool}</span>
              ))}
            </div>
            <button type="button" className="techstack-see-all" onClick={() => scrollToSection('skills')}>
              See full skill set →
            </button>
          </div>
        </div>
      </section>

      <section id="about" className={`section about ${isVisible.about ? 'visible' : ''}`}>
        <div className="about-bg" aria-hidden="true" />
        <div className="container container--about">
          <header className="about-header">
            <h2 className="section-title about-title reveal-title">I Don&apos;t Just Build Apps — I Build Agents That Work For You</h2>
            <p className="about-intro reveal-subtitle">
              I'm Sunaina Yaseen, an AI Agentic Web Developer specializing in autonomous systems, LLM integrations, and intelligent automation. I design tools that don't just respond — they reason, plan, and act.
            </p>
            <div className="about-header-decoration">
              <span className="about-header-line" aria-hidden="true" />
              <span className="about-header-dot" aria-hidden="true" />
              <span className="about-header-line" aria-hidden="true" />
            </div>
            <button type="button" className="btn btn-primary about-header-cta" onClick={() => scrollToSection('contact')}>
              Get In Touch
              <span className="btn-arrow" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </span>
            </button>
          </header>

          <div className="about-layout reveal-card">
            <div className="about-card about-card--main card-shine">
              <div className="about-card-accent" aria-hidden="true" />
              <div className="about-card-glow" aria-hidden="true" />
              <p className="about-lead">
                From <strong>multi-agent pipelines</strong> to <strong>RAG-powered assistants</strong>, I turn complex AI logic into seamless, production-ready products — combining <strong>LLM integration</strong>, <strong>autonomous workflows</strong>, and <strong>Full-Stack Web Development</strong>.
              </p>
              <p className="about-text">
                My experience includes designing <strong>multi-step agent workflows</strong>, building <strong>RAG pipelines</strong> with vector databases, wiring up tool/function calling, and shipping the React/Node.js interfaces that put those agents in front of users. I collaborate closely with product and dev teams, focusing on problem-solving, clear documentation, and delivering dependable AI-powered software.
              </p>
            </div>

            <aside className="about-highlights">
              <div className="about-highlights-accent" aria-hidden="true" />
              <h3 className="about-highlights-title">Core Strengths</h3>
              <ul className="about-highlights-list">
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>AI agent architecture</li>
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>LLM &amp; RAG integration</li>
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Full-stack delivery</li>
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Analytical &amp; problem-solving</li>
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Continuous learning</li>
              </ul>
            </aside>
          </div>

          <div className="about-info-panel reveal-card card-shine">
            {ABOUT_INFO.map((item) => (
              <div key={item.label} className="about-info-item">
                <span className="about-info-label">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="about-info-value about-info-link">{item.value}</a>
                ) : (
                  <span className="about-info-value">{item.value}</span>
                )}
              </div>
            ))}
          </div>

          <div className="about-journey reveal-card card-shine">
            <h3 className="about-journey-title">My Journey</h3>
            <p className="about-journey-text">{ABOUT_JOURNEY}</p>
          </div>

          <div className="about-beyond reveal-card">
            <h3 className="about-beyond-title">Beyond Code</h3>
            <div className="about-beyond-grid">
              {ABOUT_BEYOND.map((item, i) => (
                <div key={item.title} className="about-beyond-card card-shine" style={{ '--delay': `${i * 0.08}s` }}>
                  <span className="about-beyond-icon" aria-hidden="true">{item.icon}</span>
                  <h4 className="about-beyond-card-title">{item.title}</h4>
                  <p className="about-beyond-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className={`section skills ${isVisible.skills ? 'visible' : ''}`}>
        <div className="container container--skills">
          <header className="skills-header">
            <div className="skills-header-inner">
              <span className="skills-header-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" /></svg>
              </span>
              <h2 className="skills-header-title section-title reveal-title">AI, Agents &amp; Full-Stack Skills</h2>
              <p className="section-subtitle reveal-subtitle skills-intro">
                Technical expertise and tooling used to build agentic AI systems and full-stack products.
              </p>
            </div>
          </header>

          <div className="skills-stats reveal-card">
            {SKILLS_STATS.map((stat) => (
              <div key={stat.label} className="skills-stat">
                <span className="skills-stat-icon" aria-hidden="true">
                  {stat.icon === 'code' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>}
                  {stat.icon === 'cube' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>}
                  {stat.icon === 'db' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /></svg>}
                  {stat.icon === 'git' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>}
                </span>
                <span className="skills-stat-value">{stat.value}</span>
                <span className="skills-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="skills-progress-grid">
            {SKILLS_DETAILED.map((skill, i) => {
              const Icon = SkillIcons[skill.icon]
              return (
                <div key={skill.name} className="skill-progress-card card-shine" style={{ '--delay': `${i * 0.05}s` }}>
                  <span className="skill-progress-icon">{Icon ? <Icon /> : null}</span>
                  <div className="skill-progress-info">
                    <span className="skill-progress-name">{skill.name}</span>
                    <span className="skill-progress-percent">{skill.percent}%</span>
                  </div>
                  <div className="skill-progress-track">
                    <div className="skill-progress-fill" style={{ width: `${skill.percent}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="projects" className={`section projects ${isVisible.projects ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">Agents I&apos;ve Built, Problems I&apos;ve Solved</h2>
          <p className="section-subtitle reveal-subtitle">AI agent & full-stack development projects</p>
          {projectsLoading && <p className="section-subtitle" style={{ marginTop: '-1rem' }}>Loading projects…</p>}
          <div className="projects-grid">
            {projects.map((project, i) => {
              const isExpanded = expandedProject === i
              const toolTags = project.tools ? project.tools.split(',').map((t) => t.trim()) : []
              return (
                <div key={project.title + i} className="project-card reveal-card card-shine" style={{ '--delay': `${i * 0.12}s` }}>
                  {project.imageUrl && (
                    <div className="project-card-image-wrap">
                      <img src={project.imageUrl} alt="" className="project-card-image" />
                    </div>
                  )}

                  <div className="project-card-top">
                    {project.icon && <span className="project-icon-badge" aria-hidden="true">{project.icon}</span>}
                    {(project.link || project.linkUrl) && (
                      <div className="project-card-links">
                        <a href={project.link || project.linkUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className="project-icon-link">
                          <ContactIcons.GitHub />
                        </a>
                        <a href={project.link || project.linkUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} external link`} className="project-icon-link">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        </a>
                      </div>
                    )}
                  </div>

                  {project.category && <span className="project-category">{project.category}</span>}
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  {toolTags.length > 0 && (
                    <div className="project-tags">
                      {toolTags.map((tool) => (
                        <span key={tool} className="project-tag-pill">{tool}</span>
                      ))}
                    </div>
                  )}

                  {project.caseStudy && isExpanded && (
                    <div className="project-case-study">
                      <p><strong>Problem</strong><br />{project.caseStudy.problem}</p>
                      <p><strong>Solution</strong><br />{project.caseStudy.solution}</p>
                      <p><strong>Impact</strong></p>
                      <ul>
                        {project.caseStudy.impact.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(project.year || project.scope || project.type) && (
                    <div className="project-meta-grid">
                      {project.year && <div><span className="project-meta-label">YEAR</span><span className="project-meta-value">{project.year}</span></div>}
                      {project.scope && <div><span className="project-meta-label">SCOPE</span><span className="project-meta-value">{project.scope}</span></div>}
                      {project.type && <div><span className="project-meta-label">TYPE</span><span className="project-meta-value">{project.type}</span></div>}
                    </div>
                  )}

                  {project.caseStudy ? (
                    <button
                      type="button"
                      className="project-link project-link-btn"
                      onClick={() => setExpandedProject(isExpanded ? null : i)}
                    >
                      {isExpanded ? 'Hide Case Study' : project.linkLabel} {isExpanded ? '↑' : '↗'}
                    </button>
                  ) : (
                    (project.link || project.linkUrl) && (
                      <a href={project.link || project.linkUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        {project.linkLabel || 'View project'} ↗
                      </a>
                    )
                  )}
                </div>
              )
            })}
          </div>
          <div className="projects-footer">
            <a href="https://github.com/Sunainayaseen" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View All Projects
              <span className="btn-arrow" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </span>
            </a>
            
          </div>
        </div>
      </section>

      <section id="process" className={`section process ${isVisible.process ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">How I Bring Agents To Life</h2>
          <p className="section-subtitle reveal-subtitle">From idea to a shipped, reliable agent</p>
          <div className="process-timeline reveal-card">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="process-step card-shine" style={{ '--delay': `${i * 0.1}s` }}>
                <span className="process-step-number">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className={`section experience ${isVisible.experience ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">Professional Experience</h2>
          <p className="section-subtitle reveal-subtitle">My AI development journey</p>
          <div className="experience-card reveal-card card-shine">
            <h3 className="exp-role">AI Agentic Web Developer · Softerio Solutions · Lahore, Pakistan · Present</h3>
            <p className="exp-meta">AI Agents & Full-Stack Development</p>
            <ul className="exp-list">
              <li>Designing and building autonomous AI agents with tool/function calling</li>
              <li>Integrating LLM APIs (Claude, OpenAI) and RAG pipelines into web apps</li>
              <li>Building full-stack interfaces (React, Node.js) around agent workflows</li>
              <li>Collaborating with product teams to ship reliable AI-powered features</li>
            </ul>
            <h3 className="exp-role" style={{ marginTop: '1.5rem' }}>Web Developer (Remote, Project-based) <a href="https://remotebirdy.com/" target="_blank" rel="noopener noreferrer" className="exp-link">remotebirdy.com</a></h3>
            <ul className="exp-list">
              <li>Full-stack feature development, API integration & documentation</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="certifications" className={`section certifications ${isVisible.certifications ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">Certifications & Learning</h2>
          <p className="section-subtitle reveal-subtitle">Courses and continuous learning</p>
          <div className="certs-grid">
            {CERTIFICATIONS.map((c, i) => (
              <div key={c.name} className="cert-card reveal-card card-shine" style={{ '--delay': `${i * 0.1}s` }}>
                <div className="cert-card-inner">
                  <span className="cert-icon-wrap" aria-hidden="true">
                    <CertIcon />
                  </span>
                  <div className="cert-content">
                    <h4 className="cert-name">{c.name}</h4>
                    <span className="cert-issued">Issued by</span>
                    <p className="cert-provider">{c.provider}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className={`section testimonials ${isVisible.testimonials ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">What Clients Say</h2>
          <p className="section-subtitle reveal-subtitle">Feedback from clients & collaborators</p>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="testimonial-card reveal-card card-shine" style={{ '--delay': `${i * 0.12}s` }}>
                <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <span className="testimonial-avatar" aria-hidden="true">{t.name.charAt(0)}</span>
                  <div>
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`section contact ${isVisible.contact ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">Got an Idea? Let&apos;s Turn It Into An Agent.</h2>
          <p className="section-subtitle reveal-subtitle">Whether it's automation, an AI assistant, or a full agentic system — I'll help you build it right.</p>

          <div className="contact-layout">
            <div className="contact-form-wrapper reveal-card">
              <h3 className="contact-panel-title">Send a message</h3>
              <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
                <div className="contact-form-inner">
                  {/* Honeypot field – hidden from real users, bots tend to fill every field */}
                  <div className="form-honeypot" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        className={`form-input ${fieldErrors.name ? 'field-invalid' : ''}`}
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                        required
                      />
                      {fieldErrors.name && <span id="contact-name-error" className="field-error">{fieldErrors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        className={`form-input ${fieldErrors.email ? 'field-invalid' : ''}`}
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                        required
                      />
                      {fieldErrors.email && <span id="contact-email-error" className="field-error">{fieldErrors.email}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      className={`form-input ${fieldErrors.subject ? 'field-invalid' : ''}`}
                      placeholder="e.g. Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                      aria-invalid={!!fieldErrors.subject}
                      aria-describedby={fieldErrors.subject ? 'contact-subject-error' : undefined}
                    />
                    {fieldErrors.subject && <span id="contact-subject-error" className="field-error">{fieldErrors.subject}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">Message</label>
                    <textarea
                      id="contact-message"
                      className={`form-textarea ${fieldErrors.message ? 'field-invalid' : ''}`}
                      placeholder="Your message..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                      required
                    />
                    {fieldErrors.message && <span id="contact-message-error" className="field-error">{fieldErrors.message}</span>}
                  </div>
                  {formSubmitted ? (
                    <div className="form-success" role="status" aria-live="polite">
                      <span className="form-success-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <div className="form-success-content">
                        <strong className="form-success-title">Message sent</strong>
                        <p className="form-success-text">Thanks for reaching out. I&apos;ll get back to you at your email soon.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {formError && (
                        <p className="form-error">{formErrorMsg || 'Could not send. Try again or email me directly below.'}</p>
                      )}
                      <button type="submit" className="form-submit btn-primary" disabled={formSubmitting}>
                        {formSubmitting ? 'Sending…' : 'Send message'}
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>

            <div className="contact-direct-wrapper reveal-card">
              <h3 className="contact-panel-title">Reach out directly</h3>
              <div className="contact-direct">
                <div className="contact-cards">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sunainayasee561@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-card reveal-card card-shine" style={{ '--delay': '0s' }}>
                  <span className="contact-icon">
                    <ContactIcons.Email />
                  </span>
                  <h3>Email</h3>
                  <p>sunainayasee561@gmail.com</p>
                </a>
                <a href="https://www.linkedin.com/in/sunaina-yaseen-160695277" target="_blank" rel="noopener noreferrer" className="contact-card reveal-card card-shine" style={{ '--delay': '0.1s' }}>
                  <span className="contact-icon">
                    <ContactIcons.LinkedIn />
                  </span>
                  <h3>LinkedIn</h3>
                  <p>Connect with me</p>
                </a>
                <a href="https://github.com/Sunainayaseen" target="_blank" rel="noopener noreferrer" className="contact-card reveal-card card-shine" style={{ '--delay': '0.2s' }}>
                  <span className="contact-icon">
                    <ContactIcons.GitHub />
                  </span>
                  <h3>GitHub</h3>
                  <p>View my repositories</p>
                </a>
                <a href="tel:+923000000000" className="contact-card reveal-card card-shine" style={{ '--delay': '0.3s' }}>
                  <span className="contact-icon">
                    <ContactIcons.Phone />
                  </span>
                  <h3>Phone</h3>
                  <p>+92 300 0000000</p>
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">Sunaina Yaseen © {new Date().getFullYear()} — Building the future, one agent at a time.</p>
          <nav className="footer-links" aria-label="Footer">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <span className="footer-links-sep" aria-hidden="true">·</span>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
            <span className="footer-links-sep" aria-hidden="true">·</span>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            <span className="footer-links-sep" aria-hidden="true">·</span>
            <a href="https://github.com/Sunainayaseen" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="footer-links-sep" aria-hidden="true">·</span>
            <a href="https://www.linkedin.com/in/sunaina-yaseen-160695277" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>
        </div>
      </footer>

      {showBackToTop && (
        <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
        </button>
      )}
    </div>
  )
}

export default App
