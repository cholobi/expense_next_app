import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const loggedInUser = await db.user.findUnique({
    where: {
      cleckUserId: user.id,
    },
  });
  if (loggedInUser) {
    return loggedInUser;
  }
  const newUser = db.user.create({
    data: {
      cleckUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    },
  });
  return newUser;
};
