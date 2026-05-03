import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Video,
  Mic,
  Image,
  FileText,
  Lightbulb,
  Megaphone,
  Star,
  ArrowRight,
  Play,
  AlertCircle,
  PenTool,
  Presentation,
  Camera,
  Sparkles,
} from "lucide-react";
import type { ShowcaseProject } from "@shared/schema";

import waterbottleImg from "@assets/cvf_1764901434641.png";
import mangaImg from "@assets/nmm_1764901434642.png";
import workingYoungImg from "@assets/vvv_1764901434642.png";
import duckShopliftersImg from "@assets/bn_1764901434642.png";
import genshinImg from "@assets/vv_1764901434642.png";
import storyboardHandImg from "@assets/ss_1764901434642.png";
import stickyNotesImg from "@assets/ddd_1764901434642.png";
import storyboardSketchImg from "@assets/dd_1764901434643.png";
import scriptExcerptImg from "@assets/ppp_1764901434643.png";
import podcastTranscriptImg from "@assets/sss_1764901434644.png";

const projectTypeIcons: Record<string, typeof Video> = {
  video_essay: Video,
  podcast: Mic,
  photo_story: Image,
  digital_story: FileText,
  infographic: Lightbulb,
  meme_ad: Megaphone,
};

const projectTypeLabels: Record<string, string> = {
  video_essay: "Video Essay",
  podcast: "Podcast",
  photo_story: "Photo Story",
  digital_story: "Digital Story",
  infographic: "Infographic",
  meme_ad: "Advertisement",
};

const sampleProjects = [
  {
    id: "sample-1",
    title: "The Waterbottle",
    type: "video_essay",
    category: "Videos",
    creator: "Camp Participant",
    description: "A creative video exploring everyday objects and their stories.",
    image: waterbottleImg,
  },
  {
    id: "sample-2",
    title: "Manga Mansplained",
    type: "podcast",
    category: "Podcasts",
    creator: "Camp Participant",
    description: "A podcast episode reviewing games and manga with cool alliteration.",
    image: mangaImg,
  },
  {
    id: "sample-3",
    title: "Working Young",
    type: "digital_story",
    category: "Videos",
    creator: "Camp Participant",
    description: "A story about a kid named Da'morie who wants to help his community and make it better for the next generation.",
    image: workingYoungImg,
  },
  {
    id: "sample-4",
    title: "The Duck Shoplifters",
    type: "video_essay",
    category: "Videos",
    creator: "Camp Participant",
    description: "A creative short film with humor - 'Coming to no theater near you!'",
    image: duckShopliftersImg,
  },
  {
    id: "sample-5",
    title: "Genshin Impact Informational Slides",
    type: "infographic",
    category: "Infographics",
    creator: "Camp Participant",
    description: "Everything you need to know about Genshin Impact, presented in an engaging slide format.",
    image: genshinImg,
  },
  {
    id: "sample-6",
    title: "Shopping Script",
    type: "digital_story",
    category: "Scripts",
    creator: "Camp Participants",
    description: "A collaborative script with color-coded dialogue between friends deciding to go shopping.",
    image: scriptExcerptImg,
  },
  {
    id: "sample-7",
    title: "Podcast Transcript",
    type: "podcast",
    category: "Podcasts",
    creator: "Camp Participant",
    description: "A written transcript for a podcast episode reviewing 'Stray' - a game with amazing graphics and fulfilling storyline.",
    image: podcastTranscriptImg,
  },
];

const planningExamples = [
  {
    id: "plan-1",
    title: "Brainstorming Web",
    description: "Hand-drawn idea map exploring topics like food, shopping, horses, and creative concepts.",
    image: storyboardHandImg,
  },
  {
    id: "plan-2",
    title: "Team Planning Notes",
    description: "Colorful sticky notes with team ideas and project planning.",
    image: stickyNotesImg,
  },
  {
    id: "plan-3",
    title: "Storyboard Sketch",
    description: "A visual storyboard planning out scenes with drawings and notes.",
    image: storyboardSketchImg,
  },
];

function ProjectSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-4">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-5 w-3/4 mb-1" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </CardContent>
    </Card>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<string>("all");
  const [themeFilter, setThemeFilter] = useState<string>("all");

  const { data: projects, isLoading, error } = useQuery<ShowcaseProject[]>({
    queryKey: ["/api/showcase"],
  });

  const themes = projects ? Array.from(new Set(projects.map((p) => p.issueTheme))) : [];

  const filteredProjects = projects?.filter((project) => {
    const matchesType = filter === "all" || project.projectType === filter;
    const matchesTheme = themeFilter === "all" || project.issueTheme === themeFilter;
    return matchesType && matchesTheme;
  }) || [];

  const categories = ["All", "Videos", "Podcasts", "Infographics", "Scripts"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSamples = selectedCategory === "All" 
    ? sampleProjects 
    : sampleProjects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 md:py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Student Showcase
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Project Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore amazing media projects created by bootcamp participants
            </p>
          </div>

          <Tabs defaultValue="samples" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="samples" data-testid="tab-samples">
                <Star className="h-4 w-4 mr-2" />
                Sample Work
              </TabsTrigger>
              <TabsTrigger value="planning" data-testid="tab-planning">
                <PenTool className="h-4 w-4 mr-2" />
                Planning
              </TabsTrigger>
              <TabsTrigger value="submitted" data-testid="tab-submitted">
                <Presentation className="h-4 w-4 mr-2" />
                Submitted
              </TabsTrigger>
            </TabsList>

            <TabsContent value="samples">
              <div className="mb-6">
                <p className="text-center text-muted-foreground mb-4">
                  Real projects created by students during previous bootcamps
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                      data-testid={`button-filter-${cat.toLowerCase()}`}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSamples.map((project) => {
                  const Icon = projectTypeIcons[project.type] || FileText;
                  return (
                    <Card
                      key={project.id}
                      className="overflow-hidden hover-elevate group"
                      data-testid={`card-sample-${project.id}`}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className="gap-1 bg-primary text-primary-foreground border-0">
                            <Icon className="h-3 w-3" />
                            {projectTypeLabels[project.type]}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1 line-clamp-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {project.creator}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="planning">
              <div className="mb-6">
                <p className="text-center text-muted-foreground mb-6">
                  See how students plan their projects with brainstorming, storyboards, and notes
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {planningExamples.map((example) => (
                  <Card
                    key={example.id}
                    className="overflow-hidden hover-elevate group"
                    data-testid={`card-planning-${example.id}`}
                  >
                    <div className="aspect-square relative overflow-hidden bg-secondary/20">
                      <img 
                        src={example.image} 
                        alt={example.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="gap-1 bg-accent text-accent-foreground border-0">
                          <PenTool className="h-3 w-3" />
                          Planning
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{example.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {example.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 bg-accent/5 border-accent/20" data-testid="card-planning-tip">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                      <PenTool className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Planning is Key!</h3>
                      <p className="text-sm text-muted-foreground">
                        Great media projects start with great planning. Use brainstorming webs, sticky notes, and storyboards to organize your ideas before you start creating. It helps your team stay on the same page!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submitted">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full sm:w-48" data-testid="select-type-filter">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="video_essay">Video Essay</SelectItem>
                    <SelectItem value="podcast">Podcast</SelectItem>
                    <SelectItem value="photo_story">Photo Story</SelectItem>
                    <SelectItem value="digital_story">Digital Story</SelectItem>
                    <SelectItem value="infographic">Infographic</SelectItem>
                    <SelectItem value="meme_ad">Advertisement</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={themeFilter} onValueChange={setThemeFilter}>
                  <SelectTrigger className="w-full sm:w-48" data-testid="select-theme-filter">
                    <SelectValue placeholder="Filter by theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Themes</SelectItem>
                    {themes.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error ? (
                <div className="text-center py-16">
                  <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  </div>
                  <p className="text-muted-foreground mb-4">Failed to load projects. Please try again.</p>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Retry
                  </Button>
                </div>
              ) : isLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ProjectSkeleton key={i} />
                  ))}
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground mb-2">No submitted projects yet.</p>
                  <p className="text-sm text-muted-foreground mb-6">Be the first to share your creation!</p>
                  <Link href="/create">
                    <Button className="gap-2" data-testid="button-start-first">
                      Start Creating
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => {
                    const Icon = projectTypeIcons[project.projectType] || FileText;
                    return (
                      <Card
                        key={project.id}
                        className="overflow-hidden hover-elevate group"
                        data-testid={`card-project-${project.id}`}
                      >
                        <div className="aspect-video bg-gradient-to-br from-primary/20 via-chart-2/20 to-chart-3/20 dark:from-primary/30 dark:via-chart-2/30 dark:to-chart-3/30 relative flex items-center justify-center">
                          <div className="h-16 w-16 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur flex items-center justify-center">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          {project.featured && (
                            <div className="absolute top-3 right-3">
                              <Badge className="gap-1 bg-chart-3 text-white border-0">
                                <Star className="h-3 w-3" />
                                Featured
                              </Badge>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Badge variant="outline" className="shrink-0">
                              {projectTypeLabels[project.projectType]}
                            </Badge>
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {project.issueTheme}
                            </Badge>
                          </div>
                          <h3 className="font-semibold mb-1 line-clamp-1">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {project.creator}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Card className="inline-block bg-primary/5 dark:bg-primary/10 border-primary/20" data-testid="card-cta">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Ready to Create Your Own?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start your media project and showcase it here!
                </p>
                <Link href="/create">
                  <Button className="gap-2" data-testid="button-create-project">
                    Start Creating
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
