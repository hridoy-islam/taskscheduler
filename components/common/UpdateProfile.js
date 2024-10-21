"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function UpdateProfile({ data }) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "/placeholder.svg",
    address: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user?.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        console.log(data);
        setProfileData({
          name: data.data.name,
          email: data.data.email,
          avatar: data.data.image || "/placeholder.svg",
          address: data.data.address || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(profileData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user?.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData), // Send the profile data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, avatar }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Update Your Profile</CardTitle>
          <CardDescription>
            Make changes to your profile here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profileData.avatar} alt="Profile picture" />
                <AvatarFallback>
                  {profileData?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <Label htmlFor="avatar" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={profileData?.address}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
