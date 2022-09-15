import { TRPCError } from "@trpc/server";
import prisma from "../lib/prisma";

export async function getUserPosts(userID: number) {
  const posts = await prisma.posts.findMany({
    where: {
      authorid: userID,
    },
  });

  return posts;
}

export async function getPublicPosts(numPosts: number) {
  const posts = await prisma.posts.findMany({
    where: {
      public: true,
    },
    take: numPosts,
  });
  return posts;
}

export async function createPost(body: any) {
  const { authorid, dateposted, title, content, mood, isPublic } = body;
  await prisma.posts.create({
    data: {
      authorid: authorid,
      dateposted: dateposted,
      title: title,
      content: content,
      mood: mood,
      public: isPublic,
    },
  });
}

export async function updatePostPublicStatus(
  postID: number,
  newPublicStatus: boolean
) {
  await prisma.posts.update({
    where: {
      id: postID,
    },
    data: {
      public: newPublicStatus,
    },
  });
}

export async function deletePost(postID: number) {
  await prisma.posts.delete({
    where: {
      id: postID,
    },
  });
}
