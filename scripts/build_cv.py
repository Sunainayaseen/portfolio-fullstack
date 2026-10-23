from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    KeepTogether, ListFlowable, ListItem,
)
from reportlab.platypus.flowables import HRFlowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import sys

OUT = sys.argv[1]

F = 'C:/Windows/Fonts/'
pdfmetrics.registerFont(TTFont('Cal', F + 'calibri.ttf'))
pdfmetrics.registerFont(TTFont('Cal-B', F + 'calibrib.ttf'))
pdfmetrics.registerFont(TTFont('Cal-I', F + 'calibrii.ttf'))
pdfmetrics.registerFont(TTFont('Cal-BI', F + 'calibriz.ttf'))
pdfmetrics.registerFontFamily('Cal', normal='Cal', bold='Cal-B', italic='Cal-I', boldItalic='Cal-BI')

INK = HexColor('#0A0A0A')
TEAL = HexColor('#8A5A00')
AMBER = HexColor('#FACC15')
MUTED = HexColor('#52525B')
RULE = HexColor('#E4E4E7')

name = ParagraphStyle('name', fontName='Cal-B', fontSize=26, leading=29, textColor=INK)
title = ParagraphStyle('title', fontName='Cal-B', fontSize=12.5, leading=16, textColor=TEAL, spaceBefore=2)
contact = ParagraphStyle('contact', fontName='Cal', fontSize=9.5, leading=13, textColor=MUTED)
h = ParagraphStyle('h', fontName='Cal-B', fontSize=11.5, leading=14, textColor=TEAL, spaceBefore=9, spaceAfter=1)
body = ParagraphStyle('body', fontName='Cal', fontSize=10, leading=13.2, textColor=INK)
bullet = ParagraphStyle('bullet', parent=body, leading=12.8)
role = ParagraphStyle('role', fontName='Cal-B', fontSize=10.6, leading=13.5, textColor=INK)
meta = ParagraphStyle('meta', fontName='Cal-I', fontSize=9.6, leading=12.5, textColor=MUTED, alignment=2)
sub = ParagraphStyle('sub', fontName='Cal-I', fontSize=9.6, leading=12.5, textColor=MUTED)
stack = ParagraphStyle('stack', parent=body, fontSize=9.5, leading=12.5, textColor=MUTED, spaceBefore=1)

W = A4[0] - 2 * 16 * mm


def link(url, text):
    return f'<link href="{url}" color="#8A5A00"><u>{text}</u></link>'


def section(text):
    return [Paragraph(text.upper(), h), HRFlowable(width='100%', thickness=0.8, color=RULE, spaceBefore=1, spaceAfter=4)]


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(t, bullet), leftIndent=11, value='•') for t in items],
        bulletType='bullet', start='•', bulletFontName='Cal-B', bulletFontSize=9,
        bulletColor=TEAL, leftIndent=11, bulletOffsetY=-0.5, spaceBefore=1, spaceAfter=2,
    )


def headline(left, right, left_style=role):
    t = Table([[Paragraph(left, left_style), Paragraph(right, meta)]], colWidths=[W * 0.68, W * 0.32])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'BOTTOM'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return t


def skills_table(rows):
    data = [[Paragraph(f'<b>{k}</b>', body), Paragraph(v, body)] for k, v in rows]
    t = Table(data, colWidths=[W * 0.22, W * 0.78])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 1.2), ('BOTTOMPADDING', (0, 0), (-1, -1), 1.2),
    ]))
    return t


def decorate(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, A4[1] - 5, A4[0] * 0.72, 5, stroke=0, fill=1)
    canvas.setFillColor(AMBER)
    canvas.rect(A4[0] * 0.72, A4[1] - 5, A4[0] * 0.28, 5, stroke=0, fill=1)
    canvas.setFont('Cal', 8.5)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(A4[0] - 16 * mm, 10 * mm, f'Sunaina Yaseen  ·  SQA Engineer  ·  Page {doc.page}')
    canvas.restoreState()


s = []
s.append(Paragraph('Sunaina Yaseen', name))
s.append(Paragraph('SQA Engineer  |  QA Automation Engineer', title))
s.append(Spacer(1, 3))
s.append(Paragraph(
    'Lahore, Pakistan  ·  +92 320 1436593  ·  ' + link('mailto:sunainayaseen561@gmail.com', 'sunainayaseen561@gmail.com'), contact))
s.append(Paragraph(
    'LinkedIn: ' + link('https://www.linkedin.com/in/sunaina-yaseen-160695277', 'linkedin.com/in/sunaina-yaseen-160695277')
    + '  ·  GitHub: ' + link('https://github.com/Sunainayaseen', 'github.com/Sunainayaseen'), contact))

s += section('Professional Summary')
s.append(Paragraph(
    'SQA Engineer with hands-on experience in <b>manual and automated testing</b> of web applications, built through a QA internship at '
    '<b>9D Technologies</b> and a current SQA role at <b>Softerio Solutions</b>. Skilled in writing '
    'test plans and test cases, automating UI regression with <b>Selenium WebDriver (Python + PyTest)</b>, <b>Cypress</b> and '
    '<b>Playwright</b>, validating REST APIs with <b>Postman</b>, and load testing with <b>Apache JMeter</b>. A full-stack development '
    'background (React.js, Flask, MySQL), including a solo-built production platform, means I understand how software is built, '
    'catch defects early, and write bug reports developers can act on immediately.', body))

s += section('Core Skills')
s.append(skills_table([
    ('Testing', 'Manual Testing, Requirement Analysis, Test Planning &amp; Strategy, Test Case Design, '
                'Test Data Preparation, Bug Reporting &amp; Tracking, STLC / SDLC'),
    ('Testing Types', 'Functional, Regression, Smoke, Sanity, Integration, System, UAT, Exploratory, Cross-Browser, API, Load &amp; Stress, Usability'),
    ('Test Automation', 'Selenium WebDriver, PyTest, Page Object Model (POM), Data-Driven Testing, Cypress, Playwright'),
    ('API &amp; Performance', 'Postman, REST API Testing, JSON Schema Validation, Apache JMeter, Load &amp; Stress Testing'),
    ('Tools', 'Jira, Git, GitHub, Chrome DevTools, Vercel, Railway'),
    ('Languages &amp; DB', 'Python, JavaScript, SQL (MySQL)'),
    ('Development', 'React.js, Flask, REST APIs, HTML5, CSS3, Bootstrap, LangChain, LangGraph, YOLOv8, OpenCV'),
]))

s += section('Professional Experience')
s.append(headline('SQA Engineer  —  Softerio Solutions, Lahore', '2025 – Present'))
s.append(bullets([
    '<b>Design</b> test plans, test scenarios and test cases from requirements and user stories, with traceability to acceptance criteria.',
    '<b>Execute</b> functional, smoke, regression and cross-browser testing on web applications ahead of every release.',
    '<b>Automate</b> UI regression suites with Selenium WebDriver (Python + PyTest, Page Object Model), Cypress and Playwright.',
    '<b>Validate</b> REST APIs in Postman (status codes, payloads, schemas and negative cases) and run load tests in Apache JMeter.',
    '<b>Log, track and re-verify</b> defects in Jira, working closely with developers to resolve issues before release.',
]))
s.append(Spacer(1, 3))
s.append(headline('SQA Intern  —  9D Technologies', 'Internship · 3 Months'))
s.append(bullets([
    '<b>Wrote and executed</b> test cases for web application features, reporting defects with clear reproduction steps, expected vs. actual results and screenshots.',
    '<b>Performed</b> functional, UI and regression testing ahead of releases as part of a live product team.',
    '<b>Learned</b> the full STLC and defect life cycle in a professional workflow, from requirement review to re-testing fixes.',
]))
s.append(Spacer(1, 3))
s.append(headline('Web Developer  —  remotebirdy.com', 'Remote · Project-based'))
s.append(bullets([
    'Developed full-stack features, integrated APIs and wrote technical documentation, building a developer’s view of where defects originate.',
]))

s += section('QA Projects')
qa = [
    ('Selenium E2E Automation Framework', 'Selenium WebDriver, Python, PyTest, POM, pytest-html', [
        'Built a Page Object Model framework with data-driven test cases and explicit waits that runs the full regression suite of a web app’s core flows (login, forms, multi-step journeys) with one command.',
        'Added screenshots on failure and HTML reports so any team member can run the suite and read the results.',
    ]),
    ('REST API Test Suite', 'Postman, JavaScript, REST APIs, JSON Schema', [
        'Designed Postman collections with environments, chained requests and test scripts that assert status codes, response bodies and JSON schemas.',
        'Covered negative cases (invalid input, missing fields, boundary values) that UI testing alone had missed.',
    ]),
    ('Cypress &amp; Playwright E2E Suite', 'Cypress, Playwright, JavaScript, React', [
        'Wrote E2E specs for a React SPA: Cypress for fast in-development feedback, Playwright for cross-browser runs on Chromium, Firefox and WebKit.',
        'Used network stubbing and reusable fixtures, with traces and videos captured on failure.',
    ]),
    ('Load &amp; Performance Testing with JMeter', 'Apache JMeter, SQL, REST APIs', [
        'Built JMeter test plans with thread groups, ramp-up periods, CSV-driven test data and assertions.',
        'Analysed response times, throughput and error rates, and cross-checked slow endpoints with SQL queries to pinpoint bottlenecks.',
    ]),
]
for t, tools, pts in qa:
    s.append(KeepTogether([
        Paragraph(t, role),
        Paragraph('<i>Tools: ' + tools + '</i>', sub),
        bullets(pts),
    ]))

s += section('Final Year Project')
s.append(KeepTogether([
    headline('GenSpark Builds — Agentic AI Platform for Custom PC Building &amp; Assembly', 'Solo Project · BSCS'),
    Paragraph('GitHub: ' + link('https://github.com/Sunainayaseen/GenSpark', 'github.com/Sunainayaseen/GenSpark')
              + '  ·  Live: ' + link('https://genspark-frontend.vercel.app', 'genspark-frontend.vercel.app'), sub),
]))
s.append(bullets([
    '<b>Built a YOLOv8 QA agent</b> that validates vendor-uploaded assembly photos against the ordered components before shipment approval, catching wrong builds before they reach the customer.',
    '<b>Designed a rule-based compatibility engine</b> with a self-correction agent that detects failed compatibility checks and automatically re-validates replacement parts.',
    '<b>Architected a multi-agent LangGraph/LangChain pipeline</b> (requirements → recommendation → budget → compatibility → vendor → QA) with RAG (FAISS/ChromaDB) over a live inventory of 90+ components in 12 categories.',
    '<b>Delivered 30+ REST APIs</b> serving 4 user roles (Customer, Vendor, Admin, Rider) and 20+ vendors, with order lifecycle and live rider tracking.',
    '<b>Shipped end-to-end to production</b>: React.js frontend, Flask/Python backend and MySQL, deployed on Vercel and Railway.',
]))
s.append(Paragraph('<b>Tech Stack:</b> React.js, Flask/Python, MySQL, OpenAI/Gemini API, LangChain, LangGraph, MCP, FAISS/ChromaDB, YOLOv8, Git/GitHub', stack))

s += section('Other Projects')
others = [
    ('YOLOv8 Hardware Component Detection', 'Personal / Academic', 'Real-time computer vision system that detects and classifies hardware parts (RAM, GPU, CPU, motherboard) from a live camera feed, using YOLOv8 (Ultralytics) and OpenCV.'),
    ('Learning Management System (LMS)', 'Academic', 'Full-stack LMS with student and teacher roles, course management, assignment submission, quizzes and progress tracking. React.js, Flask, MySQL.'),
    ('Hospital Management System', 'Academic', 'Patient records, doctor appointment scheduling, prescription management, billing module and admin panel. React.js, Flask, MySQL.'),
]
for t, kind, desc in others:
    s.append(KeepTogether([headline(t, kind), Paragraph(desc, body), Spacer(1, 3)]))

s += section('Education')
s.append(headline('BS Computer Science (BSCS)  —  University of Education, Lahore', '2022 – 2026'))

s += section('Certifications &amp; Training')
s.append(bullets([
    'Full Stack Web Development with React &amp; Node.js — Ideoversity Training Institute',
    'Building AI Agents &amp; LLM Applications — Udemy (Python, LangChain)',
    'Prompt Engineering &amp; Generative AI — Online Specialization',
    'Full Stack Software Development &amp; Blockchain Technology Seminar — ZAI Systems (SMC-Pvt) Ltd, Lahore',
]))

doc = BaseDocTemplate(
    OUT, pagesize=A4, leftMargin=16 * mm, rightMargin=16 * mm, topMargin=14 * mm, bottomMargin=16 * mm,
    title='Sunaina Yaseen — SQA Engineer CV', author='Sunaina Yaseen',
    subject='SQA Engineer | QA Automation Engineer',
    keywords='SQA, QA Engineer, QA Automation, Selenium, PyTest, Cypress, Playwright, Postman, JMeter, Jira, Manual Testing',
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f', leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc.addPageTemplates([PageTemplate(id='p', frames=[frame], onPage=decorate)])
doc.build(s)
print('pages ok')
