"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createPostSchema } from "@/lib/zod";

export async function submitPost(input: string) {
  const  session  = await auth();

    if (!session || !session.user?.id) 
    {
        throw new Error("Unauthorized");
    }
    const { content } = createPostSchema.parse({ content: input });

  await prisma.post.create({
    data: {
      content,
      userId: session.user?.id},
  });
}