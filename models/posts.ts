import prisma from "../lib/prisma";

export async function getUserPosts(userID: number) {
  const posts = await prisma.posts.findMany({
    where: {
      authorid: userID,
    },
  });

  return posts;
}

export async function createPost(body: any) {
  const { authorid, dateposted, title, content, mood } = body;
  await prisma.posts.create({
    data: {
      authorid: authorid,
      dateposted: dateposted,
      title: title,
      content: content,
      mood: mood,
    },
  });
}
