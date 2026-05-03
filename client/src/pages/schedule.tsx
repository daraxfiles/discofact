import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  Video,
  Gamepad2,
  MessageSquare,
  ClipboardList,
  Palette,
  Calendar,
} from "lucide-react";
import { dailySchedule } from "@shared/schema";

const activityIcons: Record<string, typeof Video> = {
  video: Video,
  game: Gamepad2,
  discussion: MessageSquare,
  survey: ClipboardList,
  creation: Palette,
};

const weekColors: Record<number, string> = {
  1: "bg-chart-1/10 text-chart-1",
  2: "bg-chart-2/10 text-chart-2",
  3: "bg-chart-3/10 text-chart-3",
  4: "bg-chart-4/10 text-chart-4",
  5: "bg-chart-5/10 text-chart-5",
  6: "bg-primary/10 text-primary",
};

export default function Schedule() {
  const weekGroups = dailySchedule.reduce((acc, day) => {
    if (!acc[day.week]) acc[day.week] = [];
    acc[day.week].push(day);
    return acc;
  }, {} as Record<number, Array<(typeof dailySchedule)[number]>>);

  return (
    <div className="min-h-screen py-12 md:py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              6-Week Program
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Daily Schedule
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore what happens each day of the Creative Media Bootcamp
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {Object.entries(weekGroups).map(([week]) => (
              <Badge
                key={week}
                variant="outline"
                className={`${weekColors[parseInt(week)]}`}
              >
                Week {week}
              </Badge>
            ))}
          </div>

          <div className="space-y-6">
            {Object.entries(weekGroups).map(([week, days]) => (
              <Card key={week} className="overflow-hidden" data-testid={`card-schedule-week-${week}`}>
                <CardHeader className={`${weekColors[parseInt(week)]} bg-opacity-20`}>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg ${weekColors[parseInt(week)]} flex items-center justify-center`}>
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xl">Week {week}</span>
                      <p className="text-sm font-normal text-muted-foreground mt-0.5">
                        {parseInt(week) <= 2
                          ? "Explore & Learn"
                          : parseInt(week) === 3
                          ? "Deconstruct & Construct"
                          : parseInt(week) <= 5
                          ? "Create & Refine"
                          : "Showcase"}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="multiple" className="w-full">
                    {days.map((day) => (
                      <AccordionItem
                        key={day.day}
                        value={`day-${day.day}`}
                        className="border-b last:border-b-0"
                      >
                        <AccordionTrigger
                          className="px-6 hover:no-underline hover:bg-secondary/50"
                          data-testid={`accordion-day-${day.day}`}
                        >
                          <div className="flex items-center gap-4 text-left">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary shrink-0">
                              {day.day}
                            </div>
                            <div>
                              <p className="font-semibold">{day.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {day.theme}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="ml-14 space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                Activities
                              </h4>
                              <div className="space-y-2">
                                {day.activities.map((activity, i) => {
                                  const Icon =
                                    activityIcons[activity.type] || MessageSquare;
                                  return (
                                    <div
                                      key={i}
                                      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                                    >
                                      <div className="h-8 w-8 rounded-md bg-background flex items-center justify-center shrink-0">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">
                                          {activity.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {activity.duration}
                                        </p>
                                      </div>
                                      <Badge variant="outline" className="text-xs shrink-0">
                                        {activity.type}
                                      </Badge>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm mb-2">
                                Skills Practiced
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {day.skills.map((skill, i) => (
                                  <Badge key={i} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-primary/5 border-primary/20" data-testid="card-session-info">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Session Format</h3>
                  <p className="text-sm text-muted-foreground">
                    Sessions meet <strong>twice per week</strong> for approximately{" "}
                    <strong>1 hour each</strong>. The bootcamp runs for{" "}
                    <strong>6 weeks</strong>, totaling 12 sessions. All sessions take
                    place afterschool.
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
