export async function getUserPosts(userID: number, prisma: any) {
  const posts = await prisma.posts.findMany({
    where: {
      authorid: userID,
    },
  });

  return posts;
}
