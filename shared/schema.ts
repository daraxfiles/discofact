import { pgTable, text, varchar, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: varchar("id", { length: 36 }).primaryKey(),
  projectType: text("project_type"),
  topic: text("topic"),
  audience: text("audience"),
  purpose: text("purpose"),
  synopsis: text("synopsis"),
  script: text("script"),
  storyboard: jsonb("storyboard"),
  teamMembers: jsonb("team_members"),
  tasks: jsonb("tasks"),
  editingNotes: text("editing_notes"),
  reflection: jsonb("reflection"),
  peerReview: jsonb("peer_review"),
  projectLink: text("project_link"),
  projectDescription: text("project_description"),
  currentStep: text("current_step").default("conceptualize").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  role: text("role").default("student").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const showcaseProjects = pgTable("showcase_projects", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: text("title").notNull(),
  creator: text("creator").notNull(),
  projectType: text("project_type").notNull(),
  issueTheme: text("issue_theme").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  projectUrl: text("project_url"),
  featured: boolean("featured").default(false).notNull(),
});

export const projectTypeEnum = z.enum([
  "video_essay",
  "podcast",
  "photo_story",
  "infographic",
  "digital_story",
  "meme_ad"
]);

export const projectStepEnum = z.enum([
  "conceptualize",
  "story_script",
  "plan_collaborate",
  "produce",
  "edit",
  "review",
  "share"
]);

export const insertProjectSchema = z.object({
  projectType: projectTypeEnum.optional(),
  topic: z.string().optional(),
  audience: z.string().optional(),
  purpose: z.enum(["inform", "entertain", "persuade"]).optional(),
  synopsis: z.string().optional(),
  script: z.string().optional(),
  storyboard: z.array(z.object({
    scene: z.number(),
    description: z.string()
  })).optional(),
  teamMembers: z.array(z.object({
    name: z.string(),
    role: z.string()
  })).optional(),
  tasks: z.array(z.object({
    task: z.string(),
    completed: z.boolean()
  })).optional(),
  editingNotes: z.string().optional(),
  reflection: z.object({
    proudOf: z.string(),
    improve: z.string()
  }).optional(),
  peerReview: z.object({
    storyClarity: z.number().min(1).max(5),
    soundQuality: z.number().min(1).max(5),
    teamwork: z.number().min(1).max(5),
    comments: z.string()
  }).optional(),
  projectLink: z.string().optional(),
  projectDescription: z.string().optional(),
  currentStep: projectStepEnum.default("conceptualize")
});

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  role: z.enum(["student", "parent", "teacher", "other"]).default("student")
});

export const insertShowcaseProjectSchema = z.object({
  title: z.string().min(1),
  creator: z.string().min(1),
  projectType: projectTypeEnum,
  issueTheme: z.string(),
  description: z.string(),
  thumbnailUrl: z.string().optional(),
  projectUrl: z.string().optional()
});

export type ProjectType = z.infer<typeof projectTypeEnum>;
export type ProjectStep = z.infer<typeof projectStepEnum>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertShowcaseProject = z.infer<typeof insertShowcaseProjectSchema>;

export type Project = typeof projects.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type ShowcaseProject = typeof showcaseProjects.$inferSelect;

export const dailySchedule = [
  {
    day: 1,
    title: "Introduction to Creative Media Boot Camp",
    theme: "Getting Started",
    week: 1,
    activities: [
      { name: "Introductions", duration: "5 min", type: "discussion" },
      { name: "Overview of research", duration: "5 min", type: "discussion" },
      { name: "Icebreaker - What students enjoy doing online", duration: "10 min", type: "discussion" },
      { name: "Brief survey - Technobiography & Media Assessments", duration: "20 min", type: "survey" },
      { name: "Gameplay - Fake it to make it", duration: "18 min", type: "game" },
      { name: "Wrap-up & day 2 objectives", duration: "2 min", type: "discussion" }
    ],
    skills: ["Self-reflection", "Media Awareness", "Critical Thinking"]
  },
  {
    day: 2,
    title: "Let's talk about your interest and societal issues",
    theme: "Exploring Media & Society",
    week: 1,
    activities: [
      { name: "Watch video - Role of media in society", duration: "10 min", type: "video" },
      { name: "Activity 1 - Brainstorm societal issues in groups", duration: "20 min", type: "creation" },
      { name: "Activity 2 - Play with media", duration: "10 min", type: "game" },
      { name: "Wrap-up & day 3 objectives", duration: "5 min", type: "discussion" },
      { name: "Exit ticket & interview", duration: "15 min", type: "survey" }
    ],
    skills: ["Collaboration", "Issue Identification", "Group Discussion"]
  },
  {
    day: 3,
    title: "Nitty-gritty of false information in media",
    theme: "Understanding Misinformation",
    week: 2,
    activities: [
      { name: "Check-in, organize for camp", duration: "5 min", type: "discussion" },
      { name: "Watch video - False information types & dangers", duration: "10 min", type: "video" },
      { name: "Gameplay - Play Lamboozled", duration: "40 min", type: "game" },
      { name: "Exit ticket, Wrap-up & day 4 objectives", duration: "5 min", type: "survey" }
    ],
    skills: ["Misinformation Detection", "Critical Analysis", "Media Literacy"]
  },
  {
    day: 4,
    title: "Media Credibility",
    theme: "Fact-Checking Skills",
    week: 2,
    activities: [
      { name: "Check-in and questions", duration: "3 min", type: "discussion" },
      { name: "Activity 3 - Investigating media credibility", duration: "25 min", type: "creation" },
      { name: "Review - Activity 1 (Societal issues)", duration: "10 min", type: "discussion" },
      { name: "Activity 4 - Plan a story", duration: "10 min", type: "creation" },
      { name: "Share Out/Challenges/Questions", duration: "7 min", type: "discussion" },
      { name: "Exit ticket, Wrap-up & day 5 objectives", duration: "5 min", type: "survey" }
    ],
    skills: ["Source Verification", "Story Planning", "Research Skills"]
  },
  {
    day: 5,
    title: "Deconstructing media",
    theme: "Media Analysis",
    week: 2,
    activities: [
      { name: "Check-in and questions", duration: "5 min", type: "discussion" },
      { name: "Watch video - Deconstruction of media", duration: "5 min", type: "video" },
      { name: "Activity 4 - Deconstruction of Media Activity", duration: "30 min", type: "creation" },
      { name: "Share Out/Challenges/Questions", duration: "10 min", type: "discussion" },
      { name: "Exit ticket/Wrap-up & day 6 objectives", duration: "5 min", type: "survey" }
    ],
    skills: ["Media Deconstruction", "Visual Literacy", "Critical Thinking"]
  },
  {
    day: 6,
    title: "Constructing media - Let's make an ad",
    theme: "Media Creation Basics",
    week: 3,
    activities: [
      { name: "Check-in and questions", duration: "5 min", type: "discussion" },
      { name: "Watch video - Construction of media", duration: "5 min", type: "video" },
      { name: "Activity 5 - Construction of Media Activity [creating an ad]", duration: "35 min", type: "creation" },
      { name: "Share Out/Challenges/Questions", duration: "10 min", type: "discussion" },
      { name: "Exit ticket/Wrap-up & day 7 objectives", duration: "5 min", type: "survey" }
    ],
    skills: ["Media Construction", "Advertising Techniques", "Creative Design"]
  },
  {
    day: 7,
    title: "Elaborate on your story",
    theme: "Story Development",
    week: 3,
    activities: [
      { name: "Check-in and questions", duration: "5 min", type: "discussion" },
      { name: "Activity 6 - Elaborate on story (characters, theme, plot, conflict)", duration: "25 min", type: "creation" },
      { name: "Activity 7 - Select the design format", duration: "10 min", type: "creation" },
      { name: "Share Out/Challenges/Questions", duration: "10 min", type: "discussion" },
      { name: "Exit ticket/Wrap-up & day 8 objectives", duration: "5 min", type: "survey" }
    ],
    skills: ["Storytelling", "Character Development", "Format Selection"]
  },
  {
    day: 8,
    title: "Media creation",
    theme: "Production Begins",
    week: 4,
    activities: [
      { name: "Check-in and questions", duration: "5 min", type: "discussion" },
      { name: "Activity 8 - Start creating", duration: "40 min", type: "creation" },
      { name: "Share Out/Challenges/Questions", duration: "10 min", type: "discussion" },
      { name: "Exit ticket/Wrap-up & day 9 objectives", duration: "5 min", type: "survey" }
    ],
    skills: ["Production Skills", "Time Management", "Technical Skills"]
  },
  {
    day: 9,
    title: "Media creation continues",
    theme: "Production Work Time",
    week: 4,
    activities: [
      { name: "Check-in and questions", duration: "5 min", type: "discussion" },
      { name: "Activity 9 - Creation continues (work time)", duration: "40 min", type: "creation" },
      { name: "Share Out/Challenges/Questions", duration: "10 min", type: "discussion" },
      { name: "Exit ticket/Wrap-up & day 10 objectives", duration: "5 min", type: "survey" }
    ],
    skills: ["Persistence", "Revision", "Collaboration"]
  },
  {
    day: 10,
    title: "Media Creation - Make it better",
    theme: "Refinement",
    week: 5,
    activities: [
      { name: "Check-in and questions", duration: "5 min", type: "discussion" },
      { name: "Activity 9 - Present initial creation [make it better]", duration: "45 min", type: "creation" },
      { name: "Exit ticket / Wrap-up & day 11 objectives", duration: "10 min", type: "survey" }
    ],
    skills: ["Peer Feedback", "Iteration", "Quality Improvement"]
  },
  {
    day: 11,
    title: "Final Presentations",
    theme: "Presenting Your Work",
    week: 5,
    activities: [
      { name: "Check-in and questions", duration: "5 min", type: "discussion" },
      { name: "Activity 10 - Final presentation", duration: "40 min", type: "creation" },
      { name: "Questions", duration: "10 min", type: "discussion" },
      { name: "Exit ticket / Wrap-up & day 12 objectives", duration: "5 min", type: "survey" }
    ],
    skills: ["Presentation Skills", "Public Speaking", "Confidence"]
  },
  {
    day: 12,
    title: "Showcase and end of bootcamp",
    theme: "Celebration",
    week: 6,
    activities: [
      { name: "Check-in and questions", duration: "2 min", type: "discussion" },
      { name: "Prep for showcase", duration: "3 min", type: "creation" },
      { name: "Activity 10 - Showcase project", duration: "10 min", type: "creation" },
      { name: "Brief survey - Final assessments", duration: "20 min", type: "survey" },
      { name: "Group interviews", duration: "25 min", type: "discussion" }
    ],
    skills: ["Celebration", "Reflection", "Community Building"]
  }
] as const;

export type DaySchedule = typeof dailySchedule[number];

export const mediaTools = [
  {
    category: "Script Writing",
    tools: [
      { name: "Google Docs", description: "Free online word processor for writing and collaborating on scripts", difficulty: "Easy", platforms: ["Web", "Mobile"] },
      { name: "Celtx", description: "Professional scriptwriting software with templates", difficulty: "Medium", platforms: ["Web", "Desktop"] }
    ]
  },
  {
    category: "Storyboarding",
    tools: [
      { name: "Canva", description: "Design tool with storyboard templates", difficulty: "Easy", platforms: ["Web", "Mobile"] },
      { name: "Storyboard That", description: "Create visual storyboards with drag-and-drop characters", difficulty: "Easy", platforms: ["Web"] }
    ]
  },
  {
    category: "Video Editing",
    tools: [
      { name: "CapCut", description: "Free video editor with effects and music", difficulty: "Easy", platforms: ["Mobile", "Web"] },
      { name: "iMovie", description: "Apple's free video editor with professional features", difficulty: "Easy", platforms: ["Desktop", "Mobile"] },
      { name: "Clipchamp", description: "Microsoft's online video editor", difficulty: "Easy", platforms: ["Web"] },
      { name: "WeVideo", description: "Cloud-based video editor for schools", difficulty: "Medium", platforms: ["Web"] }
    ]
  },
  {
    category: "Audio Editing",
    tools: [
      { name: "Audacity", description: "Free, open-source audio editor", difficulty: "Medium", platforms: ["Desktop"] },
      { name: "GarageBand", description: "Apple's free music and podcast creator", difficulty: "Easy", platforms: ["Desktop", "Mobile"] },
      { name: "Soundtrap", description: "Online audio recording studio", difficulty: "Easy", platforms: ["Web"] }
    ]
  },
  {
    category: "Image Design",
    tools: [
      { name: "Canva", description: "Design graphics, posters, and social media content", difficulty: "Easy", platforms: ["Web", "Mobile"] },
      { name: "Adobe Express", description: "Create stunning graphics with templates", difficulty: "Easy", platforms: ["Web", "Mobile"] },
      { name: "Pixlr", description: "Online photo editor with advanced features", difficulty: "Medium", platforms: ["Web"] }
    ]
  }
] as const;

export type MediaTool = typeof mediaTools[number];

export const faqs = [
  {
    question: "Do I need my own device?",
    answer: "No! We provide tablets and laptops during the camp. However, if you have your own device, you're welcome to bring it."
  },
  {
    question: "Is prior experience required?",
    answer: "Not at all! This bootcamp is designed for beginners. All you need is curiosity and a willingness to learn and create."
  },
  {
    question: "How much time per day?",
    answer: "Each session is approximately 1 hour, and we meet twice a week for 6 weeks."
  },
  {
    question: "What will my child create?",
    answer: "Students can create video essays, podcasts, photo stories, digital stories, infographics, memes, or advertisements about societal issues they care about."
  },
  {
    question: "Is this a research study?",
    answer: "Yes! This is an educational program examining how creative media production helps students identify and address misinformation."
  },
  {
    question: "What grades can participate?",
    answer: "The bootcamp is designed for middle schoolers in grades 6-8, ages 12-15."
  },
  {
    question: "Where is the camp held?",
    answer: "The camp takes place at a local middle school. Contact us for specific location details."
  },
  {
    question: "Who runs this program?",
    answer: "This program is run by the Department of Education and Human Development."
  }
] as const;

export type FAQ = typeof faqs[number];

export const users = {} as any;
export const insertUserSchema = {} as any;
export type InsertUser = any;
export type User = any;
