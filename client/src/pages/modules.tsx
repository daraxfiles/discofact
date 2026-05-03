import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Search,
  Shield,
  Eye,
  Palette,
  Video,
  ArrowRight,
  CheckCircle,
  Gamepad2,
  BookOpen,
  Lightbulb,
  Users,
  Target,
} from "lucide-react";

const modules = [
  {
    id: "week1",
    week: "Week 1",
    title: "Media Use & Technobiography",
    description: "Explore your relationship with media and technology",
    icon: Search,
    color: "bg-chart-1",
    topics: [
      {
        title: "Introduction to the Bootcamp",
        description: "Meet the researchers and fellow participants",
        activities: ["Icebreaker activities", "Team building exercises"],
      },
      {
        title: "Your Technobiography",
        description: "Explore your daily media usage and tech tool preferences",
        activities: ["Self-assessment surveys", "Media diary creation"],
      },
      {
        title: "Media's Role in Society",
        description: "Understand how media shapes opinions and society",
        activities: ["Video discussions", "Group brainstorming"],
      },
      {
        title: "Societal Issues Exploration",
        description: "Identify issues you care about and want to address",
        activities: ["Group brainstorming", "Issue mapping"],
      },
    ],
    games: ["Fake it to Make it"],
    skills: ["Self-reflection", "Media Awareness", "Collaboration"],
  },
  {
    id: "week2",
    week: "Week 2",
    title: "Information Credibility & Misinformation",
    description: "Learn to identify and combat false information",
    icon: Shield,
    color: "bg-chart-2",
    topics: [
      {
        title: "Types of Misinformation",
        description: "Learn about different forms of false information",
        activities: ["Video lessons", "Examples analysis"],
      },
      {
        title: "Investigating Credibility",
        description: "Develop skills to verify information sources",
        activities: ["Source evaluation exercises", "Fact-checking practice"],
      },
      {
        title: "Media Credibility Assessment",
        description: "Learn to evaluate whether media can be trusted",
        activities: ["Credibility investigation activity", "Discussion"],
      },
      {
        title: "Planning Your Story",
        description: "Begin planning a story about an issue you care about",
        activities: ["Story brainstorming", "Initial story planning"],
      },
    ],
    games: ["Lamboozled"],
    skills: ["Critical Thinking", "Research Skills", "Fact-Checking"],
  },
  {
    id: "week3",
    week: "Week 3",
    title: "Media Deconstruction & Construction",
    description: "Analyze and create different types of media",
    icon: Eye,
    color: "bg-chart-3",
    topics: [
      {
        title: "Deconstructing Media",
        description: "Break down how media messages are crafted",
        activities: ["Media analysis exercises", "Video deconstruction"],
      },
      {
        title: "Constructing Media",
        description: "Learn the basics of creating compelling media",
        activities: ["Advertisement creation", "Media construction techniques"],
      },
      {
        title: "Elaborating Your Story",
        description: "Add depth to your story with characters, themes, and conflict",
        activities: ["Story development", "Character creation"],
      },
      {
        title: "Choosing Your Format",
        description: "Select the best media format for your story",
        activities: ["Format exploration", "Design planning"],
      },
    ],
    games: [],
    skills: ["Media Analysis", "Creative Design", "Storytelling"],
  },
  {
    id: "week4-5",
    week: "Weeks 4-5",
    title: "Media Production & Showcase",
    description: "Create, refine, and present your media project",
    icon: Video,
    color: "bg-chart-4",
    topics: [
      {
        title: "Media Creation",
        description: "Start building your media project",
        activities: ["Production work time", "Peer collaboration"],
      },
      {
        title: "Refinement & Feedback",
        description: "Improve your project based on feedback",
        activities: ["Peer review sessions", "Project iteration"],
      },
      {
        title: "Final Presentations",
        description: "Present your work to the group",
        activities: ["Presentation practice", "Q&A sessions"],
      },
      {
        title: "Showcase & Celebration",
        description: "Share your completed project at the final showcase",
        activities: ["Project showcase", "Portfolio building"],
      },
    ],
    games: [],
    skills: ["Production Skills", "Presentation", "Reflection"],
  },
];

export default function Modules() {
  return (
    <div className="min-h-screen py-12 md:py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Learning Modules
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Learn
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The bootcamp is organized into weekly learning modules, each focusing on specific skills and concepts.
            </p>
          </div>

          <Tabs defaultValue="week1" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto gap-2 bg-transparent p-0 mb-8">
              {modules.map((module) => (
                <TabsTrigger
                  key={module.id}
                  value={module.id}
                  className="flex flex-col items-center gap-1 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border data-[state=active]:border-primary"
                  data-testid={`tab-${module.id}`}
                >
                  <module.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{module.week}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {modules.map((module) => (
              <TabsContent key={module.id} value={module.id}>
                <Card className="mb-6" data-testid={`card-module-${module.id}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-lg ${module.color} flex items-center justify-center shrink-0`}>
                        <module.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">{module.week}</Badge>
                        <CardTitle className="text-2xl">{module.title}</CardTitle>
                        <p className="text-muted-foreground mt-1">{module.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {module.topics.map((topic, i) => (
                        <Card key={i} className="bg-secondary/30 border-0">
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-1">{topic.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
                            <div className="space-y-1">
                              {topic.activities.map((activity, j) => (
                                <div key={j} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                                  <span>{activity}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                      {module.games.length > 0 && (
                        <div className="flex-1">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Gamepad2 className="h-4 w-4 text-primary" />
                            Interactive Games
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {module.games.map((game, i) => (
                              <Badge key={i} variant="secondary" className="gap-1">
                                <Gamepad2 className="h-3 w-3" />
                                {game}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          Skills Developed
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {module.skills.map((skill, i) => (
                            <Badge key={i} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="hover-elevate" data-testid="card-games">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Educational Games
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-semibold mb-1">Fake it to Make it</h4>
                  <p className="text-sm text-muted-foreground">
                    A game where you create fake news to understand how misinformation spreads online. Learn the tactics used to deceive people.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-semibold mb-1">Lamboozled</h4>
                  <p className="text-sm text-muted-foreground">
                    Test your ability to spot fake information and learn strategies for identifying misleading content.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-key-concepts">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Key Concepts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Search, title: "Technobiography", desc: "Your personal media usage history" },
                  { icon: Shield, title: "Source Verification", desc: "Checking if information is credible" },
                  { icon: Eye, title: "Media Deconstruction", desc: "Breaking down how media is made" },
                  { icon: Palette, title: "Media Construction", desc: "Creating your own media content" },
                ].map((concept, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <concept.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{concept.title}</p>
                      <p className="text-xs text-muted-foreground">{concept.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button size="lg" className="gap-2" data-testid="button-start-project">
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
