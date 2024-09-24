"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Star,
  Bell,
  MousePointer,
  Calendar,
  UserRoundCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TaskNotifications() {
  const [notifications, setNotifications] = useState({
    dueTasks: [
      {
        id: 1,
        text: "Complete project proposal",
        read: false,
        assignee: "Kishor Zadid",
        date: "2023-09-30",
      },
      {
        id: 2,
        text: "Review team performance",
        read: true,
        assignee: "Kishor Zadid",
        date: "2023-10-05",
      },
    ],
    newAssignments: [
      {
        id: 3,
        text: "Prepare quarterly report",
        read: false,
        assignee: "Kishor Zadid",
        date: "2023-10-10",
      },
      {
        id: 4,
        text: "Update client presentation",
        read: false,
        assignee: "Kishor Zadid",
        date: "2023-10-15",
      },
    ],
  });

  const toggleNotification = (category, id) => {
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [category]: prevNotifications[category].map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      ),
    }));
  };

  const renderNotifications = (category) => (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2">
        {notifications[category].map((notification) => (
          <div
            key={notification.id}
            className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow"
          >
            <Checkbox
              checked={notification.read}
              onCheckedChange={() =>
                toggleNotification(category, notification.id)
              }
              id={`notification-${notification.id}`}
            />
            <label
              htmlFor={`notification-${notification.id}`}
              className={`flex-1 ${
                notification.read ? "text-gray-500" : "font-medium"
              }`}
            >
              {notification.text}
            </label>
            <span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <UserRoundCheck className="h-3 w-3" />
                      Kishor Zadid
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Created By Kishor Zadid</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Sep 24th 24
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Deadline</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark As Important</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openTaskDrawer(task)}
                  >
                    <MousePointer className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="due" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="due" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Due Tasks
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              New Assignments
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="due">
              {renderNotifications("dueTasks")}
            </TabsContent>
            <TabsContent value="new">
              {renderNotifications("newAssignments")}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
