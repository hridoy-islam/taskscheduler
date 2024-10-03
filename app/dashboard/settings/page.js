import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      Settings {session.user.role} {session.user.email}
    </div>
  );
}
