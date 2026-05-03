import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  GraduationCap,
  Target,
  Heart,
  Shield,
  Lightbulb,
  Video,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Globe,
  Search,
  MessageCircle,
  AlertTriangle,
  Eye,
  FileQuestion,
  Smartphone,
  TrendingUp,
  UserCheck,
  Link2,
  Megaphone,
} from "lucide-react";

import nikeAdImg from "@assets/dddd_1764901434643.png";
import legoAdImg from "@assets/cccc_1764901434643.png";

export default function About() {
  return (
    <div className="min-h-screen py-12 md:py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Media Literacy Program
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              About the Creative Media Bootcamp
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A research-based afterschool program helping middle schoolers develop media literacy skills while creating meaningful content.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">What Is This Study?</h2>
                <p className="text-muted-foreground mb-4">
                  We're looking for 15-20 middle schoolers aged 12-15 years (grades 6-8) to participate in an exciting program examining how creative media production can help students learn to use credible information.
                </p>
                <p className="text-muted-foreground">
                  This afterschool camp encourages adolescents to collaboratively design and produce media about issues they care about - to help make their voices heard and solve immediate local and societal problems. We are also interested in learning how they address misinformation they encounter during their media creation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Goals of the Bootcamp</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Shield, title: "Media Literacy", desc: "Evaluate and analyze media critically" },
                    { icon: Lightbulb, title: "Critical Thinking", desc: "Question sources and verify information" },
                    { icon: Users, title: "Collaboration", desc: "Work together on creative projects" },
                    { icon: Video, title: "Creative Expression", desc: "Tell stories that matter to you" },
                    { icon: Target, title: "Problem Solving", desc: "Address societal issues through media" },
                    { icon: Heart, title: "Digital Citizenship", desc: "Use media responsibly and ethically" },
                  ].map((goal, i) => (
                    <Card key={i} className="hover-elevate" data-testid={`card-goal-${i}`}>
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <goal.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">{goal.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Smartphone className="h-6 w-6 text-primary" />
                  Where Middle Schoolers Get Their Information
                </h2>
                <p className="text-muted-foreground mb-6">
                  Understanding how students access news and information online is crucial for teaching media literacy. Here's what research tells us about middle schoolers' media habits:
                </p>
                
                <div className="grid gap-4 mb-6">
                  <Card className="hover-elevate" data-testid="card-info-sources">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        Top Information Sources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { icon: TrendingUp, source: "Social Media", desc: "YouTube, TikTok, Instagram, and Snapchat are primary sources for news and trends", pct: "84%" },
                        { icon: Users, source: "Friends & Family", desc: "Peers share news through group chats and direct messages", pct: "67%" },
                        { icon: Search, source: "Search Engines", desc: "Google and other search engines for research and quick answers", pct: "72%" },
                        { icon: MessageCircle, source: "Messaging Apps", desc: "Discord, WhatsApp, and iMessage for sharing content", pct: "58%" },
                        { icon: Globe, source: "News Websites", desc: "Online news sites, often accessed through social media links", pct: "31%" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30" data-testid={`info-source-${i}`}>
                          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <item.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{item.source}</p>
                              <Badge variant="secondary">{item.pct}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="hover-elevate" data-testid="card-verify-misinfo">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5 text-accent" />
                        How Students Check for Misinformation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Research shows that many young people struggle to identify false information. Here are common verification methods students use:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { icon: Search, method: "Search it up", desc: "Look for the same story on Google or other search engines" },
                          { icon: UserCheck, method: "Ask trusted adults", desc: "Check with parents, teachers, or older siblings" },
                          { icon: Link2, method: "Check the source", desc: "Look at who posted it and their profile" },
                          { icon: Eye, method: "Look for evidence", desc: "See if there are photos, videos, or links to support claims" },
                          { icon: MessageCircle, method: "Ask friends", desc: "Discuss with peers to see if they've heard the same thing" },
                          { icon: FileQuestion, method: "Fact-check sites", desc: "Use sites like Snopes or PolitiFact (less common)" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 rounded-lg border" data-testid={`verify-method-${i}`}>
                            <item.icon className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium">{item.method}</p>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-accent/30 bg-accent/5" data-testid="card-misinfo-warning">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                          <AlertTriangle className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-accent mb-1">Why This Matters</h4>
                          <p className="text-sm text-muted-foreground">
                            Studies show that only 33% of middle schoolers can accurately identify sponsored content, and many struggle to distinguish satire from real news. Our bootcamp teaches critical evaluation skills that help students become more discerning consumers of media.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Megaphone className="h-6 w-6 text-chart-3" />
                  Analyzing Media: Advertisements
                </h2>
                <p className="text-muted-foreground mb-6">
                  Students learn to deconstruct and analyze media, including advertisements. Here are examples of the types of media we explore together:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <Card className="overflow-hidden hover-elevate" data-testid="card-ad-nike">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img 
                        src={nikeAdImg} 
                        alt="Nike Air advertisement example" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-chart-3 text-white border-0">Classic Ad</Badge>
                      <h4 className="font-semibold mb-1">Analyzing Messages</h4>
                      <p className="text-sm text-muted-foreground">
                        What message is this ad sending? Who is the target audience? What techniques are used to persuade?
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden hover-elevate" data-testid="card-ad-lego">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img 
                        src={legoAdImg} 
                        alt="LEGO advertisement example" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-primary text-primary-foreground border-0">Brand Ad</Badge>
                      <h4 className="font-semibold mb-1">Understanding Branding</h4>
                      <p className="text-sm text-muted-foreground">
                        How do brands build emotional connections? What values are being associated with the product?
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Program Structure</h2>
                <div className="space-y-4">
                  <Card data-testid="card-week-1-2">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge>Weeks 1-2</Badge>
                        <CardTitle className="text-lg">Explore & Learn</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Develop Technobiography - explore your media usage and tech access</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Select and evaluate media sources for credibility</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Play games like "Fake it to Make it" and "Lamboozled"</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Learn to distinguish accurate from false information</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card data-testid="card-week-3">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Week 3</Badge>
                        <CardTitle className="text-lg">Deconstruct & Construct</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Explore how others create media</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Learn techniques for creating memes, ads, and infographics</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Plan your story with characters, themes, and conflict</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card data-testid="card-week-4-5">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Weeks 4-5</Badge>
                        <CardTitle className="text-lg">Create & Showcase</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Produce your media project with peer and researcher support</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Refine and improve based on feedback</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Present final project at the showcase</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Build a digital portfolio to continue adding to</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="students">
                    <AccordionTrigger className="text-left" data-testid="accordion-students">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <span>What Students Will Gain</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 ml-7">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Skills to identify and evaluate credible information online</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Experience creating various media formats (video, audio, images)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Collaboration and teamwork skills</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>A digital portfolio showcasing their creative work</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Understanding of how media shapes public opinion</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="parents">
                    <AccordionTrigger className="text-left" data-testid="accordion-parents">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-primary" />
                        <span>What Parents Should Know</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 ml-7">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>This is an approved educational research program</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>All activities are supervised by trained researchers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Your child will develop critical digital citizenship skills</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Participation is voluntary and can be withdrawn at any time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>Students will have a tangible portfolio of work to keep</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24" data-testid="card-key-details">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Key Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Who</p>
                      <p className="text-sm text-muted-foreground">
                        15-20 middle schoolers, Grades 6-8 (ages 12-15)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">
                        6 weeks, 12 sessions (2x per week)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">
                        ~1 hour per session (afterschool)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Local Middle School
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Organized by</p>
                    <p className="text-sm text-muted-foreground">
                      Department of Education and Human Development
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Link href="/schedule">
              <Button size="lg" className="gap-2" data-testid="button-view-schedule">
                View Full Schedule
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
