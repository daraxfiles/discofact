# Creative Media Production Bootcamp

## Overview
A web application for a Creative Media Production Bootcamp. This 6-week program (12 sessions, 2x per week) teaches middle schoolers (grades 6-8, ages 12-15) about media literacy, misinformation detection, and creative media production.

## Project Structure

```
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── layout/       # Header, Footer
│   │   │   └── ui/           # Shadcn UI components
│   │   ├── pages/            # Page components
│   │   │   ├── home.tsx      # Homepage with hero section
│   │   │   ├── about.tsx     # About the bootcamp
│   │   │   ├── schedule.tsx  # 6-week program schedule
│   │   │   ├── modules.tsx   # Learning modules by week
│   │   │   ├── create.tsx    # 7-step project creation wizard
│   │   │   ├── resources.tsx # Tools, games, videos
│   │   │   ├── gallery.tsx   # Student project showcase
│   │   │   └── faq.tsx       # FAQ and contact form
│   │   ├── App.tsx           # Main app with routing
│   │   └── index.css         # Global styles and theme
│   └── index.html
├── server/                    # Backend Express server
│   ├── db.ts                 # Database connection (Drizzle + Neon)
│   ├── routes.ts             # API endpoints
│   └── storage.ts            # PostgreSQL storage layer
├── shared/                    # Shared types and schemas
│   └── schema.ts             # Data models, validation, static data
└── design_guidelines.md      # Design system documentation
```

## Key Features

### Pages
1. **Home** - Hero section, key outcomes, media formats, 6-week journey overview, researchers
2. **About** - Study details, goals, program structure, student/parent info
3. **Schedule** - Accordion-style breakdown of all 12 sessions with activities
4. **Modules** - Weekly learning modules with topics, games, and skills
5. **Create** - Interactive 7-step project creation wizard:
   - Conceptualize (project type, topic, audience, purpose)
   - Story & Script (synopsis, script, storyboard)
   - Plan & Collaborate (team members, task checklist)
   - Produce (equipment checklist, recording tips)
   - Edit (tools, editing checklist, notes)
   - Review (self-reflection, peer review with star ratings)
   - Share (project link, description, showcase submission)
6. **Resources** - Tools (categorized), educational games, video resources
7. **Gallery** - Student project showcase with filtering
8. **FAQ** - Common questions, contact form, researcher info

### API Endpoints
- `POST /api/projects` - Save a project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/contact` - Submit contact form
- `GET /api/showcase` - Get showcase projects

## Data Models (shared/schema.ts)

### Static Data
- `dailySchedule` - All 12 sessions with activities, themes, skills
- `mediaTools` - Categorized tools for media creation
- `faqs` - Frequently asked questions
- `researchers` - Research team contact info

### Dynamic Data
- `Project` - Student project with all wizard steps data
- `Contact` - Contact form submissions
- `ShowcaseProject` - Projects in the gallery

## Design System

### Colors (index.css)
- Primary: Purple (262° hue) - main brand color
- Accent: Teal (173° hue) - secondary actions
- Chart colors for data visualization and variety
- Light mode only (no dark mode)

### Typography
- Sans: Inter - clean, modern, readable
- Responsive sizing with proper hierarchy

### Components
- All Shadcn UI components available
- Elevation system for hover/active states

## Development

### Running the App
```bash
npm run dev
```
This starts both the Express backend and Vite frontend on port 5000.

### Key Technologies
- React with TypeScript
- Wouter for routing
- TanStack Query for data fetching
- Tailwind CSS for styling
- Shadcn UI for components
- Express.js backend
- PostgreSQL database (Neon)
- Drizzle ORM for database queries
- Zod for validation

### Database
The app uses PostgreSQL (Neon) with Drizzle ORM. Tables:
- `projects` - Student projects from the creation wizard
- `contacts` - Contact form submissions
- `showcase_projects` - Projects displayed in the gallery

To push schema changes: `npm run db:push`

## Research Context
This is an educational program examining how creative media production helps middle schoolers identify and address misinformation. The bootcamp runs for 6 weeks (12 sessions, ~1 hour each).

Organized by the Department of Education and Human Development.
