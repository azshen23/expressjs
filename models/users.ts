interface userInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  pfpUrl: string;
  verified: boolean;
}

export async function getUserData(
  userID: number,
  prisma: any
): Promise<userInfo> {
  const userData: userInfo = await prisma.users.findUnique({
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
    },
  });
  return userData;
}
