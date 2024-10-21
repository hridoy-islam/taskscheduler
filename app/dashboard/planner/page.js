// "use client";

// import { useState, useEffect } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Calendar as CalendarIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // Sample task data
// const tasks = [
//   {
//     id: 1,
//     date: "2023-09-25",
//     title: "Logo Design",
//     description: "Create new company logo",
//     completed: false,
//     color: "bg-blue-200",
//   },
//   {
//     id: 2,
//     date: "2023-09-25",
//     title: "Website Design",
//     description: "Design homepage layout",
//     completed: false,
//     color: "bg-green-200",
//   },
//   {
//     id: 3,
//     date: "2023-09-26",
//     title: "Client Meeting",
//     description: "Discuss project requirements",
//     completed: false,
//     color: "bg-yellow-200",
//   },
//   {
//     id: 4,
//     date: "2023-09-27",
//     title: "Prototype Review",
//     description: "Internal review of the prototype",
//     completed: false,
//     color: "bg-purple-200",
//   },
//   {
//     id: 5,
//     date: "2023-09-28",
//     title: "Team Sync",
//     description: "Weekly team synchronization",
//     completed: false,
//     color: "bg-red-200",
//   },
//   {
//     id: 6,
//     date: "2023-09-29",
//     title: "User Testing",
//     description: "Conduct user testing sessions",
//     completed: false,
//     color: "bg-indigo-200",
//   },
//   // Add more tasks as needed
// ];

// const daysOfWeek = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// export default function Planner() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedTasks, setSelectedTasks] = useState([]);
//   const [view, setView] = useState("month");

//   const navigateDate = (direction) => {
//     if (view === "month") {
//       setCurrentDate(
//         new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth() + direction,
//           1
//         )
//       );
//     } else if (view === "week") {
//       setCurrentDate(
//         new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           currentDate.getDate() + direction * 7
//         )
//       );
//     } else if (view === "day") {
//       setCurrentDate(
//         new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           currentDate.getDate() + direction
//         )
//       );
//     }
//   };

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const days = new Date(year, month + 1, 0).getDate();
//     return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
//   };

//   const getMonthDays = () => {
//     const days = getDaysInMonth(currentDate);
//     const firstDayOfMonth = days[0].getDay();
//     const previousMonthDays = Array.from(
//       { length: firstDayOfMonth },
//       (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), -i)
//     ).reverse();
//     return [...previousMonthDays, ...days];
//   };

//   const getWeekDays = () => {
//     const startOfWeek = new Date(currentDate);
//     startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//     return Array.from(
//       { length: 7 },
//       (_, i) =>
//         new Date(
//           startOfWeek.getFullYear(),
//           startOfWeek.getMonth(),
//           startOfWeek.getDate() + i
//         )
//     );
//   };

//   const getTasksForDate = (date) => {
//     const formattedDate = date.toISOString().split("T")[0];
//     return tasks.filter((task) => task.date === formattedDate);
//   };

//   const handleDateClick = (date) => {
//     const dateTasks = getTasksForDate(date);
//     setSelectedDate(date);
//     setSelectedTasks(dateTasks);
//     setIsDialogOpen(true);
//   };

//   const renderMonthView = () => {
//     const monthDays = getMonthDays();
//     return (
//       <div className="grid grid-cols-7 gap-2">
//         {daysOfWeek.map((day) => (
//           <div key={day} className="text-center font-semibold p-2">
//             {day.slice(0, 3)}
//           </div>
//         ))}
//         {monthDays.map((date, index) => {
//           const isCurrentMonth = date.getMonth() === currentDate.getMonth();
//           const isToday = date.toDateString() === new Date().toDateString();
//           const dateTasks = getTasksForDate(date);
//           return (
//             <div
//               key={index}
//               className={`h-32 p-2 border rounded-lg overflow-hidden ${
//                 isCurrentMonth ? "bg-white" : "bg-gray-100"
//               } ${isToday ? "border-blue-500 border-2" : ""}`}
//               onClick={() => handleDateClick(date)}
//             >
//               <div className={`text-sm ${isToday ? "font-bold" : ""}`}>
//                 {date.getDate()}
//               </div>
//               <ScrollArea className="h-24 w-full">
//                 {dateTasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className={`text-xs p-1 mb-1 rounded ${task.color}`}
//                   >
//                     {task.title}
//                   </div>
//                 ))}
//               </ScrollArea>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const renderWeekView = () => {
//     const weekDays = getWeekDays();
//     return (
//       <div className="grid grid-cols-7 gap-2">
//         {weekDays.map((date, index) => {
//           const isToday = date.toDateString() === new Date().toDateString();
//           const dateTasks = getTasksForDate(date);
//           return (
//             <div key={index} className="border rounded-lg overflow-hidden">
//               <div
//                 className={`text-center p-2 ${
//                   isToday ? "bg-blue-100 font-bold" : "bg-gray-100"
//                 }`}
//               >
//                 {daysOfWeek[index].slice(0, 3)}
//                 <br />
//                 {date.getDate()}
//               </div>
//               <ScrollArea className="h-96 w-full p-2">
//                 {dateTasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className={`p-2 mb-2 rounded ${task.color}`}
//                   >
//                     <div className="font-semibold">{task.title}</div>
//                     <div className="text-xs">{task.description}</div>
//                   </div>
//                 ))}
//               </ScrollArea>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const renderDayView = () => {
//     const dateTasks = getTasksForDate(currentDate);
//     return (
//       <div className="border rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">
//           {currentDate.toLocaleDateString("en-US", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })}
//         </h2>
//         <ScrollArea className="h-[calc(100vh-200px)] w-full">
//           {dateTasks.map((task) => (
//             <div key={task.id} className={`p-4 mb-4 rounded ${task.color}`}>
//               <div className="font-semibold text-lg">{task.title}</div>
//               <div className="text-sm mt-2">{task.description}</div>
//             </div>
//           ))}
//         </ScrollArea>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="w-full">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-2xl font-bold">
//             {currentDate.toLocaleString("default", {
//               month: "long",
//               year: "numeric",
//             })}
//           </CardTitle>
//           <div className="flex items-center space-x-2">
//             <Tabs value={view} onValueChange={setView}>
//               <TabsList>
//                 <TabsTrigger value="month">Month</TabsTrigger>
//                 <TabsTrigger value="week">Week</TabsTrigger>
//                 <TabsTrigger value="day">Day</TabsTrigger>
//               </TabsList>
//             </Tabs>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => navigateDate(-1)}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="outline">
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {currentDate.toLocaleDateString()}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={currentDate}
//                   onSelect={(date) => date && setCurrentDate(date)}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => navigateDate(1)}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {view === "month" && renderMonthView()}
//           {view === "week" && renderWeekView()}
//           {view === "day" && renderDayView()}
//         </CardContent>
//       </Card>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>
//               Tasks for {selectedDate?.toLocaleDateString()}
//             </DialogTitle>
//           </DialogHeader>
//           <ScrollArea className="mt-8 max-h-[60vh] pr-4">
//             {selectedTasks.map((task) => (
//               <div
//                 key={task.id}
//                 className={`mb-4 p-3 rounded-lg ${task.color}`}
//               >
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold">{task.title}</h3>
//                   <Badge variant={task.completed ? "success" : "secondary"}>
//                     {task.completed ? "Completed" : "Pending"}
//                   </Badge>
//                 </div>
//                 <p className="text-sm mt-1">{task.description}</p>
//               </div>
//             ))}
//           </ScrollArea>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Calendar as CalendarIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useSession } from "next-auth/react";
// import { fetchTasks } from "@/app/utils/actions/fetchTasks";

// const daysOfWeek = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// export default function Planner() {
//   const { data: session } = useSession();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedTasks, setSelectedTasks] = useState([]);
//   const [view, setView] = useState("month");
//   const [tasks, setTasks] = useState([]); // State to hold tasks

//   // Fetch tasks from API on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       if (session?.user?.id) {
//         try {
//           const response = await fetchTasks({ author: session.user.id });
//           setTasks(response); // Set fetched tasks to state
//         } catch (error) {
//           console.error("Error fetching tasks:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [session]);

//   const navigateDate = (direction) => {
//     const newDate = new Date(currentDate);
//     if (view === "month") {
//       newDate.setMonth(currentDate.getMonth() + direction);
//     } else if (view === "week") {
//       newDate.setDate(currentDate.getDate() + direction * 7);
//     } else if (view === "day") {
//       newDate.setDate(currentDate.getDate() + direction);
//     }
//     setCurrentDate(newDate);
//   };

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const days = new Date(year, month + 1, 0).getDate();
//     return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
//   };

//   const getMonthDays = () => {
//     const days = getDaysInMonth(currentDate);
//     const firstDayOfMonth = days[0].getDay();
//     const previousMonthDays = Array.from(
//       { length: firstDayOfMonth },
//       (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), -i)
//     ).reverse();
//     return [...previousMonthDays, ...days];
//   };

//   const getWeekDays = () => {
//     const startOfWeek = new Date(currentDate);
//     startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//     return Array.from(
//       { length: 7 },
//       (_, i) =>
//         new Date(
//           startOfWeek.getFullYear(),
//           startOfWeek.getMonth(),
//           startOfWeek.getDate() + i
//         )
//     );
//   };

//   const getTasksForDate = (date) => {
//     const formattedDate = date.toISOString().split("T")[0];
//     return Array.isArray(tasks)
//       ? tasks.filter((task) => task.date === formattedDate)
//       : [];
//   };

//   const handleDateClick = (date) => {
//     const dateTasks = getTasksForDate(date);
//     setSelectedDate(date);
//     setSelectedTasks(dateTasks);
//     setIsDialogOpen(true);
//   };

//   const renderMonthView = () => {
//     const monthDays = getMonthDays();
//     return (
//       <div className="grid grid-cols-7 gap-2">
//         {daysOfWeek.map((day) => (
//           <div key={day} className="text-center font-semibold p-2">
//             {day.slice(0, 3)}
//           </div>
//         ))}
//         {monthDays.map((date, index) => {
//           const isCurrentMonth = date.getMonth() === currentDate.getMonth();
//           const isToday = date.toDateString() === new Date().toDateString();
//           const dateTasks = getTasksForDate(date);
//           return (
//             <div
//               key={index}
//               className={`h-auto p-2 border rounded-lg overflow-hidden ${
//                 isCurrentMonth ? "bg-white" : "bg-gray-100"
//               } ${isToday ? "border-blue-500 border-2" : ""}`}
//               onClick={() => handleDateClick(date)}
//             >
//               <div className={`text-sm ${isToday ? "font-bold" : ""}`}>
//                 {date.getDate()}
//               </div>
//               <ScrollArea className="h-24 w-full">
//                 {dateTasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className={`text-xs p-1 mb-1 rounded ${task.color}`}
//                   >
//                     {task.title}
//                   </div>
//                 ))}
//               </ScrollArea>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const renderWeekView = () => {
//     const weekDays = getWeekDays();
//     return (
//       <div className="grid grid-cols-7 gap-2">
//         {weekDays.map((date, index) => {
//           const isToday = date.toDateString() === new Date().toDateString();
//           const dateTasks = getTasksForDate(date);
//           return (
//             <div key={index} className="border rounded-lg overflow-hidden">
//               <div
//                 className={`text-center p-2 ${
//                   isToday ? "bg-blue-100 font-bold" : "bg-gray-100"
//                 }`}
//               >
//                 {daysOfWeek[index].slice(0, 3)}
//                 <br />
//                 {date.getDate()}
//               </div>
//               <ScrollArea className="h-96 w-full p-2">
//                 {dateTasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className={`p-2 mb-2 rounded ${task.color}`}
//                   >
//                     <div className="font-semibold">{task.title}</div>
//                     <div className="text-xs">{task.description}</div>
//                   </div>
//                 ))}
//               </ScrollArea>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const renderDayView = () => {
//     const dateTasks = getTasksForDate(currentDate);
//     return (
//       <div className="border rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">
//           {currentDate.toLocaleDateString("en-US", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })}
//         </h2>
//         <ScrollArea className="h-[calc(100vh-200px)] w-full">
//           {dateTasks.map((task) => (
//             <div key={task.id} className={`p-4 mb-4 rounded ${task.color}`}>
//               <div className="font-semibold text-lg">{task.title}</div>
//               <div className="text-sm mt-2">{task.description}</div>
//             </div>
//           ))}
//         </ScrollArea>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="w-full">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-2xl font-bold">
//             {currentDate.toLocaleString("default", {
//               month: "long",
//               year: "numeric",
//             })}
//           </CardTitle>
//           <div className="flex items-center space-x-2">
//             <Tabs value={view} onValueChange={setView}>
//               <TabsList>
//                 <TabsTrigger value="month">Month</TabsTrigger>
//                 <TabsTrigger value="week">Week</TabsTrigger>
//                 <TabsTrigger value="day">Day</TabsTrigger>
//               </TabsList>
//             </Tabs>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => navigateDate(-1)}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <CalendarIcon className="h-4 w-4" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent>
//                 <Calendar
//                   mode="single"
//                   selected={currentDate}
//                   onSelect={setCurrentDate}
//                 />
//               </PopoverContent>
//             </Popover>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => navigateDate(1)}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {view === "month" && renderMonthView()}
//           {view === "week" && renderWeekView()}
//           {view === "day" && renderDayView()}
//         </CardContent>
//       </Card>

//       {/* Dialog for showing tasks for a selected date */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               Tasks for{" "}
//               {selectedDate &&
//                 selectedDate.toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//             </DialogTitle>
//           </DialogHeader>
//           <ScrollArea className="h-[30rem]">
//             {selectedTasks.map((task) => (
//               <div key={task.id} className={`p-2 mb-2 rounded ${task.color}`}>
//                 <div className="font-semibold">{task.title}</div>
//                 <div className="text-xs">{task.description}</div>
//               </div>
//             ))}
//           </ScrollArea>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import moment from "moment";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Planner() {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [view, setView] = useState("month");
  const [tasks, setTasks] = useState([]);

  const fetchTasksByRange = async (date) => {
    if (session?.user?.id) {
      try {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const week = String(Math.ceil(date.getDate() / 7)).padStart(2, "0");
        const token = session.accessToken; // Assuming you have the token in the session

        let url;

        if (view === "day") {
          const formattedDate = date.toISOString().split("T")[0];
          url = `${process.env.NEXT_PUBLIC_API_URL}/tasks?date=${formattedDate}&author=${session.user.id}`;
        } else if (view === "week") {
          url = `${process.env.NEXT_PUBLIC_API_URL}/tasks?year=${year}&week=${week}&author=${session.user.id}`;
        } else {
          url = `${process.env.NEXT_PUBLIC_API_URL}/tasks?year=${year}&month=${month}&author=${session.user.id}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  useEffect(() => {
    fetchTasksByRange(currentDate);
  }, [currentDate, view, session]);

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(currentDate.getMonth() + direction);
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() + direction * 7);
    } else if (view === "day") {
      newDate.setDate(currentDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const getMonthDays = () => {
    const days = getDaysInMonth(currentDate);
    const firstDayOfMonth = days[0].getDay();
    const previousMonthDays = Array.from(
      { length: firstDayOfMonth },
      (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), -i)
    ).reverse();
    return [...previousMonthDays, ...days];
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    return Array.from(
      { length: 7 },
      (_, i) =>
        new Date(
          startOfWeek.getFullYear(),
          startOfWeek.getMonth(),
          startOfWeek.getDate() + i
        )
    );
  };

  const getTasksForDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return tasks?.filter((task) => task.date === formattedDate);
  };

  const handleDateClick = (date) => {
    const dateTasks = getTasksForDate(date);
    setSelectedDate(date);
    setSelectedTasks(dateTasks);
    setIsDialogOpen(true);
  };

  const renderMonthView = () => {
    const monthDays = getMonthDays();
    return (
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day.slice(0, 3)}
          </div>
        ))}
        {monthDays.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          const dateTasks = getTasksForDate(date);
          return (
            <div
              key={index}
              className={`h-auto p-2 border rounded-lg overflow-hidden ${
                isCurrentMonth ? "bg-white" : "bg-gray-100"
              } ${isToday ? "border-blue-500 border-2" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              <div className={`text-sm ${isToday ? "font-bold" : ""}`}>
                {date.getDate()}
              </div>
              <ScrollArea className="h-24 w-full">
                {dateTasks?.map((task) => (
                  <div
                    key={task.id}
                    className={`text-xs p-1 mb-1 rounded ${task.color}`}
                  >
                    {task.title}
                  </div>
                ))}
              </ScrollArea>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();
    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, index) => {
          const isToday = date.toDateString() === new Date().toDateString();
          const dateTasks = getTasksForDate(date);
          return (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div
                className={`text-center p-2 ${
                  isToday ? "bg-blue-100 font-bold" : "bg-gray-100"
                }`}
              >
                {daysOfWeek[index].slice(0, 3)}
                <br />
                {date.getDate()}
              </div>
              <ScrollArea className="h-96 w-full p-2">
                {dateTasks?.map((task) => (
                  <div
                    key={task.id}
                    className={`p-2 mb-2 rounded ${task.color}`}
                  >
                    <div className="font-semibold">{task.title}</div>
                    <div className="text-xs">{task.description}</div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dateTasks = getTasksForDate(currentDate);
    return (
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <ScrollArea className="h-[calc(100vh-200px)] w-full">
          {dateTasks?.map((task) => (
            <div key={task.id} className={`p-4 mb-4 rounded ${task.color}`}>
              <div className="font-semibold text-lg">{task.title}</div>
              <div className="text-sm mt-2">{task.description}</div>
            </div>
          ))}
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Tabs value={view} onValueChange={setView}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate(-1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate(1)}
            >
              <ChevronRight />
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setCurrentDate(date);
                      setSelectedDate(date);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          {view === "month" && renderMonthView()}
          {view === "week" && renderWeekView()}
          {view === "day" && renderDayView()}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tasks for{" "}
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4">
            {selectedTasks?.map((task) => (
              <div key={task.id} className={`p-4 mb-2 rounded ${task.color}`}>
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
