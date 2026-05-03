import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  projects,
  contacts,
  showcaseProjects,
  type Project,
  type InsertProject,
  type Contact,
  type InsertContact,
  type ShowcaseProject,
  type InsertShowcaseProject,
} from "@shared/schema";

export interface IStorage {
  createProject(project: InsertProject): Promise<Project>;
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;

  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  createShowcaseProject(project: InsertShowcaseProject): Promise<ShowcaseProject>;
  getShowcaseProjects(): Promise<ShowcaseProject[]>;
  initializeSampleShowcaseProjects(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const [project] = await db
      .insert(projects)
      .values({
        id,
        projectType: insertProject.projectType,
        topic: insertProject.topic,
        audience: insertProject.audience,
        purpose: insertProject.purpose,
        synopsis: insertProject.synopsis,
        script: insertProject.script,
        storyboard: insertProject.storyboard,
        teamMembers: insertProject.teamMembers,
        tasks: insertProject.tasks,
        editingNotes: insertProject.editingNotes,
        reflection: insertProject.reflection,
        peerReview: insertProject.peerReview,
        projectLink: insertProject.projectLink,
        projectDescription: insertProject.projectDescription,
        currentStep: insertProject.currentStep || "conceptualize",
      })
      .returning();
    return project;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const [contact] = await db
      .insert(contacts)
      .values({
        id,
        name: insertContact.name,
        email: insertContact.email,
        message: insertContact.message,
        role: insertContact.role || "student",
      })
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async createShowcaseProject(insertProject: InsertShowcaseProject): Promise<ShowcaseProject> {
    const id = randomUUID();
    const [project] = await db
      .insert(showcaseProjects)
      .values({
        id,
        title: insertProject.title,
        creator: insertProject.creator,
        projectType: insertProject.projectType,
        issueTheme: insertProject.issueTheme,
        description: insertProject.description,
        thumbnailUrl: insertProject.thumbnailUrl,
        projectUrl: insertProject.projectUrl,
        featured: false,
      })
      .returning();
    return project;
  }

  async getShowcaseProjects(): Promise<ShowcaseProject[]> {
    return await db.select().from(showcaseProjects);
  }

  async initializeSampleShowcaseProjects(): Promise<void> {
    const existing = await this.getShowcaseProjects();
    if (existing.length > 0) return;

    const sampleProjects: InsertShowcaseProject[] = [
      {
        title: "The Truth About School Lunch",
        creator: "Team Alpha",
        projectType: "video_essay",
        issueTheme: "Health & Nutrition",
        description: "An investigation into school lunch nutrition and what students really think about cafeteria food.",
      },
      {
        title: "Climate Change in Our Town",
        creator: "Green Team",
        projectType: "podcast",
        issueTheme: "Environment",
        description: "A podcast series interviewing local experts about how climate change affects our community.",
      },
      {
        title: "A Day in the Life of a Teacher",
        creator: "The Storytellers",
        projectType: "photo_story",
        issueTheme: "Education",
        description: "A visual journey following our favorite teachers through their busy days.",
      },
      {
        title: "Stop Cyberbullying Now",
        creator: "Digital Defenders",
        projectType: "meme_ad",
        issueTheme: "Online Safety",
        description: "A series of advertisements promoting kindness online and ways to combat cyberbullying.",
      },
      {
        title: "Local History Uncovered",
        creator: "History Hunters",
        projectType: "digital_story",
        issueTheme: "Community",
        description: "An interactive story about the hidden history of landmarks in our neighborhood.",
      },
      {
        title: "Social Media & Mental Health",
        creator: "Mind Matters",
        projectType: "infographic",
        issueTheme: "Mental Health",
        description: "Visual data showing how social media affects teen mental health and tips for healthy usage.",
      },
    ];

    for (let i = 0; i < sampleProjects.length; i++) {
      const project = sampleProjects[i];
      await db.insert(showcaseProjects).values({
        id: `sample-${i + 1}`,
        title: project.title,
        creator: project.creator,
        projectType: project.projectType,
        issueTheme: project.issueTheme,
        description: project.description,
        thumbnailUrl: project.thumbnailUrl,
        projectUrl: project.projectUrl,
        featured: i % 2 === 0,
      });
    }
  }
}

export const storage = new DatabaseStorage();
