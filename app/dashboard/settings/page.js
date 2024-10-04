import { authOptions } from "@/app/utils/authOptions";
import UpdateProfile from "@/components/common/UpdateProfile";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <UpdateProfile data={session.user} />
    </div>
  );
}
