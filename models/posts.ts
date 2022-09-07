import prisma from "../lib/prisma";

export async function getUserPosts(userID: number) {
  const posts = await prisma.posts.findMany({
    where: {
      authorid: userID,
    },
  });

  return posts;
}
