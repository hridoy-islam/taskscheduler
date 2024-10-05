"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// Mock data
const mockCreators = [
  { id: 1, name: "Creator 1" },
  { id: 2, name: "Creator 2" },
  { id: 3, name: "Creator 3" },
];

const mockUsers = [
  { id: 1, name: "User 1", assignedTo: [] },
  { id: 2, name: "User 2", assignedTo: [1] },
  { id: 3, name: "User 3", assignedTo: [1, 2] },
  { id: 4, name: "User 4", assignedTo: [2] },
  { id: 5, name: "User 5", assignedTo: [] },
];

export default function UserManage() {
  const [users, setUsers] = useState(mockUsers);

  const toggleAssignment = (userId, creatorId) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const newAssignedTo = user.assignedTo.includes(creatorId)
            ? user.assignedTo.filter((id) => id !== creatorId)
            : [...user.assignedTo, creatorId];
          return { ...user, assignedTo: newAssignedTo };
        }
        return user;
      })
    );
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.assignedTo.length > 0
                    ? user.assignedTo
                        .map(
                          (creatorId) =>
                            mockCreators.find((c) => c.id === creatorId)?.name
                        )
                        .join(", ")
                    : "Unassigned"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[200px] justify-between"
                      >
                        Assign to Creators
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                      <DropdownMenuLabel>Assign to Creators</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {mockCreators.map((creator) => (
                        <DropdownMenuCheckboxItem
                          key={creator.id}
                          checked={user.assignedTo.includes(creator.id)}
                          onCheckedChange={() =>
                            toggleAssignment(user.id, creator.id)
                          }
                        >
                          {creator.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
