"use server";


import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { getCommentDataInclude, PostData } from "@/lib/types";
import { createCommentSchema } from "@/lib/zod";

export async function submitComment({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const newComment = await prisma.comment.create({
    data: {
      content: contentValidated,
      postId: post.id,
      userId: session.user.id,
    },
    include: getCommentDataInclude(session.user.id),
  });

  return newComment;
}

export async function deleteComment(id: string) {
    const session = await auth();


    if (!session || !session.user || !session.user.id) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) throw new Error("Comment not found");

  if (comment.userId !== session.user.id) throw new Error("Unauthorized");

  const deletedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(session.user.id),
  });

  return deletedComment;
}