import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function TeamMember() {
  return (
    <Card className="sm:col-span-2 mt-4" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>Team Members</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          <div>
            <ul>
              <li>hridoy3t@gmail.com</li>
            </ul>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Add Member </Button>
      </CardFooter>
    </Card>
  );
}
