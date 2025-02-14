import { format } from "date-fns";
import { motion } from "framer-motion";
import { Check, Clock, Copy, Info, LinkIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarEvent } from "@/types/calendar";

export default function CardEventModal({ event }: { event: CalendarEvent }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (event.meetingLink) {
      await navigator.clipboard.writeText(event.meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getTimeFormatFromDuration = (duration: number) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const colorClasses = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100",
    green: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100",
    yellow:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100",
    purple:
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100",
    red: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100",
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="w-full max-w-2xl"
    >
      <Card className="border-none shadow-2xl">
        <CardContent className="p-0">
          <div className="relative">
            <div className={`p-6 ${colorClasses[event.color ?? "blue"]}`}>
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{event.title}</h2>
              </div>
              <div className="flex gap-2 mt-2">
                {event.course && (
                  <Badge variant="outline">{event.course}</Badge>
                )}
                {event.batch && <Badge variant="outline">{event.batch}</Badge>}
              </div>
            </div>

            <Tabs defaultValue="details" className="p-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="info">Additional Info</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-zinc-500" />
                  <div>
                    <p className="font-medium">
                      {format(new Date(event.start), "EEEE, MMMM d, yyyy")}
                    </p>
                    {!event.isFullDay && (
                      <p className="text-sm text-zinc-500">
                        {format(new Date(event.start), "HH:mm")} -
                        {format(new Date(event.end), "HH:mm")}
                        <span className="ml-2">
                          (
                          {event.duration
                            ? getTimeFormatFromDuration(event.duration)
                            : getTimeFormatFromDuration(
                                (new Date(event.end).getTime() -
                                  new Date(event.start).getTime()) /
                                  3600000
                              )}
                          )
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="font-medium">{event.location}</p>
                      {event.locationDetail && (
                        <p className="text-sm text-zinc-500">
                          {event.locationDetail}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {event.description && (
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">
                      {event.description}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="info">
                {event.additionalInfo ? (
                  <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                    <p className="text-sm">{event.additionalInfo}</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-zinc-500">
                    <Info className="h-12 w-12 mx-auto mb-2" />
                    <p>No additional information available</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {event.meetingLink && (
              <div className="p-6 pt-0 flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => window.open(event.meetingLink, "_blank")}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Join Meeting
                </Button>
                <Button variant="outline" onClick={handleCopyLink}>
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
