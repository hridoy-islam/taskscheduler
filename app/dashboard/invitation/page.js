"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { toast } from "@/components/ui/use-toast";

// interface Invitation {
//   id: string
//   inviteeEmail: string
//   inviterName: string
//   status: 'pending' | 'approved' | 'rejected'
// }

export default function AdminAuthorizationView() {
  const [invitations, setInvitations] = useState([
    {
      id: "1",
      inviteeEmail: "john@example.com",
      inviterName: "Alice",
      status: "pending",
    },
    {
      id: "2",
      inviteeEmail: "jane@example.com",
      inviterName: "Bob",
      status: "pending",
    },
  ]);

  const handleAuthorization = async (id) => {
    // Here you would typically call an API to handle the authorization
    // For this example, we'll just update the local state
    setInvitations(
      invitations.map((inv) =>
        inv.id === id
          ? { ...inv, status: action === "approve" ? "approved" : "rejected" }
          : inv
      )
    );
    // toast({
    //   title:
    //     action === "approve" ? "Invitation Approved" : "Invitation Rejected",
    //   description: `The invitation has been ${
    //     action === "approve" ? "approved" : "rejected"
    //   }.`,
    // });
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Invitations</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invitee Email</TableHead>
            <TableHead>Invited By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invitation) => (
            <TableRow key={invitation.id}>
              <TableCell>{invitation.inviteeEmail}</TableCell>
              <TableCell>{invitation.inviterName}</TableCell>
              <TableCell>{invitation.status}</TableCell>
              <TableCell>
                {invitation.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleAuthorization(invitation.id, "approve")
                      }
                      className="mr-2"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleAuthorization(invitation.id, "reject")
                      }
                    >
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
