import prisma from "../lib/prisma";

export async function getUserData(userID: number) {
  const userData = await prisma.users.findUnique({
    where: {
      id: userID,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      verified: true,
      pfpurl: true,
      streak: true,
    },
  });
  return userData;
}
