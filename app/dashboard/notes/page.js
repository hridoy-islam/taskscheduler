"use client";

import { useState, useEffect } from "react";
import { Plus, X, Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

const colors = [
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-red-100",
  "bg-purple-100",
  "bg-pink-100",
];

export default function Component() {
  const { register, handleSubmit } = useForm();
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { data: session } = useSession();

  const updateNote = async (id, updatedNote) => {
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedNote),
      }
    );

    if (response.ok) {
      fetchNotes();
      toast({ title: "Note updated successfully", variant: "success" });
    } else {
      console.error("Failed to update note", response.statusText);
    }
    setEditingId(null);
  };

  const handleDeleteClick = (id) => {
    setNoteToDelete(id);
    setIsModalOpen(true);
  };

  const deleteNote = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      fetchNotes();
      toast({ title: "Note deleted successfully", variant: "error" });
    } else {
      console.error("Failed to delete note", response.statusText);
    }
  };

  // Fetch tasks function
  const fetchNotes = async () => {
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notes?author=${session.user.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setNotes(data.data.result);
    } else {
      console.error("Failed to fetch notes", response.statusText);
    }
  };

  useEffect(() => {
    if (session) {
      fetchNotes();
    }
  }, [session]);

  const onSubmit = async (data) => {
    const token = session?.accessToken;
    data.author = session?.user?.id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(response);
      fetchNotes(); // Refetch tasks to include the new one
    } else {
      console.error("Failed to add note", response.statusText);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-4">
          <CardHeader>
            <Input
              placeholder="Title"
              {...register("title", { required: true })}
              className="mb-2"
            />
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Take a note..."
              {...register("content", { required: true })}
              rows={3}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Add Note
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map((note) => (
          <Card key={note.id} className={`${note.color}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              {editingId === note.id ? (
                <Input
                  value={note.title}
                  onChange={(e) =>
                    updateNote(note.id, { title: e.target.value })
                  }
                  className="font-semibold"
                />
              ) : (
                <h2 className="font-semibold">{note.title}</h2>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteNote(note.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {editingId === note.id ? (
                <Textarea
                  value={note.content}
                  onChange={(e) =>
                    updateNote(note.id, { content: e.target.value })
                  }
                  rows={3}
                />
              ) : (
                <p className="text-sm">{note.content}</p>
              )}
            </CardContent>
            <CardFooter>
              {editingId === note.id ? (
                <Button
                  onClick={() =>
                    updateNote(note.id, {
                      title: note.title,
                      content: note.content,
                    })
                  }
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              ) : (
                <Button variant="ghost" onClick={() => setEditingId(note.id)}>
                  <Edit2 className="mr-2 h-4 w-4" /> Edit
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
