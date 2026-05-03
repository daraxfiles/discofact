import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Flame,
  GitBranch,
  Hand,
  Megaphone,
  MessageCircle,
  Newspaper,
  Radio,
  RefreshCcw,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type GameStat = "reach" | "trust" | "resilience";

type Choice = {
  label: string;
  icon: typeof Flame;
  effects: Record<GameStat, number>;
  mutation: string;
  defense: string;
  tool: string;
  lesson: string;
};

type Round = {
  title: string;
  scene: string;
  prompt: string;
  feed: string;
  signal: string;
  choices: Choice[];
};

const rounds: Round[] = [
  {
    title: "The Mystery Photo",
    scene: "A blurry picture is spreading through the school group chat.",
    prompt: "How do you respond before it gets bigger?",
    feed: "Unconfirmed: strange object spotted behind the gym after practice.",
    signal: "Blurry images feel exciting, but they are weak evidence until the source, time, and place are checked.",
    choices: [
      {
        label: "Post a dramatic caption",
        icon: Flame,
        effects: { reach: 24, trust: -14, resilience: 6 },
        mutation: "The object becomes a \"secret experiment\" in reposts.",
        defense: "Emotion check",
        tool: "Slow-mode reminder",
        lesson:
          "Emotion-first framing can make a post travel fast, but it trains you to notice how hype outruns evidence.",
      },
      {
        label: "Ask for the original source",
        icon: BadgeCheck,
        effects: { reach: 8, trust: 20, resilience: 18 },
        mutation: "The rumor thread adds a source-needed label.",
        defense: "Source ladder",
        tool: "Original upload request",
        lesson:
          "Asking where a claim came from slows the spread and makes the conversation easier to verify.",
      },
      {
        label: "Make a reaction poll",
        icon: MessageCircle,
        effects: { reach: 16, trust: -4, resilience: 10 },
        mutation: "The rumor turns into a team-vote argument.",
        defense: "Evidence over votes",
        tool: "Poll context note",
        lesson:
          "Polls can make uncertainty feel like a popularity contest. Useful questions focus on evidence, not vibes.",
      },
    ],
  },
  {
    title: "The Viral Quote",
    scene: "A quote card claims a local celebrity said something outrageous.",
    prompt: "Pick the move that shapes the next wave.",
    feed: "\"Everyone knows the cafeteria is hiding the truth.\" - celebrity quote card",
    signal: "Quote cards are easy to fake. Look for original video, article context, or a reliable transcript.",
    choices: [
      {
        label: "Share it with a warning",
        icon: AlertTriangle,
        effects: { reach: 18, trust: -8, resilience: 8 },
        mutation: "The warning gets cropped away in screenshots.",
        defense: "Amplification check",
        tool: "Share preview warning",
        lesson:
          "Even sharing with a warning can amplify a claim. Screenshots travel farther than corrections.",
      },
      {
        label: "Search for the first appearance",
        icon: Target,
        effects: { reach: 6, trust: 22, resilience: 20 },
        mutation: "The quote card is linked back to an edited repost.",
        defense: "First-source trace",
        tool: "Timeline scanner",
        lesson:
          "Finding the earliest version often reveals whether a quote is real, cropped, remixed, or invented.",
      },
      {
        label: "Turn it into a meme",
        icon: Zap,
        effects: { reach: 26, trust: -16, resilience: 4 },
        mutation: "The joke spreads after people forget the claim is unverified.",
        defense: "Humor guard",
        tool: "Meme context sticker",
        lesson:
          "Humor lowers people's guard. A funny post can still spread a false claim very efficiently.",
      },
    ],
  },
  {
    title: "The Comment Storm",
    scene: "Two friend groups are arguing under a post, and the thread is getting messy.",
    prompt: "Choose how your account behaves.",
    feed: "Comments are moving too fast to read. People are picking sides.",
    signal: "High-speed conflict rewards snap judgments. Pausing can be a power move.",
    choices: [
      {
        label: "Use us-vs-them language",
        icon: Users,
        effects: { reach: 22, trust: -18, resilience: 8 },
        mutation: "The thread splits into sides instead of checking facts.",
        defense: "Polarization radar",
        tool: "De-escalation prompt",
        lesson:
          "Group identity can boost engagement, but it also makes people less curious and more defensive.",
      },
      {
        label: "Pin a context check",
        icon: Shield,
        effects: { reach: 10, trust: 18, resilience: 22 },
        mutation: "The top comment becomes a shared evidence checkpoint.",
        defense: "Pinned context",
        tool: "Moderator pin",
        lesson:
          "A visible context check gives people a shared place to slow down and compare evidence.",
      },
      {
        label: "Ask one clear question",
        icon: Brain,
        effects: { reach: 12, trust: 14, resilience: 16 },
        mutation: "The argument shifts toward one answerable question.",
        defense: "Question framing",
        tool: "Clarifying reply",
        lesson:
          "A precise question can cool down a chaotic thread without shaming people who were pulled in.",
      },
    ],
  },
  {
    title: "The Correction",
    scene: "New evidence shows the original story was wrong.",
    prompt: "What happens next?",
    feed: "Update: the photo was from last year and the quote card was edited.",
    signal: "Corrections work best when they are clear, visible, and easier to understand than the rumor.",
    choices: [
      {
        label: "Quietly delete old posts",
        icon: RefreshCcw,
        effects: { reach: -4, trust: 2, resilience: 8 },
        mutation: "The old version fades, but the correction is easy to miss.",
        defense: "Correction visibility",
        tool: "Post archive",
        lesson:
          "Deleting reduces clutter, but people who saw the first post may never see what changed.",
      },
      {
        label: "Publish a clear correction",
        icon: CheckCircle2,
        effects: { reach: 8, trust: 26, resilience: 24 },
        mutation: "The feed now carries a plain-language correction card.",
        defense: "Repair card",
        tool: "Correction banner",
        lesson:
          "A correction with the old claim, the new evidence, and the takeaway helps repair the information space.",
      },
      {
        label: "Blame everyone else",
        icon: Megaphone,
        effects: { reach: 14, trust: -20, resilience: 2 },
        mutation: "The correction becomes another argument about responsibility.",
        defense: "Accountability check",
        tool: "Tone reset",
        lesson:
          "Deflection may keep attention on you, but it makes future posts harder to trust.",
      },
    ],
  },
];

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export default function Home() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [stats, setStats] = useState<Record<GameStat, number>>({
    reach: 34,
    trust: 62,
    resilience: 18,
  });
  const [history, setHistory] = useState<
    Array<{ round: string; choice: string; lesson: string; mutation: string; defense: string; tool: string }>
  >([]);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [mutationTrail, setMutationTrail] = useState<string[]>([
    "Original claim: a blurry post appears with no source.",
  ]);
  const [defenses, setDefenses] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);

  const currentRound = rounds[roundIndex];
  const complete = roundIndex >= rounds.length;

  const score = useMemo(
    () => Math.round(stats.trust * 0.45 + stats.resilience * 0.45 + stats.reach * 0.1),
    [stats],
  );

  const classPulse = useMemo(
    () => ({
      curiosity: clamp(Math.round(stats.trust * 0.55 + stats.resilience * 0.35)),
      pressure: clamp(Math.round(stats.reach * 0.75 + (100 - stats.trust) * 0.2)),
      confusion: clamp(Math.round(72 - stats.resilience * 0.45 + stats.reach * 0.12)),
    }),
    [stats],
  );

  const handleChoice = (choice: Choice) => {
    const nextStats = {
      reach: clamp(stats.reach + choice.effects.reach),
      trust: clamp(stats.trust + choice.effects.trust),
      resilience: clamp(stats.resilience + choice.effects.resilience),
    };

    setStats(nextStats);
    setHistory((items) => [
      ...items,
      {
        round: currentRound.title,
        choice: choice.label,
        lesson: choice.lesson,
        mutation: choice.mutation,
        defense: choice.defense,
        tool: choice.tool,
      },
    ]);
    setMutationTrail((items) => [...items, choice.mutation]);
    setDefenses((items) => (items.includes(choice.defense) ? items : [...items, choice.defense]));
    setTools((items) => (items.includes(choice.tool) ? items : [...items, choice.tool]));
    setSelectedLesson(choice.lesson);
  };

  const continueGame = () => {
    setSelectedLesson(null);
    setRoundIndex((index) => index + 1);
  };

  const resetGame = () => {
    setRoundIndex(0);
    setStats({ reach: 34, trust: 62, resilience: 18 });
    setHistory([]);
    setSelectedLesson(null);
    setMutationTrail(["Original claim: a blurry post appears with no source."]);
    setDefenses([]);
    setTools([]);
  };

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#0d2033] text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[8%] top-10 h-44 w-44 rounded-full bg-cyan-400 blur-3xl" />
          <div className="absolute bottom-[-4rem] right-[12%] h-56 w-56 rounded-full bg-amber-300 blur-3xl" />
        </div>
        <div className="container relative mx-auto grid min-h-[520px] items-center gap-10 px-4 py-10 lg:grid-cols-[1fr_420px] lg:py-14">
          <div className="max-w-3xl">
            <Badge className="mb-5 gap-2 border-white/20 bg-white/10 text-white hover:bg-white/15">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive media literacy game
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Signal Lab
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cyan-50 md:text-xl">
              Play through a fictional social feed, make the pressure-filled calls, and learn how rumors,
              outrage, quote cards, and corrections change what people believe. This version tracks how a
              claim mutates and lets you build a moderator toolkit as you go.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-2 bg-amber-300 text-slate-950 hover:bg-amber-200"
                onClick={resetGame}
                data-testid="button-start-game"
              >
                <Newspaper className="h-4 w-4" />
                Start mission
              </Button>
              <a href="#play">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Shield className="h-4 w-4" />
                  Open game board
                </Button>
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-md bg-slate-950/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-300" />
                </div>
                <Badge variant="secondary" className="bg-cyan-100 text-slate-900">
                  live feed
                </Badge>
              </div>
              <div className="space-y-3">
                {["Rumor", "Context", "Correction"].map((item, index) => (
                  <div
                    key={item}
                    className={cn(
                      "rounded-md border p-3",
                      index === 0 && "border-rose-300/40 bg-rose-400/10",
                      index === 1 && "border-cyan-300/40 bg-cyan-400/10",
                      index === 2 && "border-emerald-300/40 bg-emerald-400/10",
                    )}
                  >
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-slate-300">
                      <span>{item}</span>
                      <span>{index === 0 ? "fast" : index === 1 ? "checked" : "repair"}</span>
                    </div>
                    <div className="h-2 rounded bg-white/80" />
                    <div className="mt-2 h-2 w-2/3 rounded bg-white/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="play" className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <Badge variant="outline" className="mb-2 gap-2">
                  <Target className="h-3.5 w-3.5" />
                  Mission {Math.min(roundIndex + 1, rounds.length)} / {rounds.length}
                </Badge>
                <h2 className="text-2xl font-bold md:text-3xl">
                  {complete ? "Debrief: Media Immunity Report" : currentRound.title}
                </h2>
              </div>
              <Button variant="outline" className="gap-2" onClick={resetGame} data-testid="button-reset-game">
                <RefreshCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>

            {complete ? (
              <div className="grid gap-6 md:grid-cols-[1fr_260px]">
                <div className="rounded-lg bg-slate-50 p-5">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <Shield className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold">Your final score is {score}/100</h3>
                  <p className="mt-3 text-slate-600">
                    Strong players do not just chase reach. They build trust, slow down suspicious claims,
                    and make corrections visible when better evidence arrives.
                  </p>
                  <div className="mt-5 space-y-3">
                    {history.map((item) => (
                      <div key={`${item.round}-${item.choice}`} className="rounded-md border border-slate-200 bg-white p-3">
                        <div className="text-sm font-semibold text-slate-900">
                          {item.round}: {item.choice}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{item.lesson}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge variant="outline" className="gap-1">
                            <GitBranch className="h-3 w-3" />
                            {item.defense}
                          </Badge>
                          <Badge variant="secondary" className="gap-1 bg-cyan-100 text-cyan-950">
                            <ClipboardCheck className="h-3 w-3" />
                            {item.tool}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 p-5">
                  <h3 className="font-semibold">Unlocked defenses</h3>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <div className="flex gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-cyan-600" />
                      Check source, date, and original context.
                    </div>
                    <div className="flex gap-2">
                      <Brain className="mt-0.5 h-4 w-4 text-emerald-600" />
                      Notice emotion spikes before sharing.
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-amber-600" />
                      Make corrections clear and visible.
                    </div>
                  </div>
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <h3 className="font-semibold">Mutation path</h3>
                    <div className="mt-3 space-y-2">
                      {mutationTrail.map((item, index) => (
                        <div key={`${item}-${index}`} className="flex gap-2 text-sm text-slate-600">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                <div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Badge className="bg-slate-900 text-white">fictional feed</Badge>
                      <span className="text-sm text-slate-500">2.4k watching</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-950">{currentRound.feed}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-20 rounded-md bg-cyan-100" />
                      <div className="h-20 rounded-md bg-amber-100" />
                      <div className="h-20 rounded-md bg-rose-100" />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-slate-600" />
                        <h3 className="font-semibold">Rumor mutation trace</h3>
                      </div>
                      <div className="space-y-2">
                        {mutationTrail.map((item, index) => (
                          <div key={`${item}-${index}`} className="flex gap-3 rounded-md bg-slate-50 p-2 text-sm text-slate-600">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                              {index + 1}
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Radio className="h-4 w-4 text-slate-600" />
                        <h3 className="font-semibold">Class pulse</h3>
                      </div>
                      <MiniMeter label="Curiosity" value={classPulse.curiosity} color="bg-emerald-500" />
                      <MiniMeter label="Pressure" value={classPulse.pressure} color="bg-amber-400" />
                      <MiniMeter label="Confusion" value={classPulse.confusion} color="bg-rose-400" />
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg border border-cyan-200 bg-cyan-50 p-4">
                    <div className="flex gap-3">
                      <Brain className="mt-1 h-5 w-5 shrink-0 text-cyan-700" />
                      <div>
                        <h3 className="font-semibold text-cyan-950">{currentRound.scene}</h3>
                        <p className="mt-1 text-sm leading-6 text-cyan-900">{currentRound.signal}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">{currentRound.prompt}</h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    {currentRound.choices.map((choice) => {
                      const Icon = choice.icon;
                      return (
                        <button
                          key={choice.label}
                          className="group rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:border-slate-200 disabled:hover:shadow-sm"
                          onClick={() => handleChoice(choice)}
                          disabled={selectedLesson !== null}
                          data-testid={`choice-${choice.label.toLowerCase().replaceAll(" ", "-")}`}
                        >
                          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-800 group-hover:bg-cyan-100">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="font-semibold">{choice.label}</div>
                          <div className="mt-3 space-y-1 text-xs text-slate-500">
                            <div>Reach {choice.effects.reach > 0 ? "+" : ""}{choice.effects.reach}</div>
                            <div>Trust {choice.effects.trust > 0 ? "+" : ""}{choice.effects.trust}</div>
                            <div>Immunity {choice.effects.resilience > 0 ? "+" : ""}{choice.effects.resilience}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <aside className="rounded-lg border border-slate-200 bg-white p-4">
                  <h3 className="mb-4 font-semibold">Signal meters</h3>
                  <StatMeter icon={TrendingUp} label="Reach" value={stats.reach} color="bg-amber-400" />
                  <StatMeter icon={BadgeCheck} label="Trust" value={stats.trust} color="bg-cyan-500" />
                  <StatMeter icon={Shield} label="Immunity" value={stats.resilience} color="bg-emerald-500" />
                  <div className="mt-5 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                    Reach is not the same as winning. The best ending balances attention with evidence and repair.
                  </div>
                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <h3 className="mb-3 font-semibold">Moderator toolkit</h3>
                    <ToolList title="Defenses" items={defenses} empty="No defenses unlocked yet." icon={Eye} />
                    <ToolList title="Tools" items={tools} empty="Choose a move to unlock one." icon={Hand} />
                  </div>
                </aside>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Current lesson</h3>
              {selectedLesson ? (
                <div className="mt-3">
                  <p className="text-sm leading-6 text-slate-600">{selectedLesson}</p>
                  <Button className="mt-4 w-full gap-2" onClick={continueGame} data-testid="button-continue">
                    Continue
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Choose a move on the game board. After each round, you will see what that media tactic does to a conversation.
                </p>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Unique mode</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Signal Lab shows the life of a rumor, not just the score. Watch the claim mutate, collect defenses,
                and see how your class pulse changes after every decision.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function StatMeter({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Icon className="h-4 w-4 text-slate-600" />
          {label}
        </div>
        <span className="text-sm text-slate-500">{value}</span>
      </div>
      <Progress value={value} className="h-2 bg-slate-100 [&>div]:bg-slate-900" />
      <div className={cn("mt-1 h-1 rounded-full", color)} style={{ width: `${value}%` }} />
    </div>
  );
}

function MiniMeter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ToolList({
  title,
  items,
  empty,
  icon: Icon,
}: {
  title: string;
  items: string[];
  empty: string;
  icon: typeof Eye;
}) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge key={item} variant="outline" className="bg-white">
              {item}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="rounded-md bg-slate-50 p-2 text-sm text-slate-500">{empty}</p>
      )}
    </div>
  );
}
