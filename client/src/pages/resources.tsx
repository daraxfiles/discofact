import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  FileText,
  Layout,
  Video,
  Mic,
  Image,
  Monitor,
  Smartphone,
  Globe,
  ExternalLink,
  Gamepad2,
  BookOpen,
  Youtube,
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  Eye,
  Link2,
  Lightbulb,
} from "lucide-react";
import { mediaTools } from "@shared/schema";

import cardGameImg from "@assets/pic3_1764901434643.png";
import fakeItDashboardImg from "@assets/pic2_1764901434643.png";
import fakeItSimulationImg from "@assets/Picture1_1764901434643.png";

const categoryIcons: Record<string, typeof FileText> = {
  "Script Writing": FileText,
  "Storyboarding": Layout,
  "Video Editing": Video,
  "Audio Editing": Mic,
  "Image Design": Image,
};

const platformIcons: Record<string, typeof Monitor> = {
  Desktop: Monitor,
  Mobile: Smartphone,
  Web: Globe,
};

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
};

const games = [
  {
    name: "Fake it to Make it",
    description: "Create your own fake news website to understand how misinformation spreads. This game teaches you the tactics used to deceive people online.",
    url: "https://www.fakeittomakeitgame.com/",
    skills: ["Misinformation awareness", "Critical thinking", "Media analysis"],
    duration: "15-20 min",
  },
  {
    name: "Lamboozled",
    description: "A fast-paced game that challenges you to identify fake information quickly. Learn to spot the signs of misleading content.",
    url: "#",
    skills: ["Quick analysis", "Pattern recognition", "Fact-checking"],
    duration: "10-15 min",
  },
  {
    name: "Bad News",
    description: "Become a fake news tycoon and learn the six tactics of misinformation: impersonation, emotion, polarization, conspiracy, discredit, and trolling.",
    url: "https://www.getbadnews.com/",
    skills: ["Understanding propaganda", "Media literacy", "Critical analysis"],
    duration: "15-20 min",
  },
];

const videos = [
  {
    title: "The Role of Media in Society",
    description: "Understand how media shapes our understanding of the world and influences public opinion.",
    topic: "Media Literacy",
  },
  {
    title: "What is Misinformation?",
    description: "Learn about different types of false information and why it spreads so easily online.",
    topic: "Misinformation",
  },
  {
    title: "How to Verify Information",
    description: "Practical tips and strategies for fact-checking and verifying sources.",
    topic: "Fact-Checking",
  },
  {
    title: "Deconstructing Media Messages",
    description: "Learn to break down media to understand the techniques used to persuade audiences.",
    topic: "Media Analysis",
  },
  {
    title: "Constructing Your Own Media",
    description: "Basic principles of creating effective and responsible media content.",
    topic: "Media Creation",
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen py-12 md:py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Tools & Resources
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Create
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover beginner-friendly tools, games, and resources for your media projects.
            </p>
          </div>

          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-lg mx-auto mb-8">
              <TabsTrigger value="tools" data-testid="tab-tools">
                <FileText className="h-4 w-4 mr-2" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="factcheck" data-testid="tab-factcheck">
                <Shield className="h-4 w-4 mr-2" />
                Fact-Check
              </TabsTrigger>
              <TabsTrigger value="games" data-testid="tab-games">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Games
              </TabsTrigger>
              <TabsTrigger value="videos" data-testid="tab-videos">
                <Youtube className="h-4 w-4 mr-2" />
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tools">
              <div className="space-y-8">
                {mediaTools.map((category, i) => {
                  const Icon = categoryIcons[category.category] || FileText;
                  return (
                    <Card key={i} data-testid={`card-category-${i}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {category.tools.map((tool, j) => (
                            <Card key={j} className="bg-secondary/30 border-0 hover-elevate">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h4 className="font-semibold">{tool.name}</h4>
                                  <Badge
                                    variant="secondary"
                                    className={difficultyColors[tool.difficulty]}
                                  >
                                    {tool.difficulty}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {tool.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {tool.platforms.map((platform, k) => {
                                    const PlatformIcon = platformIcons[platform] || Globe;
                                    return (
                                      <Badge key={k} variant="outline" className="gap-1">
                                        <PlatformIcon className="h-3 w-3" />
                                        {platform}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="factcheck">
              <div className="space-y-6">
                <p className="text-muted-foreground text-center mb-6">
                  Learn how to verify information and spot misinformation online
                </p>

                <Card data-testid="card-sift-method">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Search className="h-5 w-5 text-accent" />
                      </div>
                      The SIFT Method
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      A simple 4-step process to evaluate information you find online
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { letter: "S", title: "Stop", desc: "Before sharing or believing, pause and think about what you're seeing", icon: AlertTriangle },
                        { letter: "I", title: "Investigate the Source", desc: "Who created this? Are they credible? Check their background", icon: Eye },
                        { letter: "F", title: "Find Better Coverage", desc: "Search for other sources reporting the same story", icon: Search },
                        { letter: "T", title: "Trace Claims", desc: "Follow the information back to its original source", icon: Link2 },
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30" data-testid={`sift-step-${i}`}>
                          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold shrink-0">
                            {step.letter}
                          </div>
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {step.title}
                              <step.icon className="h-4 w-4 text-accent" />
                            </h4>
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="card-warning-signs">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-chart-4" />
                      </div>
                      Warning Signs of Misinformation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { sign: "Clickbait headlines", desc: "Extreme or shocking titles designed to get clicks" },
                        { sign: "No author or date", desc: "Missing information about who wrote it and when" },
                        { sign: "Emotional language", desc: "Words designed to make you angry, scared, or excited" },
                        { sign: "No sources cited", desc: "Claims without links or references to verify" },
                        { sign: "Too good to be true", desc: "Stories that seem unbelievable or impossible" },
                        { sign: "Poor spelling/grammar", desc: "Lots of mistakes can indicate low-quality content" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 rounded-lg border" data-testid={`warning-sign-${i}`}>
                          <AlertTriangle className="h-4 w-4 text-chart-4 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{item.sign}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="card-fact-check-sites">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-chart-5/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-chart-5" />
                      </div>
                      Fact-Checking Websites
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Trusted sites that verify claims and debunk misinformation
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: "Snopes", url: "https://www.snopes.com", desc: "One of the oldest fact-checking sites, great for viral stories and urban legends" },
                        { name: "PolitiFact", url: "https://www.politifact.com", desc: "Focuses on political claims with a 'Truth-O-Meter' rating system" },
                        { name: "FactCheck.org", url: "https://www.factcheck.org", desc: "Non-partisan site that monitors accuracy in U.S. politics" },
                        { name: "AP Fact Check", url: "https://apnews.com/APFactCheck", desc: "Fact-checking by the Associated Press news organization" },
                      ].map((site, i) => (
                        <a
                          key={i}
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 hover-elevate"
                          data-testid={`factcheck-site-${i}`}
                        >
                          <div className="h-9 w-9 rounded-lg bg-chart-5/20 flex items-center justify-center shrink-0">
                            <Globe className="h-4 w-4 text-chart-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{site.name}</h4>
                              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">{site.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/30 bg-primary/5" data-testid="card-quick-tips">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <Lightbulb className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Quick Tips for Middle Schoolers</h3>
                        <ul className="space-y-2">
                          {[
                            "Ask yourself: 'Who made this and why?' before believing or sharing",
                            "If something makes you really angry or scared, that's a sign to slow down and check",
                            "Check if multiple reliable sources are reporting the same thing",
                            "Talk to a trusted adult if you're unsure about something you saw online",
                            "Remember: It's okay to not know everything - what matters is being willing to find out",
                          ].map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="games">
              <div className="space-y-6">
                <p className="text-muted-foreground text-center mb-6">
                  Interactive games that teach you about misinformation and media literacy
                </p>

                <Card className="overflow-hidden" data-testid="card-game-screenshots">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                        <Gamepad2 className="h-5 w-5 text-chart-3" />
                      </div>
                      Game Screenshots
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      See what these educational games look like in action
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-0 border-t">
                      <div className="relative">
                        <img 
                          src={cardGameImg} 
                          alt="Misinformation card game" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <Badge className="bg-chart-3 text-white border-0 mb-1">Card Game</Badge>
                          <p className="text-white text-sm font-medium">Learn tactics used in fake news</p>
                        </div>
                      </div>
                      <div className="relative">
                        <img 
                          src={fakeItDashboardImg} 
                          alt="Fake it to Make it dashboard" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <Badge className="bg-primary text-primary-foreground border-0 mb-1">Analytics</Badge>
                          <p className="text-white text-sm font-medium">Track how misinformation spreads</p>
                        </div>
                      </div>
                      <div className="relative">
                        <img 
                          src={fakeItSimulationImg} 
                          alt="Fake it simulation showing reactions" 
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <Badge className="bg-accent text-accent-foreground border-0 mb-1">Simulation</Badge>
                          <p className="text-white text-sm font-medium">See how people react to fake news</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {games.map((game, i) => (
                  <Card key={i} className="hover-elevate" data-testid={`card-game-${i}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                              <Gamepad2 className="h-5 w-5 text-chart-3" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{game.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {game.duration}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {game.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {game.skills.map((skill, j) => (
                              <Badge key={j} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {game.url !== "#" && (
                          <a
                            href={game.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline shrink-0"
                          >
                            Play Game
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="space-y-4">
                <p className="text-muted-foreground text-center mb-6">
                  Educational videos you'll watch during the bootcamp
                </p>
                {videos.map((video, i) => (
                  <Card key={i} className="hover-elevate" data-testid={`card-video-${i}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Youtube className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold">{video.title}</h3>
                            <Badge variant="outline">{video.topic}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {video.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-8 bg-primary/5 border-primary/20" data-testid="card-tip">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Pro Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    Don't worry if you haven't used these tools before! We'll guide you through everything during the bootcamp. Start with the "Easy" tools and work your way up as you get more comfortable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
