import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Lightbulb,
  FileText,
  Users,
  Video,
  Scissors,
  MessageSquare,
  Share2,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Plus,
  X,
  Mic,
  Image,
  PenTool,
  Megaphone,
  Star,
  Save,
  Loader2,
  Sparkles,
  Trophy,
  Zap,
  ChevronDown,
  Target,
  Rocket,
  PartyPopper,
  Flame,
  Crown,
  Globe,
  Search,
  Shield,
  AlertTriangle,
  Eye,
  Link2,
  TrendingUp,
  BookOpen,
  UserCheck,
  HelpCircle,
} from "lucide-react";
import type { ProjectType, InsertProject } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const steps = [
  { id: 1, title: "Conceptualize", icon: Lightbulb, description: "Choose your project type and idea", example: "e.g., Video essay about cyberbullying", color: "primary" },
  { id: 2, title: "Story & Script", icon: FileText, description: "Write your story and script", example: "e.g., Write interview questions, plan scenes", color: "accent" },
  { id: 3, title: "Plan & Collaborate", icon: Users, description: "Build your team and tasks", example: "e.g., Assign director, camera operator roles", color: "chart-3" },
  { id: 4, title: "Produce", icon: Video, description: "Record and create content", example: "e.g., Film interviews, record voiceover", color: "chart-4" },
  { id: 5, title: "Edit", icon: Scissors, description: "Polish your project", example: "e.g., Add music, trim clips, add captions", color: "chart-5" },
  { id: 6, title: "Review", icon: MessageSquare, description: "Get feedback and reflect", example: "e.g., Peer review, self-reflection checklist", color: "primary" },
  { id: 7, title: "Share", icon: Share2, description: "Showcase your work", example: "e.g., Upload to gallery, present to class", color: "accent" },
];

const projectTypes: { value: ProjectType; label: string; icon: typeof Video; desc: string }[] = [
  { value: "video_essay", label: "Video Essay", icon: Video, desc: "Tell a story through video" },
  { value: "podcast", label: "Podcast", icon: Mic, desc: "Share your voice" },
  { value: "photo_story", label: "Photo Story", icon: Image, desc: "Visual narratives" },
  { value: "digital_story", label: "Digital Story", icon: PenTool, desc: "Interactive storytelling" },
  { value: "infographic", label: "Infographic", icon: Lightbulb, desc: "Data visualization" },
  { value: "meme_ad", label: "Advertisement", icon: Megaphone, desc: "Persuasive media" },
];

const exampleIdeas = [
  "How social media affects our mental health",
  "Climate change in our local community",
  "The importance of recycling at school",
  "Cyberbullying and how to stop it",
  "Hidden history of our neighborhood",
];

const defaultTasks = [
  "Finalize script",
  "Gather props/materials",
  "Choose filming location",
  "Test recording equipment",
  "Create backup plan",
];

const teamRoles = [
  { role: "Director", color: "bg-primary" },
  { role: "Camera Operator", color: "bg-accent" },
  { role: "Actor/Host", color: "bg-chart-3" },
  { role: "Editor", color: "bg-chart-4" },
  { role: "Writer", color: "bg-chart-5" },
  { role: "Sound Designer", color: "bg-primary" },
  { role: "Researcher", color: "bg-accent" },
];

const getRoleColor = (role: string) => {
  const found = teamRoles.find(r => r.role === role);
  return found?.color || "bg-primary";
};

const ConfettiPiece = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute w-3 h-3 rounded-sm"
    style={{ 
      left: `${x}%`,
      backgroundColor: ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899'][Math.floor(Math.random() * 5)]
    }}
    initial={{ y: -20, opacity: 1, rotate: 0 }}
    animate={{ 
      y: 400, 
      opacity: 0, 
      rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
      x: (Math.random() - 0.5) * 100
    }}
    transition={{ duration: 2, delay, ease: "easeOut" }}
  />
);

const Confetti = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
    {Array.from({ length: 50 }).map((_, i) => (
      <ConfettiPiece key={i} delay={i * 0.02} x={Math.random() * 100} />
    ))}
  </div>
);

const CharacterCounter = ({ current, max, label }: { current: number; max: number; label: string }) => {
  const percentage = (current / max) * 100;
  const isNearLimit = percentage > 80;
  const isOverLimit = current > max;
  
  return (
    <div className="flex items-center gap-2 text-xs mt-1">
      <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
        <motion.div 
          className={`h-full rounded-full ${isOverLimit ? 'bg-destructive' : isNearLimit ? 'bg-chart-3' : 'bg-primary'}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className={`tabular-nums ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
        {current}/{max} {label}
      </span>
    </div>
  );
};

const AchievementBadge = ({ unlocked, title, icon: Icon }: { unlocked: boolean; title: string; icon: typeof Trophy }) => (
  <motion.div
    initial={false}
    animate={{ scale: unlocked ? 1 : 0.9, opacity: unlocked ? 1 : 0.4 }}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
      unlocked 
        ? 'bg-chart-3/20 text-chart-3 border border-chart-3/30' 
        : 'bg-secondary/50 text-muted-foreground'
    }`}
  >
    <Icon className="h-3.5 w-3.5" />
    {title}
    {unlocked && <Sparkles className="h-3 w-3" />}
  </motion.div>
);

// Source verification checklist items for each step
const verificationChecksByStep: Record<number, { id: string; label: string; tip: string }[]> = {
  1: [
    { id: "check-source", label: "I checked who created this information", tip: "Look for author names, organization, or credentials" },
    { id: "check-date", label: "I verified the information is recent/current", tip: "Old info may be outdated or no longer true" },
    { id: "check-multiple", label: "I found the same info from multiple sources", tip: "If only one source says it, be extra careful" },
    { id: "check-bias", label: "I considered if the source might be biased", tip: "Everyone has a perspective - what's theirs?" },
    { id: "check-evidence", label: "I looked for evidence/data to support claims", tip: "Good info has facts, not just opinions" },
  ],
  2: [
    { id: "script-facts", label: "All facts in my script are verified", tip: "Double-check statistics and quotes" },
    { id: "script-sources", label: "I can name my sources if asked", tip: "Keep track of where info comes from" },
    { id: "script-balanced", label: "I'm presenting information fairly", tip: "Show different sides when relevant" },
    { id: "script-original", label: "I'm using my own words, not copying", tip: "Summarize in your voice" },
  ],
  3: [
    { id: "team-research", label: "My team discussed our research sources", tip: "Share what you found with teammates" },
    { id: "team-factcheck", label: "We assigned someone to fact-check", tip: "Have a team member double-check facts" },
    { id: "team-sources", label: "We listed all our sources together", tip: "Keep a shared list of references" },
  ],
  4: [
    { id: "produce-accurate", label: "My visuals accurately represent the topic", tip: "Images should match what you're saying" },
    { id: "produce-permission", label: "I have permission for images/clips I use", tip: "Use royalty-free or your own media" },
    { id: "produce-quotes", label: "Any quotes or statistics are shown correctly", tip: "Don't misquote or change numbers" },
    { id: "produce-labels", label: "I'm clearly labeling opinions vs. facts", tip: "Make it clear what's your view vs. proven facts" },
  ],
  5: [
    { id: "edit-misleading", label: "My edits don't make info misleading", tip: "Don't cut clips in ways that change meaning" },
    { id: "edit-context", label: "I'm keeping things in context", tip: "Show the full picture, not just parts" },
    { id: "edit-sources", label: "I added source citations where needed", tip: "Give credit for facts and quotes" },
    { id: "edit-captions", label: "Text/captions are accurate and clear", tip: "Make sure on-screen text is correct" },
  ],
  6: [
    { id: "review-accuracy", label: "I asked a peer to check my facts", tip: "Fresh eyes can catch mistakes" },
    { id: "review-claims", label: "All major claims have supporting evidence", tip: "Can you prove what you're saying?" },
    { id: "review-fair", label: "The project represents the topic fairly", tip: "Would experts agree with your presentation?" },
    { id: "review-sources", label: "My sources are listed and accessible", tip: "Others should be able to verify your info" },
  ],
  7: [
    { id: "share-final", label: "I did a final fact-check before sharing", tip: "Last chance to catch any errors!" },
    { id: "share-credits", label: "All sources and credits are included", tip: "Acknowledge where info came from" },
    { id: "share-honest", label: "My project honestly represents my findings", tip: "Be proud of accurate work" },
    { id: "share-correction", label: "I'm ready to correct errors if found later", tip: "Good creators fix mistakes openly" },
  ],
};

// Step-specific context for the verification section
const stepVerificationContext: Record<number, { title: string; description: string }> = {
  1: { title: "Research Verification", description: "Before choosing your topic, make sure you can find reliable information about it." },
  2: { title: "Script Fact-Check", description: "Verify every fact and claim before including it in your script." },
  3: { title: "Team Source Review", description: "Work together to ensure your research is solid." },
  4: { title: "Production Accuracy", description: "Make sure your visuals and recordings are truthful." },
  5: { title: "Editing Integrity", description: "Keep your edits honest and maintain context." },
  6: { title: "Final Verification", description: "Get feedback on the accuracy of your project." },
  7: { title: "Sharing Responsibly", description: "Confirm everything is accurate before going public." },
};

export default function Create() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(true);
  const { toast } = useToast();

  const saveMutation = useMutation({
    mutationFn: async (projectData: Partial<InsertProject>) => {
      const response = await apiRequest("POST", "/api/projects", projectData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/showcase"] });
      setIsSaved(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      toast({
        title: "Project Saved!",
        description: "Your progress has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Save Failed",
        description: "Could not save your project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const [project, setProject] = useState<Partial<InsertProject>>({
    projectType: undefined,
    topic: "",
    audience: "",
    purpose: undefined,
    synopsis: "",
    script: "",
    storyboard: [
      { scene: 1, description: "" },
      { scene: 2, description: "" },
      { scene: 3, description: "" },
    ],
    teamMembers: [],
    tasks: defaultTasks.map((t) => ({ task: t, completed: false })),
    editingNotes: "",
    reflection: { proudOf: "", improve: "" },
    peerReview: { storyClarity: 0, soundQuality: 0, teamwork: 0, comments: "" },
    projectLink: "",
    projectDescription: "",
  });

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newTask, setNewTask] = useState("");
  const [selectedTypeAnimation, setSelectedTypeAnimation] = useState<string | null>(null);

  // Source verification checklist state - tracks checks for each step
  const [sourceVerification, setSourceVerification] = useState<Record<number, Record<string, boolean>>>({
    1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}
  });

  const toggleVerificationCheck = (step: number, checkId: string) => {
    setSourceVerification(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [checkId]: !prev[step]?.[checkId]
      }
    }));
  };

  const getVerificationProgress = (step: number, totalChecks: number) => {
    const completed = Object.values(sourceVerification[step] || {}).filter(Boolean).length;
    return { completed, total: totalChecks, percentage: totalChecks > 0 ? (completed / totalChecks) * 100 : 0 };
  };

  const completedSteps = new Set<number>();
  if (project.projectType && project.topic && project.audience && project.purpose) completedSteps.add(1);
  if (project.synopsis || project.script) completedSteps.add(2);
  if ((project.teamMembers?.length || 0) > 0 || (project.tasks?.some(t => t.completed))) completedSteps.add(3);
  if (currentStep > 4) completedSteps.add(4);
  if (project.editingNotes) completedSteps.add(5);
  if (project.reflection?.proudOf || project.peerReview?.storyClarity) completedSteps.add(6);
  if (project.projectLink || project.projectDescription) completedSteps.add(7);

  const updateProject = (updates: Partial<InsertProject>) => {
    setProject((prev) => ({ ...prev, ...updates }));
    setIsSaved(false);
  };

  const handleTypeSelect = (type: ProjectType) => {
    setSelectedTypeAnimation(type);
    updateProject({ projectType: type });
    setTimeout(() => setSelectedTypeAnimation(null), 600);
  };

  const addTeamMember = () => {
    if (newMemberName && newMemberRole) {
      updateProject({
        teamMembers: [...(project.teamMembers || []), { name: newMemberName, role: newMemberRole }],
      });
      setNewMemberName("");
      setNewMemberRole("");
    }
  };

  const removeTeamMember = (index: number) => {
    updateProject({
      teamMembers: project.teamMembers?.filter((_, i) => i !== index),
    });
  };

  const addTask = () => {
    if (newTask) {
      updateProject({
        tasks: [...(project.tasks || []), { task: newTask, completed: false }],
      });
      setNewTask("");
    }
  };

  const toggleTask = (index: number) => {
    const newTasks = [...(project.tasks || [])];
    newTasks[index].completed = !newTasks[index].completed;
    updateProject({ tasks: newTasks });
  };

  const removeTask = (index: number) => {
    updateProject({
      tasks: project.tasks?.filter((_, i) => i !== index),
    });
  };

  const updateStoryboard = (scene: number, description: string) => {
    const newStoryboard = [...(project.storyboard || [])];
    const index = newStoryboard.findIndex((s) => s.scene === scene);
    if (index >= 0) {
      newStoryboard[index].description = description;
    }
    updateProject({ storyboard: newStoryboard });
  };

  const addStoryboardScene = () => {
    const nextScene = (project.storyboard?.length || 0) + 1;
    updateProject({
      storyboard: [...(project.storyboard || []), { scene: nextScene, description: "" }],
    });
  };

  const progress = (currentStep / steps.length) * 100;
  const tasksCompleted = project.tasks?.filter(t => t.completed).length || 0;
  const totalTasks = project.tasks?.length || 0;
  const taskProgress = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return project.projectType && project.topic && project.audience && project.purpose;
      default:
        return true;
    }
  };

  const handleSave = () => {
    saveMutation.mutate(project);
  };

  const goToStep = (stepId: number) => {
    if (stepId >= 1 && stepId <= steps.length) {
      setCurrentStep(stepId);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Choose Your Project Type</h3>
                <Badge variant="secondary" className="gap-1">
                  <Zap className="h-3 w-3" />
                  Required
                </Badge>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTypes.map((type) => (
                  <motion.div
                    key={type.value}
                    whileTap={{ scale: 0.98 }}
                    animate={selectedTypeAnimation === type.value ? { 
                      scale: [1, 1.02, 1],
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover-elevate relative overflow-hidden ${
                        project.projectType === type.value
                          ? "ring-2 ring-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => handleTypeSelect(type.value)}
                      data-testid={`card-project-type-${type.value}`}
                    >
                      {project.projectType === type.value && (
                        <motion.div 
                          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
                          layoutId="selectedType"
                        />
                      )}
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          project.projectType === type.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary"
                        }`}>
                          <type.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{type.label}</p>
                          <p className="text-sm text-muted-foreground truncate">{type.desc}</p>
                        </div>
                        <AnimatePresence>
                          {project.projectType === type.value && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="topic" className="flex items-center gap-2">
                  Topic / Idea
                  <Badge variant="secondary" className="gap-1">
                    <Target className="h-3 w-3" />
                    Required
                  </Badge>
                </Label>
                <Input
                  id="topic"
                  placeholder="What societal issue do you want to address?"
                  value={project.topic}
                  onChange={(e) => updateProject({ topic: e.target.value })}
                  className="mt-1.5"
                  data-testid="input-topic"
                />
                <CharacterCounter current={project.topic?.length || 0} max={100} label="chars" />
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-chart-3" />
                    Need inspiration? Click one of these:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exampleIdeas.map((idea, i) => (
                      <motion.div key={i} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover-elevate"
                          onClick={() => updateProject({ topic: idea })}
                          data-testid={`badge-idea-${i}`}
                        >
                          {idea}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="audience">Who is your audience?</Label>
                <Input
                  id="audience"
                  placeholder="e.g., My classmates, Parents, Community members"
                  value={project.audience}
                  onChange={(e) => updateProject({ audience: e.target.value })}
                  className="mt-1.5"
                  data-testid="input-audience"
                />
              </div>

              <div>
                <Label>What is your purpose?</Label>
                <RadioGroup
                  value={project.purpose}
                  onValueChange={(value) => updateProject({ purpose: value as "inform" | "entertain" | "persuade" })}
                  className="mt-3 grid sm:grid-cols-3 gap-3"
                >
                  {[
                    { value: "inform", label: "Inform", desc: "Share facts", icon: Lightbulb, color: "primary" },
                    { value: "entertain", label: "Entertain", desc: "Engage & delight", icon: Sparkles, color: "accent" },
                    { value: "persuade", label: "Persuade", desc: "Change minds", icon: Megaphone, color: "chart-3" },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover-elevate ${
                        project.purpose === option.value
                          ? "border-primary bg-primary/5"
                          : "border-transparent bg-secondary/50"
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="sr-only" data-testid={`radio-${option.value}`} />
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                        project.purpose === option.value 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}>
                        <option.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-medium block">{option.label}</span>
                        <span className="text-sm text-muted-foreground">{option.desc}</span>
                      </div>
                      {project.purpose === option.value && (
                        <CheckCircle className="h-5 w-5 text-primary ml-auto shrink-0" />
                      )}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover-elevate" data-testid="card-research-sources">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Globe className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Where to Research Your Topic</h4>
                            <p className="text-sm text-muted-foreground">Find reliable sources for your project</p>
                          </div>
                        </div>
                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2 border-primary/20">
                    <CardContent className="p-4 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        When researching your topic, here's where most students look for information online:
                      </p>
                      <div className="grid gap-3">
                        {[
                          { icon: TrendingUp, source: "Social Media", desc: "YouTube, TikTok, Instagram - good for trends but verify claims", tip: "Check who posted it and if they're an expert", pct: "84%" },
                          { icon: Search, source: "Search Engines", desc: "Google, Bing - great starting point for research", tip: "Look past the first result; compare multiple sources", pct: "72%" },
                          { icon: Users, source: "Friends & Family", desc: "Peers share info through chats and messages", tip: "Even trusted people can share wrong info - always verify", pct: "67%" },
                          { icon: BookOpen, source: "Educational Sites", desc: "Wikipedia, Khan Academy, news sites for kids", tip: "Best for background info and understanding topics", pct: "45%" },
                          { icon: Globe, source: "Official Sources", desc: "Government sites (.gov), organizations, experts", tip: "Most reliable for facts and statistics", pct: "31%" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30" data-testid={`research-source-${i}`}>
                            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <item.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-medium">{item.source}</p>
                                <Badge variant="secondary" className="text-xs">{item.pct} use this</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                              <p className="text-xs text-primary mt-1 flex items-center gap-1">
                                <Lightbulb className="h-3 w-3" />
                                {item.tip}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover-elevate" data-testid="card-verify-info">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold">How to Check for Misinformation</h4>
                            <p className="text-sm text-muted-foreground">Make sure your info is accurate before using it</p>
                          </div>
                        </div>
                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2 border-accent/20">
                    <CardContent className="p-4 space-y-4">
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <h5 className="font-semibold text-accent flex items-center gap-2 mb-2">
                          <Search className="h-4 w-4" />
                          The SIFT Method - 4 Quick Steps
                        </h5>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {[
                            { letter: "S", title: "Stop", desc: "Pause before believing or sharing" },
                            { letter: "I", title: "Investigate", desc: "Check who made this content" },
                            { letter: "F", title: "Find", desc: "Look for other sources reporting it" },
                            { letter: "T", title: "Trace", desc: "Find the original source" },
                          ].map((step, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 rounded bg-background" data-testid={`sift-step-create-${i}`}>
                              <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-bold shrink-0">
                                {step.letter}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium">{step.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-chart-4" />
                          Warning Signs to Watch For
                        </h5>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {[
                            "Clickbait or shocking headlines",
                            "No author name or date",
                            "Makes you feel very angry or scared",
                            "No sources or links to verify",
                            "Spelling and grammar mistakes",
                            "Sounds too good to be true",
                          ].map((sign, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm" data-testid={`warning-sign-create-${i}`}>
                              <AlertTriangle className="h-3.5 w-3.5 text-chart-4 shrink-0" />
                              <span>{sign}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-chart-5" />
                          Quick Fact-Check Tools
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { name: "Snopes", url: "https://snopes.com" },
                            { name: "PolitiFact", url: "https://politifact.com" },
                            { name: "FactCheck.org", url: "https://factcheck.org" },
                            { name: "Google Fact Check", url: "https://toolbox.google.com/factcheck" },
                          ].map((site, i) => (
                            <a
                              key={i}
                              href={site.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-chart-5/10 text-sm font-medium text-chart-5 hover-elevate"
                              data-testid={`factcheck-link-${i}`}
                            >
                              <Globe className="h-3.5 w-3.5" />
                              {site.name}
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-primary" />
                            Source Verification Checklist
                          </h5>
                          <Badge 
                            variant={getVerificationProgress(1, verificationChecksByStep[1].length).percentage === 100 ? "default" : "secondary"}
                            className="gap-1"
                          >
                            <Shield className="h-3 w-3" />
                            {getVerificationProgress(1, verificationChecksByStep[1].length).completed}/{verificationChecksByStep[1].length} verified
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Check each box as you verify your sources. This helps ensure your project is based on accurate information.
                        </p>
                        <div className="space-y-2">
                          {verificationChecksByStep[1].map((check) => (
                            <motion.div
                              key={check.id}
                              whileTap={{ scale: 0.98 }}
                              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                sourceVerification[1]?.[check.id]
                                  ? "bg-chart-5/10 border border-chart-5/20"
                                  : "bg-secondary/30 hover-elevate"
                              }`}
                              onClick={() => toggleVerificationCheck(1, check.id)}
                              data-testid={`verify-check-1-${check.id}`}
                            >
                              <Checkbox
                                checked={sourceVerification[1]?.[check.id] || false}
                                onCheckedChange={() => toggleVerificationCheck(1, check.id)}
                                className="mt-0.5"
                                data-testid={`checkbox-verify-1-${check.id}`}
                              />
                              <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm ${sourceVerification[1]?.[check.id] ? "text-chart-5" : ""}`}>
                                  {check.label}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                  <HelpCircle className="h-3 w-3 shrink-0" />
                                  {check.tip}
                                </p>
                              </div>
                              {sourceVerification[1]?.[check.id] && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="shrink-0"
                                >
                                  <CheckCircle className="h-5 w-5 text-chart-5" />
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                        {getVerificationProgress(1, verificationChecksByStep[1].length).percentage === 100 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 rounded-lg bg-chart-5/10 border border-chart-5/20 text-center"
                          >
                            <div className="flex items-center justify-center gap-2 text-chart-5 font-medium">
                              <Shield className="h-5 w-5" />
                              All sources verified!
                              <Sparkles className="h-4 w-4" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Great job checking your facts before starting!
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {project.projectType && project.topic && project.audience && project.purpose && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/20"
              >
                <div className="flex items-center gap-2 text-chart-3">
                  <Trophy className="h-5 w-5" />
                  <span className="font-medium">Step 1 Complete!</span>
                  <Sparkles className="h-4 w-4" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Great job! You've defined your project concept. Click "Next" to continue.
                </p>
              </motion.div>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <Label htmlFor="synopsis" className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Synopsis
              </Label>
              <p className="text-sm text-muted-foreground mb-2">What happens in your story? Write a brief summary.</p>
              <Textarea
                id="synopsis"
                placeholder="In my video, I will explore how... The main message is..."
                value={project.synopsis}
                onChange={(e) => updateProject({ synopsis: e.target.value })}
                className="min-h-[120px]"
                data-testid="textarea-synopsis"
              />
              <CharacterCounter current={project.synopsis?.length || 0} max={500} label="chars" />
            </div>

            <div>
              <Label htmlFor="script" className="flex items-center gap-2 text-lg">
                <PenTool className="h-5 w-5 text-accent" />
                Script / Dialogue
              </Label>
              <p className="text-sm text-muted-foreground mb-2">Write your narration, dialogue, or talking points.</p>
              <Textarea
                id="script"
                placeholder="[INTRO]
Hello everyone, today we're going to talk about...

[MAIN POINTS]
First, let me explain...

[CONCLUSION]
In summary..."
                value={project.script}
                onChange={(e) => updateProject({ script: e.target.value })}
                className="min-h-[200px] font-mono text-sm"
                data-testid="textarea-script"
              />
              <div className="flex items-center justify-between mt-1">
                <CharacterCounter current={project.script?.length || 0} max={2000} label="chars" />
                <span className="text-xs text-muted-foreground">
                  ~{Math.ceil((project.script?.split(' ').length || 0) / 150)} min read
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-chart-3" />
                  <Label className="text-lg">Storyboard</Label>
                  <Badge variant="secondary">{project.storyboard?.length || 0} scenes</Badge>
                </div>
                <Button variant="outline" size="sm" onClick={addStoryboardScene} data-testid="button-add-scene">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Scene
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Plan your scenes visually. Drag to reorder.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.storyboard?.map((scene, index) => (
                  <motion.div
                    key={scene.scene}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    data-testid={`card-storyboard-scene-${scene.scene}`}
                  >
                    <Card className="bg-secondary/30 border-dashed hover-elevate">
                      <CardContent className="p-4">
                        <div className="h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex flex-col items-center justify-center mb-3 border-2 border-dashed border-muted">
                          <span className="text-2xl font-bold text-primary">{scene.scene}</span>
                          <span className="text-xs text-muted-foreground">Scene</span>
                        </div>
                        <Textarea
                          placeholder="Describe what happens..."
                          value={scene.description}
                          onChange={(e) => updateStoryboard(scene.scene, e.target.value)}
                          className="min-h-[80px] text-sm resize-none"
                          data-testid={`textarea-scene-${scene.scene}`}
                        />
                        <CharacterCounter current={scene.description.length} max={200} label="chars" />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <Collapsible open={tipsOpen} onOpenChange={setTipsOpen}>
              <Card className="bg-primary/5 border-primary/20">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover-elevate rounded-t-lg" data-testid="button-toggle-writing-tips">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        Writing Tips
                      </div>
                      <ChevronDown className={`h-5 w-5 transition-transform ${tipsOpen ? 'rotate-180' : ''}`} />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-chart-3 mt-0.5 shrink-0" />
                        Keep sentences short and clear
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-chart-3 mt-0.5 shrink-0" />
                        Use everyday language your audience understands
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-chart-3 mt-0.5 shrink-0" />
                        Include a strong opening to grab attention
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-chart-3 mt-0.5 shrink-0" />
                        End with a clear call to action or takeaway
                      </li>
                    </ul>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    {stepVerificationContext[2].title}
                  </div>
                  <Badge 
                    variant={getVerificationProgress(2, verificationChecksByStep[2].length).percentage === 100 ? "default" : "secondary"}
                    className="gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    {getVerificationProgress(2, verificationChecksByStep[2].length).completed}/{verificationChecksByStep[2].length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{stepVerificationContext[2].description}</p>
                <div className="space-y-2">
                  {verificationChecksByStep[2].map((check) => (
                    <motion.div
                      key={check.id}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        sourceVerification[2]?.[check.id]
                          ? "bg-chart-5/10 border border-chart-5/20"
                          : "bg-secondary/30 hover-elevate"
                      }`}
                      onClick={() => toggleVerificationCheck(2, check.id)}
                      data-testid={`verify-check-2-${check.id}`}
                    >
                      <Checkbox
                        checked={sourceVerification[2]?.[check.id] || false}
                        onCheckedChange={() => toggleVerificationCheck(2, check.id)}
                        className="mt-0.5"
                        data-testid={`checkbox-verify-2-${check.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${sourceVerification[2]?.[check.id] ? "text-chart-5" : ""}`}>
                          {check.label}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <HelpCircle className="h-3 w-3 shrink-0" />
                          {check.tip}
                        </p>
                      </div>
                      {sourceVerification[2]?.[check.id] && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="shrink-0">
                          <CheckCircle className="h-5 w-5 text-chart-5" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {getVerificationProgress(2, verificationChecksByStep[2].length).percentage === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-chart-5/10 border border-chart-5/20 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-chart-5 font-medium">
                      <Shield className="h-5 w-5" />
                      Script fact-checked!
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <Label className="text-lg">Team Members</Label>
                  <Badge variant="secondary">{project.teamMembers?.length || 0} members</Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <Input
                  placeholder="Name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="flex-1"
                  data-testid="input-member-name"
                />
                <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                  <SelectTrigger className="w-full sm:w-48" data-testid="select-member-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamRoles.map((item) => (
                      <SelectItem key={item.role} value={item.role}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${item.color}`} />
                          {item.role}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addTeamMember} disabled={!newMemberName || !newMemberRole} data-testid="button-add-member">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <AnimatePresence>
                  {project.teamMembers?.map((member, i) => (
                    <motion.div 
                      key={`${member.name}-${i}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover-elevate"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${getRoleColor(member.role)}`}>
                          {member.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <div className="flex items-center gap-1.5">
                            <div className={`h-2 w-2 rounded-full ${getRoleColor(member.role)}`} />
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeTeamMember(i)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {(project.teamMembers?.length || 0) === 0 && (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <Users className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No team members yet. Add yourself and your teammates!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <Label className="text-lg">Task Checklist</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={taskProgress} className="w-24 h-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {tasksCompleted}/{totalTasks}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Add a task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  data-testid="input-new-task"
                />
                <Button onClick={addTask} disabled={!newTask} data-testid="button-add-task">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <AnimatePresence>
                  {project.tasks?.map((task, i) => (
                    <motion.div 
                      key={`${task.task}-${i}`}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        task.completed ? 'bg-chart-3/10' : 'bg-secondary/50'
                      }`}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(i)}
                        data-testid={`checkbox-task-${i}`}
                      />
                      <span className={`flex-1 transition-all ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.task}
                      </span>
                      {task.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Sparkles className="h-4 w-4 text-chart-3" />
                        </motion.div>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => removeTask(i)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {taskProgress === 100 && totalTasks > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 rounded-lg bg-chart-3/10 border border-chart-3/20 text-center"
                >
                  <Trophy className="h-8 w-8 text-chart-3 mx-auto mb-2" />
                  <p className="font-medium text-chart-3">All tasks completed!</p>
                  <p className="text-sm text-muted-foreground">You're ready to move forward!</p>
                </motion.div>
              )}
            </div>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  Teamwork Tips
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <Flame className="h-4 w-4 text-chart-3 shrink-0 mt-0.5" />
                    Listen to everyone's ideas respectfully
                  </li>
                  <li className="flex items-start gap-2">
                    <Flame className="h-4 w-4 text-chart-3 shrink-0 mt-0.5" />
                    Give constructive feedback, not criticism
                  </li>
                  <li className="flex items-start gap-2">
                    <Flame className="h-4 w-4 text-chart-3 shrink-0 mt-0.5" />
                    Share responsibilities fairly
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-chart-3/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-chart-3" />
                    {stepVerificationContext[3].title}
                  </div>
                  <Badge 
                    variant={getVerificationProgress(3, verificationChecksByStep[3].length).percentage === 100 ? "default" : "secondary"}
                    className="gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    {getVerificationProgress(3, verificationChecksByStep[3].length).completed}/{verificationChecksByStep[3].length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{stepVerificationContext[3].description}</p>
                <div className="space-y-2">
                  {verificationChecksByStep[3].map((check) => (
                    <motion.div
                      key={check.id}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        sourceVerification[3]?.[check.id]
                          ? "bg-chart-5/10 border border-chart-5/20"
                          : "bg-secondary/30 hover-elevate"
                      }`}
                      onClick={() => toggleVerificationCheck(3, check.id)}
                      data-testid={`verify-check-3-${check.id}`}
                    >
                      <Checkbox
                        checked={sourceVerification[3]?.[check.id] || false}
                        onCheckedChange={() => toggleVerificationCheck(3, check.id)}
                        className="mt-0.5"
                        data-testid={`checkbox-verify-3-${check.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${sourceVerification[3]?.[check.id] ? "text-chart-5" : ""}`}>
                          {check.label}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <HelpCircle className="h-3 w-3 shrink-0" />
                          {check.tip}
                        </p>
                      </div>
                      {sourceVerification[3]?.[check.id] && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="shrink-0">
                          <CheckCircle className="h-5 w-5 text-chart-5" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {getVerificationProgress(3, verificationChecksByStep[3].length).percentage === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-chart-5/10 border border-chart-5/20 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-chart-5 font-medium">
                      <Shield className="h-5 w-5" />
                      Team sources reviewed!
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Equipment Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { item: "Phone or tablet for recording", tip: "Make sure it's charged!" },
                    { item: "External microphone (optional)", tip: "For clearer audio" },
                    { item: "Tripod or stable surface", tip: "Avoid shaky footage" },
                    { item: "Good lighting", tip: "Natural light works great" },
                    { item: "Quiet recording space", tip: "Minimize background noise" },
                    { item: "Props and materials", tip: "Gather everything you need" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -2 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 hover-elevate cursor-pointer"
                    >
                      <Checkbox data-testid={`checkbox-equipment-${i}`} />
                      <div className="flex-1">
                        <p className="font-medium">{item.item}</p>
                        <p className="text-sm text-muted-foreground">{item.tip}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" />
                    Framing a Shot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {[
                      "Rule of thirds: Don't center everything",
                      "Leave headroom above the subject",
                      "Keep the camera steady",
                      "Use landscape orientation for video"
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-chart-3 shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mic className="h-4 w-4 text-accent" />
                    Recording Audio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {[
                      "Get close to the microphone",
                      "Speak clearly and at a steady pace",
                      "Reduce background noise",
                      "Do a test recording first"
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-chart-3 shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-chart-3/10 border-chart-3/20">
              <CardContent className="p-4 flex items-start gap-3">
                <Zap className="h-5 w-5 text-chart-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Pro Tip: Keep Clips Short</h4>
                  <p className="text-sm text-muted-foreground">
                    Record shorter clips (10-30 seconds) rather than one long take. This makes editing much easier!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-chart-4/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-chart-4" />
                    {stepVerificationContext[4].title}
                  </div>
                  <Badge 
                    variant={getVerificationProgress(4, verificationChecksByStep[4].length).percentage === 100 ? "default" : "secondary"}
                    className="gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    {getVerificationProgress(4, verificationChecksByStep[4].length).completed}/{verificationChecksByStep[4].length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{stepVerificationContext[4].description}</p>
                <div className="space-y-2">
                  {verificationChecksByStep[4].map((check) => (
                    <motion.div
                      key={check.id}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        sourceVerification[4]?.[check.id]
                          ? "bg-chart-5/10 border border-chart-5/20"
                          : "bg-secondary/30 hover-elevate"
                      }`}
                      onClick={() => toggleVerificationCheck(4, check.id)}
                      data-testid={`verify-check-4-${check.id}`}
                    >
                      <Checkbox
                        checked={sourceVerification[4]?.[check.id] || false}
                        onCheckedChange={() => toggleVerificationCheck(4, check.id)}
                        className="mt-0.5"
                        data-testid={`checkbox-verify-4-${check.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${sourceVerification[4]?.[check.id] ? "text-chart-5" : ""}`}>
                          {check.label}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <HelpCircle className="h-3 w-3 shrink-0" />
                          {check.tip}
                        </p>
                      </div>
                      {sourceVerification[4]?.[check.id] && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="shrink-0">
                          <CheckCircle className="h-5 w-5 text-chart-5" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {getVerificationProgress(4, verificationChecksByStep[4].length).percentage === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-chart-5/10 border border-chart-5/20 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-chart-5 font-medium">
                      <Shield className="h-5 w-5" />
                      Production verified!
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-primary" />
                  Recommended Editing Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "CapCut", desc: "Free video editor with effects", level: "Easy", color: "bg-chart-3" },
                    { name: "iMovie", desc: "Apple's free editor", level: "Easy", color: "bg-primary" },
                    { name: "Clipchamp", desc: "Microsoft's online editor", level: "Easy", color: "bg-accent" },
                    { name: "Canva", desc: "Great for images/graphics", level: "Easy", color: "bg-chart-4" },
                  ].map((tool, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover-elevate"
                      data-testid={`card-editing-tool-${i}`}
                    >
                      <div className={`h-10 w-10 rounded-lg ${tool.color} flex items-center justify-center`}>
                        <Scissors className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{tool.name}</p>
                        <p className="text-sm text-muted-foreground">{tool.desc}</p>
                      </div>
                      <Badge variant="secondary">{tool.level}</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  Editing Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Import all clips and organize them",
                    "Cut out mistakes and awkward pauses",
                    "Add titles and text overlays",
                    "Add transitions between scenes",
                    "Add background music (if allowed)",
                    "Check audio levels are consistent",
                    "Add credits at the end",
                    "Export final version",
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-md hover-elevate cursor-pointer"
                    >
                      <Checkbox data-testid={`checkbox-editing-${i}`} />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div>
              <Label htmlFor="editing-notes" className="flex items-center gap-2 text-lg mb-2">
                <FileText className="h-5 w-5 text-primary" />
                Editing Notes
              </Label>
              <p className="text-sm text-muted-foreground mb-2">Keep track of changes you've made or need to make.</p>
              <Textarea
                id="editing-notes"
                placeholder="e.g., Need to re-record audio for scene 2, Add more B-roll footage..."
                value={project.editingNotes}
                onChange={(e) => updateProject({ editingNotes: e.target.value })}
                className="min-h-[120px]"
                data-testid="textarea-editing-notes"
              />
              <CharacterCounter current={project.editingNotes?.length || 0} max={500} label="chars" />
            </div>

            <Card className="border-chart-5/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-chart-5" />
                    {stepVerificationContext[5].title}
                  </div>
                  <Badge 
                    variant={getVerificationProgress(5, verificationChecksByStep[5].length).percentage === 100 ? "default" : "secondary"}
                    className="gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    {getVerificationProgress(5, verificationChecksByStep[5].length).completed}/{verificationChecksByStep[5].length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{stepVerificationContext[5].description}</p>
                <div className="space-y-2">
                  {verificationChecksByStep[5].map((check) => (
                    <motion.div
                      key={check.id}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        sourceVerification[5]?.[check.id]
                          ? "bg-chart-5/10 border border-chart-5/20"
                          : "bg-secondary/30 hover-elevate"
                      }`}
                      onClick={() => toggleVerificationCheck(5, check.id)}
                      data-testid={`verify-check-5-${check.id}`}
                    >
                      <Checkbox
                        checked={sourceVerification[5]?.[check.id] || false}
                        onCheckedChange={() => toggleVerificationCheck(5, check.id)}
                        className="mt-0.5"
                        data-testid={`checkbox-verify-5-${check.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${sourceVerification[5]?.[check.id] ? "text-chart-5" : ""}`}>
                          {check.label}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <HelpCircle className="h-3 w-3 shrink-0" />
                          {check.tip}
                        </p>
                      </div>
                      {sourceVerification[5]?.[check.id] && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="shrink-0">
                          <CheckCircle className="h-5 w-5 text-chart-5" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {getVerificationProgress(5, verificationChecksByStep[5].length).percentage === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-chart-5/10 border border-chart-5/20 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-chart-5 font-medium">
                      <Shield className="h-5 w-5" />
                      Editing verified!
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 6:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Self-Reflection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="proud" className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-chart-3" />
                    What are you most proud of?
                  </Label>
                  <Textarea
                    id="proud"
                    placeholder="I'm proud of how we..."
                    value={project.reflection?.proudOf}
                    onChange={(e) =>
                      updateProject({
                        reflection: { ...project.reflection!, proudOf: e.target.value },
                      })
                    }
                    className="mt-2 min-h-[100px]"
                    data-testid="textarea-proud"
                  />
                  <CharacterCounter current={project.reflection?.proudOf?.length || 0} max={300} label="chars" />
                </div>
                <div>
                  <Label htmlFor="improve" className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-accent" />
                    What would you improve next time?
                  </Label>
                  <Textarea
                    id="improve"
                    placeholder="Next time, I would..."
                    value={project.reflection?.improve}
                    onChange={(e) =>
                      updateProject({
                        reflection: { ...project.reflection!, improve: e.target.value },
                      })
                    }
                    className="mt-2 min-h-[100px]"
                    data-testid="textarea-improve"
                  />
                  <CharacterCounter current={project.reflection?.improve?.length || 0} max={300} label="chars" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-chart-3" />
                  Peer Review
                </CardTitle>
                <p className="text-sm text-muted-foreground">Rate your project (or have a friend rate it!)</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: "storyClarity", label: "Story Clarity", desc: "Is the message clear?", icon: FileText },
                  { key: "soundQuality", label: "Sound Quality", desc: "Can you hear everything clearly?", icon: Mic },
                  { key: "teamwork", label: "Teamwork", desc: "How well did the team work together?", icon: Users },
                ].map((item) => (
                  <div key={item.key} className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-primary" />
                        <div>
                          <Label>{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const currentRating = project.peerReview?.[item.key as keyof typeof project.peerReview] as number || 0;
                        const isSelected = star <= currentRating;
                        return (
                          <motion.button
                            key={star}
                            onClick={() =>
                              updateProject({
                                peerReview: {
                                  ...project.peerReview!,
                                  [item.key]: star,
                                },
                              })
                            }
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="focus:outline-none p-1"
                            data-testid={`button-star-${item.key}-${star}`}
                          >
                            <Star
                              className={`h-8 w-8 transition-colors ${
                                isSelected
                                  ? "fill-chart-3 text-chart-3"
                                  : "text-muted-foreground hover:text-chart-3/50"
                              }`}
                            />
                          </motion.button>
                        );
                      })}
                      <span className="ml-2 text-sm font-medium text-muted-foreground">
                        {(project.peerReview?.[item.key as keyof typeof project.peerReview] as number) || 0}/5
                      </span>
                    </div>
                  </div>
                ))}

                <div>
                  <Label htmlFor="comments">Additional Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="What worked well? What could be better?"
                    value={project.peerReview?.comments}
                    onChange={(e) =>
                      updateProject({
                        peerReview: { ...project.peerReview!, comments: e.target.value },
                      })
                    }
                    className="mt-2 min-h-[100px]"
                    data-testid="textarea-peer-comments"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {stepVerificationContext[6].title}
                  </div>
                  <Badge 
                    variant={getVerificationProgress(6, verificationChecksByStep[6].length).percentage === 100 ? "default" : "secondary"}
                    className="gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    {getVerificationProgress(6, verificationChecksByStep[6].length).completed}/{verificationChecksByStep[6].length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{stepVerificationContext[6].description}</p>
                <div className="space-y-2">
                  {verificationChecksByStep[6].map((check) => (
                    <motion.div
                      key={check.id}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        sourceVerification[6]?.[check.id]
                          ? "bg-chart-5/10 border border-chart-5/20"
                          : "bg-secondary/30 hover-elevate"
                      }`}
                      onClick={() => toggleVerificationCheck(6, check.id)}
                      data-testid={`verify-check-6-${check.id}`}
                    >
                      <Checkbox
                        checked={sourceVerification[6]?.[check.id] || false}
                        onCheckedChange={() => toggleVerificationCheck(6, check.id)}
                        className="mt-0.5"
                        data-testid={`checkbox-verify-6-${check.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${sourceVerification[6]?.[check.id] ? "text-chart-5" : ""}`}>
                          {check.label}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <HelpCircle className="h-3 w-3 shrink-0" />
                          {check.tip}
                        </p>
                      </div>
                      {sourceVerification[6]?.[check.id] && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="shrink-0">
                          <CheckCircle className="h-5 w-5 text-chart-5" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {getVerificationProgress(6, verificationChecksByStep[6].length).percentage === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-chart-5/10 border border-chart-5/20 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-chart-5 font-medium">
                      <Shield className="h-5 w-5" />
                      Final review complete!
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 7:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-primary/20 via-accent/20 to-chart-3/20 border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <CardContent className="p-8 text-center relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                    <PartyPopper className="h-10 w-10 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-bold mb-2 gradient-text">You Made It!</h3>
                <p className="text-muted-foreground text-lg">
                  Time to share your amazing creation with the world.
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <AchievementBadge unlocked={!!project.projectType} title="Concept Ready" icon={Lightbulb} />
                  <AchievementBadge unlocked={!!project.synopsis || !!project.script} title="Story Written" icon={FileText} />
                  <AchievementBadge unlocked={(project.teamMembers?.length || 0) > 0} title="Team Built" icon={Users} />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div>
                <Label htmlFor="project-link" className="flex items-center gap-2 text-lg">
                  <Share2 className="h-5 w-5 text-primary" />
                  Project Link
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Paste a link to your final project (YouTube, Google Drive, etc.)
                </p>
                <Input
                  id="project-link"
                  placeholder="https://..."
                  value={project.projectLink}
                  onChange={(e) => updateProject({ projectLink: e.target.value })}
                  data-testid="input-project-link"
                />
              </div>

              <div>
                <Label htmlFor="project-description" className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-accent" />
                  Project Description
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Write a brief description for the showcase gallery.
                </p>
                <Textarea
                  id="project-description"
                  placeholder="This project explores... We created it because..."
                  value={project.projectDescription}
                  onChange={(e) => updateProject({ projectDescription: e.target.value })}
                  className="min-h-[120px]"
                  data-testid="textarea-project-description"
                />
                <CharacterCounter current={project.projectDescription?.length || 0} max={300} label="chars" />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-chart-3" />
                  Project Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground text-xs uppercase tracking-wide">Project Type</p>
                    <p className="font-medium mt-1">
                      {projectTypes.find((t) => t.value === project.projectType)?.label || "Not selected"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground text-xs uppercase tracking-wide">Purpose</p>
                    <p className="font-medium capitalize mt-1">{project.purpose || "Not selected"}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground text-xs uppercase tracking-wide">Topic</p>
                    <p className="font-medium mt-1 truncate">{project.topic || "Not provided"}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-muted-foreground text-xs uppercase tracking-wide">Team Size</p>
                    <p className="font-medium mt-1">{project.teamMembers?.length || 0} members</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button 
                className="w-full gap-2 h-14 text-lg" 
                onClick={handleSave} 
                disabled={saveMutation.isPending}
                data-testid="button-submit-project"
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : isSaved ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Submitted! Submit Again?
                  </>
                ) : (
                  <>
                    <Rocket className="h-5 w-5" />
                    Submit to Showcase
                  </>
                )}
              </Button>
            </motion.div>

            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    {stepVerificationContext[7].title}
                  </div>
                  <Badge 
                    variant={getVerificationProgress(7, verificationChecksByStep[7].length).percentage === 100 ? "default" : "secondary"}
                    className="gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    {getVerificationProgress(7, verificationChecksByStep[7].length).completed}/{verificationChecksByStep[7].length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{stepVerificationContext[7].description}</p>
                <div className="space-y-2">
                  {verificationChecksByStep[7].map((check) => (
                    <motion.div
                      key={check.id}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        sourceVerification[7]?.[check.id]
                          ? "bg-chart-5/10 border border-chart-5/20"
                          : "bg-secondary/30 hover-elevate"
                      }`}
                      onClick={() => toggleVerificationCheck(7, check.id)}
                      data-testid={`verify-check-7-${check.id}`}
                    >
                      <Checkbox
                        checked={sourceVerification[7]?.[check.id] || false}
                        onCheckedChange={() => toggleVerificationCheck(7, check.id)}
                        className="mt-0.5"
                        data-testid={`checkbox-verify-7-${check.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${sourceVerification[7]?.[check.id] ? "text-chart-5" : ""}`}>
                          {check.label}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <HelpCircle className="h-3 w-3 shrink-0" />
                          {check.tip}
                        </p>
                      </div>
                      {sourceVerification[7]?.[check.id] && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="shrink-0">
                          <CheckCircle className="h-5 w-5 text-chart-5" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {getVerificationProgress(7, verificationChecksByStep[7].length).percentage === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-chart-5/10 border border-chart-5/20 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-chart-5 font-medium">
                      <Shield className="h-5 w-5" />
                      Ready to share responsibly!
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-16 bg-white dark:bg-background">
      {showConfetti && <Confetti />}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="secondary" className="mb-4 gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive Workspace
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Create Your Media Project
            </h1>
            <p className="text-lg text-muted-foreground">
              Follow the steps below to plan, create, and share your project.
            </p>
          </motion.div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Your Progress</span>
                <Badge variant="secondary" className="gap-1">
                  <Zap className="h-3 w-3" />
                  Step {currentStep} of {steps.length}
                </Badge>
              </div>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3" />
              <motion.div 
                className="absolute top-0 h-3 rounded-full bg-gradient-to-r from-primary via-accent to-chart-3 opacity-50"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {steps.map((step) => {
                const isCompleted = completedSteps.has(step.id);
                const isCurrent = currentStep === step.id;
                const isPast = step.id < currentStep;
                
                return (
                  <motion.button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-2 px-4 py-3 rounded-xl transition-all min-w-[140px] ${
                      isCurrent
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : isCompleted || isPast
                        ? "bg-primary/10 text-primary hover-elevate"
                        : "bg-secondary/50 text-muted-foreground hover-elevate"
                    }`}
                    data-testid={`step-${step.id}`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isCurrent 
                        ? "bg-white/20" 
                        : isCompleted
                        ? "bg-chart-3/20"
                        : "bg-muted"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-chart-3" />
                      ) : (
                        <step.icon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-xs opacity-70">Step {step.id}</p>
                      <p className="text-sm font-medium leading-tight">{step.title}</p>
                    </div>
                    {isCurrent && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-primary"
                        layoutId="currentStep"
                        initial={false}
                        style={{ x: '-50%' }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader className="border-b bg-secondary/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const StepIcon = steps[currentStep - 1].icon;
                    return (
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <StepIcon className="h-5 w-5 text-primary" />
                      </div>
                    );
                  })()}
                  <div>
                    <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {steps[currentStep - 1].description}
                    </p>
                    <p className="text-xs text-primary/70 mt-1">
                      {steps[currentStep - 1].example}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSave} 
                  disabled={saveMutation.isPending}
                  className="gap-1"
                  data-testid="button-save-progress"
                >
                  {saveMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isSaved ? "Saved" : "Save"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="gap-2"
              data-testid="button-previous"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(step.id)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    step.id === currentStep
                      ? "bg-primary w-6"
                      : completedSteps.has(step.id)
                      ? "bg-chart-3"
                      : "bg-muted"
                  }`}
                  aria-label={`Go to step ${step.id}`}
                  data-testid={`button-step-dot-${step.id}`}
                />
              ))}
            </div>

            <Button
              onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
              disabled={currentStep === steps.length || !canProceed()}
              className="gap-2"
              data-testid="button-next"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
